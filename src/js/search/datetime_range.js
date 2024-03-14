
import coreuiTable         from "../coreui.table";
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.search.datetime_range = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'datetime_range',
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
     * @param {Object} value
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
                value.start.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null &&
                isNaN(new Date(value.start))
            ) {
                dateStart = value.start;
            }

            if (value.hasOwnProperty('end') &&
                typeof value.end === 'string' &&
                value.end.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null &&
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
            let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);

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

        let control    = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
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

        let container = coreuiTableElements.getSearchContainer(this._table.getId());
        let control   = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        let that      = this;

        $('input.date-start, input.date-end', control).keyup(function(e) {
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

        if (this._options.attr.hasOwnProperty('type')) {
            delete this._options.attr.type;
        }

        if (this._options.attr.hasOwnProperty('value')) {
            delete this._options.attr.value;
        }


        let field     = typeof this._options.field === 'string' ? this._options.field : '';
        let startAttr = [];
        let startEnd  = [];


        $.each(this._options.attr, function (name, value) {
            if (['name', 'value', 'class'].indexOf(name) >= 0 ||
                ['string', 'number'].indexOf(typeof value) < 0
            ) {
                return;
            }

            startAttr.push(name + '="' + value + '"');
            startEnd.push(name + '="' + value + '"');
        });

        if (this._options.attr.hasOwnProperty('class') &&
            ['string', 'number'].indexOf(typeof this._options.attr.class) >= 0
        ) {
            startAttr.push('class="' + this._options.attr.class + ' date-start"');
            startEnd.push('class="' + this._options.attr.class + ' date-end"');
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


        return ejs.render(coreuiTableTpl['search/datetime_range.html'], {
            startAttr: startAttr.length > 0 ? (' ' + startAttr.join(' ')) : '',
            endAttr: startEnd.length > 0 ? (' ' + startEnd.join(' ')) : '',
        });
    }
}