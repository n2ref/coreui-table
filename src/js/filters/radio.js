
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

let FilterRadio = {

    _id: null,
    _table: null,
    _value: null,
    _class: 'btn btn-outline-secondary',
    _render: false,
    _options: {
        id: null,
        type: 'radio',
        field: null,
        label: null,
        value: null,
        options: [],
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        this._options = $.extend(true, {}, this._options, options);
        this._table   = table;
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();

        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {
        return $.extend(true, {}, this._options);
    },


    /**
     * Получение id
     * @returns {string}
     */
    getId: function () {
        return this._id;
    },


    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue: function (value) {

        if (value !== null &&
            typeof value !== 'string' &&
            typeof value !== 'number'
        ) {
            return;
        }

        this._value = value;


        if (this._render) {
            let control = coreuiTableElements.getControl(this._table.getId(), this._id);

            if (control[0]) {
                $('input', control).prop('checked', false);

                if (this._value !== null) {
                    $('input[value="' + this._value + '"]', control).prop('checked', true);
                }
            }
        }
    },


    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let input   = $('input:checked', control);

        if (input[0]) {
            let value = input.val();

            return value === ''
                ? null
                : value

        } else {
            return this._value;
        }
    },


    /**
     * Получение типа поискового алгоритма
     */
    getAlgorithm: function () {
        return 'strict';
    },


    /**
     * Инициализация событий
     */
    initEvents: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let that    = this;

        $('input', control).change(function(e) {
            that._table.searchRecords();
        });
    },


    /**
     * Формирование контента
     * @returns {string}
     */
    render: function() {

        this._render = true;

        let that    = this;
        let options = this.getOptions();
        let field   = typeof options.field === 'string' ? options.field : '';
        let items   = [];
        let label   = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';

        $.each(options.options, function (key, option) {
            if ( ! coreuiTableUtils.isObject(option) ||
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

        return coreuiTableUtils.render(coreuiTableTpl['filters/radio.html'], {
            label: label,
            items: items,
            field: field + this.getId(),
            lang: this._table.getLang()
        });
    }
}

export default FilterRadio;