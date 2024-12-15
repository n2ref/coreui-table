
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";
import Filter              from "../abstract/Filter";

class FilterText extends Filter {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
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
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue(value) {

        if (value !== null &&
            typeof value !== 'string' &&
            typeof value !== 'number'
        ) {
            return;
        }

        this._value = value


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

            if (typeof value === 'string' && value !== '') {
                return value;
            }
        }

        return this._value;
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
        let table   = this._table;

        $.each(options.attr, function (name, value) {
            attr.push(name + '="' + value + '"');
        });
        $.each(options.btn.attr, function (name, value) {
            attrBtn.push(name + '="' + value + '"');
        });

        this._control = $(coreuiTableUtils.render(coreuiTableTpl['filters/text.html'], {
            attr: attr.length > 0 ? (' ' + attr.join(' ')) : '',
            label: label,
            btnAttr: attrBtn.length > 0 ? (' ' + attrBtn.join(' ')) : '',
            btnContent: options.btn.content ? options.btn.content : '',
        }));

        $('input', this._control).keyup(function(e) {
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

export default FilterText;