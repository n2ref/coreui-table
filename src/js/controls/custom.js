import Control from "../abstract/Control";

class ControlCustom extends Control {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
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
            return this._options.content();
        }
    }
}


export default ControlCustom;