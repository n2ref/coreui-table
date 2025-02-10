
import TableTpl      from "../table.tpl";
import TableUtils    from "../table.utils";
import TableElements from "../table.elements";
import Search              from "../abstract/Search";

class SearchNumber extends Search {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'number',
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
     * @param {Object} value
     */
    setValue (value) {

        if (value) {
            if ( ! TableUtils.isObject(value)) {
                return;
            }

            let numberStart = null;
            let numberEnd   = null;

            if (value.hasOwnProperty('start') &&
                ['string', 'number'].indexOf(typeof value.start) >= 0 &&
                ! isNaN(Number(value.start))
            ) {
                numberStart = Number(value.start);
            }

            if (value.hasOwnProperty('end') &&
                ['string', 'number'].indexOf(typeof value.end) >= 0 &&
                ! isNaN(Number(value.end))
            ) {
                numberEnd = Number(value.end);
            }

            if (numberStart === null && numberEnd === null) {
                this._value = null;

            } else {
                this._value = {
                    start: numberStart,
                    end: numberEnd
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

            } else if (TableUtils.isObject(this._value)) {
                inputStart.val(typeof this._value.start !== null ? this._value.start : '');
                inputEnd.val(typeof this._value.end !== null ? this._value.end : '');
            }
        }
    }


    /**
     * Получение значения
     * @returns {string|null}
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
            ! TableUtils.isObject(searchValue) ||
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
     * @returns {jQuery}
     */
    render() {

        if ( ! TableUtils.isObject(this._options.attr)) {
            this._options.attr = {};
        }

        if (this._options.hasOwnProperty('width') &&
            TableUtils.isNumeric(this._options.width)
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
        let table     = this._table;


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
            startAttr.push('class="' + this._options.attr.class + ' number-start"');
            startEnd.push('class="' + this._options.attr.class + ' number-end"');
        } else {
            startAttr.push('class="number-start"');
            startEnd.push('class="number-end"');
        }


        if (field) {
            startAttr.push('name="' + field + '[start]"');
            startEnd.push('name="' + field + '[end]"');
        }

        startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
        startEnd.push('value="' + (this._value ? this._value.end : '') + '"');


        this._control = $(TableUtils.render(TableTpl['search/number.html'], {
            startAttr: startAttr.length > 0 ? (' ' + startAttr.join(' ')) : '',
            endAttr: startEnd.length > 0 ? (' ' + startEnd.join(' ')) : '',
        }));

        $('input.number-start, input.number-end', this._control).keyup(function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                table.searchRecords();

                let container = TableElements.getSearchContainer(table.getId());
                container.fadeOut('fast');
            }
        });

        return this._control;
    }
}

export default SearchNumber;