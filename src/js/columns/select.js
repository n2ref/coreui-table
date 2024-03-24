import coreuiTable         from "../coreui.table";
import coreuiTableElements from "../coreui.table.elements";
import coreuiTablePrivate  from "../coreui.table.private";
import coreuiTableTpl      from "../coreui.table.templates";

coreuiTable.columns.select = {

    _table: null,
    _options: {
        type: 'select',
        field: null,
        label: '',
        show: true,
        width: 35,
        attr: { class: 'coreui-table__select_container text-center' },
        attrHeader: { class: 'text-center' }
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        if (options.hasOwnProperty('attr')) {
            options.attr = CoreUI.table._mergeAttr(this._options.attr, options.attr);
        }
        if (options.hasOwnProperty('attrHeader')) {
            options.attrHeader = CoreUI.table._mergeAttr(this._options.attrHeader, options.attrHeader);
        }


        this._table         = table;
        this._options       = $.extend(true, {}, this._options, options);
        this._options.label = coreuiTableTpl['columns/select_label.html'];

        // Показ строк
        this._table.on('records_show', function () {

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
    },


    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function (isShow) {
        this._options.show = !! isShow;
    },


    /**
     * Видимости колонки
     */
    isShow: function () {
        return !! this._options.show;
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {
        return $.extend({}, this._options);
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function(content, record) {

        let select = $(
            ejs.render(coreuiTableTpl['columns/select.html'], {
                index: record.index
            })
        );

        let that = this;

        // Выбор строки
        select.click(function (event) {
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