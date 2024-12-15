
import coreuiTableUtils    from '../coreui.table.utils';
import coreuiTableTpl      from "../coreui.table.templates";
import CoreuiTableUtils    from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";
import Control             from "../abstract/Control";


class ControlColumns extends Control {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
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
        }, options);

        super(table, options);


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
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    render() {

        let that       = this;
        let table      = this._table;
        let attributes = [];

        if (coreuiTableUtils.isObject(this._options.btn.attr)) {
            $.each(this._options.btn.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let btn = $(coreuiTableUtils.render(coreuiTableTpl['controls/columns.html'], {
            btnContent: this._options.btn.content,
            btnAttr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        }));


        btn.click(function () {
            let container       = coreuiTableElements.getColumnsContainer(table.getId());
            let containerSearch = coreuiTableElements.getSearchContainer(table.getId());

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
                let wrapper            = coreuiTableElements.getWrapper(table.getId());

                table._columns.map(function (column) {
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


                let options = that.getOptions();

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
                        if (['string', 'number'].indexOf(typeof value) >= 0) {
                            btnCompleteAttr.push(name + '="' + value + '"');
                        }
                    });
                }

                if (typeof options.btnComplete.content === 'string') {
                    btnCompleteContent = options.btnComplete.content;
                }


                let containerList = $(coreuiTableUtils.render(coreuiTableTpl['controls/columns/list.html'], {
                    showAll:            showAll,
                    columns:            columns,
                    btnCompleteAttr:    btnCompleteAttr.length > 0 ? (' ' + btnCompleteAttr.join(' ')) : '',
                    btnCompleteContent: btnCompleteContent,
                    lang:               table.getLang(),
                }));


                $('.coreui-table__check_all input', containerList).change(function () {
                    $('.coreui-table_check-column input', containerList).prop('checked', $(this).is(":checked"));
                });


                $('.btn-complete', containerList).click(function () {
                    let columns = [];

                    $('.coreui-table_check-column input:checked', containerList).each(function (key, input) {
                        columns.push($(input).val());
                    });

                    table.setColumnsShow(columns);

                    containerList.fadeOut('fast');
                });


                wrapper.before(containerList);
            }
        });

        return btn;
    }
}

export default ControlColumns;