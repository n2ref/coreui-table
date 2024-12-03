
import coreuiTableUtils from "../coreui.table.utils";

let ColumnsHtml = {

    _table: null,
    _options: {
        type: 'html',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null,
        noWrap: null,
        noWrapToggle: null,
        attr: {},
        attrHeader: {},
        render: null
    },


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend({}, this._options, options);

        let tableOptions = this._table.getOptions();

        if (this._options.noWrap ||
            (this._options.noWrap === null && tableOptions.noWrap)
        ) {
            if ( ! this._options.attr) {
                this._options.attr = { class : 'coreui_table__no-wrap' };

            } else {
                this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
                    class: 'coreui_table__no-wrap'
                });
            }

            this._options.noWrap = true;

            if (this._options.noWrapToggle ||
                (this._options.noWrapToggle === null && tableOptions.noWrapToggle)
            ) {
                this._options.noWrapToggle = true;
            }
        }
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
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function (columnValue) {

        if (['string', 'number'].indexOf(typeof columnValue) >= 0) {
            return String(columnValue).replace(/<[^>]*>?/gm, '');

        } else {
            return '';
        }
    },


    /**
     * Формирование контента
     * @param {string|HTMLElement|jQuery} content
     * @param {object}                    record
     * @returns {string}
     */
    render: function(content, record) {

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0 &&
            ! (content instanceof HTMLElement) &&
            ! (window.hasOwnProperty('jQuery') && content instanceof jQuery)
        ) {
            return '';
        }

        if (this._options.noWrap) {
            content = $('<div></div>').append(content);

            if (this._options.noWrapToggle) {
                content = $(content).after('<i class="bi bi-caret-down-fill toggle"></i>')
            }
        }

        return content;
    }
}

export default ColumnsHtml;