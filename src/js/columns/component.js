import coreuiTable      from "../coreui.table";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTablePrivate from "../coreui.table.private";
import coreuiTableRender from "../coreui.table.render";

coreuiTable.columns.component = {

    _table: null,
    _options: {
        type: 'component',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null,
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
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render: function(content, record) {

        if ( ! coreuiTableUtils.isObject(content) ||
             ! content.hasOwnProperty('component') ||
             typeof content.component !== 'string' ||
             ! content.component
        ) {
            return '';
        }

        return coreuiTableRender.renderComponents(this._table, content, 'records_show');
    }
}