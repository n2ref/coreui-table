
import coreuiTableUtils from "../coreui.table.utils";
import Column           from "../abstract/Column";

class ColumnsNumber extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'number',
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

        content = String(content)
            .replace(/,/g, '.')
            .replace(/[^0-9\-\.]/g, '')
            .replace(/[\s]{2,}/g, ' ')
            .replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, '$1 ')
            .replace(/\- /g, '-');

        if (this._options.noWrap) {
            content = '<div>' + content + '</div>'

            if (this._options.noWrapToggle) {
                content += '<i class="bi bi-caret-down-fill toggle"></i>'
            }
        }

        return content;
    }
}

export default ColumnsNumber;