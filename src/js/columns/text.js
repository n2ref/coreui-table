import coreuiTable from "../coreui.table";
import coreuiTableUtils from "../coreui.table.utils";

coreuiTable.columns.text = {

    _table: null,
    _options: {
        type: 'text',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null,
        attr: null,
        noWrap: null,
        noWrapToggle: null,
        attrHeader: null,
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
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        if (this._options.noWrap) {
            content = '<div>' + content + '</div>'

            if (this._options.noWrapToggle) {
                content += '<i class="bi bi-caret-down-fill toggle"></i>'
            }
        }

        return content;
    }
}