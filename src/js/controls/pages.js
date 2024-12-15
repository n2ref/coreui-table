
import coreuiTableUtils from '../coreui.table.utils';
import Control          from "../abstract/Control";
import controlPages     from "./pages/control";

class ControlPages extends Control {

    _control = null;


    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        let optionsOriginal = {
            show: {
                prev: true,
                next: true,
            },
            count: 3,
            attr: {
                class: 'pagination mb-0'
            }
        };

        if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
            options.attr = coreuiTableUtils.mergeAttr(optionsOriginal.attr, options.attr);
        }

        options = $.extend(true, optionsOriginal, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    render() {

        let table   = this._table;
        let options = this._options;
        let control = controlPages.render(table, options);

        table.on('records_show', function () {
            let controlUpdate = controlPages.render(table, options);

            control.replaceWith(controlUpdate);

            control = controlUpdate;
        });

        this._control = control;

        return control;
    }
}

export default ControlPages;