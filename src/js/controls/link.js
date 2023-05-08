
CoreUI.table.controls.link = {

    _table: null,
    _options: {
        id: null,
        type: 'link',
        href: null,
        content: null,
        attr: null
    },
    _render: {
        attr: ''
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

        if (typeof this._options.attr === 'object') {
            let attributes = [];

            $.each(this._options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });

            this._render.attr = ' ' + attributes.join(' ');
        }

        return CoreUI.table.ejs.render(CoreUI.table.tpl['controls/link.html'], {
            control: this._options,
            render: this._render,
        });
    }
}