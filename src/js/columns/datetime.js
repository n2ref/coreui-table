
import Column           from "../abstract/Column";
import coreuiTableUtils from "../coreui.table.utils";


class ColumnsDatetime extends Column {


    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, { type: 'datetime',
            field: null,
            label: null,
            show: true,
            width: null,
            format: 'DD.MM.YYYY hh:mm:ss',
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
                    .replace(/D/g, date.getDate())
                    .replace(/hh/g, coreuiTableUtils.strPadLeft(date.getHours(), 2))
                    .replace(/mm/g, coreuiTableUtils.strPadLeft(date.getMinutes(), 2))
                    .replace(/m/g, date.getMinutes())
                    .replace(/ss/g, coreuiTableUtils.strPadLeft(date.getSeconds(), 2))
                    .replace(/s/g, date.getSeconds());
            }

        } catch (e) {
            content = '';
        }

        return content;
    }
}

export default ColumnsDatetime;