
import Tpl      from "../tpl";
import Utils    from '../utils';
import Elements from "../elements";
import Control             from "../abstract/Control";

class ControlTotal extends Control {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        let optionsOriginal = {
            type: 'total',
            attr: {
                class: 'px-1'
            }
        };

        if (options.hasOwnProperty('attr') && Utils.isObject(options.attr)) {
            options.attr = Utils.mergeAttr(optionsOriginal.attr, options.attr);
        }

        options = $.extend(true, optionsOriginal, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render() {

        let attributes = [];
        let table      = this._table;

        if (Utils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let control = $(Utils.render(Tpl['controls/total.html'], {
            recordsTotal: table._recordsTotal,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: table.getLang(),
        }));

        table.on('records_show', function () {
            control.find('.coreui-table__count-total').text(table._recordsTotal);
        });

        return control;
    }
}

export default ControlTotal;