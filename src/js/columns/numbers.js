import coreuiTable from "../coreui.table";

coreuiTable.columns.numbers = {

    _table: null,
    _options: {
        type: 'numbers',
        label: '№',
        width: 20,
        attr: { class: 'text-end' },
        attrHeader: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        this._table    = table;
        this._options  = $.extend(true, {}, this._options, options);
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        return this._table._recordsNumber;
    }
}