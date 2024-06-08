import coreuiTable      from "../coreui.table";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";

coreuiTable.columns.button = {

    _table: null,
    _options: {
        type: 'button',
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
     * @param {object} content
     * @param {object} record
     * @returns {string}
     */
    render: function(content, record) {

        if ( ! coreuiTableUtils.isObject(content)) {
            return '';
        }


        if ( ! coreuiTableUtils.isObject(content.attr)) {
            content.attr = {}
        }

        if ( ! content.attr.hasOwnProperty('class')) {
            content.attr.class = 'btn btn-outline-secondary'
        }

        if (content.attr.hasOwnProperty('type')) {
            delete content.attr.type;
        }


        let attributes = [];

        $.each(content.attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });

        let btn = $(
            coreuiTableUtils.render(coreuiTableTpl['columns/button.html'], {
                content: content.content,
                attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            })
        );


        if (content.hasOwnProperty('onClick')) {
            let that = this;

            if (typeof content.onClick === 'function') {
                btn.click(function (event) {
                    event.cancelBubble = true;
                    event.preventDefault();

                    content.onClick(record, that._table)
                });

            } else if (typeof content.onClick === 'string') {
                let func = new Function('record', 'table', content.onClick);

                btn.click(function (event) {
                    event.cancelBubble = true;
                    event.preventDefault();

                    func(record, that._table);
                });

            } else {
                btn.click(function (event) {
                    event.cancelBubble = true;
                    event.preventDefault();
                });
            }

        } else {
            btn.click(function (event) {
                event.cancelBubble = true;
                event.preventDefault();
            });
        }

        return btn;
    }
}