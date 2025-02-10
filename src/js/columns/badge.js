import TableUtils from "../table.utils";
import TableTpl   from "../table.tpl";
import Column           from "../abstract/Column";

class ColumnsBadge extends Column {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'badge',
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
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString(columnValue) {

        if (typeof columnValue === 'string') {
            return columnValue;

        } else if (typeof columnValue === 'number') {
            return String(columnValue);

        } else if (typeof columnValue === 'object' &&
            columnValue.hasOwnProperty('text') &&
            ['string', 'number'].indexOf(typeof columnValue.text) >= 0
        ) {
            return String(columnValue.text);

        } else {
            return '';
        }
    }


    /**
     * Формирование контента
     * @param {object|string|number} content
     * @param {object}               record
     * @returns {string}
     */
    render(content, record) {

        if (['string', 'number'].indexOf(typeof content) >= 0) {
            content = { type: 'secondary', text: content };

        } else if ( ! TableUtils.isObject(content) ||
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

        return TableUtils.render(TableTpl['columns/badge.html'], {
            type: content.type,
            text: content.text
        });
    }
}

export default ColumnsBadge;