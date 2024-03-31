
import coreuiTable      from "./coreui.table";
import coreuiTableUtils from "./coreui.table.utils";


let coreuiTablePrivate = {

    /**
     * Инициализация колонок
     * @param {Object} table
     * @param {Array} columns
     * @private
     */
    initColumns(table, columns) {

        $.each(columns, function (key, column) {
            if (typeof column.type === 'undefined' ||
                ! coreuiTable.columns.hasOwnProperty(column.type)
            ) {
                column.type = 'text';
            }

            if ( ! column.hasOwnProperty('show') || typeof column.show !== 'boolean') {
                column.show = true;
            }

            if (column.hasOwnProperty('fixed') && typeof column.fixed === 'string') {
                table._options.overflow = true;
            }

            let columnInstance = $.extend(true, {}, coreuiTable.columns[column.type]);
            columnInstance.init(table, column);
            table._columns.push(columnInstance);

            if (columnInstance.isShow()) {
                table._countColumnsShow++;
            }
        });
    },


    /**
     * Инициализация поисковых полей
     * @param {Object} table
     * @param {Array}  searchControls
     * @private
     */
    initSearch: function (table, searchControls) {

        let options      = table.getOptions();
        let searchValues = options.saveState && options.id
            ? coreuiTablePrivate.getStorageField(table.getId(), 'search')
            : null;

        $.each(searchControls, function (key, control) {
            if ( ! coreuiTableUtils.isObject(control)) {
                control = {};
            }

            if ( ! control.hasOwnProperty('type') ||
                typeof control.type !== 'string' ||
                ! coreuiTable.search.hasOwnProperty(control.type)
            ) {
                control.type = 'text';
            }

            if (options.saveState && options.id) {
                control.value = null;

                if (Array.isArray(searchValues) && control.hasOwnProperty('field')) {
                    $.each(searchValues, function (key, search) {
                        if (coreuiTableUtils.isObject(search) &&
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

            let controlInstance = $.extend(true, {}, coreuiTable.search[control.type]);
            controlInstance.init(table, control);
            table._search.push(controlInstance);
        });
    },


    /**
     * Инициализация контролов и фильтров
     * @param {Object} table
     * @param {Array}  rows
     * @param {string} position
     * @private
     */
    initControls: function (table, rows, position) {

        let that = this;

        $.each(rows, function (key, row) {

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
                $.each(row.left, function (key, control) {
                    let instance = that.initControl(table, control);

                    if (coreuiTableUtils.isObject(instance)) {
                        controlsLeft.push(instance);
                    }
                });
            }

            if (row.hasOwnProperty('center') && Array.isArray(row.center)) {
                $.each(row.center, function (key, control) {
                    let instance = that.initControl(table, control);

                    if (coreuiTableUtils.isObject(instance)) {
                        controlsCenter.push(instance);
                    }
                });
            }

            if (row.hasOwnProperty('right') && Array.isArray(row.right)) {
                $.each(row.right, function (key, control) {
                    let instance = that.initControl(table, control);

                    if (coreuiTableUtils.isObject(instance)) {
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
     * @param {Object} table
     * @param {object} control
     * @private
     */
    initControl: function (table, control) {

        let instance = null;

        if (coreuiTableUtils.isObject(control) && typeof control.type === 'string') {

            if (coreuiTable.controls.hasOwnProperty(control.type)) {
                instance = $.extend(true, {}, coreuiTable.controls[control.type]);
                instance.init(table, control);

                table._controls.push(instance);

            } else if (control.type.indexOf('filter:') === 0) {
                let filterName = control.type.substring(7);

                if (coreuiTable.filters.hasOwnProperty(filterName)) {

                    if (control.hasOwnProperty('field')) {
                        let options = table.getOptions();

                        if (options.saveState && options.id) {
                            let filterValues = options.saveState && options.id
                                ? coreuiTablePrivate.getStorageField(table.getId(), 'filters')
                                : null;

                            control.value = null;

                            if (Array.isArray(filterValues)) {
                                $.each(filterValues, function (key, filter) {
                                    if (coreuiTableUtils.isObject(filter) &&
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

                    instance = $.extend(true, {}, coreuiTable.filters[filterName]);
                    instance.init(table, control);

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
            $.each(sort, function (key, sortField) {

                if (coreuiTableUtils.isObject(sortField) &&
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

        if (coreuiTableUtils.isObject(data)) {
            data = $.extend(true, {}, data);

            let meta = data.hasOwnProperty('_meta') && coreuiTableUtils.isObject(data._meta)
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

        if (coreuiTableUtils.isObject(data) && typeof index === 'number') {
            data = $.extend(true, {}, data);

            let meta = data.hasOwnProperty('_meta') && coreuiTableUtils.isObject(data._meta)
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
     * @return {boolean}
     * @private
     */
    isFilteredRecord: function (filters, recordData) {

        let isShow = true;

        $.each(filters, function (key, filter) {

            if (recordData.hasOwnProperty(filter.field) &&
                ['string', 'number'].indexOf(typeof recordData[filter.field]) >= 0
            ) {

                if (['string', 'number'].indexOf(typeof filter.value) >= 0) {

                    if (filter.hasOwnProperty('alg') && filter.alg === 'strict') {
                        if (recordData[filter.field].toString().toLowerCase() != filter.value.toString().toLowerCase()) {
                            isShow = false;
                            return false;
                        }

                    } else if (recordData[filter.field].toString().toLowerCase()
                               .indexOf(filter.value.toString().toLowerCase()) < 0
                    ) {
                        isShow = false;
                        return false;
                    }

                } else if (Array.isArray(filter.value)) {
                    if (filter.value.indexOf(recordData[filter.field].toString()) < 0) {
                        isShow = false;
                        return false;
                    }

                } else if (coreuiTableUtils.isObject(filter.value) &&
                    filter.value.hasOwnProperty('start') &&
                    filter.value.hasOwnProperty('end')
                ) {
                    let issetStart = ['string', 'number'].indexOf(typeof filter.value.start) >= 0;
                    let issetEnd   = ['string', 'number'].indexOf(typeof filter.value.end) >= 0;

                    if (issetStart && issetEnd) {
                        if (recordData[filter.field] < filter.value.start || filter.value.end < recordData[filter.field]) {
                            isShow = false;
                            return false;
                        }

                    } else if (issetStart) {
                        if (filter.value.start > recordData[filter.field]) {
                            isShow = false;
                            return false;
                        }

                    } else if (issetEnd) {
                        if (filter.value.end < recordData[filter.field]) {
                            isShow = false;
                            return false;
                        }
                    }
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
     * @param records
     * @param fields
     */
    sortRecordsByFields: function (records, fields) {

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


                let val = a.data[fields[i].field] < b.data[fields[i].field]
                    ? -1
                    : (a.data[fields[i].field] > b.data[fields[i].field] ? 1 : 0);

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
     * Получение данных из хранилища
     * @param {string} tableId
     * @return {object|null}
     */
    getStorage: function (tableId) {

        let storage = localStorage.getItem('coreui_table');

        try {
            if (typeof storage === 'string' && storage) {
                storage = JSON.parse(storage);

                if (coreuiTableUtils.isObject(storage)) {
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

        if (coreuiTableUtils.isObject(storageAll)) {
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

export default coreuiTablePrivate;