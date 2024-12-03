
import coreuiTableUtils from '../coreui.table.utils';

let ControlCustom = {

    _id: null,
    _table: null,
    _options: {
        id: null,
        type: 'custom',
        content: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {
        return this._id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string|HTMLElement|jQuery}
     */
    render: function() {

        if (typeof this._options.content === 'string') {
            return this._options.content;

        } else if (typeof this._options.content === 'function') {
            return this._options.content();
        }
    }
}


export default ControlCustom;