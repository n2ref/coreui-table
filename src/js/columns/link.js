
import TableUtils from "../table.utils";
import TableTpl   from "../table.tpl";
import Column           from "../abstract/Column";

class ColumnsLink extends Column {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'link',
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

        if (['string', 'number'].indexOf(typeof columnValue) >= 0) {
            return String(columnValue);

        } else if (typeof columnValue === 'object' &&
            columnValue.hasOwnProperty('content') &&
            typeof columnValue.content === 'string'
        ) {
            return columnValue.content;

        } else {
            return '';
        }
    }


    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render(content, record) {

        if (
            (typeof content !== 'string' || ! content)
            &&
            ( ! TableUtils.isObject(content) ||
              ! content.hasOwnProperty('url') ||
              typeof content.url !== 'string' ||
              ! content.url
            )
        ) {
            return '';
        }

        let linkContent = '';
        let attr        = {};

        if (typeof content === 'string') {
            attr.href   = content;
            linkContent = content;

        } else {
            if (content.hasOwnProperty('attr') &&
                TableUtils.isObject(content.attr)
            ) {
                attr = content.attr;
            }

            if (attr.hasOwnProperty('href')) {
                delete attr.href;
            }

            attr.href = content.url;


            if (content.hasOwnProperty('content') &&
                typeof content.content === 'string' &&
                content.content
            ) {
                linkContent = content.content;

            } else {
                linkContent = content.url;
            }
        }


        let attributes = [];

        $.each(attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });

        let link = $(
            TableUtils.render(TableTpl['columns/link.html'], {
                content: linkContent,
                attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            })
        );


        link.click(function (event) {
            event.cancelBubble = true;
            event.preventDefault();
        });

        return link;
    }
}


export default ColumnsLink;