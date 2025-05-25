
import Column from "../abstract/Column";
import moment from 'moment/src/moment';
import 'moment/src/locale/ru'



class ColumnDateHuman extends Column {

    _lang = null;

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'dateHuman',
            field: null,
            label: null,
            show: true,
            width: null,
            attr: {},
            attrHeader: {},
            render: null
        }, options);

        super(table, options);

        this._lang = table.getOptions().lang;
    }


    /**
     * Формирование контента
     * @param {string|number|Date} content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {

        if (['string', 'number'].indexOf(typeof content) < 0 && ! (content instanceof Date)) {
            return '';
        }

        try {
            if (content) {
                let dateContent = content instanceof Date ? content : new Date(content);
                let dateFormat  = moment(dateContent).format('MM.DD.yyyy HH:mm:ss');

                content = moment(dateContent).locale(this._lang).fromNow();
                content = '<span title="' + dateFormat + '">' + content + '</span>';
            }

        } catch (e) {
            console.warn(e)
            content = '';
        }


        return content;
    }
}


export default ColumnDateHuman;