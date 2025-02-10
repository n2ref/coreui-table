
import TableUtils from '../table.utils';
import TableTpl   from "../table.tpl";
import Control          from "../abstract/Control";


class ControlPageJump extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        let optionsOriginal = {
            id: null,
            type: 'page_jump',
            attr: {
                class: 'input-group'
            },
        };

        if (options.hasOwnProperty('attr') && TableUtils.isObject(options.attr)) {
            options.attr = TableUtils.mergeAttr(optionsOriginal.attr, options.attr);
        }

        options = $.extend(true, optionsOriginal, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
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

        let control = $(TableUtils.render(TableTpl['controls/page-jump.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : ''
        }));

        let input   = $('input', control);
        let button  = $('button', control);

        button.click(function () {
            table.goPage(input.val());
        });

        input.keyup(function (event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                table.goPage(input.val());
            }
        });

        return control;
    }
}

export default ControlPageJump;