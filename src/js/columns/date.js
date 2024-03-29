
import coreuiTable from "../coreui.table";

coreuiTable.columns.date = {

    _table: null,
    _options: {
        type: 'date',
        field: null,
        label: null,
        show: true,
        width: null,
        format: 'DD.MM.YYYY',
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

        if (typeof content !== 'string') {
            return '';
        }


        try {
            if (content !== '') {
                let date = new Date(content);

                content = this._options.format
                    .replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4))
                    .replace(/MM/g, this._strPadLeft(date.getMonth() + 1, 2))
                    .replace(/M/g, date.getMonth() + 1)
                    .replace(/DD/g, this._strPadLeft(date.getDate(), 2))
                    .replace(/D/g, date.getDate());
            }

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