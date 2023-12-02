
CoreUI.table.columns.switch = {

    _table: null,
    _options: {
        type: 'switch',
        label: '',
        field: '',
        width: 5,
        valueY: 'Y',
        valueN: 'N',
        attr: { class: 'coreui-table__switch_container' },
        attrHeader: { },
        onChange: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        this._table    = table;
        this._options  = $.extend(true, {}, this._options, options);
        let that       = this;
        let containers = '#coreui-table-' + table._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__switch_container';

        // Показ строк
        this._table.on('show-records.coreui.table', function () {

            // Отмена обработки нажатия в switch колонках
            $(containers).click(function (event) {
                event.stopPropagation();
            });

            // События нажатия на переключатель
            if (that._options.hasOwnProperty('onChange') &&
                (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')
            ) {
                $(containers + ' .coreui-table__switch[data-field="' + that._options.field + '"]').change(function (event) {
                    let recordKey = $(this).val();
                    let isChecked = $(this).is(':checked');
                    let record    = table._getRecordByKey(recordKey);

                    if (typeof that._options.onChange === 'function') {
                        that._options.onChange(record, isChecked, this);

                    } else if (typeof that._options.onChange === 'string') {
                        let id = '';

                        if (record.hasOwnProperty(table._options.primaryKey)) {
                            id = record[table._options.primaryKey];
                        }

                        let func = new Function('record', 'checked', 'id', that._options.onChange);
                        func(record, this, id);
                    }

                    return false;
                });
            }
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

        let checked = record.hasOwnProperty(this._options.field) && record[this._options.field] === this._options.valueY
            ? ' checked="checked"'
            : '';


        return '<div class="form-switch">' +
                   '<input class="coreui-table__switch form-check-input" type="checkbox" value="' + recordKey + '"' + checked +
                         ' data-field="' + this._options.field + '" data-field="' + this._options.field + '">' +
               '</div>';
    }
}