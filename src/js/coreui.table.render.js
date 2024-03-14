

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
        let htmlRecords        = '';
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

                if (columnOptions.hasOwnProperty('fixed') && typeof columnOptions.fixed === 'string') {
                    columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });

                    columnOptions.attr = coreuiTableUtils.mergeAttr(columnOptions.attr, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });
                }

                if (columnOptions.attrHeader && typeof columnOptions.attrHeader === 'object') {
                    $.each(columnOptions.attrHeader, function (name, value) {
                        attributes.push(name + '="' + value + '"');
                    });
                }

                colGroups.push({
                    width: columnOptions.hasOwnProperty('width') ? columnOptions.width : '',
                    unit: typeof columnOptions.width === 'number' ? 'px' : ''
                });

                columns.push({
                    attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                    label: columnOptions.hasOwnProperty('label') ? columnOptions.label : ""
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

                htmlRecords = coreuiTableRender.renderRecords(table, table._records);
            } else {
                htmlRecords = coreuiTableRender.renderRecords(table, []);
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

        if ( ! columnGroupsFooter || ! render.pages) {
            classes.push('empty-tfoot');
        }

        let htmlColumns = ejs.render(coreuiTableTpl['table-columns.html'], {
            columns: columns,
        });

        return ejs.render(coreuiTableTpl['table.html'], {
            classes: classes.join(' '),
            show: options.show,
            columnGroupsHeader : columnGroupsHeader,
            colGroups : colGroups,
            columns : htmlColumns,
            columnGroupsFooter : columnGroupsFooter,
            records : htmlRecords,
        })
    },


    /**
     * Сборка записей таблицы
     * @param {object} table
     * @param {Array}  records
     * @return {*}
     */
    renderRecords: function (table, records) {

        let result        = '';
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

        if (renderRecords.length > 0) {
            result = ejs.render(coreuiTableTpl['table-records.html'], {
                records: renderRecords,
            });

        } else {
            result = ejs.render(coreuiTableTpl['table-records-empty.html'], {
                columnsCount: table._columns.length > 0 ? table._columns.length : 1,
                lang: table.getLang(),
            });
        }

        return result;
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

        $.each(table._columns, function (key, column) {
            if ( ! column.isShow()) {
                return;
            }

            fields.push(that.renderField(column, record));
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

        return {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            fields: fields
        };
    },


    /**
     * Сборка ячейки таблицы
     * @param {object} column
     * @param {object} record
     * @returns {{ attr: (string), content: (string) }}
     * @private
     */
    renderField: function (column, record) {

        let columnOptions = column.getOptions();
        let columnField   = typeof columnOptions.field === 'string' ? columnOptions.field : null;
        let content       = '';
        let fieldProps    = record.meta && record.meta.hasOwnProperty('fields') && record.meta.fields.hasOwnProperty(columnField)
            ? record.meta.fields[columnField]
            : null;
        let fieldAttr = coreuiTableUtils.isObject(columnOptions.attr)
            ? columnOptions.attr
            : {};
        
        if (fieldProps && coreuiTableUtils.isObject(fieldProps.attr)) {
            fieldAttr = coreuiTableUtils.mergeAttr(fieldAttr, fieldProps.attr);
        }

        if (typeof columnOptions.render === 'function') {
            content = columnOptions.render(record);
        } else {
            content = columnField && record.data.hasOwnProperty(columnField)
                ? record.data[columnField]
                : '';
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
     */
    renderControl: function (table, control) {

        if (coreuiTableUtils.isObject(control)) {
            let controlRender = ejs.render(coreuiTableTpl['table-control.html'], {
                control: {
                    id: control.getId(),
                    content: control.render(),
                }
            });

            if (control.hasOwnProperty('initEvents') && typeof control.initEvents === 'function') {
                table.on('shown', function () {
                    control.initEvents()
                });
            }

            return controlRender;
        }
    }
}

export default coreuiTableRender;