
CoreUI.table.columns.text = {

    _table: null,
    _options: {
        type: 'text',
        field: null,
        label: null,
        width: null,
        attr: null,
        attrHeader: null,
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
     * Получение параметров
     * @returns {object}
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

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0) {
            return '';
        }

        return String(content)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}