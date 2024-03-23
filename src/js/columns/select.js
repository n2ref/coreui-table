import coreuiTable         from "../coreui.table";
import coreuiTableElements from "../coreui.table.elements";
import coreuiTablePrivate  from "../coreui.table.private";

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
        this._options.label = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">';

        // Показ строк
        this._table.on('records_show', function () {

            let selects   = coreuiTableElements.getRowsSelects(table.getId());
            let selectAll = coreuiTableElements.getRowsSelectAll(table.getId());

            // Отмена обработки нажатия в select колонках
            $(selects).click(function (event) {
                event.stopPropagation();
            });

            // Выбор строки
            $(' > .coreui-table__select', selects).click(function (event) {
                let recordIndex = $(this).val();
                let record      = table.getRecordByIndex(recordIndex);
                let tr          = coreuiTableElements.getTrByIndex(table.getId(), recordIndex);

                if ( ! record || ! tr) {
                    return;
                }

                if ($(this).is(':checked')) {
                    $(tr).addClass('table-primary');

                    coreuiTablePrivate._trigger(table, 'record_select', table, [ record ]);
                } else {
                    $(tr).removeClass('table-primary');

                    coreuiTablePrivate._trigger(table, 'record_unselect', table, [ record ]);
                }
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

        return '<input class="coreui-table__select form-check-input" type="checkbox" value="' + record.index + '">';
    }
}