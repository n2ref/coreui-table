
import TableTpl      from "../table.tpl";
import TableUtils    from "../table.utils";
import TableElements from "../table.elements";
import Filter              from "../abstract/Filter";

class FilterRadio extends Filter {

    _class = 'btn btn-outline-secondary';

    /**
     * Инициализация
     * @param {TableInstance} table
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
     * @param {string|number|null} value
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
            $('input', this._control).prop('checked', false);

            if (this._value !== null) {
                $('input[value="' + this._value + '"]', this._control).prop('checked', true);
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
            }

            return null;

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
     * @returns {string}
     */
    render() {

        let that    = this;
        let table   = this._table;
        let options = this.getOptions();
        let field   = typeof options.field === 'string' ? options.field : '';
        let items   = [];
        let label   = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';

        $.each(options.options, function (key, option) {
            if ( ! TableUtils.isObject(option) ||
                ! option.hasOwnProperty('value') ||
                ['string', 'numeric'].indexOf(typeof option.value) === -1
            ) {
                return;
            }

            let text = option.hasOwnProperty('text')
                ? option.text
                : option.value;

            items.push({
                text:    text,
                value:   option.value,
                class:   option.hasOwnProperty('class') && typeof option.class === 'string' ? option.class : that._class,
                checked: option.value == that._value,
            });
        });

        this._control = $(TableUtils.render(TableTpl['filters/radio.html'], {
            label: label,
            items: items,
            field: field + this.getId(),
            lang: this._table.getLang()
        }));


        $('input', this._control).change(function(e) {
            table.searchRecords();
        });

        return this._control;
    }
}

export default FilterRadio;