
import '../../../node_modules/ejs/ejs.min';
import coreuiTable      from "../coreui.table";
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from '../coreui.table.utils';
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.page_size = {

    _id: null,
    _table: null,
    _options: {
        attr: {
            class: 'form-select'
        },
        list: [ 25, 50, 100, 1000 ]
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function (table, options) {

        if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
            options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
        }

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = coreuiTableUtils.hashCode();

        if ( ! Array.isArray(this._options.list)) {
            this._options.list = [];
        }

        if (this._options.list.indexOf(this._table._recordsPerPage) < 0) {
            this._options.list.unshift(this._table._recordsPerPage);
        }
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that           = this;
        let control        = coreuiTableElements.getControl(this._table.getId(), this.getId());
        let selectPageSize = $('select', control);

        selectPageSize.change(function () {
            that._table._page = 1;
            that._table.setPageSize(Number(selectPageSize.val()));
            that._table.reload();
        });

        this._table.on('page_size_update', function () {
            selectPageSize.val(that._table._recordsPerPage);
        });
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

        return ejs.render(coreuiTableTpl['controls/page-size.html'], {
            recordsPerPageList: this._options.list,
            recordsPerPage: this._table._recordsPerPage,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: this._table.getLang(),
        });
    }
}