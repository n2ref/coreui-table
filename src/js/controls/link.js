
import TableTpl   from '../table.tpl';
import TableUtils from '../table.utils';
import Control          from "../abstract/Control";

class ControlLink extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'link',
            url: null,
            content: null,
            onClick: null,
            attr: null
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    render() {

        let that       = this;
        let attributes = [];

        if (typeof this._options.attr === 'object') {
            $.each(this._options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let link = $(TableUtils.render(TableTpl['controls/link.html'], {
            url: this._options.url,
            content: this._options.content,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        }));


        if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {

            link.click(function (event) {
                if (typeof that._options.onClick === 'function') {
                    return that._options.onClick(event, that._table);

                } else if (typeof that._options.onClick === 'string') {
                    let func = new Function('event', 'table', 'control', that._options.onClick);
                    func(event, that._table, that);
                }
            });
        }

        return link;
    }
}


export default ControlLink;