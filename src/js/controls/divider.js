
import Tpl   from "../tpl";
import Utils from '../utils';
import Control          from "../abstract/Control";

class ControlDivider extends Control {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'divider',
            width: 40,
            text: '',
            attr: {
                class: 'd-inline-block text-body-tertiary text-center',
                style: 'height:20px'
            }
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render() {

        let attributes = [];

        this._options.attr = Utils.mergeAttr(this._options.attr, { style: 'width:' + this._options.width + 'px' });

        $.each(this._options.attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });

        return Utils.render(Tpl['controls/divider.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            text: typeof this._options.text === 'string' && this._options.text !== '' ? this._options.text : '',
        });
    }
}

export default ControlDivider;