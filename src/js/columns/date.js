
import Column           from "../abstract/Column";
import coreuiTableUtils from "../coreui.table.utils";


class ColumnsDate extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'date',
            field: null,
            label: null,
            show: true,
            width: null,
            format: 'DD.MM.YYYY',
            attr: {},
            attrHeader: {},
            render: null
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

        if (typeof content !== 'string') {
            return '';
        }


        try {
            if (content !== '') {
                let date = new Date(content);

                content = this._options.format
                    .replace(/YYYY/g, coreuiTableUtils.strPadLeft(date.getFullYear(), 4))
                    .replace(/MM/g, coreuiTableUtils.strPadLeft(date.getMonth() + 1, 2))
                    .replace(/M/g, date.getMonth() + 1)
                    .replace(/DD/g, coreuiTableUtils.strPadLeft(date.getDate(), 2))
                    .replace(/D/g, date.getDate());
            }

        } catch (e) {
            content = '';
        }


        return content;
    }
}


export default ColumnsDate;