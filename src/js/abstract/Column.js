

class Column {

    _table   = null;
    _options = {
        type: '',
        field: null,
        label: null,
        show: true,
        showLabel: true,
        width: null,
        minWidth: null,
        maxWidth: null,
        attr: null,
        attrHeader: null,
        render: null
    };


    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        this._table   = table;
        this._options = $.extend(true, this._options, options);
    }


    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow(isShow) {
        this._options.show = !! isShow;
    }


    /**
     * Видимости колонки
     */
    isShow() {
        return !! this._options.show;
    }


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions() {
        return $.extend({}, this._options);
    }


    /**
     * Получение имени поля
     * @returns {string|null}
     */
    getField() {
        return typeof this._options.field === 'string' ? this._options.field : null;
    }


    /**
     * Формирование контента
     * @param {*}      content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {}
}

export default Column;