
import Utils from "../utils";
import Column           from "../abstract/Column";

class ColumnMoney extends Column {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'money',
            field: null,
            label: null,
            show: true,
            width: null,
            minWidth: null,
            maxWidth: null,
            noWrap: null,
            noWrapToggle: null,
            currency: null,
            attr: {
                class: 'text-end'
            },
            attrHeader: {
                class: 'text-end'
            },
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

        let content = '';

        if (['string', 'number'].indexOf(typeof columnValue) >= 0) {
            if (isNaN(content)) {
                content = content.toString()
                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

            } else {
                content = Number(content).toFixed(2).toString();
                content = content.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }
        }

        return content;
    }


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {

        if (['string', 'bigint', 'symbol', 'number'].indexOf(typeof content) < 0) {
            return '';
        }


        if (isNaN(content)) {
            content = content.toString()
                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

        } else {
            content = Number(content).toFixed(2).toString();
            content = content.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }

        if (this._options.currency &&
            ['string', 'number'].indexOf(typeof this._options.currency) >= 0
        ) {
            content += ' <small class="text-muted">' + this._options.currency + '</small>';
        }


        if (this._options.noWrap) {
            content = '<div>' + content + '</div>'

            if (this._options.noWrapToggle) {
                content += '<i class="bi bi-caret-down-fill toggle"></i>'
            }
        }

        return content;
    }
}


export default ColumnMoney;