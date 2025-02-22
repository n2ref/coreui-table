import Control from "../abstract/Control";

class ControlCustom extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'custom',
            content: null
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string|HTMLElement|jQuery}
     */
    render() {

        if (typeof this._options.content === 'string') {
            return this._options.content;

        } else if (typeof this._options.content === 'function') {
            let prop = {
                table: this._options.table,
            };

            return this._options.content(prop);
        }
    }
}


export default ControlCustom;