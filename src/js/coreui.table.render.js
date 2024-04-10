

import '../../node_modules/ejs/ejs.min';
import coreuiTableTpl   from './coreui.table.templates';
import coreuiTableUtils from "./coreui.table.utils";


let coreuiTableRender = {


    /**
     * Сборка таблицы
     * @param {object} table
     * @private
     */
    renderTable: function (table) {

        let options            = table.getOptions();
        let recordsElements    = [];
        let columnGroupsHeader = '';
        let columnGroupsFooter = '';
        let colGroups          = [];
        let columns            = [];

        // Колонки
        if (table._columns.length > 0) {
            $.each(table._columns, function (key, column) {
                if ( ! column.isShow()) {
                    return;
                }

                let columnOptions = column.getOptions();
                let attributes    = [];
                let sortable      = null;

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

                columns.push({
                    attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                    label: columnOptions.hasOwnProperty('label') ? columnOptions.label : "",
                    description: columnOptions.hasOwnProperty('description') ? columnOptions.description : '',
                    sortable: sortable
                });
            });
        }


        // Строки
        if ( ! table._isRecordsRequest) {

            if (table._records.length > 0) {
                table._recordsTotal  = table.getRecordsCount();
                table._recordsNumber = table._page === 1
                    ? 1
                    : ((table._page - 1) * table._recordsPerPage) + 1;

                recordsElements = coreuiTableRender.renderRecords(table, table._records);
            } else {
                recordsElements = coreuiTableRender.renderRecords(table, []);
            }
        }


        if (options.hasOwnProperty('columnGroupsHeader') &&
            Array.isArray(options.columnGroupsHeader) &&
            options.columnGroupsHeader.length > 0
        ) {
            let rows = [];

            $.each(options.columnGroupsHeader, function (key, headerRow) {
                if (Array.isArray(headerRow)) {
                    let cells = [];

                    $.each(headerRow, function (key, headerColumn) {
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

                    rows.push(
                        ejs.render(coreuiTableTpl['table-columns-header.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            columnGroupsHeader = rows.join('');
        }

        if (options.hasOwnProperty('columnGroupsFooter') &&
            Array.isArray(options.columnGroupsFooter) &&
            options.columnGroupsFooter.length > 0
        ) {
            let rows = [];

            $.each(options.columnGroupsFooter, function (key, footerRow) {
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
                        ejs.render(coreuiTableTpl['table-columns-footer.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            columnGroupsFooter = rows.join('');
        }



        let classes = [];

        if (typeof options.class === 'string' && options.class) {
            classes.push(options.class);
        }

        if ( ! columnGroupsFooter) {
            classes.push('empty-tfoot');
        }

        let htmlColumns = ejs.render(coreuiTableTpl['table-columns.html'], {
            columns: columns,
        });

        let theadAttr = [];

        if (options.hasOwnProperty('theadTop') &&
            ['string', 'number'].indexOf(typeof options.theadTop) >= 0
        ) {
            let unit = coreuiTableUtils.isNumeric(options.theadTop) ? 'px' : '';
            theadAttr.push('style="top:' + options.theadTop + unit + '"');
        }

        let tableElement = $(
            ejs.render(coreuiTableTpl['table.html'], {
                classes: classes.join(' '),
                theadAttr: theadAttr.length > 0 ? theadAttr.join(' ') : '',
                columnHeaders: options.columnHeaders,
                columnGroupsHeader : columnGroupsHeader,
                colGroups : colGroups,
                columns : htmlColumns,
                columnGroupsFooter : columnGroupsFooter,
            })
        );


        let tbody = tableElement.find('tbody');

        $.each(recordsElements, function (key, recordElement) {
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
            let groupValue = null;

            $.each(records, function (key, record) {

                if (record.show) {
                    if (group &&
                        record.data.hasOwnProperty(group.field) &&
                        ['string', 'number'].indexOf(typeof record.data[group.field]) >= 0 &&
                        groupValue != record.data[group.field]
                    ) {
                        groupValue = record.data[group.field];
                        renderRecords.push(that.renderGroup(table, group, record));
                    }

                    renderRecords.push(that.renderRecord(table, record));
                    table._recordsNumber++;
                }
            });
        }

        if (renderRecords.length === 0) {
            renderRecords = [
                $(
                    ejs.render(coreuiTableTpl['table-records-empty.html'], {
                        columnsCount: table._countColumnsShow,
                        lang: table.getLang(),
                    })
                )
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

        record = $.extend(true, {}, record);

        $.each(table._columns, function (key, column) {
            if ( ! column.isShow()) {
                return;
            }

            let field = that.renderField(table, column, record);

            if (field) {
                fields.push(field);
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

        let recordElement = $(
            ejs.render(coreuiTableTpl['table-record.html'], {
                record: {
                    attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                    index: record.index,
                    fields: fields,
                }
            })
        );

        $.each(fields, function (key, field) {
            recordElement.find(' > td:eq(' + key + ')').html(field.content)
        });

        return recordElement;
    },


    /**
     * Сборка ячейки таблицы
     * @param {object} table
     * @param {object} column
     * @param {object} record
     * @returns {{ attr: (string), content: (string) }}
     * @private
     */
    renderField: function (table, column, record) {

        let columnOptions = column.getOptions();
        let columnField   = typeof columnOptions.field === 'string' ? columnOptions.field : null;
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
     * @param {object} table
     * @param {object} group
     * @param {object} record
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    renderGroup: function (table, group, record) {

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
            if (typeof value === 'string') {
                attributes.push(name + '="' + value + '"');
            }
        });

        let recordElement = $(
            ejs.render(coreuiTableTpl['table-record-group.html'], {
                attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                colspan: table._countColumnsShow,
            })
        );

        let content = record.data[group.field];

        if (group.hasOwnProperty('render') && typeof group.render === 'function') {
            let renderContent = group.render(record);

            if (renderContent) {
                content = renderContent;
            }
        }

        recordElement.find(' > td').html(content);

        return recordElement;
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


        let expandRecord = $(
            ejs.render(coreuiTableTpl['table-record-expand.html'], {
                colspan: table._countColumnsShow,
            })
        );

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
            let controlElement = $(
                ejs.render(coreuiTableTpl['table-control.html'], {
                    id: control.getId()
                })
            );

            controlElement.append(control.render());

            if (control.hasOwnProperty('initEvents') && typeof control.initEvents === 'function') {
                table.on('container_show', function () {
                    control.initEvents()
                });
            }

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