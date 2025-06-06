import Utils from "../utils";

class Search {

    _id      = null;
    _table   = null;
    _value   = null;
    _control = null;
    _options = {
        id: '',
        type: '',
        field: null,
        label: null
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
            : Utils.hashCode();
    }


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions() {
        return $.extend(true, {}, this._options);
    }


    /**
     * Получение id
     * @returns {string}
     */
    getId() {
        return this._id;
    }


    /**
     * Установка значения
     * @param {string} value
     */
    setValue(value) {}


    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue () {}


    /**
     * Получение название поля
     * @returns {string|null}
     */
    getField () {

        return this._options.field;
    }


    /**
     * Фильтрация данных
     * @returns {string} fieldValue
     * @returns {string} searchValue
     * @returns {boolean}
     */
    filter(fieldValue, searchValue) {

        if (['string', 'number'].indexOf(typeof fieldValue) < 0 ||
            ['string', 'number'].indexOf(typeof searchValue) < 0
        ) {
            return false;
        }

        return fieldValue.toString().toLowerCase().indexOf(
            searchValue.toString().toLowerCase()
        ) >= 0;
    }


    /**
     * Формирование контента
     * @returns {jQuery|string}
     */
    render () {}
}


export default Search;