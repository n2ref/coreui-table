
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";

let ColumnsLink = {

    _table: null,
    _options: {
        type: 'link',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null,
    },


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
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
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function (columnValue) {

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
    },


    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render: function(content, record) {

        if (
            (typeof content !== 'string' || ! content)
            &&
            ( ! coreuiTableUtils.isObject(content) ||
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
                coreuiTableUtils.isObject(content.attr)
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
            coreuiTableUtils.render(coreuiTableTpl['columns/link.html'], {
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