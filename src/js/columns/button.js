
import Utils from "../utils";
import Tpl   from "../tpl";
import Column           from "../abstract/Column";


class ColumnButton extends Column {

    /**
     * Инициализация
     * @param {Table} table
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

        if ( ! Utils.isObject(content)) {
            return '';
        }


        if ( ! Utils.isObject(content.attr)) {
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
            Utils.render(Tpl['columns/button.html'], {
                content: content.content,
                attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            })
        );


        if (content.hasOwnProperty('onClick')) {
            let that = this;

            let prop = {
                table: that._table,
                record: record,
            };

            if (typeof content.onClick === 'function') {
                btn.click(function (event) {
                    event.cancelBubble = true;
                    event.preventDefault();

                    prop.event = event;

                    content.onClick(prop);
                });

            } else if (typeof content.onClick === 'string') {
                let func = new Function('prop', content.onClick);

                btn.click(function (event) {
                    event.cancelBubble = true;
                    event.preventDefault();

                    prop.event = event;

                    func(prop);
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

export default ColumnButton;