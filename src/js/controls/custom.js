
CoreUI.table.controls.custom = {

    _table: null,
    _options: {
        id: null,
        type: 'custom',
        content: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;

        if ( ! this._options.id) {
            this._options.id = CoreUI.table._hashCode();
        }
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {

        return this._options.id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        return this._options.content;
    }
}