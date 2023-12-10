import coreuiTable from "../coreui.table";

coreuiTable.columns.datetime = {

    _table: null,
    _options: {
        type: 'datetime',
        field: null,
        label: null,
        width: null,
        format: 'DD.MM.YYYY hh:mm:ss',
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

        if (typeof content !== 'string') {
            return '';
        }

        try {
            let date = new Date(content);

            content = this._options.format
                .replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4))
                .replace(/MM/g,   this._strPadLeft(date.getMonth() + 1, 2))
                .replace(/M/g,    date.getMonth() + 1)
                .replace(/DD/g,   this._strPadLeft(date.getDate(), 2))
                .replace(/D/g,    date.getDate())
                .replace(/hh/g,   this._strPadLeft(date.getHours(), 2))
                .replace(/mm/g,   this._strPadLeft(date.getMinutes(), 2))
                .replace(/m/g,    date.getMinutes())
                .replace(/ss/g,   this._strPadLeft(date.getSeconds(), 2))
                .replace(/s/g,    date.getSeconds());

        } catch (e) {
            content = '';
        }


        return content;
    },


    /**
     * Размерность строки
     * @param {string} str
     * @param {int}    count
     * @param {string} repeat
     * @returns {string}
     */
    _strPadLeft: function (str, count, repeat) {

        str = String(str);

        if (str.length >= count) {
            return str;
        }

        repeat = repeat ? repeat : '0';

        return (repeat.repeat(count) + str).slice(-(count));
    }
}