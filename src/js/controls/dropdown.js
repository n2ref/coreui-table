
import coreuiTableTpl   from '../coreui.table.templates';
import coreuiTableUtils from '../coreui.table.utils';
import CoreuiTableUtils from "../coreui.table.utils";
import Control          from "../abstract/Control";

class ControlDropdown extends Control {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'dropdown',
            content: null,
            items: null,
            attr: {
                class: 'btn btn-secondary dropdown-toggle',
            }
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render() {

        let options    = this.getOptions();
        let table      = this._table;
        let that       = this;
        let items      = [];
        let attributes = [];


        if (Array.isArray(options.items)) {
            options.items.map(function (item) {
                if (CoreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                    if (item.type === 'link') {
                        if (item.hasOwnProperty('url') &&
                            item.hasOwnProperty('content') &&
                            typeof item.url === 'string' &&
                            typeof item.content === 'string'
                        ) {
                            let link = coreuiTableUtils.render(coreuiTableTpl['controls/dropdown/link.html'], {
                                url: item.url,
                                content: item.content,
                            });

                            items.push(link);
                        }

                    } else if (item.type === 'button') {
                        if (item.hasOwnProperty('content') &&
                            item.hasOwnProperty('onClick') &&
                            typeof item.content === 'string' &&
                            ['string', 'function'].indexOf(typeof item.onClick) >= 0
                        ) {
                            let button = $(coreuiTableUtils.render(coreuiTableTpl['controls/dropdown/button.html'], {
                                url: item.url,
                                content: item.content,
                            }));

                            button.click(function (event) {
                                if (typeof item.onClick === 'function') {
                                    item.onClick(event, table, that);

                                } else if (typeof item.onClick === 'string') {
                                    let func = new Function('event', 'table', 'control', item.onClick);
                                    func(event, table, that);
                                }
                            });

                            items.push(button);
                        }


                    } else if (item.type === 'divider') {
                        items.push(coreuiTableTpl['controls/dropdown/divider.html']);
                    }
                }
            });
        }

        if (coreuiTableUtils.isObject(options.attr)) {
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

        let dropdown = $(coreuiTableUtils.render(coreuiTableTpl['controls/dropdown.html'], {
            content: options.content,
            position: options.hasOwnProperty('position') && typeof options.position === 'string' ? options.position : 'end',
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        }));


        if (items.length > 0) {
            let menu = dropdown.find('.dropdown-menu');

            items.map(function (item) {
                menu.append(item)
            });
        }


        return dropdown;
    }
}

export default ControlDropdown;