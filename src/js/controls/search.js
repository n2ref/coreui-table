
import TableUtils    from '../table.utils';
import TableTpl      from "../table.tpl";
import TableElements from "../table.elements";
import Control       from "../abstract/Control";


class ControlSearch extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            btn: {
                attr: { class: 'btn btn-outline-secondary' },
                content: null,
            },
            btnClear: {
                content: "<i class=\"bi bi-x text-danger\"></i>",
                attr: { class: 'btn btn-outline-secondary' }
            },
            btnComplete: {
                attr: { class: 'btn btn-primary' },
                content: null
            }
        }, options);

        super(table, options);


        if ( ! TableUtils.isObject(this._options.btn)) {
            this._options.btn = {};
        }

        if ( ! this._options.btn.hasOwnProperty('content') ||
            typeof this._options.btn.content !== 'string'
        ) {
            this._options.btn.content = '<i class="bi bi-search"></i> ' + table.getLang().search
        }


        if ( ! TableUtils.isObject(this._options.btnClear)) {
            this._options.btnClear = {};
        }

        if ( ! this._options.btnClear.hasOwnProperty('content') ||
            typeof this._options.btnClear.content !== 'string'
        ) {
            this._options.btnClear.content = table.getLang().clear
        }


        if ( ! TableUtils.isObject(this._options.btnComplete)) {
            this._options.btnComplete = {};
        }

        if ( ! this._options.btnComplete.hasOwnProperty('content') ||
            typeof this._options.btnComplete.content !== 'string'
        ) {
            this._options.btnComplete.content = table.getLang().searchAction
        }
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    render() {

        let btnAttr    = [];
        let btnContent = '';
        let btnClear   = '';
        let that       = this;
        let table      = this._table;


        if ( ! TableUtils.isObject(this._options.btn)) {
            this._options.btn = {};
        }
        if ( ! TableUtils.isObject(this._options.btn.attr)) {
            this._options.btn.attr = {};
        }

        if ( ! this._options.btn.attr.hasOwnProperty('class') ||
            typeof this._options.btn.attr.class !== 'string'
        ) {
            this._options.btn.attr.class = 'btn-search-toggle';
        } else {
            this._options.btn.attr.class += ' btn-search-toggle';
        }

        $.each(this._options.btn.attr, function (name, value) {
            btnAttr.push(name + '="' + value + '"');
        });

        if (typeof this._options.btn.content === 'string') {
            btnContent = this._options.btn.content;
        }



        if (this._table.getSearchData().length > 0) {
            btnClear = this._renderBtnClear();
        }


        let control = $(TableUtils.render(TableTpl['controls/search.html'], {
            btnContent: btnContent,
            btnAttr: btnAttr.length > 0 ? (' ' + btnAttr.join(' ')) : '',
            btnClear: btnClear
        }));

        let buttonToggle = control.find('.btn-search-toggle');
        let buttonClear  = control.find('.btn-clear');

        buttonToggle.click(function () {
            let container        = TableElements.getSearchContainer(table.getId());
            let columnsContainer = TableElements.getColumnsContainer(table.getId());

            if (columnsContainer[0]) {
                columnsContainer.hide();
            }

            if (container[0]) {
                container.fadeToggle('fast');

            } else {
                let controls           = [];
                let btnCompleteAttr    = [];
                let btnCompleteContent = '';
                let tableOptions       = table.getOptions();
                let labelWidth         = tableOptions.search.hasOwnProperty('labelWidth') && tableOptions.search.labelWidth
                    ? tableOptions.search.labelWidth
                    : 160;

                table._search.map(function (searchControl) {
                    let options = searchControl.getOptions();

                    if (options.hasOwnProperty('field') &&
                        typeof options.field === 'string' &&
                        options.field
                    ) {
                        let descriptionLabel = options.hasOwnProperty('descriptionLabel') && options.descriptionLabel
                            ? options.descriptionLabel
                            : null;

                        let controlContainer = $(TableUtils.render(TableTpl['controls/search/control.html'], {
                            labelWidth:       labelWidth + (typeof labelWidth === 'number' ? 'px' : ''),
                            descriptionLabel: descriptionLabel,
                            label:            options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
                            description:      options.hasOwnProperty('description') && typeof options.description === 'string' ? options.description : '',
                            suffix:           options.hasOwnProperty('suffix') && typeof options.suffix === 'string' ? options.suffix : '',
                        }));

                        controlContainer.find('.coreui-table__search-control_content').prepend(searchControl.render());

                        controls.push(controlContainer);
                    }
                });



                if ( ! TableUtils.isObject(that._options.btnComplete)) {
                    that._options.btnComplete = {};
                }

                if ( ! TableUtils.isObject(that._options.btnComplete.attr)) {
                    that._options.btnComplete.attr = {};
                }

                if (that._options.btnComplete.attr.hasOwnProperty('type')) {
                    delete that._options.btnComplete.attr.type;
                }

                if ( ! that._options.btnComplete.attr.hasOwnProperty('class') ||
                    typeof that._options.btnComplete.attr.class !== 'string'
                ) {
                    that._options.btnComplete.attr.class = 'btn-complete';
                } else {
                    that._options.btnComplete.attr.class += ' btn-complete';
                }

                if (TableUtils.isObject(that._options.btnComplete.attr)) {
                    $.each(that._options.btnComplete.attr, function (name, value) {
                        if (['string', 'number'].indexOf(typeof value) >= 0) {
                            btnCompleteAttr.push(name + '="' + value + '"');
                        }
                    });
                }
                if (typeof that._options.btnComplete.content === 'string') {
                    btnCompleteContent = that._options.btnComplete.content;
                }

                let searchContainer = $(TableUtils.render(TableTpl['controls/search/container.html'], {
                    labelWidth: labelWidth + (typeof labelWidth === 'number' ? 'px' : ''),
                    btnCompleteAttr:    btnCompleteAttr.length > 0 ? (' ' + btnCompleteAttr.join(' ')) : '',
                    btnCompleteContent: btnCompleteContent,
                }));

                $('.btn-complete', searchContainer).click(function () {
                    table.searchRecords();

                    let container = TableElements.getSearchContainer(table.getId());

                    if (container[0]) {
                        container.fadeOut(200);
                    }
                });

                if (controls.length > 0) {
                    let searchControls = searchContainer.find('.coreui-table__search_controls');

                    controls.map(function (control) {
                        searchControls.append(control);
                    })
                }

                let wrapper = TableElements.getWrapper(table.getId());
                wrapper.before(searchContainer);
            }
        });


        buttonClear.click(function () {
            table.clearSearch();

            let container = TableElements.getSearchContainer(table.getId());

            if (container[0]) {
                container.fadeOut('fast');
            }
            buttonClear.remove();
        });


        table.on('search_change', function (searchData) {
            let buttonClear = $('button.btn-clear', control);

            if (searchData.length > 0) {
                if ( ! buttonClear[0]) {
                    let btnClear = $(that._renderBtnClear());

                    btnClear.click(function () {
                        table.clearSearch();

                        let container = TableElements.getSearchContainer(table.getId());

                        if (container[0]) {
                            container.fadeOut('fast');
                        }
                        btnClear.remove();
                    });

                    btnClear.insertAfter(buttonToggle);
                }

            } else {
                buttonClear.remove();

                let container = TableElements.getSearchContainer(table.getId());

                if (container[0]) {
                    container.fadeOut('fast');
                }
            }
        });


        return control;
    }


    /**
     * Рендер кнопки отмены
     * @private
     */
    _renderBtnClear () {

        let attributes = [];
        let content    = '';

        if ( ! TableUtils.isObject(this._options.btnClear)) {
            this._options.btnClear = {};
        }
        if ( ! TableUtils.isObject(this._options.btnClear.attr)) {
            this._options.btnClear.attr = {};
        }

        if ( ! this._options.btnClear.attr.hasOwnProperty('class') ||
            typeof this._options.btnClear.attr.class !== 'string'
        ) {
            this._options.btnClear.attr.class = 'btn-clear';
        } else {
            this._options.btnClear.attr.class += ' btn-clear';
        }

        $.each(this._options.btnClear.attr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });

        if (typeof this._options.btnClear.content === 'string') {
            content = this._options.btnClear.content;
        }


        return TableUtils.render(TableTpl['controls/search/clear.html'], {
            content: content,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}

export default ControlSearch;