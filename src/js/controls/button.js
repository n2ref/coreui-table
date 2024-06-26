
import coreuiTableTpl      from '../coreui.table.templates';
import coreuiTableUtils    from '../coreui.table.utils';
import coreuiTable         from "../coreui.table";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.button = {

    _id: null,
    _table: null,
    _options: {
        id: null,
        type: 'button',
        content: null,
        onClick: null,
        attr: {
            class: 'btn btn-secondary'
        }
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that = this;

        if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {

            let control = coreuiTableElements.getControl(this._table.getId(), this.getId());
            $('button', control)
                .click(function (event) {
                    if (typeof that._options.onClick === 'function') {
                        that._options.onClick(event, that._table, that);

                    } else if (typeof that._options.onClick === 'string') {
                        let func = new Function('event', 'table', 'control', that._options.onClick);
                        func(event, that._table, that);
                    }
                });
        }
    },


    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function () {
        return this._id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        let attributes = [];

        if (coreuiTableUtils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });
        }


        return coreuiTableUtils.render(coreuiTableTpl['controls/button.html'], {
            content: this._options.content,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}