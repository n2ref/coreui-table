import coreuiTable from "../coreui.table";
import coreuiTableElements from "../coreui.table.elements";
import coreuiTableTpl from "../coreui.table.templates";

coreuiTable.columns.switch = {

    _table: null,
    _options: {
        type: 'switch',
        label: '',
        field: '',
        show: true,
        disabled: false,
        width: 5,
        valueY: 'Y',
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

        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);

        // Показ строк
        this._table.on('records_show', function () {

            let containers = coreuiTableElements.getRowsSwitches(table.getId());

            // Отмена обработки нажатия в switch колонках
            containers.click(function (event) {
                event.stopPropagation();
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
        return $.extend(true, {}, this._options);
    },


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function(content, record) {

        let isChecked = record.data.hasOwnProperty(this._options.field) &&
                        record.data[this._options.field] === this._options.valueY;

        let formSwitch = $(
            ejs.render(coreuiTableTpl['columns/switch.html'], {
                index: record.index,
                field: this._options.field,
                disabled: this._options.disabled,
                checked: isChecked
            })
        );

        // События нажатия на переключатель
        if (this._options.hasOwnProperty('onChange') &&
            (typeof this._options.onChange === 'function' || typeof this._options.onChange === 'string')
        ) {
            let that = this;

            $('.coreui-table__switch', formSwitch).change(function (event) {
                let isChecked = $(this).is(':checked');

                if (typeof that._options.onChange === 'function') {
                    that._options.onChange(record, isChecked, this);

                } else if (typeof that._options.onChange === 'string') {
                    let id = null;

                    if (record.hasOwnProperty(that._table._options.primaryKey)) {
                        id = record[that._table._options.primaryKey];
                    }

                    let func = new Function('record', 'checked', 'id', that._options.onChange);
                    func(record, this, id);
                }

                return false;
            });
        }

        return formSwitch;
    }
}