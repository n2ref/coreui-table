
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import CoreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

let SearchSelect = {

    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
        id: null,
        type: 'select',
        field: null,
        label: null,
        width: null,
        value: null,
        attr: {
            class: 'form-select d-inline-block'
        },
        options: []
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
     * @param {Array} value
     */
    setValue: function (value) {

        if (['string', 'number', 'object'].indexOf(typeof value) < 0) {
            return;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                let items = [];

                $.each(value, function (key, item) {
                    if (typeof value !== 'string' && typeof value !== 'number') {
                        return;
                    }

                    items.push(item);
                });

                this._value = items;

            } else {
                this._value = null;
            }

        } else {
            this._value = [ value ];
        }


        if (this._render) {
            let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);

            if (control[0]) {
                $('select option:selected', control).prop('selected', false);

                if (Array.isArray(this._value)) {
                    $.each(this._value, function (key, value) {
                        $('select option[value="' + value + '"]', control).prop('selected', true);
                    })
                }
            }
        }
    },


    /**
     * Получение значения
     * @returns {Array|string|null}
     */
    getValue: function () {

        let control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);

        if (control[0]) {
            let isMultiple = !! $('select', control).attr('multiple');
            let options    = $('select option:selected', control);
            let items      = [];

            $.each(options, function (key, option) {
                let value = $(option).attr('value');

                if (['string', 'number'].indexOf(typeof value) >= 0 &&
                    value !== ''
                ) {
                    items.push(value);
                }
            });

            return items.length > 0
                ? (isMultiple ? items : items[0])
                : null;

        } else {
            return this._value;
        }
    },



    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function () {

    },


    /**
     * Формирование контента
     * @returns {string}
     */
    render: function() {

        this._render = true;

        let that          = this;
        let options       = this.getOptions();
        let selectOptions = [];
        let attributes    = [];

        if ( ! options.hasOwnProperty('attr') ||
             ! coreuiTableUtils.isObject(options.attr)
        ) {
            options.attr = {};
        }

        if (options.field) {
            options.attr.name = this._options.field;
        }

        if (options.width) {
            options.attr = coreuiTableUtils.mergeAttr(
                { style: 'width:' + options.width + 'px' },
                options.attr
            );
        }

        if (options.hasOwnProperty('options') &&
            typeof options.options === 'object' &&
            options.options !== null
        ) {
            $.each(options.options, function (key, option) {

                if (typeof option === 'string' || typeof option === 'number') {
                    selectOptions.push(that._buildOption({
                        type: 'option',
                        value: key,
                        text: option
                    }));

                } else if (CoreuiTableUtils.isObject(option)) {
                    let type = option.hasOwnProperty('type') && typeof option.type === 'string'
                        ? option.type
                        : 'option';

                    if (type === 'group') {
                        let renderAttr   = [];
                        let groupAttr    = {};
                        let groupOptions = [];

                        if (option.hasOwnProperty('attr') &&
                            coreuiTableUtils.isObject(option.attr)
                        ) {
                            groupAttr = option.attr;
                        }

                        if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(typeof(option.label)) >= 0) {
                            groupAttr.label = option.label;
                        }

                        $.each(groupAttr, function (name, value) {
                            renderAttr.push(name + '="' + value + '"');
                        });

                        if (Array.isArray(option.options)) {
                            $.each(option.options, function (key, groupOption) {
                                groupOptions.push(that._buildOption(groupOption));
                            });
                        }

                        selectOptions.push({
                            type: 'group',
                            attr: renderAttr.length > 0 ? (' ' + renderAttr.join(' ')) : '',
                            options: groupOptions,
                        });

                    } else {
                        selectOptions.push(that._buildOption(option));
                    }
                }
            });
        }

        $.each(options.attr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });

        return coreuiTableUtils.render(coreuiTableTpl['search/select.html'], {
            field: options,
            value: this._value,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            options: selectOptions
        });
    },


    /**
     * Сборка опции
     * @param option
     * @return {object}
     * @private
     */
    _buildOption: function (option) {

        let optionAttr = [];
        let optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(typeof(option.text)) >= 0
            ? option.text
            : '';

        $.each(option, function (name, value) {
            if (name !== 'text') {
                optionAttr.push(name + '="' + value + '"');
            }
        });


        if (Array.isArray(this._value)) {
            $.each(this._value, function (key, itemValue) {
                if (itemValue == option.value) {
                    optionAttr.push('selected="selected"');
                    return false;
                }
            });

        } else if (this._value == option.value) {
            optionAttr.push('selected="selected"');
        }

        return {
            type: 'option',
            text: optionText,
            attr: optionAttr.length > 0 ? (' ' + optionAttr.join(' ')) : ''
        };
    }
}

export default SearchSelect;