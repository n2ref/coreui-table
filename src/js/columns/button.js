
import TableUtils from "../table.utils";
import TableTpl   from "../table.tpl";
import Column           from "../abstract/Column";


class ColumnsButton extends Column {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'button',
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
     * @param {object} content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {

        if ( ! TableUtils.isObject(content)) {
            return '';
        }


        if ( ! TableUtils.isObject(content.attr)) {
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
            TableUtils.render(TableTpl['columns/button.html'], {
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

export default ColumnsButton;