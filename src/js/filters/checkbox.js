
import Tpl    from "../tpl";
import Utils  from "../utils";
import Filter from "../abstract/Filter";


class FilterCheckbox extends Filter {

    _class = 'btn btn-outline-secondary';

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'checkbox',
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
     * @param {Array|string|number|null} value
     */
    setValue (value) {

        if (['string', 'number', 'object'].indexOf(typeof value) < 0) {
            return;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                let items = [];

                value.map(function (item) {
                    if (['string', 'number'].indexOf(typeof item) >= 0) {
                        items.push(item)
                    }
                });

                this._value = items;

            } else {
                this._value = null;
            }

        } else {
            this._value = [ value ];
        }


        if (this._control) {
            $('input:checked', this._control).prop('checked', false);

            if (Array.isArray(this._value)) {
                let control = this._control;

                this._value.map(function (value) {
                    $('input[value="' + value + '"]', control).prop('checked', true);
                })
            }
        }
    }


    /**
     * Получение значения
     * @returns {Array|null}
     */
    getValue() {

        if (this._control) {
            let inputs = $('input:checked', this._control);
            let items  = [];

            $.each(inputs, function (key, input) {
                let value = $(input).attr('value');

                if (['string', 'number'].indexOf(typeof value) >= 0 &&
                    value !== ''
                ) {
                    items.push(value);
                }
            });

            return items.length > 0 ? items : null;

        } else {
            return this._value;
        }
    }


    /**
     * Фильтрация данных
     * @returns {string} fieldValue
     * @returns {Array}  searchValue
     * @returns {boolean}
     */
    filter(fieldValue, searchValue) {

        if (['string', 'number'].indexOf(typeof fieldValue) < 0 ||
            ! Array.isArray(searchValue)
        ) {
            return false;
        }

        return searchValue.indexOf(fieldValue) >= 0;
    }


    /**
     * Формирование контента
     * @returns {string}
     */
    render() {

        let that    = this;
        let options = this.getOptions();
        let field   = typeof options.field === 'string' ? options.field : '';
        let items   = [];
        let label   = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';

        $.each(options.options, function (key, option) {
            if ( ! Utils.isObject(option) ||
                ! option.hasOwnProperty('value') ||
                ['string', 'numeric'].indexOf(typeof option.value) === -1
            ) {
                return;
            }

            let checked = Array.isArray(that._value) ? that._value.indexOf(option.value) >= 0 : false;
            let text    = option.hasOwnProperty('text')
                ? option.text
                : option.value;

            items.push({
                text:    text,
                value:   option.value,
                class:   option.hasOwnProperty('class') && typeof option.class === 'string' ? option.class : that._class,
                checked: checked,
            });
        });

        this._control = $(Utils.render(Tpl['filters/checkbox.html'], {
            label: label,
            items: items,
            field: field + this.getId(),
            lang: this._table.getLang()
        }));

        $('input', this._control).change(function(e) {
            that._table.searchRecords();
        });

        return this._control;
    }
}

export default FilterCheckbox;