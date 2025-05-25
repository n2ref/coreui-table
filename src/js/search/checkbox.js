
import Tpl   from "../tpl";
import Utils from "../utils";
import Search     from "../abstract/Search";

class SearchCheckbox extends Search {

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
            options: []
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {Array|null} value
     */
    setValue(value) {

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
                $.each(this._value, function (key, value) {
                    $('input[value="' + value + '"]', this._control).prop('checked', true);
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
        let options = [];

        $.each(this._options.options, function (key, option) {

            if (['string', 'numeric'].indexOf(typeof option) >= 0) {
                let checked = Array.isArray(that._value) ? that._value.indexOf(key) >= 0 : false;

                options.push({
                    text:    option,
                    value:   key,
                    checked: checked,
                });

            } else {
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

                options.push({
                    text:    text,
                    value:   option.value,
                    checked: checked,
                });
            }
        });

        this._control = $(Utils.render(Tpl['search/checkbox.html'], {
            options: options,
        }));

        return this._control;
    }
}

export default SearchCheckbox;