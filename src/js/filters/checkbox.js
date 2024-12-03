
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

let FilterCheckbox = {

    _id: null,
    _table: null,
    _value: null,
    _class: 'btn btn-outline-secondary',
    _render: false,
    _options: {
        id: null,
        type: 'checkbox',
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
     * @param {Array|string|number|null} value
     */
    setValue: function (value) {

        if (['string', 'number', 'object'].indexOf(typeof value) < 0) {
            return;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                let items = [];

                $.each(value, function (key, item) {
                    if (typeof value !== 'string' && typeof value !== 'number') {
                        return;
                    }

                    items.push(item);
                });

                this._value = items;

            } else {
                this._value = null;
            }

        } else {
            this._value = [ value ];
        }


        if (this._render) {
            let control = coreuiTableElements.getControl(this._table.getId(), this._id);

            if (control[0]) {
                $('input:checked', control).prop('checked', false);

                if (Array.isArray(this._value)) {
                    $.each(this._value, function (key, value) {
                        $('input[value="' + value + '"]', control).prop('checked', true);
                    })
                }
            }
        }
    },


    /**
     * Получение значения
     * @returns {Array|null}
     */
    getValue: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);

        if (control[0]) {
            let inputs = $('input:checked', control);
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

        return coreuiTableUtils.render(coreuiTableTpl['filters/checkbox.html'], {
            label: label,
            items: items,
            field: field + this.getId(),
            lang: this._table.getLang()
        });
    }
}

export default FilterCheckbox;