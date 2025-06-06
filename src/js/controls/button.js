
import Tpl     from '../tpl';
import Utils   from '../utils';
import Control from "../abstract/Control";

class ControlButton extends Control {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'button',
            content: null,
            onClick: null,
            attr: {
                class: 'btn btn-secondary'
            }
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    render() {

        let attributes = [];

        if (Utils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let btn = $(Utils.render(Tpl['controls/button.html'], {
            content: this._options.content,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        }));


        if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
            let that = this;

            btn.click(function (event) {
                let prop = {
                    table: that._table,
                    control: that,
                    event: event,
                };

                if (typeof that._options.onClick === 'function') {
                    that._options.onClick(prop);

                } else if (typeof that._options.onClick === 'string') {
                    let func = new Function('prop', that._options.onClick);
                    func(prop);
                }
            });
        }

        return btn;
    }
}

export default ControlButton;