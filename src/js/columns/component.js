import Utils  from "../utils";
import Render from "../render";
import Column from "../abstract/Column";

class ColumnComponent extends Column {

    /**
     * Инициализация
     * @param {Table} table
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

        if ( ! Utils.isObject(content) ||
             ! content.hasOwnProperty('component') ||
             typeof content.component !== 'string' ||
             ! content.component
        ) {
            return '';
        }

        return Render.renderComponents(this._table, content, 'records_show');
    }
}


export default ColumnComponent;