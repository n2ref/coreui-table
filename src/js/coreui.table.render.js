
import coreuiTableTpl   from './coreui.table.templates';
import coreuiTableUtils from "./coreui.table.utils";


let coreuiTableRender = {


    /**
     * Сборка таблицы
     * @param {object} table
     * @private
     */
    renderTable: function (table) {

        let options         = table.getOptions();
        let recordsElements = [];
        let columnsHeader   = '';
        let columnsFooter   = '';
        let colGroups       = [];
        let columnElements  = $(coreuiTableTpl['table/columns/tr.html']);


        // Колонки
        if (table._columns.length > 0) {
            $.each(table._columns, function (key, column) {
                if ( ! column.isShow()) {
                    return;
                }

                let columnOptions  = column.getOptions();
                let attributes     = [];
                let sortable       = null;
                let menuElements   = [];
                let menuShowAlways = '';
                let menuPosition   = 'end';

                if (columnOptions.hasOwnProperty('field') && typeof columnOptions.field === 'string') {
                    columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
                        "data-field": columnOptions.field
                    });
                }

                if (columnOptions.hasOwnProperty('fixed') && typeof columnOptions.fixed === 'string') {
                    columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });

                    columnOptions.attr = coreuiTableUtils.mergeAttr(columnOptions.attr, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });
                }

                if (columnOptions.type !== 'numbers') {
                    if (columnOptions.hasOwnProperty('sortable') && columnOptions.sortable) {
                        columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
                            class: 'coreui-table__sortable'
                        });
                    }

                    if (table._sort.length > 0 &&
                        columnOptions.hasOwnProperty('field') &&
                        typeof columnOptions.field === 'string' &&
                        columnOptions.field
                    ) {
                        $.each(table._sort, function (key, sortField) {

                            if (columnOptions.field === sortField.field) {
                                if (sortField.order === 'asc') {
                                    sortable = 'asc';

                                } else if (sortField.order === 'desc') {
                                    sortable = 'desc';
                                }

                                return false;
                            }
                        });
                    }
                }

                if (options.showHeaders &&
                    columnOptions.hasOwnProperty('menu') &&
                    coreuiTableUtils.isObject(columnOptions.menu) &&
                    columnOptions.menu.hasOwnProperty('items') &&
                    Array.isArray(columnOptions.menu.items)
                ) {

                    if (columnOptions.menu.hasOwnProperty('showAlways') && columnOptions.menu.showAlways) {
                        menuShowAlways = 'coreui-table__column-menu-always';
                    }

                    if (columnOptions.menu.hasOwnProperty('position') && typeof columnOptions.menu.position === 'string') {
                        menuPosition = columnOptions.menu.position;
                    }

                    columnOptions.menu.items.map(function (item) {

                        if (coreuiTableUtils.isObject(item) &&
                            item.hasOwnProperty('type') &&
                            typeof item.type === 'string' &&
                            item.type
                        ) {
                            switch (item.type.toLowerCase()) {
                                case 'button':
                                    if (item.hasOwnProperty('text') &&
                                        typeof item.text === 'string' &&
                                        item.hasOwnProperty('onClick') &&
                                        ['string', 'function'].indexOf(typeof item.onClick) >= 0 &&
                                        item.text.length > 0
                                    ) {
                                        let attrItem = [];
                                        let attr     = {
                                            type: 'button',
                                            class: 'dropdown-item',
                                        };

                                        if (item.hasOwnProperty('attr') && coreuiTableUtils.isObject(item.attr)) {
                                            attr = coreuiTableUtils.mergeAttr(attr, item.attr);
                                        }

                                        $.each(attr, function (name, value) {
                                            attrItem.push(name + '="' + value + '"');
                                        });

                                        let menuElement = $(coreuiTableUtils.render(coreuiTableTpl['table/columns/menu/button.html'], {
                                            text: item.text,
                                            attr: attrItem.join(' '),
                                        }));

                                        menuElement.find('button').click(function () {
                                            if (typeof item.onClick === 'function') {
                                                item.onClick(table);

                                            } else if (typeof item.onClick === 'string') {
                                                (new Function('table', item.onClick))(table);
                                            }
                                        });

                                        menuElements.push(menuElement);
                                    }
                                    break;

                                case 'link':
                                    if (item.hasOwnProperty('text') &&
                                        item.hasOwnProperty('url') &&
                                        typeof item.text === 'string' &&
                                        typeof item.url === 'string' &&
                                        item.text.length > 0 &&
                                        item.url.length > 0
                                    ) {
                                        let attrItem = [];
                                        let attr     = {
                                            href: item.url,
                                            class: 'dropdown-item',
                                        };

                                        if (item.hasOwnProperty('attr') && coreuiTableUtils.isObject(item.attr)) {
                                            attr = coreuiTableUtils.mergeAttr(attr, item.attr);
                                        }

                                        $.each(attr, function (name, value) {
                                            attrItem.push(name + '="' + value + '"');
                                        });

                                        menuElements.push($(coreuiTableUtils.render(coreuiTableTpl['table/columns/menu/link.html'], {
                                            text: item.text,
                                            attr: attrItem.join(' '),
                                        })));
                                    }
                                    break;

                                case 'divider':
                                    menuElements.push($(coreuiTableTpl['table/columns/menu/divider.html']));
                                    break;

                                case 'header':
                                    menuElements.push($(coreuiTableUtils.render(coreuiTableTpl['table/columns/menu/header.html'], {
                                        text: item.text
                                    })));
                                    break;
                            }
                        }
                    });
                }

                if (columnOptions.attrHeader && coreuiTableUtils.isObject(columnOptions.attrHeader)) {
                    $.each(columnOptions.attrHeader, function (name, value) {
                        attributes.push(name + '="' + value + '"');
                    });
                }


                let style = [];

                if (columnOptions.hasOwnProperty('width') &&
                    ['string', 'number'].indexOf(typeof columnOptions.width) >= 0
                ) {
                    let unit = typeof columnOptions.width === 'number' ? 'px' : '';
                    style.push('width:' + columnOptions.width + unit);
                }
                if (columnOptions.hasOwnProperty('minWidth') &&
                    ['string', 'number'].indexOf(typeof columnOptions.minWidth) >= 0
                ) {
                    let unit = typeof columnOptions.minWidth === 'number' ? 'px' : '';
                    style.push('min-width:' + columnOptions.minWidth + unit);
                }
                if (columnOptions.hasOwnProperty('maxWidth') &&
                    ['string', 'number'].indexOf(typeof columnOptions.maxWidth) >= 0
                ) {
                    let unit = typeof columnOptions.maxWidth === 'number' ? 'px' : '';
                    style.push('max-width:' + columnOptions.maxWidth + unit);
                }

                colGroups.push({
                    style: style.length > 0 ? style.join(';') : ''
                });



                if (options.showHeaders) {
                    let label = '';
                    let description = '';

                    if (columnOptions.hasOwnProperty('label') &&
                        typeof columnOptions.label === 'string' &&
                        (!columnOptions.hasOwnProperty('showLabel') || columnOptions.showLabel)
                    ) {
                        label = columnOptions.label;
                    }

                    if (columnOptions.hasOwnProperty('description') &&
                        typeof columnOptions.label === 'string'
                    ) {
                        description = columnOptions.description;
                    }

                    let columnElement = $(coreuiTableUtils.render(coreuiTableTpl['table/columns/td.html'], {
                        attr          : attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                        label         : label,
                        description   : description,
                        sortable      : sortable,
                        issetMenu     : menuElements.length > 0,
                        menuPosition  : menuPosition,
                        menuShowAlways: menuShowAlways ? ' ' + menuShowAlways : '',
                    }));

                    if (menuElements.length) {
                        let menuContainer = columnElement.find('.coreui-table__column-menu ul');
                        let menuButton    = columnElement.find('.coreui-table__column-menu .dropdown-toggle');

                        menuButton.click(function (event) {
                            event.originalEvent.cancelBubble = true;
                        });

                        menuElements.map(function (element) {
                            menuContainer.append(element);
                        });
                    }

                    columnElements.append(columnElement);
                }
            });
        }


        // Строки
        if (table._records.length > 0) {
            table._recordsTotal  = table.getRecordsCount();
            table._recordsNumber = table._page === 1
                ? 1
                : ((table._page - 1) * table._recordsPerPage) + 1;

            recordsElements = coreuiTableRender.renderRecords(table, table._records);
        } else {
            recordsElements = coreuiTableRender.renderRecords(table, []);
        }


        if (options.showHeaders &&
            options.hasOwnProperty('columnsHeader') &&
            Array.isArray(options.columnsHeader) &&
            options.columnsHeader.length > 0
        ) {
            let rows = [];

            options.columnsHeader.map(function (headerRow) {
                if (Array.isArray(headerRow)) {
                    let cells = [];

                    headerRow.map(function (headerColumn) {
                        if (coreuiTableUtils.isObject(headerColumn)) {
                            let attributes = [];

                            if (headerColumn.hasOwnProperty('attr') && coreuiTableUtils.isObject(headerColumn.attr)) {
                                $.each(headerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                content: headerColumn.hasOwnProperty('content') ? headerColumn.content : '',
                                description: headerColumn.hasOwnProperty('description') ? headerColumn.description : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(coreuiTableUtils.render(coreuiTableTpl['table/columns/header.html'], {
                        columns: cells,
                    }));
                }
            });

            columnsHeader = rows.join('');
        }

        if (options.hasOwnProperty('columnsFooter') &&
            Array.isArray(options.columnsFooter) &&
            options.columnsFooter.length > 0
        ) {
            let rows = [];

            $.each(options.columnsFooter, function (key, footerRow) {
                if (Array.isArray(footerRow)) {
                    let cells = [];

                    $.each(footerRow, function (key, footerColumn) {
                        if (coreuiTableUtils.isObject(footerColumn)) {
                            let attributes = [];

                            if (footerColumn.hasOwnProperty('attr') && coreuiTableUtils.isObject(footerColumn.attr)) {
                                $.each(footerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                content: footerColumn.hasOwnProperty('content') ? footerColumn.content : '',
                                description: footerColumn.hasOwnProperty('description') ? footerColumn.description : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(
                        coreuiTableUtils.render(coreuiTableTpl['table/columns/footer.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            columnsFooter = rows.join('');
        }



        let classes = [];

        if (typeof options.class === 'string' && options.class) {
            classes.push(options.class);
        }

        if ( ! columnsFooter) {
            classes.push('empty-tfoot');
        }

        let theadAttr = [];

        if (options.hasOwnProperty('theadTop') &&
            ['string', 'number'].indexOf(typeof options.theadTop) >= 0
        ) {
            let unit = coreuiTableUtils.isNumeric(options.theadTop) ? 'px' : '';
            theadAttr.push('style="top:' + options.theadTop + unit + '"');
        }

        let tableElement = $(coreuiTableUtils.render(coreuiTableTpl['table.html'], {
            classes: classes.join(' '),
            theadAttr: theadAttr.length > 0 ? theadAttr.join(' ') : '',
            showHeaders: options.showHeaders,
            columnsHeader : columnsHeader,
            colGroups : colGroups,
            columnsFooter : columnsFooter,
        }));


        if (options.showHeaders) {
            tableElement.find('thead').append(columnElements);
        }


        let tbody = tableElement.find('tbody');

        recordsElements.map(function (recordElement) {
            tbody.append(recordElement);
        });

        return tableElement
    },


    /**
     * Сборка записей таблицы
     * @param {object} table
     * @param {Array}  records
     * @return {Array}
     */
    renderRecords: function (table, records) {

        let renderRecords = [];

        if (records.length > 0) {
            let that    = this;
            let options = table.getOptions();
            let group   = options.hasOwnProperty('group') &&
                          coreuiTableUtils.isObject(options.group) &&
                          options.group.hasOwnProperty('field') &&
                          typeof options.group.field === 'string' &&
                          options.group.field
                ? options.group
                : null;


            if (group) {
                let groupValue    = null;
                let groupIndex    = 0;
                let recordsGroups = {};

                records.map(function (record) {
                    if (record.show) {
                        if (record.data.hasOwnProperty(group.field) &&
                            ['string', 'number'].indexOf(typeof record.data[group.field]) >= 0 &&
                            groupValue != record.data[group.field]
                        ) {
                            groupValue = record.data[group.field];
                            groupIndex++;
                        }

                        if ( ! recordsGroups.hasOwnProperty(groupIndex)) {
                            recordsGroups[groupIndex] = {
                                isGroup: groupIndex > 0,
                                records: [],
                            };
                        }

                        recordsGroups[groupIndex].records.push(record);
                    }
                });

                $.each(recordsGroups, function (key, recordsGroup) {
                    let renderRecordsGroup = [];

                    recordsGroup.records.map(function (record) {
                        renderRecordsGroup.push(that.renderRecord(table, record));
                        table._recordsNumber++;
                    });

                    if (recordsGroup.isGroup) {
                        renderRecords.push(that.renderGroup(table, group, recordsGroup.records[0], renderRecordsGroup));
                    }

                    renderRecordsGroup.map(function (record) {
                        renderRecords.push(record);
                    });
                });

            } else {
                records.map(function (record) {
                    if (record.show) {
                        renderRecords.push(that.renderRecord(table, record));
                        table._recordsNumber++;
                    }
                });
            }
        }

        if (renderRecords.length === 0) {
            renderRecords = [
                $(coreuiTableUtils.render(coreuiTableTpl['table/record/empty.html'], {
                    columnsCount: table._countColumnsShow,
                    lang: table.getLang(),
                }))
            ];
        }

        return renderRecords;
    },


    /**
     * Сборка записи таблицы
     * @param {object} table
     * @param {object} record
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    renderRecord: function (table, record) {

        let that       = this;
        let options    = table.getOptions();
        let fields     = [];
        let recordAttr = {
            class: 'coreui-table__record'
        };

        table._columns.map(function (column) {
            if ( ! column.isShow()) {
                return;
            }

            let fieldContent = that.renderField(table, column, record);

            if (fieldContent) {
                fields.push(fieldContent);
            }
        });

        if (typeof options.onClickUrl === 'string' && options.onClickUrl) {
            recordAttr.class += ' coreui-table_pointer';
        }

        if (record.meta) {
            recordAttr = coreuiTableUtils.mergeAttr(recordAttr, record.meta.attr);
        }

        let attributes = [];

        $.each(recordAttr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });

        let recordElement = $(coreuiTableUtils.render(coreuiTableTpl['table/record.html'], {
            attr  : attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            index : record.index,
            fields: fields
        }));

        fields.map(function (field, key) {
            $(recordElement[0].querySelector(':scope > td:nth-child(' + (key + 1) + ')')).append(field.content)
        });

        return recordElement;
    },


    /**
     * Сборка ячейки таблицы
     * @param {coreuiTableInstance} table
     * @param {Column}              column
     * @param {object}              record
     * @returns {{ attr: (string), content: (string) }}
     * @private
     */
    renderField: function (table, column, record) {

        let columnOptions = column.getOptions();
        let columnField   = column.getField();
        let content       = null;
        let fieldProps    = record.meta && record.meta.hasOwnProperty('fields') && record.meta.fields.hasOwnProperty(columnField)
            ? record.meta.fields[columnField]
            : null;
        let fieldAttr = columnOptions.hasOwnProperty('attr') && coreuiTableUtils.isObject(columnOptions.attr)
            ? columnOptions.attr
            : {};

        if (fieldProps && coreuiTableUtils.isObject(fieldProps)) {
            if (fieldProps && fieldProps.hasOwnProperty('show') && ! fieldProps.show) {
                return null;
            }

            if (coreuiTableUtils.isObject(fieldProps.attr)) {
                fieldAttr = coreuiTableUtils.mergeAttr(fieldAttr, fieldProps.attr);
            }
        }

        if (columnOptions.hasOwnProperty('fixed') && typeof columnOptions.fixed === 'string') {
            fieldAttr = coreuiTableUtils.mergeAttr(fieldAttr, {
                class: 'coreui-table__fixed_' + columnOptions.fixed
            });
        }

        if (typeof columnOptions.render === 'function') {
            content = columnOptions.render({
                data: record.data,
                meta: record.meta,
                index: record.index,
            }, table);
        } else {
            content = columnField && record.data.hasOwnProperty(columnField)
                ? record.data[columnField]
                : null;
        }


        content = column.render(content, record);

        if (typeof column.getActions === 'function') {
            let actions = column.getActions(content, columnField, record);

            if (coreuiTableUtils.isObject(actions)) {
                record.fields[columnField] = actions;
            }
        }

        let fieldAttrResult = [];

        $.each(fieldAttr, function (name, value) {
            fieldAttrResult.push(name + '="' + value + '"');
        });

        return {
            attr:    fieldAttrResult.length > 0 ? (' ' + fieldAttrResult.join(' ')) : '',
            content: content,
        };
    },


    /**
     * Сборка записи-группы
     * @param {coreuiTableInstance} table
     * @param {object}              group
     * @param {object}              record
     * @param {Array}               renderRecords
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    renderGroup: function (table, group, record, renderRecords) {

        let attr = group.hasOwnProperty('attr') && coreuiTableUtils.isObject(group.attr)
            ? group.attr
            : {};

        if (attr.hasOwnProperty('class') && typeof attr.class === 'string') {
            attr.class += ' coreui-table__record-group';
        } else {
            attr.class = 'coreui-table__record-group';
        }

        let attributes = [];

        $.each(attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });

        let isCollapsing = group.hasOwnProperty('isCollapsing') ? !! group.isCollapsing : false;

        let groupElement = $(coreuiTableUtils.render(coreuiTableTpl['table/record/group.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            colspan: table._countColumnsShow,
            isCollapsing: isCollapsing
        }));

        let td      = groupElement.find(' > td');
        let content = record.data[group.field];


        if (group.hasOwnProperty('render')) {
            let renderContent = null;

            if (typeof group.render === 'function') {
                renderContent = group.render(record);

            } else if (typeof group.render === 'string') {
                renderContent = (new Function('record', group.render))(record);
            }

            if (renderContent) {
                content = renderContent;
            }
        }


        if (isCollapsing) {
            let collapsed = $('<i class="bi bi-chevron-down coreui-table_pointer me-1"></i>');

            collapsed.click(function () {
                if ($(this).hasClass('bi-chevron-down')) {
                    $(this).removeClass('bi-chevron-down')
                        .addClass('bi-chevron-right');

                    renderRecords.map(function (renderRecord) {
                        $(renderRecord).fadeOut(100);
                    });

                } else {
                    $(this).removeClass('bi-chevron-right')
                        .addClass('bi-chevron-down');

                    renderRecords.map(function (renderRecord) {
                        $(renderRecord).fadeIn(100);
                    });
                }
            });

            td.append(collapsed);
        }

        td.append(content);

        return groupElement;
    },


    /**
     * Сборка раскрывающейся строки
     * @param {object}       table
     * @param {Array|string} content
     */
    renderExpand: function (table, content) {

        if (typeof content === 'object') {
            content = coreuiTableRender.renderComponents(table, content, 'record_expand_show');
        }


        let expandRecord = $(coreuiTableUtils.render(coreuiTableTpl['table/record/expand.html'], {
            colspan: table._countColumnsShow,
        }));

        if (['string', 'number'].indexOf(typeof content) >= 0) {
            expandRecord.find('td').html(content)

        } else if (Array.isArray(content)) {
            $.each(content, function (key, item) {
                if (['string', 'number'].indexOf(typeof item) >= 0 ||
                    item instanceof HTMLElement ||
                    (window.hasOwnProperty('jQuery') && item instanceof jQuery)
                ) {
                    expandRecord.find('td').append(item)
                }
            });
        }

        return expandRecord;
    },


    /**
     * Сборка элемента управления
     * @param {object} table
     * @param {object} control
     * @private
     * @returns {HTMLElement|jQuery}
     */
    renderControl: function (table, control) {

        if (coreuiTableUtils.isObject(control)) {
            let controlElement = $(coreuiTableUtils.render(coreuiTableTpl['table/control.html'], {
                id: control.getId()
            }));

            controlElement.append(control.render());

            return controlElement;
        }
    },


    /**
     * Формирование контента компонента
     * @param {object} table
     * @param {object} components
     * @param {string} eventName
     * @return {Array}
     */
    renderComponents: function (table, components, eventName) {

        let result = [];

        if (components instanceof Object) {
            if ( ! Array.isArray(components)) {
                components = [ components ];
            }

            for (let i = 0; i < components.length; i++) {
                if (typeof components[i] === 'string') {
                    result.push(components[i]);

                } else if ( ! Array.isArray(components[i]) &&
                    components[i].hasOwnProperty('component') &&
                    components[i].component.substring(0, 6) === 'coreui'
                ) {
                    let name = components[i].component.split('.')[1];

                    if (CoreUI.hasOwnProperty(name) &&
                        coreuiTableUtils.isObject(CoreUI[name])
                    ) {
                        let instance = CoreUI[name].create(components[i]);
                        result.push(instance.render());

                        if (eventName) {
                            table.on(eventName, instance.initEvents, instance, true);
                        }
                    }
                }
            }
        }


        return result;
    }
}

export default coreuiTableRender;