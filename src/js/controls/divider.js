
import 'ejs/ejs.min';
import coreuiTable      from "../coreui.table";
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from '../coreui.table.utils';

coreuiTable.controls.divider = {

    _id: null,
    _table: null,
    _options: {
        type: 'divider',
        width: 40,
        attr: {
            class: 'd-inline-block',
            style: 'height:20px'
        }
    },


    /**
     * Инициализация
     * @param {object} table
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

        this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, { style: 'width:' + this._options.width + 'px' });

        $.each(this._options.attr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });

        return ejs.render(coreuiTableTpl['controls/divider.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}