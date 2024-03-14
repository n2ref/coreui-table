
import '../../../node_modules/ejs/ejs.min';
import coreuiTableTpl   from '../coreui.table.templates';
import coreuiTableUtils from '../coreui.table.utils';
import coreuiTable      from "../coreui.table";

coreuiTable.controls.link = {

    _id: null,
    _table: null,
    _options: {
        href: null,
        content: null,
        attr: null
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = coreuiTableUtils.hashCode();
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
        return this._id;
    },


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function() {

        let attributes = [];

        if (typeof this._options.attr === 'object') {
            $.each(this._options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });
        }

        return ejs.render(coreuiTableTpl['controls/link.html'], {
            href: this._options.href,
            content: this._options.content,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}