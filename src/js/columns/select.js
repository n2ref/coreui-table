
import Elements from "../elements";
import Private  from "../private";
import Tpl      from "../tpl";
import Utils    from "../utils";
import Column              from "../abstract/Column";

class ColumnSelect extends Column {

    /**
     * Инициализация
     * @param {Table} table
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
            options.attr = Utils.mergeAttr(originalOptions.attr, options.attr);
        }
        if (options.hasOwnProperty('attrHeader')) {
            options.attrHeader = Utils.mergeAttr(originalOptions.attrHeader, options.attrHeader);
        }

        options = $.extend(true, originalOptions, options);

        super(table, options);


        this._options.label = Tpl['columns/select_label.html'];

        // Показ строк
        table.on('records_show', function () {

            let selects   = Elements.getRowsSelects(table.getId());
            let selectAll = Elements.getRowsSelectAll(table.getId());

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
     * Получение списка методов которые можно совершать с ячейкой строки
     * @param {jQuery} content
     * @param {string} field
     * @param {object} record
     */
    getActions(content, field, record) {

        return {
            setActive: function () {
                if (content) {
                    $(content).prop('checked', true).trigger('click');
                }
            },

            setInactive: function () {
                if (content) {
                    $(content).prop('checked', false).trigger('click');
                }
            }
        }
    }


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {jQuery}
     */
    render(content, record) {

        let select = $(Utils.render(Tpl['columns/select.html'], {
            index: record.index
        }));

        let that = this;

        // Выбор строки
        select.click(function () {
            let tr = Elements.getTrByIndex(that._table.getId(), record.index);

            if ( ! tr) {
                return;
            }

            if ($(this).is(':checked')) {
                $(tr).addClass('table-primary');

                Private._trigger(that._table, 'record_select', [record ]);
            } else {
                $(tr).removeClass('table-primary');

                Private._trigger(that._table, 'record_unselect', [record ]);
            }
        });

        return select;
    }
}

export default ColumnSelect;