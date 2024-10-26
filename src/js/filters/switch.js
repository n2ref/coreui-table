
import coreuiTable      from "../coreui.table";
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.filters.switch = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'switch',
        field: null,
        label: null,
        value: null,
        valueY: 1
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

        this._value = value


        if (this._render) {
            let control = coreuiTableElements.getControl(this._table.getId(), this._id);

            if (control[0]) {
                let valueY = typeof this._options.valueY === 'string' || typeof this._options.valueY === 'number'
                    ? this._options.valueY
                    : ''

                if (this._value === null) {
                    $('input', control).prop('checked', false);

                } else if (this._value === valueY) {
                    $('input', control).prop('checked', true);

                } else {
                    $('input', control).prop('checked', false);
                }
            }
        }
    },


    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let input   = $('input:checked', control);

        return input[0] ? input.val() : this._value;
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

        let options = this.getOptions();
        let valueY  = typeof options.valueY === 'string' || typeof options.valueY === 'number'
            ? options.valueY
            : ''
        let label   = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';


        return coreuiTableUtils.render(coreuiTableTpl['filters/switch.html'], {
            id: this._id,
            valueY: valueY,
            field: typeof options.field === 'string' ? options.field : '',
            checked: this._value == valueY,
            label: label,
        });
    }
}