
import coreuiTableUtils from '../coreui.table.utils';
import coreuiTable      from "../coreui.table";
import coreuiTableTpl from "../coreui.table.templates";
import CoreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.columns = {

    _id: null,
    _table: null,
    _options: {
        id: null,
        type: 'columns',
        btn: {
            content: '<i class="bi bi-layout-three-columns"></i>',
            attr: {
                class: 'btn btn-outline-secondary'
            }
        },
        btnComplete: {
            content: null,
            attr: { class: 'btn btn-primary' }
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


        if ( ! CoreuiTableUtils.isObject(this._options.btn)) {
            this._options.btn = {};
        }

        if ( ! CoreuiTableUtils.isObject(this._options.btnComplete)) {
            this._options.btnComplete = {};
        }

        if (CoreuiTableUtils.isObject(this._options.btnComplete) &&
            typeof this._options.btnComplete.content !== 'string'
        ) {
            this._options.btnComplete.content = table.getLang().complete
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
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that    = this;
        let options = this.getOptions();
        let control = coreuiTableElements.getControl(this._table.getId(), this._id);
        let button  = $('button', control);

        button.click(function () {
            let container       = coreuiTableElements.getColumnsContainer(that._table.getId());
            let containerSearch = coreuiTableElements.getSearchContainer(that._table.getId());

            if (containerSearch[0]) {
                containerSearch.hide();
            }

            if (container[0]) {
                container.fadeToggle('fast');

            } else {
                let columns            = [];
                let showAll            = true;
                let btnCompleteAttr    = [];
                let btnCompleteContent = '';
                let wrapper            = coreuiTableElements.getWrapper(that._table.getId());

                $.each(that._table._columns, function (key, column) {
                    let options = column.getOptions();

                    if (options.hasOwnProperty('field') &&
                        typeof options.field === 'string' &&
                        options.field
                    ) {
                        let isShow = column.isShow();

                        columns.push({
                            field: options.field,
                            label: options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
                            show: isShow,
                        });

                        if ( ! isShow) {
                            showAll = false;
                        }
                    }
                });



                if ( ! coreuiTableUtils.isObject(options.btnComplete)) {
                    options.btnComplete = {};
                }

                if ( ! coreuiTableUtils.isObject(options.btnComplete.attr)) {
                    options.btnComplete.attr = {};
                }

                if (options.btnComplete.attr.hasOwnProperty('type')) {
                    delete options.btnComplete.attr.type;
                }

                if ( ! options.btnComplete.attr.hasOwnProperty('class') ||
                    typeof options.btnComplete.attr.class !== 'string'
                ) {
                    options.btnComplete.attr.class = 'btn-complete';
                } else {
                    options.btnComplete.attr.class += ' btn-complete';
                }

                if (coreuiTableUtils.isObject(options.btnComplete.attr)) {
                    $.each(options.btnComplete.attr, function (name, value) {
                        btnCompleteAttr.push(name + '="' + value + '"');
                    });
                }

                if (typeof options.btnComplete.content === 'string') {
                    btnCompleteContent = options.btnComplete.content;
                }


                let content = coreuiTableUtils.render(coreuiTableTpl['controls/columns-container.html'], {
                    showAll:            showAll,
                    columns:            columns,
                    btnCompleteAttr:    btnCompleteAttr.length > 0 ? (' ' + btnCompleteAttr.join(' ')) : '',
                    btnCompleteContent: btnCompleteContent,
                    lang:               that._table.getLang(),
                });
                wrapper.before(content);



                container = wrapper.parent().find('> .coreui-table__columns');

                $('.coreui-table__check_all input', container).change(function () {
                    $('.coreui-table_check-column input', container).prop('checked', $(this).is(":checked"));
                });


                $('.btn-complete', container).click(function () {
                    let columns = [];

                    $('.coreui-table_check-column input:checked', container).each(function (key, input) {
                        columns.push($(input).val());
                    });

                    that._table.setColumnsShow(columns);
                    that._table.refresh();

                    container.fadeOut('fast');
                });
            }
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

        if (coreuiTableUtils.isObject(this._options.btn.attr)) {
            $.each(this._options.btn.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });
        }

        return coreuiTableUtils.render(coreuiTableTpl['controls/columns.html'], {
            btnContent: this._options.btn.content,
            btnAttr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}