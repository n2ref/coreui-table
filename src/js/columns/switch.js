import coreuiTable from "../coreui.table";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.columns.switch = {

    _table: null,
    _options: {
        type: 'switch',
        label: '',
        field: '',
        show: true,
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

        let that      = this;
        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);

        // Показ строк
        this._table.on('show-records', function () {

            let containers = coreuiTableElements.getRowsSwitches(that._table.getId());

            // Отмена обработки нажатия в switch колонках
            containers.click(function (event) {
                event.stopPropagation();
            });

            // События нажатия на переключатель
            if (that._options.hasOwnProperty('onChange') &&
                (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')
            ) {
                $('.coreui-table__switch[data-field="' + that._options.field + '"]', containers).change(function (event) {
                    let recordIndex = $(this).val();
                    let isChecked   = $(this).is(':checked');
                    let record      = table.getRecordByIndex(recordIndex);

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
        return $.extend(true, {}, this._options);
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function(content, record) {

        let checked = record.data.hasOwnProperty(this._options.field) && record.data[this._options.field] === this._options.valueY
            ? ' checked="checked"'
            : '';


        return '<div class="form-switch">' +
                   '<input class="coreui-table__switch form-check-input" type="checkbox" value="' + record.index + '"' + checked +
                         ' data-field="' + this._options.field + '" data-field="' + this._options.field + '">' +
               '</div>';
    }
}