

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


        if (typeof options.columnGroupsHeader === 'object' &&
            Array.isArray(options.columnGroupsHeader) &&
            options.columnGroupsHeader.length > 0
        ) {
            let rows = [];

            $.each(options.columnGroupsHeader, function (key, headerRow) {
                if (typeof headerRow === 'object' && Array.isArray(headerRow)) {
                    let cells = [];

                    $.each(headerRow, function (key, headerColumn) {
                        if (typeof headerColumn === 'object' && ! Array.isArray(headerColumn)) {
                            let attributes = [];

                            if (headerColumn.attr && typeof headerColumn.attr === 'object') {
                                $.each(headerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                label: headerColumn.hasOwnProperty('label') ? headerColumn.label : '',
                                description: headerColumn.hasOwnProperty('description') ? headerColumn.description : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(
                        ejs.render(coreuiTableTpl['table-columns.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            columnGroupsHeader = rows.join('');
        }

        if (typeof options.columnGroupsFooter === 'object' &&
            Array.isArray(options.columnGroupsFooter) &&
            options.columnGroupsFooter.length > 0
        ) {
            let rows = [];

            $.each(options.columnGroupsFooter, function (key, footerRow) {
                if (typeof footerRow === 'object' && Array.isArray(footerRow)) {
                    let cells = [];

                    $.each(footerRow, function (key, footerColumn) {
                        if (typeof footerColumn === 'object' && ! Array.isArray(footerColumn)) {
                            let attributes = [];

                            if (footerColumn.attr && typeof footerColumn.attr === 'object') {
                                $.each(footerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                label: footerColumn.hasOwnProperty('label') ? footerColumn.label : '',
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

        if (typeof options.size === 'string' && options.size) {
            classes.push('table-' + options.size);
        }

        if (typeof options.hover === 'boolean' && options.hover) {
            classes.push('table-hover');
        }

        if (typeof options.striped === 'boolean' && options.striped) {
            classes.push('table-striped');
        }

        if ( ! columnGroupsFooter) {
            classes.push('empty-tfoot');
        }

        let htmlColumns = ejs.render(coreuiTableTpl['table-columns.html'], {
            columns: columns,
        });

        let theadAttr = [];

        if (options.hasOwnProperty('theadTop') &&
            ['string', 'number'].indexOf(typeof options.theadTop) >= 0 &&
            options.theadTop > 0
        ) {
            let unit = coreuiTableUtils.isNumeric(options.theadTop) ? 'px' : '';
            theadAttr.push('style="top:' + options.theadTop + unit + '"');
        }

        let tableElement = $(
            ejs.render(coreuiTableTpl['table.html'], {
                classes: classes.join(' '),
                theadAttr: theadAttr.length > 0 ? theadAttr.join(' ') : '',
                show: options.show,
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
            let that = this;

            $.each(records, function (key, record) {

                if (record.show) {
                    renderRecords.push(that.renderRecord(table, record));
                    table._recordsNumber++;
                }
            });
        }

        if (renderRecords.length === 0) {
            renderRecords = [
                $(
                    ejs.render(coreuiTableTpl['table-records-empty.html'], {
                        columnsCount: table._columns.length > 0 ? table._columns.length : 1,
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
            let alloyComponents  = [
                'coreui.table',
                'coreui.layout',
                'coreui.panel',
                'coreui.tabs',
                'coreui.info',
                'coreui.chart',
            ];

            if ( ! Array.isArray(components)) {
                components = [ components ];
            }

            for (let i = 0; i < components.length; i++) {
                if (typeof components[i] === 'string' ||
                    (window.hasOwnProperty('jQuery') && components[i] instanceof jQuery)
                ) {
                    result.push(components[i]);

                } else if (typeof components[i] === 'string') {
                    result.push(components[i]);

                } else if ( ! Array.isArray(components[i]) &&
                    components[i].hasOwnProperty('component') &&
                    alloyComponents.indexOf(components[i].component) >= 0
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