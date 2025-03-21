
import Column           from "../abstract/Column";
import TableUtils from "../table.utils";


class ColumnsDatetime extends Column {


    /**
     * Инициализация
     * @param {TableInstance} table
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
                let lang = this._table.getLang()
                let date = new Date(content);

                content = this._options.format
                    .replace(/YYYY/g, TableUtils.strPadLeft(date.getFullYear(), 4))
                    .replace(/MMMM/g, lang.monthNames[date.getMonth() + 1])
                    .replace(/MMM/g, lang.monthNamesShort[date.getMonth() + 1])
                    .replace(/MM/g, TableUtils.strPadLeft(date.getMonth() + 1, 2))
                    .replace(/M/g, date.getMonth() + 1)
                    .replace(/DD/g, TableUtils.strPadLeft(date.getDate(), 2))
                    .replace(/D/g, date.getDate())
                    .replace(/dddd/g, lang.dayNames[date.getMonth() + 1])
                    .replace(/ddd/g, lang.dayNamesMin[date.getMonth() + 1])
                    .replace(/hh/g, TableUtils.strPadLeft(date.getHours(), 2))
                    .replace(/mm/g, TableUtils.strPadLeft(date.getMinutes(), 2))
                    .replace(/m/g, date.getMinutes())
                    .replace(/ss/g, TableUtils.strPadLeft(date.getSeconds(), 2))
                    .replace(/s/g, date.getSeconds());
            }

        } catch (e) {
            content = '';
        }

        return content;
    }
}

export default ColumnsDatetime;