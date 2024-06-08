
import coreuiTableUtils from '../coreui.table.utils';
import coreuiTable      from "../coreui.table";
import coreuiTableTpl   from "../coreui.table.templates";
import CoreuiTableUtils from "../coreui.table.utils";
import coreuiTableElements from "../coreui.table.elements";

coreuiTable.controls.search = {

    _id: null,
    _table: null,
    _options: {
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
    },


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function (table, options) {

        this._options = $.extend(true, {}, this._options, options);
        this._table   = table;
        this._id      = coreuiTableUtils.hashCode();


        if ( ! CoreuiTableUtils.isObject(this._options.btn)) {
            this._options.btn = {};
        }

        if ( ! this._options.btn.hasOwnProperty('content') ||
            typeof this._options.btn.content !== 'string'
        ) {
            this._options.btn.content = '<i class="bi bi-search"></i> ' + table.getLang().search
        }


        if ( ! CoreuiTableUtils.isObject(this._options.btnClear)) {
            this._options.btnClear = {};
        }

        if ( ! this._options.btnClear.hasOwnProperty('content') ||
            typeof this._options.btnClear.content !== 'string'
        ) {
            this._options.btnClear.content = table.getLang().clear
        }


        if ( ! CoreuiTableUtils.isObject(this._options.btnComplete)) {
            this._options.btnComplete = {};
        }

        if ( ! this._options.btnComplete.hasOwnProperty('content') ||
            typeof this._options.btnComplete.content !== 'string'
        ) {
            this._options.btnComplete.content = table.getLang().searchAction
        }
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that         = this;
        let control      = coreuiTableElements.getControl(this._table.getId(), this.getId());
        let buttonToggle = $('button.btn-search-toggle', control);
        let buttonClear  = $('button.btn-clear', control);

        buttonToggle.click(function () {
            let container        = coreuiTableElements.getSearchContainer(that._table.getId());
            let columnsContainer = coreuiTableElements.getColumnsContainer(that._table.getId());

            if (columnsContainer[0]) {
                columnsContainer.hide();
            }

            if (container[0]) {
                container.fadeToggle('fast');

            } else {
                let controls           = [];
                let controlsEvents     = [];
                let btnCompleteAttr    = [];
                let btnCompleteContent = '';
                let wrapper            = coreuiTableElements.getWrapper(that._table.getId());
                let tableOptions       = that._table.getOptions();
                let labelWidth         = tableOptions.search.hasOwnProperty('labelWidth') && tableOptions.search.labelWidth
                    ? tableOptions.search.labelWidth
                    : 160;

                $.each(that._table._search, function (key, control) {
                    let options = control.getOptions();

                    if (options.hasOwnProperty('field') &&
                        typeof options.field === 'string' &&
                        options.field
                    ) {
                        controls.push({
                            label:       options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
                            description: options.hasOwnProperty('description') && typeof options.description === 'string' ? options.description : '',
                            suffix:      options.hasOwnProperty('suffix') && typeof options.suffix === 'string' ? options.suffix : '',
                            id:          control.getId(),
                            content:     control.render(),
                        });

                        if (control.hasOwnProperty('initEvents') && typeof control.initEvents === 'function') {
                            controlsEvents.push({
                                event: control.initEvents,
                                control: control,
                            });
                        }
                    }
                });



                if ( ! coreuiTableUtils.isObject(that._options.btnComplete)) {
                    that._options.btnComplete = {};
                }

                if ( ! coreuiTableUtils.isObject(that._options.btnComplete.attr)) {
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

                if (coreuiTableUtils.isObject(that._options.btnComplete.attr)) {
                    $.each(that._options.btnComplete.attr, function (name, value) {
                        btnCompleteAttr.push(name + '="' + value + '"');
                    });
                }
                if (typeof that._options.btnComplete.content === 'string') {
                    btnCompleteContent = that._options.btnComplete.content;
                }

                let content = coreuiTableUtils.render(coreuiTableTpl['controls/search-container.html'], {
                    labelWidth: labelWidth + (typeof labelWidth === 'number' ? 'px' : ''),
                    controls: controls,
                    btnCompleteAttr:    btnCompleteAttr.length > 0 ? (' ' + btnCompleteAttr.join(' ')) : '',
                    btnCompleteContent: btnCompleteContent,
                });
                wrapper.before(content);


                if (controlsEvents.length > 0) {
                    $.each(controlsEvents, function (key, controlsEvent) {
                        controlsEvent.event.apply(controlsEvent.control);
                    })
                }


                container = wrapper.parent().find('> .coreui-table__search');

                $('.btn-complete', container).click(function () {
                    that._table.searchRecords();

                    container.fadeOut('fast');
                });
            }
        });


        buttonClear.click(function () {
            that._table.searchClear();

            let container = coreuiTableElements.getSearchContainer(that._table.getId());

            if (container[0]) {
                container.fadeOut('fast');
            }
        });


        this._table.on('search_change', function (searchData) {
            let buttonClear = $('button.btn-clear', control);

            if (searchData.length > 0) {
                if ( ! buttonClear[0]) {
                    $(that._renderBtnClear()).insertAfter(buttonToggle);

                    $('button.btn-clear', control).click(function () {
                        that._table.searchClear();

                        let container = coreuiTableElements.getSearchContainer(that._table.getId());

                        if (container[0]) {
                            container.fadeOut('fast');
                        }
                    });
                }

            } else {
                buttonClear.remove();

                let container = coreuiTableElements.getSearchContainer(that._table.getId());

                if (container[0]) {
                    container.fadeOut('fast');
                }
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

        let btnAttr    = [];
        let btnContent = '';
        let btnClear   = '';


        if ( ! coreuiTableUtils.isObject(this._options.btn)) {
            this._options.btn = {};
        }
        if ( ! coreuiTableUtils.isObject(this._options.btn.attr)) {
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


        return coreuiTableUtils.render(coreuiTableTpl['controls/search.html'], {
            btnContent: btnContent,
            btnAttr: btnAttr.length > 0 ? (' ' + btnAttr.join(' ')) : '',
            btnClear: btnClear
        });
    },


    /**
     * Рендер кнопки отмены
     * @private
     */
    _renderBtnClear: function () {

        let attributes = [];
        let content    = '';

        if ( ! coreuiTableUtils.isObject(this._options.btnClear)) {
            this._options.btnClear = {};
        }
        if ( ! coreuiTableUtils.isObject(this._options.btnClear.attr)) {
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


        return coreuiTableUtils.render(coreuiTableTpl['controls/search-clear.html'], {
            content: content,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}