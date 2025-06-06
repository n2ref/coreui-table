
import Elements from "../elements";
import Tpl      from "../tpl";
import Utils    from "../utils";
import Column              from "../abstract/Column";

class ColumnSwitch extends Column {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'switch',
            label: '',
            field: '',
            show: true,
            disabled: false,
            width: 5,
            valueY: 1,
            valueN: 0,
            attr: { class: 'coreui-table__switch_container' },
            attrHeader: { },
            onChange: null
        }, options);

        super(table, options);


        // Показ строк
        table.on('records_show', function () {

            let containers = Elements.getRowsSwitches(table.getId());

            // Отмена обработки нажатия в switch колонках
            containers.click(function (event) {
                event.stopPropagation();
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

            /**
             * Активация переключателя
             */
            setActive: function () {

                if (content) {
                    $('.coreui-table__switch', content).prop('checked', true).trigger('change');
                }
            },

            /**
             * Деактивация переключателя
             */
            setInactive: function () {

                if (content) {
                    $('.coreui-table__switch', content).prop('checked', false).trigger('change');
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

        let isChecked = content === this._options.valueY;

        let formSwitch = $(Utils.render(Tpl['columns/switch.html'], {
            index: record.index,
            field: this._options.field,
            disabled: this._options.disabled,
            checked: isChecked
        }));

        // События нажатия на переключатель
        let that  = this;
        let table = this._table;

        $('.coreui-table__switch', formSwitch).change(function (event) {

            let input = this;

            table._records.map(function (recordTable) {
                if (record.index === recordTable.index) {
                    recordTable.data[that._options.field] = input.checked ? that._options.valueY : that._options.valueN;
                    return false;
                }
            });


            if (that._options.hasOwnProperty('onChange') &&
                (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')
            ) {
                let prop = {
                    table: table,
                    record: record,
                    input: input,
                    event: event,
                };

                if (typeof that._options.onChange === 'function') {
                    that._options.onChange(prop);

                } else {
                    let func = new Function('prop', that._options.onChange);
                    func(prop);
                }

                return false;
            }
        });

        return formSwitch;
    }
}

export default ColumnSwitch;