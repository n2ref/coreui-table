
import coreuiTableUtils from '../coreui.table.utils';
import coreuiTable      from "../coreui.table";
import coreuiTableTpl from "../coreui.table.templates";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.page_jump = {

    _id: null,
    _table: null,
    _options: {
        attr: {
            class: 'input-group'
        },
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
            options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
        }

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = coreuiTableUtils.hashCode();
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that    = this;
        let control = coreuiTableElements.getControl(this._table.getId(), this.getId());
        let input   = $('input', control);
        let button  = $('button', control);

        if (button[0]) {
            button.click(function () {
                that._table.goPage(input.val());
            });
            input.keyup(function (event) {
                if (event.key === 'Enter' || event.keyCode === 13) {
                    that._table.goPage(input.val());
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

        return ejs.render(coreuiTableTpl['controls/page-jump.html'], {
            recordsPerPageList: this._options.list,
            recordsPerPage: this._table._recordsPerPage,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: this._table.getLang(),
        });
    }
}