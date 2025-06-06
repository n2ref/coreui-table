
import Tpl      from "../tpl";
import Utils    from "../utils";
import Elements from "../elements";
import Filter              from "../abstract/Filter";

class FilterDateMonth extends Filter {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'date_month',
            field: null,
            label: null,
            value: null,
            width: 200,
            attr: {
                class: "form-control",
            }
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {string|null} value
     */
    setValue(value) {

        if (typeof value !== 'string' && value !== null) {
            return;
        }

        if (value &&
            (
                value.match(/^\d{4}\-\d{2}$/) === null ||
                isNaN(new Date(value))
            )
        ) {
            return;
        }

        this._value = value;


        if (this._control) {
            $('input', this._control).val(
                this._value === null ? '' : this._value
            );
        }
    }


    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue() {

        if (this._control) {
            let value = $('input', this._control).val();

            return typeof value !== 'string' || value === ''
                ? null
                : value;
        }

        return this._value;
    }


    /**
     * Фильтрация данных
     * @returns {string} fieldValue
     * @returns {string} searchValue
     * @returns {boolean}
     */
    filter(fieldValue, searchValue) {

        if (['string', 'number'].indexOf(typeof fieldValue) < 0 ||
            ['string', 'number'].indexOf(typeof searchValue) < 0
        ) {
            return false;
        }

        return fieldValue.toString().toLowerCase().indexOf(
            searchValue.toString().toLowerCase()
        ) === 0
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

        options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number'
            ? this._value
            : '';

        if (options.attr.hasOwnProperty('type')) {
            delete options.attr.type;
        }


        let attr  = [];
        let table = this._table;

        $.each(options.attr, function (name, value) {
            attr.push(name + '="' + value + '"');
        });

        this._control = $(Utils.render(Tpl['filters/date_month.html'], {
            attr: attr.length > 0 ? (' ' + attr.join(' ')) : '',
            label: label
        }));

        $('input', this._control).change(function(e) {
            table.searchRecords();
        });

        return this._control;
    }
}

export default FilterDateMonth;