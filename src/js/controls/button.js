
CoreUI.table.controls.button = {

    _table: null,
    _options: {
        id: null,
        type: 'button',
        href: null,
        content: null,
        onClick: null,
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

        let that = this;

        if (typeof this._options.onClick === 'function') {
            $('#coreui-table-' + this._table._options.id + ' #coreui-table-control-' + this._options.id + ' > button')
                .click(function (event) {
                    that._options.onClick(event, that._table);
                });
        }
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


        return CoreUI.table.ejs.render(CoreUI.table.tpl['controls/button.html'], {
            control: this._options,
            render: this._render,
        });
    }
}