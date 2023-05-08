
CoreUI.table.columns.select = {

    _table: null,
    _options: {
        type: 'select',
        label: '',
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


        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);

        this._options.label = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">';
        let tableWrapper    = '#coreui-table-' + table._options.id + ' > .coreui-table__container > .coreui-table__wrapper';
        let containers      = tableWrapper + ' > table > tbody > tr.coreui-table__record > td.coreui-table__select_container';


        // Показ строк
        this._table.on('show-records.coreui.table', function () {

            // Отмена обработки нажатия в select колонках
            $(containers).click(function (event) {
                event.stopPropagation();
            });

            // Выбор строки
            $(containers + ' > .coreui-table__select').click(function (event) {
                let recordKey = $(this).val();
                let record    = table._getRecordByKey(recordKey);
                let row       = table._getRowByKey(recordKey);

                if ( ! record || ! row) {
                    return;
                }

                if ($(this).is(':checked')) {
                    $(row).addClass('table-primary');
                    table._trigger('select.coreui.table', table, [ record ]);
                } else {
                    $(row).removeClass('table-primary');
                    table._trigger('unselect.coreui.table', table, [ record ]);
                }
            });

            // Выбор всех строк
            $(tableWrapper + ' > table > thead > tr > td > .coreui-table__select-all').click(function (event) {
                if ($(this).is(':checked')) {
                    table.selectAll();
                } else {
                    table.unselectAll();
                }
            });
        });
    },


    /**
     * Получение параметров
     */
    getOptions: function () {
        return this._options;
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @param {string} recordKey
     * @returns {string}
     */
    render: function(content, record, recordKey) {

        return '<input class="coreui-table__select form-check-input" type="checkbox" value="' + recordKey + '">';
    }
}