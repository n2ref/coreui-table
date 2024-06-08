import coreuiTable      from "../coreui.table";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";

coreuiTable.columns.badge = {

    _table: null,
    _options: {
        type: 'badge',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null,
    },


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);
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
        return $.extend(true, {}, this._options);
    },


    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function (columnValue) {

        if (['string', 'number'].indexOf(typeof columnValue) >= 0) {
            return String(columnValue);

        } else if (typeof columnValue === 'object' &&
            columnValue.hasOwnProperty('text') &&
            ['string', 'number'].indexOf(typeof columnValue.text) >= 0
        ) {
            return String(columnValue.text);

        } else {
            return '';
        }
    },


    /**
     * Формирование контента
     * @param {object|string|number} content
     * @param {object}               record
     * @returns {string}
     */
    render: function(content, record) {

        if (['string', 'number'].indexOf(typeof content) >= 0) {
            content = { type: 'secondary', text: content };

        } else if ( ! coreuiTableUtils.isObject(content) ||
             ! content.hasOwnProperty('type') ||
             ! content.hasOwnProperty('text') ||
             typeof content.type !== 'string' ||
             typeof content.text !== 'string' ||
             ! content.text
        ) {
            return '';
        }

        if (content.type === '' || content.type === 'none') {
            return content.text;
        }

        return coreuiTableUtils.render(coreuiTableTpl['columns/badge.html'], {
            type: content.type,
            text: content.text
        });
    }
}