import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";


class Control {

    _id      = null;
    _table   = null;
    _options = {
        type: '',
        id: ''
    };


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    constructor(table, options) {

        this._table   = table;
        this._options = $.extend(true, this._options, options);
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();
    }


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId() {
        return this._id;
    }


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions() {
        return $.extend(true, {}, this._options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {*}
     */
    render() {
        return '';
    }
}

export default Control;