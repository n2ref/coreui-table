
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";
import CoreuiTableUtils from "../coreui.table.utils";
import Column from "../abstract/Column";


class ColumnsMenu extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'menu',
            field: null,
            label: null,
            show: true,
            width: null,
            minWidth: null,
            maxWidth: null,
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render(content, record) {

        if ( ! coreuiTableUtils.isObject(content) ||
             ! content.hasOwnProperty('items') ||
             ! Array.isArray(content.items) ||
            content.items.length === 0
        ) {
            return '';
        }

        let items = [];
        let attr  = {};

        if (Array.isArray(content.items)) {
            $.each(content.items, function (key, item) {
                if (CoreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                    if (item.type === 'link') {
                        if (item.hasOwnProperty('url') &&
                            item.hasOwnProperty('content') &&
                            typeof item.url === 'string' &&
                            typeof item.content === 'string'
                        ) {
                            let linkAttr = {};

                            if (item.hasOwnProperty('attr') ||
                                coreuiTableUtils.isObject(item.attr)
                            ) {
                                linkAttr = item.attr;
                            }
                            if (linkAttr.hasOwnProperty('href')) {
                                delete linkAttr.href;
                            }

                            if ( ! linkAttr.hasOwnProperty('class') ||
                                typeof linkAttr.class !== 'string'
                            ) {
                                linkAttr.class = 'dropdown-item';
                            } else {
                                linkAttr.class += ' dropdown-item';
                            }

                            let linkAttributes = [];

                            $.each(linkAttr, function (name, value) {
                                if (['string', 'number'].indexOf(typeof value) >= 0) {
                                    linkAttributes.push(name + '="' + value + '"');
                                }
                            });

                            items.push({
                                type: 'link',
                                url: item.url,
                                content: item.content,
                                attr: linkAttributes,
                            });
                        }

                    } else if (item.type === 'button') {
                        if (item.hasOwnProperty('content') &&
                            item.hasOwnProperty('onClick') &&
                            typeof item.content === 'string' &&
                            ['string', 'function'].indexOf(typeof item.onClick) >= 0
                        ) {
                            let btnAttr = {};

                            if (item.hasOwnProperty('attr') ||
                                coreuiTableUtils.isObject(item.attr)
                            ) {
                                btnAttr = item.attr;
                            }

                            if (btnAttr.hasOwnProperty('type')) {
                                delete btnAttr.type;
                            }
                            if (btnAttr.hasOwnProperty('id')) {
                                delete btnAttr['id'];
                            }

                            if ( ! btnAttr.hasOwnProperty('class') ||
                                typeof btnAttr.class !== 'string'
                            ) {
                                btnAttr.class = 'dropdown-item';
                            } else {
                                btnAttr.class += ' dropdown-item';
                            }

                            let btnAttributes = [];

                            $.each(btnAttr, function (name, value) {
                                if (['string', 'number'].indexOf(typeof value) >= 0) {
                                    btnAttributes.push(name + '="' + value + '"');
                                }
                            });

                            items.push({
                                type: 'button',
                                id: coreuiTableUtils.hashCode(),
                                content: item.content,
                                onClick: item.onClick,
                                attr: btnAttributes.length > 0 ? (' ' + btnAttributes.join(' ')) : '',
                            });
                        }


                    } else if (item.type === 'divider') {
                        items.push({
                            type: 'divider',
                        });

                    } else if (item.type === 'header') {
                        if (item.hasOwnProperty('content') && typeof item.content === 'string'
                        ) {
                            items.push({
                                type: 'header',
                                content: item.content,
                            });
                        }
                    }
                }
            });
        }

        if (content.hasOwnProperty('attr') ||
            coreuiTableUtils.isObject(content.attr)
        ) {
            attr = content.attr;
        }

        if ( ! attr.hasOwnProperty('class') ||
            ['string', 'number'].indexOf(typeof attr.class) < 0
        ) {
            attr.class = 'btn rounded-1';
        }

        if (attr.hasOwnProperty('type')) {
            delete attr.type;
        }

        if (attr.hasOwnProperty('data-bs-toggle')) {
            delete attr['data-bs-toggle'];
        }


        let attributes = [];

        $.each(attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });


        let menuContent = content.hasOwnProperty('content') &&
                          typeof content.content === 'string' &&
                          content.content
            ? content.content
            : '<i class="bi bi-three-dots-vertical"></i>';

        let position = content.hasOwnProperty('position') &&
                       typeof content.position === 'string' &&
                       content.position
            ? content.position
            : 'end';


        let menu = $(
            coreuiTableUtils.render(coreuiTableTpl['columns/menu.html'], {
                content: menuContent,
                position: position,
                attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                items: items,
            })
        );

        menu.click(function (event) {
            event.cancelBubble = true;
            event.preventDefault();
        });


        let dropdownMenu = null;

        $(menu).on('show.bs.dropdown', function (e) {
            dropdownMenu = $(menu).find('.dropdown-menu');

            $('body').append(dropdownMenu.detach());

            var eOffset = $(e.target).offset();

            dropdownMenu.css({
                'display': 'block',
                'top'    : eOffset.top + $(e.target).outerHeight(),
                'left'   : eOffset.left
            });
        });

        $(menu).on('hide.bs.dropdown', function (e) {
            $(menu).append(dropdownMenu.detach());
            dropdownMenu.hide();
        });


        if (Array.isArray(items)) {
            let that = this;

            $.each(items, function (key, item) {
                if (CoreuiTableUtils.isObject(item) && typeof item.type === 'string') {

                    if (item.type === 'button') {
                        if (item.hasOwnProperty('content') &&
                            item.hasOwnProperty('onClick') &&
                            ['string', 'function'].indexOf(typeof item.onClick) >= 0 &&
                            typeof item.content === 'string'
                        ) {

                            $('button#btn-dropdown-' + item.id, menu)
                                .click(function (event) {
                                    if (typeof item.onClick === 'function') {
                                        item.onClick(record, that._table, event);

                                    } else if (typeof item.onClick === 'string') {
                                        (new Function('record', 'table', 'event', item.onClick))(record, that._table, event);
                                    }
                                });
                        }
                    }
                }
            });
        }

        return menu;
    }
}


export default ColumnsMenu;