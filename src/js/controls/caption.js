
import '../../../node_modules/ejs/ejs.min';
import coreuiTableTpl      from '../coreui.table.templates';
import coreuiTableUtils    from '../coreui.table.utils';
import coreuiTable         from "../coreui.table";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.caption = {

    _id: null,
    _table: null,
    _options: {
        id: null,
        type: 'caption',
        title: null,
        description: null,
        value: null,
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

        return ejs.render(coreuiTableTpl['controls/caption.html'], {
            title: this._options.title,
            description: this._options.description,
            value: this._options.value,
        });
    }
}