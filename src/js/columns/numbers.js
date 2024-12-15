
import Column from "../abstract/Column";


class ColumnsNumbers extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'numbers',
            label: '№',
            width: 20,
            attr: { class: 'text-end' },
            attrHeader: null
        }, options);

        super(table, options);
    }


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {

        return this._table._recordsNumber;
    }
}

export default ColumnsNumbers;