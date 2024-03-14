
import '../../../node_modules/ejs/ejs.min';
import coreuiTable         from "../coreui.table";
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.filters.text = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'text',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
            class: "form-control",
        },
        btn: {
            attr: { class: "btn btn-outline-secondary border-secondary-subtle" },
            content: '<i class="bi bi-search"></i>'
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
                $('input', control).val(
                    this._value === null ? '' : this._value
                );
            }
        }
    },


    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let input   = $('input', control);

        if (input[0]) {
            let value = input.val();

            if (typeof value === 'string' && value !== '') {
                return value;
            }
        }

        return null;
    },


    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let that    = this;

        $('input', control).keyup(function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                that._table.searchRecords();
            }
        });

        $('button', control).click(function(e) {
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
        let label   = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';

        if ( ! coreuiTableUtils.isObject(options.attr)) {
            options.attr = {};
        }

        if (options.hasOwnProperty('width') &&
            coreuiTableUtils.isNumeric(options.width)
        ) {
            if (options.attr.hasOwnProperty('style')) {
                options.attr['style'] += ';width:' + options.width + 'px';
            } else {
                options.attr['style'] = 'width:' + options.width + 'px';
            }
        }

        options.attr['name']  = typeof options.field === 'string' ? options.field : '';
        options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number'
            ? this._value
            : '';

        if (options.attr.hasOwnProperty('type')) {
            delete options.attr.type;
        }



        if ( ! coreuiTableUtils.isObject(options.btn)) {
            options.btn = {};
        }
        if ( ! coreuiTableUtils.isObject(options.btn.attr)) {
            options.btn.attr = {};
        }

        if (options.btn.attr.hasOwnProperty('type')) {
            delete options.btn.attr.type;
        }


        let attr    = [];
        let attrBtn = [];

        $.each(options.attr, function (name, value) {
            attr.push(name + '="' + value + '"');
        });
        $.each(options.btn.attr, function (name, value) {
            attrBtn.push(name + '="' + value + '"');
        });

        return ejs.render(coreuiTableTpl['filters/text.html'], {
            attr: attr.length > 0 ? (' ' + attr.join(' ')) : '',
            label: label,
            btnAttr: attrBtn.length > 0 ? (' ' + attrBtn.join(' ')) : '',
            btnContent: options.btn.content ? options.btn.content : '',
        });
    }
}