
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

let SearchDatetime = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'datetime',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
            class: "form-control d-inline-block",
        }
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

        if (typeof value !== 'string' && value !== null) {
            return;
        }

        if (value &&
            (
                value.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null ||
                isNaN(new Date(value))
            )
        ) {
            return;
        }

        this._value = value;


        if (this._render) {
            let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);

            if (control[0]) {
                $('input', control).val(
                    this._value === null ? '' : this._value
                );
            }
        }
    },


    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function () {

        let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        let input   = $('input', control);

        if (input[0]) {
            let value = input.val();

            if (typeof value === 'string' && value !== '') {
                return value;
            }
        }

        return this._value;
    },


    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function () {

        let container = coreuiTableElements.getSearchContainer(this._table.getId());
        let control   = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        let that      = this;

        $('input', control).keyup(function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                that._table.searchRecords();
                container.fadeOut('fast');
            }
        });
    },


    /**
     * Формирование контента
     * @returns {string}
     */
    render: function() {

        this._render = true;

        if ( ! coreuiTableUtils.isObject(this._options.attr)) {
            this._options.attr = {};
        }

        if (this._options.hasOwnProperty('width') &&
            coreuiTableUtils.isNumeric(this._options.width)
        ) {
            if (this._options.attr.hasOwnProperty('style')) {
                this._options.attr['style'] += ';width:' + this._options.width + 'px';
            } else {
                this._options.attr['style'] = 'width:' + this._options.width + 'px';
            }
        }

        this._options.attr['name']  = typeof this._options.field === 'string' ? this._options.field : '';
        this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number'
            ? this._value
            : '';

        if (this._options.attr.hasOwnProperty('type')) {
            delete this._options.attr.type;
        }

        let attributes = [];

        $.each(this._options.attr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });

        return coreuiTableUtils.render(coreuiTableTpl['search/datetime.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}

export default SearchDatetime;