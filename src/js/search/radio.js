
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from "../coreui.table.utils";
import Search           from "../abstract/Search";

class SearchRadio extends Search {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'radio',
            field: null,
            label: null,
            value: null,
            options: [],
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {string} value
     */
    setValue(value) {

        if (value !== null &&
            typeof value !== 'string' &&
            typeof value !== 'number'
        ) {
            return;
        }

        this._value = value;


        if (this._control) {
            $('input',  this._control).prop('checked', false);

            if (this._value !== null) {
                $('input[value="' + this._value + '"]',  this._control).prop('checked', true);
            } else {
                $('input.coreui-table__all',  this._control).prop('checked', true);
            }
        }
    }


    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue() {

        if (this._control) {
            let input = $('input:checked', this._control);

            if (input && input[0]) {
                let value = input.val();

                return value === ''
                    ? null
                    : value

            } else {
                return null;
            }

        } else {
            return this._value;
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

        return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
    }


    /**
     * Формирование контента
     * @returns {jQuery}
     */
    render() {

        let that       = this;
        let checkedAll = true;
        let options    = [];

        $.each(this._options.options, function (key, option) {

            if (['string', 'numeric'].indexOf(typeof option) >= 0) {
                let checked = key == that._value;

                if (checked) {
                    checkedAll = false;
                }

                options.push({
                    text:    option,
                    value:   key,
                    checked: checked,
                });

            } else {
                if ( ! coreuiTableUtils.isObject(option) ||
                    ! option.hasOwnProperty('value') ||
                    ['string', 'numeric'].indexOf(typeof option.value) === -1
                ) {
                    return;
                }

                let checked = option.value == that._value;
                let text    = option.hasOwnProperty('text')
                    ? option.text
                    : option.value;

                if (checked) {
                    checkedAll = false;
                }

                options.push({
                    text:    text,
                    value:   option.value,
                    checked: checked,
                });
            }
        });

        this._control = $(coreuiTableUtils.render(coreuiTableTpl['search/radio.html'], {
            options: options,
            checkedAll: checkedAll,
            field: coreuiTableUtils.hashCode(),
            lang: this._table.getLang()
        }));

        return this._control;
    }
}

export default SearchRadio;