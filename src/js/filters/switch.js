
import Tpl   from "../tpl";
import Utils from "../utils";
import Filter           from "../abstract/Filter";

class FilterSwitch extends Filter {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'switch',
            field: null,
            label: null,
            value: null,
            valueY: 1
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
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

        return fieldValue.toString() === searchValue.toString();
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
     * @returns {string}
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
     * Формирование контента
     * @returns {string}
     */
    render() {

        let table   = this._table;
        let options = this.getOptions();
        let valueY  = typeof options.valueY === 'string' || typeof options.valueY === 'number'
            ? options.valueY
            : ''
        let label = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';


        this._control = $(Utils.render(Tpl['filters/switch.html'], {
            id: this._id,
            valueY: valueY,
            field: typeof options.field === 'string' ? options.field : '',
            checked: this._value == valueY,
            label: label,
        }));


        $('input', this._control).change(function(e) {
            table.searchRecords();
        });

        return this._control;
    }
}

export default FilterSwitch;