
import '../../../node_modules/ejs/ejs.min';
import coreuiTable      from "../coreui.table";
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.filters.number = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'number',
        field: null,
        label: null,
        value: null,
        width: 90,
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
     * @param {object|null} value
     */
    setValue: function (value) {

        if (value) {
            if ( ! coreuiTableUtils.isObject(value)) {
                return;
            }

            let numberStart = null;
            let numberEnd   = null;

            if (value.hasOwnProperty('start') &&
                (typeof value.start === 'string' || typeof value.start !== 'number') &&
                value.start !== ''
            ) {
                numberStart = value.start;
            }

            if (value.hasOwnProperty('end') &&
                (typeof value.end === 'string' || typeof value.end !== 'number') &&
                value.end !== ''
            ) {
                numberEnd = value.end;
            }

            if (numberStart === null && numberEnd === null) {
                this._value = null;

            } else {
                this._value = {
                    start: numberStart,
                    end:   numberEnd
                };
            }

        } else {
            this._value = null;
        }


        if (this._render) {
            let control = coreuiTableElements.getControl(this._table.getId(), this._id);

            if (control[0]) {
                let inputStart = $('input.number-start', control);
                let inputEnd   = $('input.number-end', control);

                if (this._value === null) {
                    inputStart.val('');
                    inputEnd.val('');

                } else if (coreuiTableUtils.isObject(this._value)) {
                    inputStart.val(typeof this._value.start !== null ? this._value.start : '');
                    inputEnd.val(typeof this._value.end !== null ? this._value.end : '');
                }
            }
        }
    },


    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function () {

        let control    = coreuiTableElements.getControl(this._table.getId(), this._id);
        let inputStart = $('input.number-start', control);
        let inputEnd   = $('input.number-end', control);

        if (inputStart[0] && inputEnd[0]) {

            let valueStart = inputStart.val();
            let valueEnd   = inputEnd.val();

            if (
                (typeof valueStart === 'string' && valueStart !== '') ||
                (typeof valueEnd === 'string' && valueEnd !== '')
            ) {
                return {
                    start: valueStart !== '' ? valueStart : null,
                    end: valueEnd !== '' ? valueEnd : null,
                }
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

        $('input.number-start, input.number-end', control).keyup(function(e) {
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

        if (options.attr.hasOwnProperty('type')) {
            delete options.attr.type;
        }

        if (options.attr.hasOwnProperty('value')) {
            delete options.attr.value;
        }


        let field     = typeof options.field === 'string' ? options.field : '';
        let startAttr = [];
        let endAttr   = [];
        let attrBtn   = [];


        $.each(options.attr, function (name, value) {
            if (['name', 'value', 'class'].indexOf(name) >= 0 ||
                ['string', 'number'].indexOf(typeof value) < 0
            ) {
                return;
            }

            startAttr.push(name + '="' + value + '"');
            endAttr.push(name + '="' + value + '"');
        });

        if (options.attr.hasOwnProperty('class') &&
            ['string', 'number'].indexOf(typeof options.attr.class) >= 0
        ) {
            startAttr.push('class="' + options.attr.class + ' number-start"');
            endAttr.push('class="' + options.attr.class + ' number-end"');
        } else {
            startAttr.push('class="number-start"');
            endAttr.push('class="number-end"');
        }


        if (field) {
            startAttr.push('name="' + field + '[start]"');
            endAttr.push('name="' + field + '[end]"');
        }

        startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
        endAttr.push('value="' + (this._value ? this._value.end : '') + '"');



        if ( ! coreuiTableUtils.isObject(options.btn)) {
            options.btn = {};
        }
        if ( ! coreuiTableUtils.isObject(options.btn.attr)) {
            options.btn.attr = {};
        }

        if (options.btn.attr.hasOwnProperty('type')) {
            delete options.btn.attr.type;
        }


        $.each(options.btn.attr, function (name, value) {
            attrBtn.push(name + '="' + value + '"');
        });

        return ejs.render(coreuiTableTpl['filters/number.html'], {
            attrStart: startAttr.length > 0 ? (' ' + startAttr.join(' ')) : '',
            attrEnd: endAttr.length > 0 ? (' ' + endAttr.join(' ')) : '',
            label: label,
            btnAttr: attrBtn.length > 0 ? (' ' + attrBtn.join(' ')) : '',
            btnContent: options.btn.content ? options.btn.content : '',
        });
    }
}