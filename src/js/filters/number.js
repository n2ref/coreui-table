
import Tpl   from "../tpl";
import Utils from "../utils";
import Filter           from "../abstract/Filter";

class FilterNumber extends Filter {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
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
            if ( ! Utils.isObject(value)) {
                return;
            }

            let numberStart = null;
            let numberEnd   = null;

            if (value.hasOwnProperty('start') &&
                (typeof value.start === 'string' || typeof value.start !== 'number') &&
                value.start !== '' &&
                ! isNaN(Number(value.start))
            ) {
                numberStart = value.start;
            }

            if (value.hasOwnProperty('end') &&
                (typeof value.end === 'string' || typeof value.end !== 'number') &&
                value.end !== '' &&
                ! isNaN(Number(value.end))
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


        if (this._control) {
            let inputStart = this._control.parent().find('input.number-start');
            let inputEnd   = this._control.parent().find('input.number-end');

            if (this._value === null) {
                inputStart.val('');
                inputEnd.val('');

            } else if (Utils.isObject(this._value)) {
                inputStart.val(typeof this._value.start !== null ? this._value.start : '');
                inputEnd.val(typeof this._value.end !== null ? this._value.end : '');
            }
        }
    }


    /**
     * Получение значения
     * @returns {string}
     */
    getValue() {

        if (this._control) {
            let inputStart = this._control.parent().find('input.number-start');
            let inputEnd   = this._control.parent().find('input.number-end');

            if (inputStart[0] && inputEnd[0]) {
                let valueStart = inputStart.val();
                let valueEnd   = inputEnd.val();

                if (
                    (typeof valueStart === 'string' && valueStart !== '') ||
                    (typeof valueEnd === 'string' && valueEnd !== '')
                ) {
                    return {
                        start: valueStart !== '' && ! isNaN(Number(valueStart)) ? Number(valueStart) : null,
                        end: valueEnd !== '' && ! isNaN(Number(valueEnd)) ? Number(valueEnd) : null,
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
            ! Utils.isObject(searchValue) ||
            (
                ['string', 'number'].indexOf(typeof searchValue.start) < 0 &&
                ['string', 'number'].indexOf(typeof searchValue.end) < 0
            )
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
     * @returns {string}
     */
    render() {

        let options = this.getOptions();
        let label   = typeof options.label === 'string' || typeof options.label === 'number'
            ? options.label
            : '';

        if ( ! Utils.isObject(options.attr)) {
            options.attr = {};
        }

        if (options.hasOwnProperty('width') &&
            Utils.isNumeric(options.width)
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
        let table     = this._table;


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



        if ( ! Utils.isObject(options.btn)) {
            options.btn = {};
        }
        if ( ! Utils.isObject(options.btn.attr)) {
            options.btn.attr = {};
        }

        if (options.btn.attr.hasOwnProperty('type')) {
            delete options.btn.attr.type;
        }


        $.each(options.btn.attr, function (name, value) {
            attrBtn.push(name + '="' + value + '"');
        });

        this._control = $(Utils.render(Tpl['filters/number.html'], {
            attrStart: startAttr.length > 0 ? (' ' + startAttr.join(' ')) : '',
            attrEnd: endAttr.length > 0 ? (' ' + endAttr.join(' ')) : '',
            label: label,
            btnAttr: attrBtn.length > 0 ? (' ' + attrBtn.join(' ')) : '',
            btnContent: options.btn.content ? options.btn.content : '',
        }));


        $('input.number-start, input.number-end', this._control).keyup(function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                table.searchRecords();
            }
        });

        $('button', this._control).click(function(e) {
            table.searchRecords();
        });

        return this._control;
    }
}

export default FilterNumber;