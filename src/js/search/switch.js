
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from "../coreui.table.utils";
import Search           from "../abstract/Search";

class SearchSwitch extends Search {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'switch',
            field: null,
            value: null,
            valueY: 1
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue(value) {

        if (value !== null &&
            typeof value !== 'string' &&
            typeof value !== 'number'
        ) {
            return;
        }

        this._value = value


        if (this._control) {
            let valueY = typeof this._options.valueY === 'string' || typeof this._options.valueY === 'number'
                ? this._options.valueY
                : ''

            if (this._value === null) {
                $('input', this._control).prop('checked', false);

            } else if (this._value === valueY) {
                $('input', this._control).prop('checked', true);

            } else {
                $('input', this._control).prop('checked', false);
            }
        }
    }


    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue() {

        if (this._control) {
            let value = $('input:checked', this._control).val();

            return typeof value !== 'string' || value === ''
                ? null
                : value;
        }

        return this._value;
    }


    /**
     * Фильтрация данных
     * @returns {string}              fieldValue
     * @returns {Array|string|number} searchValue
     * @returns {boolean}
     */
    filter(fieldValue, searchValue) {

        if (['string', 'number'].indexOf(typeof fieldValue) < 0 ||
            ['string', 'number'].indexOf(typeof searchValue) < 0
        ) {
            return false;
        }

        return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
    }


    /**
     * Формирование контента
     * @returns {string}
     */
    render() {

        let options = this.getOptions();
        let valueY  = typeof options.valueY === 'string' || typeof options.valueY === 'number'
            ? options.valueY
            : ''

        this._control = $(coreuiTableUtils.render(coreuiTableTpl['search/switch.html'], {
            id: this._id,
            valueY: valueY,
            field: typeof options.field === 'string' ? options.field : '',
            checked: this._value == valueY,
        }));

        return this._control;
    }
}

export default SearchSwitch;