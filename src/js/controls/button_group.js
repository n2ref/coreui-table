
import coreuiTableTpl   from '../coreui.table.templates';
import coreuiTableUtils from '../coreui.table.utils';
import Control          from "../abstract/Control";

class ControlButtonGroup extends Control {

    _link = {
        attr: { class: 'btn btn-secondary' }
    }

    _button =  {
        attr: { class: 'btn btn-secondary' }
    }

    _dropdown = {
        attr: { class: 'btn btn-secondary dropdown-toggle' }
    }


    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'button_group',
            buttons: null
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render() {

        let options = this.getOptions();
        let buttons = [];
        let that    = this;


        if (Array.isArray(options.buttons)) {

            /**
             * Создание ссылки
             * @param {Object} link
             */
            function makeLink(link) {

                let result = null;

                if (link.hasOwnProperty('url') &&
                    link.hasOwnProperty('content') &&
                    typeof link.url === 'string' &&
                    typeof link.content === 'string'
                ) {
                    let attributes = [];

                    if ( ! coreuiTableUtils.isObject(link.attr)) {
                        link.attr = {};
                    }

                    if (link.attr.hasOwnProperty('href')) {
                        delete link.attr.href;
                    }

                    if ( ! link.attr.hasOwnProperty('class')) {
                        link.attr.class = that._link.attr.class;
                    }

                    $.each(link.attr, function (name, value) {
                        if (['string', 'number'].indexOf(typeof value) >= 0) {
                            attributes.push(name + '="' + value + '"');
                        }
                    });

                    result = coreuiTableUtils.render(coreuiTableTpl['controls/button_group/link.html'], {
                        url: link.url,
                        attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                        content: link.content
                    });
                }

                return result;
            }


            /**
             * Создание кнопки
             * @param {Object} button
             */
            function makeButton(button) {

                let result = null;

                if (button.hasOwnProperty('content') &&
                    typeof button.content === 'string'
                ) {
                    let attributes = [];

                    if ( ! coreuiTableUtils.isObject(button.attr)) {
                        button.attr = {};
                    }

                    if (button.attr.hasOwnProperty('type')) {
                        delete button.attr.type;
                    }

                    if ( ! button.attr.hasOwnProperty('class')) {
                        button.attr.class = that._button.attr.class;
                    }

                    $.each(button.attr, function (name, value) {
                        if (['string', 'number'].indexOf(typeof value) >= 0) {
                            attributes.push(name + '="' + value + '"');
                        }
                    });


                    result = $(coreuiTableUtils.render(coreuiTableTpl['controls/button_group/button.html'], {
                        content: button.content,
                        attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                    }));


                    if (button.hasOwnProperty('onClick') &&
                        ['string', 'function'].indexOf(typeof button.onClick) >= 0
                    ) {

                        result.click(function (event) {
                            if (typeof button.onClick === 'function') {
                                button.onClick(event, that._table, that);

                            } else if (typeof button.onClick === 'string') {
                                let func = new Function('event', 'table', 'control', button.onClick);
                                func(event, that._table, that);
                            }
                        });
                    }
                }

                return result;
            }


            /**
             * Создание выпадающего меню
             * @param {Object} button
             */
            function makeDropdown(button) {

                let result = null;

                if (Array.isArray(button.items)) {
                    let attributes = [];
                    let items      = [];

                    button.items.map(function (item) {
                        if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                            if (item.type === 'link') {
                                if (item.hasOwnProperty('url') &&
                                    item.hasOwnProperty('content') &&
                                    typeof item.url === 'string' &&
                                    typeof item.content === 'string' &&
                                    item.url
                                ) {
                                    items.push(coreuiTableUtils.render(coreuiTableTpl['controls/button_group/dropdown/link.html'], {
                                        url: item.url,
                                        content: item.content,
                                    }));
                                }

                            } else if (item.type === 'button') {
                                if (item.hasOwnProperty('content') &&
                                    typeof item.content === 'string'
                                ) {
                                    let btn = $(coreuiTableUtils.render(coreuiTableTpl['controls/button_group/dropdown/button.html'], {
                                        content: item.content,
                                    }));

                                    if (item.hasOwnProperty('onClick') &&
                                        ['string', 'function'].indexOf(typeof item.onClick) >= 0
                                    ) {
                                        btn.click(function (event) {
                                            if (typeof item.onClick === 'function') {
                                                item.onClick(event, that._table, that);

                                            } else if (typeof item.onClick === 'string') {
                                                let func = new Function('event', 'table', 'control', item.onClick);
                                                func(event, that._table, that);
                                            }
                                        });
                                    }

                                    items.push(btn);
                                }


                            } else if (item.type === 'divider') {
                                items.push(coreuiTableTpl['controls/button_group/dropdown/divider.html']);
                            }
                        }
                    });


                    if ( ! coreuiTableUtils.isObject(button.attr)) {
                        button.attr = {};
                    }

                    if (button.attr.hasOwnProperty('type')) {
                        delete button.attr.type;
                    }

                    if ( ! button.attr.hasOwnProperty('class')) {
                        button.attr.class = that._dropdown.attr.class;
                    }


                    $.each(button.attr, function (name, value) {
                        if (['string', 'number'].indexOf(typeof value) >= 0) {
                            attributes.push(name + '="' + value + '"');
                        }
                    });

                    result = $(coreuiTableUtils.render(coreuiTableTpl['controls/button_group/dropdown.html'], {
                        attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                        position: button.hasOwnProperty('position') && typeof button.position === 'string' ? button.position : 'end',
                        content: button.content,
                    }));

                    if (items.length > 0) {
                        let menu = result.find('.dropdown-menu');

                        items.map(function (item) {
                            menu.append(item)
                        });
                    }
                }

                return result;
            }


            options.buttons.map(function (button) {
                if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {


                    if (button.type === 'link') {
                        let linkElement = makeLink(button);

                        if (linkElement) {
                            buttons.push(linkElement);
                        }

                    } else if (button.type === 'button') {
                        let buttonElement = makeButton(button);

                        if (buttonElement) {
                            buttons.push(buttonElement);
                        }

                    } else if (button.type === 'dropdown') {
                        let dropdownElement = makeDropdown(button);

                        if (dropdownElement) {
                            buttons.push(dropdownElement);
                        }
                    }
                }
            });
        }


        let btnGroup = $(coreuiTableTpl['controls/button_group.html']);

        buttons.map(function (button) {
            btnGroup.append(button);
        })

        return btnGroup;
    }
}

export default ControlButtonGroup;