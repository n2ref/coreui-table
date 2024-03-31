
import coreuiTable         from "../coreui.table";
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.search.radio = {

    _id: null,
    _table: null,
    _value: null,
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
     * @param {string} value
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
            let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);

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

        let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
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
     * @returns {object}
     */
    initEvents: function () {

    },


    /**
     * Формирование контента
     * @returns {string}
     */
    render: function() {

        this._render = true;

        let that       = this;
        let checkedAll = true;
        let options    = [];

        $.each(this._options.options, function (key, option) {
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
        });

        return ejs.render(coreuiTableTpl['search/radio.html'], {
            options: options,
            checkedAll: checkedAll,
            field: typeof this._options.field === 'string' ? this._options.field : '',
            lang: this._table.getLang()
        });
    }
}