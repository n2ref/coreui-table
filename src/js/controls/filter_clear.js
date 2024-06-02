
import coreuiTable         from "../coreui.table";
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.filter_clear = {

    _id: null,
    _table: null,
    _options: {
        id: null,
        type: 'filter_clear',
        content: null,
        attr: {
            class: 'btn btn-secondary'
        },
    },


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend(true, {}, this._options, options);
        this._table   = table;
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();


        if ( ! this._options.hasOwnProperty('content') ||
            typeof this._options.content !== 'string'
        ) {
            this._options.content = '<i class="bi bi-x"></i> ' + table.getLang().clear
        }
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {
        return $.extend(true, {}, this._options);
    },


    /**
     * Получение id
     * @returns {string}
     */
    getId: function () {
        return this._id;
    },


    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function () {

        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let that    = this;

        $('button', control).click(function () {
            that._table.filtersClear();
        });

        this._table.on('filters_change', function (filterData) {

            if (filterData.length > 0) {
                $('button', control).show();
            } else {
                $('button', control).hide();
            }
        });
    },


    /**
     * Формирование контента
     * @returns {string}
     */
    render: function() {

        let options = this.getOptions();

        if ( ! coreuiTableUtils.isObject(options.attr)) {
            options.attr = {};
        }

        if (options.attr.hasOwnProperty('type')) {
            delete options.attr.type;
        }

        let filterData = this._table.getFilterData();

        if (filterData.length === 0) {
            if (options.attr.hasOwnProperty('style') && typeof options.attr.style === 'string') {
                options.attr.style += ';display:none;'
            } else {
                options.attr.style = "display:none"
            }
        }

        let attr = [];

        $.each(options.attr, function (name, value) {
            attr.push(name + '="' + value + '"');
        });

        return ejs.render(coreuiTableTpl['controls/filter_clear.html'], {
            attr: attr.length > 0 ? (' ' + attr.join(' ')) : '',
            content: options.content ? options.content : '',
        });
    }
}