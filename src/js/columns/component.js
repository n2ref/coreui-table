import TableUtils  from "../table.utils";
import TableRender from "../table.render";
import Column            from "../abstract/Column";

class ColumnsComponent extends Column {

    /**
     * Инициализация
     * @param {TableInstance} table
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

        if ( ! TableUtils.isObject(content) ||
             ! content.hasOwnProperty('component') ||
             typeof content.component !== 'string' ||
             ! content.component
        ) {
            return '';
        }

        return TableRender.renderComponents(this._table, content, 'records_show');
    }
}


export default ColumnsComponent;