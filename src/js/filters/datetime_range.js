
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";
import Filter              from "../abstract/Filter";

class FilterDatetimeRange extends Filter {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'datetime_range',
            field: null,
            label: null,
            value: null,
            width: 200,
            attr: {
                class: "form-control d-inline-block",
            }
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {object|null} value
     */
    setValue(value) {

        if (value) {
            if ( ! coreuiTableUtils.isObject(value)) {
                return;
            }

            let dateStart = null;
            let dateEnd   = null;

            if (value.hasOwnProperty('start') &&
                typeof value.start === 'string' &&
                value.start.match(/^\d{4}\-\d{2}\-\d{2}(T| )\d{2}:\d{2}(:\d{2}|)$/) === null &&
                isNaN(new Date(value.start))
            ) {
                dateStart = value.start;
            }

            if (value.hasOwnProperty('end') &&
                typeof value.end === 'string' &&
                value.end.match(/^\d{4}\-\d{2}\-\d{2}(T| )\d{2}:\d{2}(:\d{2}|)$/) === null &&
                isNaN(new Date(value.end))
            ) {
                dateEnd = value.end;
            }

            if (dateStart === null && dateEnd === null) {
                this._value = null;

            } else {
                this._value = {
                    start: dateStart,
                    end:   dateEnd
                };
            }

        } else {
            this._value = null;
        }


        if (this._control) {
            let inputStart = this._control.parent().find('input.date-start');
            let inputEnd   = this._control.parent().find('input.date-end');

            if (this._value === null) {
                inputStart.val('');
                inputEnd.val('');

            } else if (coreuiTableUtils.isObject(this._value)) {
                inputStart.val(typeof this._value.start !== null ? this._value.start : '');
                inputEnd.val(typeof this._value.end !== null ? this._value.end : '');
            }
        }
    }


    /**
     * Получение значения
     * @returns {Object|null}
     */
    getValue() {

        if (this._control) {
            let inputStart = this._control.parent().find('input.date-start');
            let inputEnd   = this._control.parent().find('input.date-end');

            if (inputStart[0] && inputEnd[0]) {
                let valueStart = inputStart.val();
                let valueEnd   = inputEnd.val();

                if ((typeof valueStart === 'string' && valueStart !== '') ||
                    (typeof valueEnd === 'string' && valueEnd !== '')
                ) {
                    return {
                        start: valueStart !== '' ? valueStart : null,
                        end: valueEnd !== '' ? valueEnd : null,
                    }
                }
            }

            return null;
        }


        return this._value;
    }


    /**
     * Фильтрация данных
     * @returns {string}              fieldValue
     * @returns {Array|string|number} searchValue
     * @returns {boolean}
     */
    filter(fieldValue, searchValue) {

        if (['string', 'number'].indexOf(typeof fieldValue) < 0 ||
            ! coreuiTableUtils.isObject(searchValue) ||
            (typeof searchValue.start !== 'string' && typeof searchValue.end !== 'string')
        ) {
            return false;
        }


        let issetStart = ['string', 'number'].indexOf(typeof searchValue.start) >= 0;
        let issetEnd   = ['string', 'number'].indexOf(typeof searchValue.end) >= 0;

        if (issetStart && issetEnd) {
            return fieldValue >= searchValue.start && fieldValue <= searchValue.end;

        } else if (issetStart) {
            return fieldValue >= searchValue.start;

        } else {
            return fieldValue <= searchValue.end;
        }
    }


    /**
     * Формирование контента
     * @returns {jQuery}
     */
    render() {

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
        let table     = this._table;


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


        let control = $(coreuiTableUtils.render(coreuiTableTpl['filters/datetime_range.html'], {
            label: label,
            startAttr: startAttr.length > 0 ? (' ' + startAttr.join(' ')) : '',
            endAttr: startEnd.length > 0 ? (' ' + startEnd.join(' ')) : '',
        }));

        $('input', control).change(function(e) {
            table.searchRecords();
        });


        $('input.date-start', control).change(function() {
            let dateEnd = $('input.date-end', control).attr('min', $(this).val());

            if ("showPicker" in HTMLInputElement.prototype) {
                $(dateEnd)[0].showPicker();
            }
        });
        $('input.date-end', control).change(function() {
            $('input.date-start', control).attr('max', $(this).val());
        });

        this._control = control;

        return this._control;
    }
}

export default FilterDatetimeRange;