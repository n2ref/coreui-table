import Utils    from "./utils";
import Elements from "./elements";
import ToolBox from "./toolbox";


let Private = {

    /**
     * @param {Table} table
     */
    init: function (table) {

        let controller = table._controller;

        if ( ! table._options.hasOwnProperty('lang') || typeof table._options.lang !== 'string') {
            table._options.lang = controller.getSetting('lang');
        }

        let langItems     = controller.lang.hasOwnProperty(table._options.lang) ? controller.lang[table._options.lang] : {};
        table._options.langItems = table._options.hasOwnProperty('langItems') && Utils.isObject(table._options.langItems)
            ? $.extend(true, {}, langItems, table._options.langItems)
            : langItems;

        if (table._options.page > 0) {
            table._page = table._options.page;
        }

        if (table._options.saveState && table._options.id) {
            let pageSize = Private.getStorageField(table._id, 'page_size');

            if (Utils.isNumeric(pageSize) && pageSize > 0) {
                table._recordsPerPage = pageSize;

            } else if (table._options.recordsPerPage > 0) {
                table._recordsPerPage = table._options.recordsPerPage;
            }

        } else if (table._options.recordsPerPage > 0) {
            table._recordsPerPage = table._options.recordsPerPage;
        }

        table._isRecordsRequest = (
            table._options.hasOwnProperty('recordsRequest') &&
            (
                typeof table._options.recordsRequest === 'function' ||
                (Utils.isObject(table._options.recordsRequest) &&
                    table._options.recordsRequest.hasOwnProperty('url') &&
                    typeof table._options.recordsRequest.url === 'string' &&
                    table._options.recordsRequest.url !== '' &&
                    table._options.recordsRequest.url !== '#')
            )
        );

        if (table._isRecordsRequest) {
            if (typeof table._options.recordsRequest === 'object' &&
                ( ! table._options.recordsRequest.hasOwnProperty('method') ||
                    typeof table._options.recordsRequest.method !== 'string')
            ) {
                table._options.recordsRequest.method = 'GET';
            }

        } else if (Array.isArray(table._options.records)) {
            this.setRecords(table, table._options.records);
        }

        // Очистка записей после инициализации
        table._options.records = [];

        // Инициализация колонок
        if (typeof table._options.columns === 'object' &&
            Array.isArray(table._options.columns) &&
            table._options.columns.length > 0
        ) {
            this.initColumns(controller, table, table._options.columns);
        }


        // Инициализация поисковых полей
        if (Utils.isObject(table._options.search) &&
            typeof table._options.search.controls === 'object' &&
            Array.isArray(table._options.search.controls) &&
            table._options.search.controls.length > 0
        ) {
            this.initSearch(controller, table, table._options.search.controls);
        }


        // Инициализация контролов и фильтров
        if (table._options.hasOwnProperty('header') &&
            Array.isArray(table._options.header) &&
            table._options.header.length > 0
        ) {
            this.initControls(controller, table, table._options.header, 'header');
        }

        if (table._options.hasOwnProperty('footer') &&
            Array.isArray(table._options.footer) &&
            table._options.footer.length > 0
        ) {
            this.initControls(controller, table, table._options.footer, 'footer');
        }


        if (table._options.saveState && table._options.id) {

            // Поиск по сохраненным поисковым данным
            if ( ! table._isRecordsRequest) {
                this.searchLocalRecords(table);
            }

            // Сортировка
            let sort = this.getStorageField(table.getId(), 'sort');

            if (Array.isArray(sort) && sort.length > 0) {
                this.initSort(table, sort);

                if ( ! table._isRecordsRequest && table._records.length > 0) {
                    table._records = this.sortRecordsByFields(table._records, table._sort);
                }
            }

        } else {
            if (table._options.hasOwnProperty('sort') &&
                Array.isArray(table._options.sort) &&
                table._options.sort.length > 0
            ) {
                this.initSort(table, table._options.sort);
            }
        }
    },


    /**
     * Инициализация колонок
     * @param {Controller} controller
     * @param {Table}      table
     * @param {Array}      columns
     * @private
     */
    initColumns(controller, table, columns) {

        let options        = table.getOptions();
        let columnsStorage = options.saveState && options.id
            ? this.getStorageField(table.getId(), 'columns')
            : null;

        columns.map(function (column) {
            if (typeof column.type === 'undefined' ||
                ! controller.columns.hasOwnProperty(column.type)
            ) {
                column.type = 'text';
            }

            if ( ! column.hasOwnProperty('show') || typeof column.show !== 'boolean') {
                column.show = true;
            }

            if (columnsStorage) {
                $.each(columnsStorage, function (key2, columnStorage) {
                    if (columnStorage &&
                        columnStorage.hasOwnProperty('field') &&
                        columnStorage.hasOwnProperty('isShow') &&
                        columnStorage.field === column.field
                    ) {
                        column.show = !! columnStorage.isShow;
                        return false;
                    }
                });
            }


            if (column.hasOwnProperty('fixed') && typeof column.fixed === 'string') {
                table._options.overflow = true;
            }

            let columnObject   = controller.columns[column.type];
            let columnInstance = null;

            if (Utils.isClass(columnObject)) {
                columnInstance = new columnObject(table, column);

            } else if (Utils.isObject(columnObject)) {
                columnInstance = $.extend(true, {}, columnObject);
                columnInstance.init(table, column);

            } else {
                throw new Error(`Incorrect type column: ${column.type}`);
            }

            table._columns.push(columnInstance);

            if (columnInstance.isShow()) {
                table._countColumnsShow++;
            }
        });
    },


    /**
     * Инициализация поисковых полей
     * @param {Controller} controller
     * @param {Object}     table
     * @param {Array}      searchControls
     * @private
     */
    initSearch: function (controller, table, searchControls) {

        let options      = table.getOptions();
        let searchValues = options.saveState && options.id
            ? this.getStorageField(table.getId(), 'search')
            : null;

        $.each(searchControls, function (key, control) {
            if ( ! Utils.isObject(control)) {
                control = {};
            }

            if ( ! control.hasOwnProperty('type') ||
                typeof control.type !== 'string' ||
                ! controller.search.hasOwnProperty(control.type)
            ) {
                control.type = 'text';
            }

            if (options.saveState && options.id) {
                control.value = null;

                if (Array.isArray(searchValues) && control.hasOwnProperty('field')) {
                    $.each(searchValues, function (key, search) {
                        if (Utils.isObject(search) &&
                            search.hasOwnProperty('field') &&
                            search.hasOwnProperty('value') &&
                            search.field &&
                            search.field === control.field
                        ) {
                            control.value = search.value;
                            return false;
                        }
                    })
                }
            }

            let searchObject    = controller.search[control.type];
            let controlInstance = null;

            if (Utils.isClass(searchObject)) {
                controlInstance = new searchObject(table, control);

            } else if (Utils.isObject(searchObject)) {
                controlInstance = $.extend(true, {}, searchObject);
                controlInstance.init(table, control);

            } else {
                throw new Error(`Incorrect type search: ${control.type}`);
            }

            table._search.push(controlInstance);
        });
    },


    /**
     * Инициализация контролов и фильтров
     * @param {Controller} controller
     * @param {Object}     table
     * @param {Array}      rows
     * @param {string}     position
     * @private
     */
    initControls: function (controller, table, rows, position) {

        let that = this;

        rows.map(function (row) {

            if (row instanceof ToolBox) {
                row = row.toObject();
            }



            let type           = 'in';
            let controlsLeft   = [];
            let controlsCenter = [];
            let controlsRight  = [];

            if (typeof row.type === 'string' &&
                ['in', 'out'].indexOf(row.type.toLowerCase()) >= 0
            ) {
                type = row.type.toLowerCase();
            }

            if (row.hasOwnProperty('left') && Array.isArray(row.left)) {
                row.left.map(function (control) {
                    let instance = that.initControl(controller, table, control);

                    if (Utils.isObject(instance)) {
                        controlsLeft.push(instance);
                    }
                });
            }

            if (row.hasOwnProperty('center') && Array.isArray(row.center)) {
                row.center.map(function (control) {
                    let instance = that.initControl(controller, table, control);

                    if (Utils.isObject(instance)) {
                        controlsCenter.push(instance);
                    }
                });
            }

            if (row.hasOwnProperty('right') && Array.isArray(row.right)) {
                row.right.map(function (control) {
                    let instance = that.initControl(controller, table, control);

                    if (Utils.isObject(instance)) {
                        controlsRight.push(instance);
                    }
                });
            }

            if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                table._controlsPositions[position].push({
                    type: type,
                    left: controlsLeft,
                    center: controlsCenter,
                    right: controlsRight,
                });
            }
        });
    },


    /**
     * Инициализация контрола или фильтра
     * @param {Controller} controller
     * @param {Object}     table
     * @param {object}     control
     * @private
     */
    initControl: function (controller, table, control) {

        let instance = null;

        if (Utils.isObject(control) && typeof control.type === 'string') {

            if (controller.controls.hasOwnProperty(control.type)) {

                let controlObject = controller.controls[control.type];

                if (Utils.isClass(controlObject)) {
                    instance = new controlObject(table, control);

                } else if (Utils.isObject(controlObject)) {
                    instance = $.extend(true, {}, controlObject);
                    instance.init(table, control);

                } else {
                    throw new Error(`Incorrect type control: ${control.type}`);
                }

                table._controls.push(instance);

            } else if (control.type.indexOf('filter:') === 0) {
                let filterName = control.type.substring(7);

                if (controller.filters.hasOwnProperty(filterName)) {

                    if (control.hasOwnProperty('field')) {
                        let options = table.getOptions();

                        if (options.saveState && options.id) {
                            let filterValues = options.saveState && options.id
                                ? this.getStorageField(table.getId(), 'filters')
                                : null;

                            control.value = null;

                            if (Array.isArray(filterValues)) {
                                $.each(filterValues, function (key, filter) {
                                    if (Utils.isObject(filter) &&
                                        filter.hasOwnProperty('field') &&
                                        filter.hasOwnProperty('value') &&
                                        filter.field &&
                                        filter.field === control.field
                                    ) {
                                        control.value = filter.value;
                                        return false;
                                    }
                                })
                            }
                        }
                    }


                    let filterObject = controller.filters[filterName];

                    if (Utils.isClass(filterObject)) {
                        instance = new filterObject(table, control);

                    } else if (Utils.isObject(filterObject)) {
                        instance = $.extend(true, {}, filterObject);
                        instance.init(table, control);

                    } else {
                        throw new Error(`Incorrect type filter: ${filterName}`);
                    }
                    table._filters.push(instance);
                }
            }
        }

        return instance;
    },


    /**
     * Инициализация сортировки
     * @param {Object} table
     * @param {Array} sort
     * @private
     */
    initSort: function (table, sort) {

        if (Array.isArray(sort) && sort.length > 0) {
            sort.map(function (sortField) {

                if (Utils.isObject(sortField) &&
                    sortField.hasOwnProperty('field') &&
                    sortField.hasOwnProperty('order') &&
                    typeof sortField.field === 'string' &&
                    typeof sortField.order === 'string' &&
                    sortField.field &&
                    sortField.order &&
                    ['asc', 'desc'].indexOf(sortField.order) >= 0
                ) {
                    table._sort.push({
                        field: sortField.field,
                        order: sortField.order
                    });
                }
            });
        }
    },


    /**
     * Поиск по данным таблицы
     * @param {object} table
     */
    searchLocalRecords: function (table) {

        let searchData     = table.getSearchData(true);
        let filterData     = table.getFilterData(true);
        let columnsOptions = {};

        table._columns.map(function (column) {
            if (typeof column.convertToString === 'function' &&
                typeof column.getField === 'function'
            ) {
                let field = column.getField()
                if (field) {
                    columnsOptions[field] = {};
                    columnsOptions[field].convertToString = column.convertToString;
                }
            }
        });


        table._records.map(function (record) {
            let isShow = true;

            if (searchData.length > 0) {
                isShow = Private.isFilteredRecord(searchData, record.data, columnsOptions);
            }

            if (isShow && filterData.length > 0) {
                isShow = Private.isFilteredRecord(filterData, record.data, columnsOptions);
            }

            record.show = isShow;
        });
    },


    /**
     * Установка записей
     * @param {Object} table
     * @param {Array}  records
     * @private
     */
    setRecords: function (table, records) {

        table._recordsIndex = 1;
        table._records      = [];

        let that = this;

        $.each(records, function (key, record) {

            that.addRecord(table, record);
        });
    },


    /**
     * Добавление новой записи
     * @param {object} table
     * @param {object} data
     * @param {number} afterIndex
     * @return {object|null}
     * @private
     */
    addRecord: function (table, data, afterIndex) {

        if (Utils.isObject(data)) {
            data = $.extend(true, {}, data);

            let meta = data.hasOwnProperty('_meta') && Utils.isObject(data._meta)
                ? data._meta
                : null;

            if (meta) {
                delete data._meta;
            }

            let record = {
                index: table._recordsIndex++,
                data: data,
                fields: {},
                show: true,
                meta: meta,
                seq: table._seq++,
            };


            if (typeof afterIndex === 'number') {
                if (afterIndex === 0) {
                    table._records.splice(0, 0, record);
                    return record;

                } else {
                    let index = null;

                    $.each(table._records, function (key, record) {
                        if (afterIndex === record.index) {
                            index = key;
                            return false;
                        }
                    });

                    if (index !== null) {
                        table._records.splice(index, 0, record);
                        return record;
                    }
                }

            } else {
                table._records.push(record);
                return record;
            }
        }


        return null;
    },


    /**
     * Добавление новой записи перед указанной
     * @param {object} table
     * @param {object} data
     * @param {number} index
     * @return {object|null}
     * @private
     */
    addRecordBefore: function (table, data, index) {

        if (Utils.isObject(data) && typeof index === 'number') {
            data = $.extend(true, {}, data);

            let meta = data.hasOwnProperty('_meta') && Utils.isObject(data._meta)
                ? data._meta
                : null;

            if (meta) {
                delete data._meta;
            }

            let record = {
                index: table._recordsIndex++,
                data: data,
                show: true,
                meta: meta,
                seq: table._seq++,
            };


            let issetKey  = false;
            let keyBefore = null;

            $.each(table._records, function (key, record) {
                if (index === record.index) {
                    issetKey = true;
                    return false;
                }

                keyBefore = key;
            });

            if (issetKey && keyBefore) {
                table._records.splice(keyBefore, 0, record);
                return record;
            }
        }


        return null;
    },


    /**
     * Проверка подходит ли запись под поисковые данные
     * @param {Array}  filters
     * @param {object} recordData
     * @param {object} columnsOptions
     * @return {boolean}
     * @private
     */
    isFilteredRecord: function (filters, recordData, columnsOptions) {

        let isShow = true;
        $.each(filters, function (key, filter) {

            let fieldValue = null;

            if (recordData.hasOwnProperty(filter.field) && recordData[filter.field]) {
                if (columnsOptions &&
                    columnsOptions.hasOwnProperty(filter.field) &&
                    typeof columnsOptions[filter.field].convertToString === 'function'
                ) {
                    fieldValue = columnsOptions[filter.field].convertToString(recordData[filter.field]);

                } else if (typeof recordData[filter.field] === 'string') {
                    fieldValue = recordData[filter.field];

                } else if (typeof recordData[filter.field] === 'number') {
                    fieldValue = String(recordData[filter.field]);
                }
            }


            if (fieldValue !== null) {
                if ( ! filter.filter(fieldValue, filter.value)) {
                    isShow = false;
                    return false;
                }

            } else {
                isShow = false;
                return false;
            }
        });

        return isShow;
    },


    /**
     * Выполнения зарегистрированных функций в указанном событии
     * @param {object} table
     * @param {string} name
     * @param {Array}  params
     * @private
     */
    _trigger: function(table, name, params) {

        params = params || [];

        if (table._events.hasOwnProperty(name) && table._events[name].length > 0) {
            for (let i = 0; i < table._events[name].length; i++) {
                let callback = table._events[name][i].callback;
                let context  = table._events[name][i].context ? table._events[name][i].context : table;

                callback.apply(context, params)

                if (table._events[name][i].singleExec) {
                    table._events[name].splice(i, 1);
                    i--;
                }
            }
        }
    },


    /**
     * Сортировка записей по seq
     * @param {Array} records
     * @return {*}
     */
    sortRecordsBySeq: function (records) {

        return records.sort(function (a, b) {
            return a.seq - b.seq;
        });
    },


    /**
     * Сортировка записей по указанным полям
     * @param {Array}  records
     * @param {Array}  fields
     * @param {object} columnsConverters
     */
    sortRecordsByFields: function (records, fields, columnsConverters) {

        return records.sort(function(a, b) {

            for (let i = 0; i < fields.length; i++) {
                let issetAField = a.data.hasOwnProperty(fields[i].field);
                let issetBField = b.data.hasOwnProperty(fields[i].field);

                if ( ! issetAField && ! issetBField) {
                    return 0;

                } else if ( ! issetAField) {
                    return 1;

                } else if ( ! issetBField) {
                    return -1;
                }

                let aVal = '';
                let bVal = '';

                if (a.data.hasOwnProperty(fields[i].field) && a.data[fields[i].field]) {
                    if (columnsConverters && columnsConverters.hasOwnProperty(fields[i].field)) {
                        aVal = columnsConverters[fields[i].field](a.data[fields[i].field]);

                    } else if (['string', 'number'].indexOf(typeof a.data[fields[i].field]) >= 0) {
                        aVal = String(a.data[fields[i].field]);
                    }
                }

                if (b.data.hasOwnProperty(fields[i].field) && b.data[fields[i].field]) {
                    if (columnsConverters && columnsConverters.hasOwnProperty(fields[i].field)) {
                        bVal = columnsConverters[fields[i].field](b.data[fields[i].field]);

                    } else if (['string', 'number'].indexOf(typeof b.data[fields[i].field]) >= 0) {
                        bVal = String(b.data[fields[i].field]);
                    }
                }

                if (aVal === null || aVal === undefined || typeof aVal === "function") {
                    aVal = '';

                } else if (typeof aVal === 'object') {
                    aVal = JSON.stringify(aVal);
                }

                if (bVal === null || bVal === undefined || typeof bVal === "function") {
                    bVal = '';

                } else if (typeof bVal === 'object') {
                    bVal = JSON.stringify(bVal);
                }

                let val = aVal < bVal
                    ? -1
                    : (aVal > bVal ? 1 : 0);

                if (fields[i].order === "desc") {
                    val = val * -1;
                }

                if (val !== 0) {
                    return val;
                }
            }
        })
    },


    /**
     * Установка сортировки для указанных колонок
     * @param {object} table
     * @param {Array}  sort
     */
    setColumnsSort: function (table, sort) {

        let thead = Elements.getTableThead(table.getId());

        $.each(table._columns, function (key, column) {
            let options = column.getOptions();

            if (options.hasOwnProperty('field') &&
                options.hasOwnProperty('sortable') &&
                typeof options.field === 'string' &&
                options.sortable
            ) {

                let sortColumn = null;

                if (Array.isArray(sort)) {
                    $.each(sort, function (key, sortItem) {
                        if (Utils.isObject(sortItem) &&
                            sortItem.hasOwnProperty('field') &&
                            sortItem.hasOwnProperty('order') &&
                            typeof sortItem.field === 'string' &&
                            typeof sortItem.order === 'string' &&
                            options.field === sortItem.field
                        ) {
                            sortColumn = {
                                field: sortItem.field,
                                order: sortItem.order
                            };
                        }
                    });
                }

                let columnElement = thead.find('[data-field="' + options.field + '"]');
                columnElement.find('.coreui-table__column-sort').remove();

                if (sortColumn !== null) {
                    if (sortColumn.order === 'asc') {
                        columnElement.append('<i class="coreui-table__column-sort bi bi-sort-down-alt"></i>');
                    } else {
                        columnElement.append('<i class="coreui-table__column-sort bi bi-sort-down"></i>');
                    }
                }
            }
        });
    },


    /**
     * Получение данных из хранилища
     * @param {string} tableId
     * @return {object|null}
     */
    getStorage: function (tableId) {

        let storage = localStorage.getItem('coreui_table');

        try {
            if (typeof storage === 'string' && storage) {
                storage = JSON.parse(storage);

                if (Utils.isObject(storage)) {
                    return tableId && typeof tableId === 'string'
                        ? (storage.hasOwnProperty(tableId) ? storage[tableId] : null)
                        : storage;
                }
            }

            return null;

        } catch (e) {
            return null;
        }
    },


    /**
     * Сохранение данных в хранилище
     * @param {string}      tableId
     * @param {object|null} storage
     */
    setStorage: function (tableId, storage) {

        if (typeof tableId !== 'string' || ! tableId) {
            return;
        }

        let storageAll = this.getStorage();

        if (Utils.isObject(storageAll)) {
            if (storageAll.hasOwnProperty(tableId)) {
                if (storage) {
                    storageAll[tableId] = storage;
                } else {
                    delete storageAll[tableId];
                }

            } else if (storage) {
                storageAll[tableId] = storage;
            }
        }

        localStorage.setItem('coreui_table', JSON.stringify(storageAll || {}));
    },


    /**
     * Получение поля из хранилища
     * @param tableId
     * @param field
     * @return {*|null}
     */
    getStorageField: function (tableId, field) {

        let storage = this.getStorage(tableId) || {};

        return storage.hasOwnProperty(field)
            ? storage[field]
            : null;
    },


    /**
     * Сохранение поля в хранилище
     * @param tableId
     * @param field
     * @param data
     */
    setStorageField: function (tableId, field, data) {

        let storage = this.getStorage(tableId) || {};

        if (data === null) {
            if (storage.hasOwnProperty(field)) {
                delete storage[field];
            }

        } else {
            storage[field] = data;
        }

        this.setStorage(tableId, storage);
    }
}

export default Private;