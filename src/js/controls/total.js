
import TableTpl      from "../table.tpl";
import TableUtils    from '../table.utils';
import TableElements from "../table.elements";
import Control             from "../abstract/Control";

class ControlTotal extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        let optionsOriginal = {
            type: 'total',
            attr: {
                class: 'px-1'
            }
        };

        if (options.hasOwnProperty('attr') && TableUtils.isObject(options.attr)) {
            options.attr = TableUtils.mergeAttr(optionsOriginal.attr, options.attr);
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

        if (TableUtils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let control = $(TableUtils.render(TableTpl['controls/total.html'], {
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