import coreuiTable from "../coreui.table";

coreuiTable.columns.number = {

    _table: null,
    _options: {
        type: 'number',
        field: null,
        label: null,
        show: true,
        width: null,
        attr: {},
        attrHeader: {},
        render: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);
    },


    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function (isShow) {
        this._options.show = !! isShow;
    },


    /**
     * Видимости колонки
     */
    isShow: function () {
        return !! this._options.show;
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

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0) {
            return '';
        }

        content = String(content)
            .replace(/,/g, '.')
            .replace(/[^0-9\-\.]/g, '')
            .replace(/[\s]{2,}/g, ' ');

        content = content.replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, '$1 ')
            .replace(/\- /g, '-');

        return content;
    }
}