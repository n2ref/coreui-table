
import Utils from "../utils";
import Column           from "../abstract/Column";


class ColumnHtml extends Column {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
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
        }, options);

        super(table, options);

        let tableOptions = this._table.getOptions();

        if (this._options.noWrap ||
            (this._options.noWrap === null && tableOptions.noWrap)
        ) {
            if ( ! this._options.attr) {
                this._options.attr = { class : 'coreui_table__no-wrap' };

            } else {
                this._options.attr = Utils.mergeAttr(this._options.attr, {
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
    }


    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString(columnValue) {

        if (['string', 'number'].indexOf(typeof columnValue) >= 0) {
            return String(columnValue).replace(/<[^>]*>?/gm, '');

        } else {
            return '';
        }
    }


    /**
     * Формирование контента
     * @param {string|HTMLElement|jQuery} content
     * @param {object}                    record
     * @returns {string}
     */
    render(content, record) {

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


export default ColumnHtml;