import coreuiTableUtils  from "../coreui.table.utils";
import coreuiTableRender from "../coreui.table.render";
import Column            from "../abstract/Column";

class ColumnsComponent extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'component',
            field: null,
            label: null,
            show: true,
            width: null,
            minWidth: null,
            maxWidth: null,
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render(content, record) {

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


export default ColumnsComponent;