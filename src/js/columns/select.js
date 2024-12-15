
import coreuiTableElements from "../coreui.table.elements";
import coreuiTablePrivate  from "../coreui.table.private";
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import Column              from "../abstract/Column";

class ColumnsSelect extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        let originalOptions = {
            type: 'select',
            field: null,
            label: '',
            show: true,
            width: 35,
            attr: { class: 'coreui-table__select_container text-center' },
            attrHeader: { class: 'text-center' }
        };

        if (options.hasOwnProperty('attr')) {
            options.attr = coreuiTableUtils.mergeAttr(originalOptions.attr, options.attr);
        }
        if (options.hasOwnProperty('attrHeader')) {
            options.attrHeader = coreuiTableUtils.mergeAttr(originalOptions.attrHeader, options.attrHeader);
        }

        options = $.extend(true, originalOptions, options);

        super(table, options);


        this._options.label = coreuiTableTpl['columns/select_label.html'];

        // Показ строк
        table.on('records_show', function () {

            let selects   = coreuiTableElements.getRowsSelects(table.getId());
            let selectAll = coreuiTableElements.getRowsSelectAll(table.getId());

            // Отмена обработки нажатия в select колонках
            $(selects).click(function (event) {
                event.stopPropagation();
            });

            // Выбор всех строк
            selectAll.click(function (event) {
                if ($(this).is(':checked')) {
                    table.selectAll();
                } else {
                    table.unselectAll();
                }
            });
        });
    }


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {

        let select = $(
            coreuiTableUtils.render(coreuiTableTpl['columns/select.html'], {
                index: record.index
            })
        );

        let that = this;

        // Выбор строки
        select.click(function () {
            let tr = coreuiTableElements.getTrByIndex(that._table.getId(), record.index);

            if ( ! tr) {
                return;
            }

            if ($(this).is(':checked')) {
                $(tr).addClass('table-primary');

                coreuiTablePrivate._trigger(that._table, 'record_select', [ record ]);
            } else {
                $(tr).removeClass('table-primary');

                coreuiTablePrivate._trigger(that._table, 'record_unselect', [ record ]);
            }
        });

        return select;
    }
}

export default ColumnsSelect;