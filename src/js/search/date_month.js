
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";
import Search              from "../abstract/Search";

class SearchDateMonth extends Search {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
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
            this._control.val(
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
            let value = this._control.val();

            if (typeof value === 'string' && value !== '') {
                return value;
            }

            return null;
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

        this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number'
            ? this._value
            : '';

        if (this._options.attr.hasOwnProperty('type')) {
            delete this._options.attr.type;
        }

        let attributes = [];
        let table      = this._table;

        $.each(this._options.attr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });

        this._control = $(coreuiTableUtils.render(coreuiTableTpl['search/date_month.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        }));

        this._control.keyup(function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                table.searchRecords();

                let container = coreuiTableElements.getSearchContainer(table.getId());
                container.fadeOut('fast');
            }
        });

        return this._control;
    }
}

export default SearchDateMonth;