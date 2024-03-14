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
     * Видимости колонки
     */
    isShow: function () {
        return true;
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {
        return $.extend({}, this._options);
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function(content, record) {

        return this._table._recordsNumber;
    }
}