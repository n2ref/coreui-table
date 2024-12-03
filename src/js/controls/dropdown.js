
import coreuiTableTpl   from '../coreui.table.templates';
import coreuiTableUtils from '../coreui.table.utils';
import CoreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

let ControlDropdown = {

    _id: null,
    _table: null,
    _options: {
        id: null,
        type: 'dropdown',
        content: null,
        items: null,
        attr: {
            class: 'btn btn-primary',
        }
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();

        if (Array.isArray(this._options.items)) {
            $.each(this._options.items, function (key, item) {
                if (CoreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                    item.id = coreuiTableUtils.hashCode();
                }
            });
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
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that    = this;
        let options = this.getOptions();

        if (Array.isArray(options.items)) {
            $.each(options.items, function (key, item) {
                if (CoreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                    if (item.type === 'button') {
                        if (item.hasOwnProperty('content') &&
                            item.hasOwnProperty('onClick') &&
                            ['string', 'function'].indexOf(typeof item.onClick) >= 0 &&
                            typeof item.content === 'string'
                        ) {

                            let control = coreuiTableElements.getControl(that._table.getId(), that.getId());

                            $('button#btn-dropdown-' + item.id, control)
                                .click(function (event) {
                                    if (typeof item.onClick === 'function') {
                                        item.onClick(event, that._table, that);

                                    } else if (typeof item.onClick === 'string') {
                                        let func = new Function('event', 'table', 'control', item.onClick);
                                        func(event, that._table, that);
                                    }
                                });
                        }
                    }
                }
            });
        }
    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {
        return this._id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        let options    = this.getOptions();
        let items      = [];
        let attributes = [];


        if (Array.isArray(options.items)) {
            $.each(options.items, function (key, item) {
                if (CoreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                    if (item.type === 'link') {
                        if (item.hasOwnProperty('link') &&
                            item.hasOwnProperty('content') &&
                            typeof item.url === 'string' &&
                            typeof item.content === 'string'
                        ) {
                            items.push({
                                type: 'link',
                                url: item.url,
                                content: item.content,
                            });
                        }

                    } else if (item.type === 'button') {
                        if (item.hasOwnProperty('content') &&
                            item.hasOwnProperty('onClick') &&
                            typeof item.content === 'string' &&
                            ['string', 'function'].indexOf(typeof item.onClick) >= 0
                        ) {
                            items.push({
                                type: 'button',
                                id: item.id,
                                content: item.content,
                            });
                        }


                    } else if (item.type === 'divider') {
                        items.push({
                            type: 'divider',
                        });
                    }
                }
            });
        }

        if (coreuiTableUtils.isObject(options.attr)) {
            if (options.attr.hasOwnProperty('class') &&
                ['string', 'number'].indexOf(typeof options.attr.class) >= 0
            ) {
                options.attr.class += ' dropdown-toggle';
            }

            if (options.attr.hasOwnProperty('type')) {
                delete options.attr.type;
            }
            if (options.attr.hasOwnProperty('id')) {
                delete options.attr.id;
            }
            if (options.attr.hasOwnProperty('data-bs-toggle')) {
                delete options.attr['data-bs-toggle'];
            }

            $.each(options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });
        }

        return coreuiTableUtils.render(coreuiTableTpl['controls/dropdown.html'], {
            content: options.content,
            position: options.hasOwnProperty('position') && typeof options.position === 'string' ? options.position : 'end',
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            items: items,
        });
    }
}

export default ControlDropdown;