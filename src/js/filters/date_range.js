
import coreuiTable      from "../coreui.table";
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.filters.date_range = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'date_range',
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
     * @param {object|null} value
     */
    setValue: function (value) {

        if (value) {
            if ( ! coreuiTableUtils.isObject(value)) {
                return;
            }

            let dateStart = null;
            let dateEnd   = null;

            if (value.hasOwnProperty('start') &&
                typeof value.start === 'string' &&
                value.start.match(/^\d{4}\-\d{2}\-\d{2}$/) === null &&
                isNaN(new Date(value.start))
            ) {
                dateStart = value.start;
            }

            if (value.hasOwnProperty('end') &&
                typeof value.end === 'string' &&
                value.end.match(/^\d{4}\-\d{2}\-\d{2}$/) === null &&
                isNaN(new Date(value.end))
            ) {
                dateEnd = value.end;
            }

            if (dateStart === null && dateEnd === null) {
                this._value = null;

            } else {
                this._value = {
                    start: dateStart,
                    end: dateEnd
                };
            }

        } else {
            this._value = null;
        }


        if (this._render) {
            let control = coreuiTableElements.getControl(this._table.getId(), this._id);

            if (control[0]) {
                let inputStart = $('input.date-start', control);
                let inputEnd   = $('input.date-end', control);

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
     * @returns {Object|null}
     */
    getValue: function () {

        let control    = coreuiTableElements.getControl(this._table.getId(), this._id);
        let inputStart = $('input.date-start', control);
        let inputEnd   = $('input.date-end', control);

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
        let startEnd  = [];


        $.each(options.attr, function (name, value) {
            if (['name', 'value', 'class'].indexOf(name) >= 0 ||
                ['string', 'number'].indexOf(typeof value) < 0
            ) {
                return;
            }

            startAttr.push(name + '="' + value + '"');
            startEnd.push(name + '="' + value + '"');
        });

        if (options.attr.hasOwnProperty('class') &&
            ['string', 'number'].indexOf(typeof options.attr.class) >= 0
        ) {
            startAttr.push('class="' + options.attr.class + ' date-start"');
            startEnd.push('class="' + options.attr.class + ' date-end"');
        } else {
            startAttr.push('class="date-start"');
            startEnd.push('class="date-end"');
        }


        if (field) {
            startAttr.push('name="' + field + '[start]"');
            startEnd.push('name="' + field + '[end]"');
        }

        startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
        startEnd.push('value="' + (this._value ? this._value.end : '') + '"');


        return ejs.render(coreuiTableTpl['filters/date_range.html'], {
            label: label,
            startAttr: startAttr.length > 0 ? (' ' + startAttr.join(' ')) : '',
            endAttr: startEnd.length > 0 ? (' ' + startEnd.join(' ')) : '',
        });
    }
}