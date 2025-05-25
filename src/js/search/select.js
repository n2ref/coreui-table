
import Tpl   from "../tpl";
import Utils from "../utils";
import Search           from "../abstract/Search";

class SearchSelect extends Search {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
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
        }, options);

        super(table, options);


        if (this._options.value !== null) {
            this.setValue(this._options.value);
        }
    }


    /**
     * Установка значения
     * @param {string|number|Array} value
     */
    setValue(value) {

        if (['string', 'number', 'object'].indexOf(typeof value) < 0) {
            return;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                let items = [];

                value.map(function (item) {
                    if (['string', 'number'].indexOf(typeof item) >= 0) {
                        items.push(item)
                    }
                });

                this._value = items;

            } else {
                this._value = null;
            }

        } else {
            this._value = [ value ];
        }


        if (this._control) {
            $('option:selected', this._control).prop('selected', false);

            if (Array.isArray(this._value)) {
                this._value.map(function (value) {
                    $('option[value="' + value + '"]', this._control).prop('selected', true);
                });
            }
        }
    }


    /**
     * Получение значения
     * @returns {Array|string|null}
     */
    getValue() {

        if (this._control) {
            let isMultiple = !! this._control.attr('multiple');
            let options    = $('option:selected', this._control);
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
    }


    /**
     * Фильтрация данных
     * @returns {string}              fieldValue
     * @returns {Array|string|number} searchValue
     * @returns {boolean}
     */
    filter(fieldValue, searchValue) {

        if (['string', 'number'].indexOf(typeof fieldValue) < 0 ||
            (['string', 'number'].indexOf(typeof searchValue) < 0 && ! Array.isArray(searchValue))
        ) {
            return false;
        }


        if (Array.isArray(searchValue)) {
            return searchValue.indexOf(fieldValue) >= 0;

        } else {
            return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
        }
    }


    /**
     * Формирование контента
     * @returns {string}
     */
    render() {

        let that          = this;
        let options       = this.getOptions();
        let selectOptions = [];
        let attributes    = [];

        if ( ! options.hasOwnProperty('attr') ||
             ! Utils.isObject(options.attr)
        ) {
            options.attr = {};
        }

        if (options.field) {
            options.attr.name = this._options.field;
        }

        if (options.width) {
            options.attr = Utils.mergeAttr(
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

                } else if (Utils.isObject(option)) {
                    let type = option.hasOwnProperty('type') && typeof option.type === 'string'
                        ? option.type
                        : 'option';

                    if (type === 'group') {
                        let renderAttr   = [];
                        let groupAttr    = {};
                        let groupOptions = [];

                        if (option.hasOwnProperty('attr') &&
                            Utils.isObject(option.attr)
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


        this._control = $(Utils.render(Tpl['search/select.html'], {
            field: options,
            value: this._value,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            options: selectOptions
        }));

        return this._control;
    }


    /**
     * Сборка опции
     * @param option
     * @return {object}
     * @private
     */
    _buildOption(option) {

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