
import coreuiTable      from "./coreui.table";
import coreuiTableUtils from "./coreui.table.utils";


let coreuiTablePrivate = {

    /**
     * Инициализация колонок
     * @param {Object} table
     * @param {Array} columns
     * @private
     */
    _initColumns(table, columns) {

        $.each(columns, function (key, column) {
            if (typeof column.type === 'undefined' ||
                ! coreuiTable.columns.hasOwnProperty(column.type)
            ) {
                column.type = 'text';
            }

            if ( ! column.hasOwnProperty('show') || typeof column.show !== 'boolean') {
                column.show = true;
            }

            let columnInstance = $.extend(true, {}, coreuiTable.columns[column.type]);
            columnInstance.init(table, column);
            table._columns.push(columnInstance);
        });
    },


    /**
     * Инициализация поисковых полей
     * @param {Object} table
     * @param {Array}  searchControls
     * @private
     */
    _initSearch: function (table, searchControls) {

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
    _initControls: function (table, rows, position) {

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
                    let instance = that._initControl(table, control);

                    if (coreuiTableUtils.isObject(instance)) {
                        controlsLeft.push(instance);
                    }
                });
            }

            if (row.hasOwnProperty('center') && Array.isArray(row.center)) {
                $.each(row.center, function (key, control) {
                    let instance = that._initControl(table, control);

                    if (coreuiTableUtils.isObject(instance)) {
                        controlsCenter.push(instance);
                    }
                });
            }

            if (row.hasOwnProperty('right') && Array.isArray(row.right)) {
                $.each(row.right, function (key, control) {
                    let instance = that._initControl(table, control);

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
    _initControl: function (table, control) {

        let instance = null;

        if (coreuiTableUtils.isObject(control) && typeof control.type === 'string') {

            if (coreuiTable.controls.hasOwnProperty(control.type)) {
                instance = $.extend(true, {}, coreuiTable.controls[control.type]);
                instance.init(table, control);

                table._controls.push(instance);

            } else if (control.type.indexOf('filter:') === 0) {
                let filterName = control.type.substring(7);

                if (coreuiTable.filters.hasOwnProperty(filterName)) {
                    instance = $.extend(true, {}, coreuiTable.filters[filterName]);
                    instance.init(table, control);

                    table._filters.push(instance);
                }
            }
        }

        return instance;
    },


    /**
     * Установка записей
     * @param {Object} table
     * @param {Array}  records
     * @private
     */
    _setRecords: function (table, records) {

        table._recordsIndex = 1;
        table._records      = [];

        let that = this;

        $.each(records, function (key, record) {

            that._addRecord(table, record);
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
    _addRecord: function (table, data, afterIndex) {

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
    _addRecordBefore: function (table, data, index) {

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
    _isFilteredRecord: function (filters, recordData) {

        let isShow = true;

        $.each(filters, function (key, filter) {

            if (recordData.hasOwnProperty(filter.field) &&
                ['string', 'number'].indexOf(typeof recordData[filter.field]) >= 0
            ) {

                if (['string', 'number'].indexOf(typeof filter.value) >= 0) {
                    if (recordData[filter.field].toString().toLowerCase()
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
    }
}

export default coreuiTablePrivate;