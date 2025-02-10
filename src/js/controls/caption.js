
import TableTpl   from '../table.tpl';
import TableUtils from '../table.utils';
import Control          from "../abstract/Control";

class ControlCaption extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'caption',
            title: null,
            description: null,
            value: null,
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render() {

        return TableUtils.render(TableTpl['controls/caption.html'], {
            title: this._options.title,
            description: this._options.description,
            value: this._options.value,
        });
    }
}

export default ControlCaption;