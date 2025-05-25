
import Tpl        from './tpl';
import Utils      from "./utils";
import Render     from "./render";
import Elements   from "./elements";
import Private    from "./private";
import Controller from "./controller";
import ToolBox    from "./toolbox";
import Search     from "./abstract/Search";
import Column     from "./abstract/Column";


import HelperControlSearch       from "./helpers/controls/search";
import HelperControlButton       from "./helpers/controls/button";
import HelperControlDivider      from "./helpers/controls/divider";
import HelperControlColumns      from "./helpers/controls/columns";
import HelperControlFilterClear  from "./helpers/controls/filterClear";
import HelperControlTotal        from "./helpers/controls/total";
import HelperControlPages        from "./helpers/controls/pages";
import HelperControlCaption      from "./helpers/controls/caption";
import HelperControlCustom       from "./helpers/controls/custom";
import HelperControlLink         from "./helpers/controls/link";
import HelperControlPageJump     from "./helpers/controls/pageJump";
import HelperControlPageSize     from "./helpers/controls/pageSize";
import HelperControlButtonGroup  from "./helpers/controls/buttonGroup";
import HelperControlDropdown     from "./helpers/controls/dropdown";

import HelperFilterText          from "./helpers/filter/text";
import HelperFilterCheckbox      from "./helpers/filter/checkbox";
import HelperFilterDate          from "./helpers/filter/date";
import HelperFilterDateMonth     from "./helpers/filter/dateMonth";
import HelperFilterDateRange     from "./helpers/filter/dateRange";
import HelperFilterDateTime      from "./helpers/filter/dateTime";
import HelperFilterDateTimeRange from "./helpers/filter/dateTimeRange";
import HelperFilterNumber        from "./helpers/filter/dateNumber";
import HelperFilterRadio         from "./helpers/filter/radio";
import HelperFilterSelect        from "./helpers/filter/select";
import HelperFilterSwitch        from "./helpers/filter/switch";

import HelperSearchText          from "./helpers/search/text";
import HelperSearchCheckbox      from "./helpers/search/checkbox";
import HelperSearchCheckboxBtn   from "./helpers/search/checkboxBtn";
import HelperSearchDate          from "./helpers/search/date";
import HelperSearchDateMonth     from "./helpers/search/dateMonth";
import HelperSearchDateRange     from "./helpers/search/dateRange";
import HelperSearchDatetime      from "./helpers/search/datetime";
import HelperSearchDatetimeRange from "./helpers/search/datetimeRange";
import HelperSearchNumber        from "./helpers/search/number";
import HelperSearchRadio         from "./helpers/search/radio";
import HelperSearchRadioBtn      from "./helpers/search/radioBtn";
import HelperSearchSelect        from "./helpers/search/select";
import HelperSearchSwitch        from "./helpers/search/switch";

import HelperColumnText         from "./helpers/columns/text";
import HelperColumnBadge        from "./helpers/columns/badge";
import HelperColumnButton       from "./helpers/columns/button";
import HelperColumnComponent    from "./helpers/columns/component";
import HelperColumnDate         from "./helpers/columns/date";
import HelperColumnDatetime     from "./helpers/columns/datetime";
import HelperColumnDateHuman    from "./helpers/columns/dateHuman";
import HelperColumnHtml         from "./helpers/columns/html";
import HelperColumnImage        from "./helpers/columns/image";
import HelperColumnLink         from "./helpers/columns/link";
import HelperColumnMenu         from "./helpers/columns/menu";
import HelperColumnMoney        from "./helpers/columns/money";
import HelperColumnNumber       from "./helpers/columns/number";
import HelperColumnNumbers      from "./helpers/columns/numbers";
import HelperColumnProgress     from "./helpers/columns/progress";
import HelperColumnSelect       from "./helpers/columns/select";
import HelperColumnSwitch       from "./helpers/columns/switch";


class Table {

    _options = {
        id: null,
        class: '',
        primaryKey: 'id',
        lang: 'en',
        langItems: {},
        width: null,
        minWidth: null,
        maxWidth: null,
        height: null,
        minHeight: null,
        naxHeight: null,
        overflow: false,
        page: 1,
        recordsPerPage: 25,
        theadTop: 0,
        saveState: false,
        noWrap: false,
        noWrapToggle: false,
        showHeaders: true,
        showScrollShadow: false,

        recordsRequest: {
            method: 'GET',
            url: null,  // '/mod/index/orders/?page=[page]'
        },

        requestParams: {
            page: 'page',
            count: 'count',
            start: 'start',
            end: 'end',
            sort: 'sort',
            search: 'search'
        },

        group: {
            field: null,
            attr: {},
            render: null
        },

        onClick: null,
        onClickUrl: null,
        sort: [],
        header: [],
        footer: [],
        columnsHeader: [],
        search: {
            labelWidth: 200,
            controls: [],
        },
        columns: [],
        columnsFooter: [],
        records: []
    };

    _id                = '';
    _page              = 1;
    _recordsIndex      = 1;
    _recordsPerPage    = 25;
    _recordsTotal      = 0;
    _recordsNumber     = 1;
    _seq               = 1;
    _isRecordsRequest  = false;
    _countColumnsShow  = 0;
    _records           = [];
    _sort              = [];
    _columns           = [];
    _search            = [];
    _filters           = [];
    _controls          = [];
    _controlsPositions = {
        header: [],
        footer: [],
    }
    _events = {};

    columns = {
        select:    function ()                    { return new HelperColumnSelect() },
        text:      function (field, label, width) { return new HelperColumnText(field, label, width) },
        badge:     function (field, label, width) { return new HelperColumnBadge(field, label, width) },
        button:    function (field, label, width) { return new HelperColumnButton(field, label, width) },
        component: function (field, label, width) { return new HelperColumnComponent(field, label, width) },
        date:      function (field, label, width) { return new HelperColumnDate(field, label, width) },
        datetime:  function (field, label, width) { return new HelperColumnDatetime(field, label, width) },
        dateHuman: function (field, label, width) { return new HelperColumnDateHuman(field, label, width) },
        html:      function (field, label, width) { return new HelperColumnHtml(field, label, width) },
        image:     function (field, label, width) { return new HelperColumnImage(field, label, width) },
        link:      function (field, label, width) { return new HelperColumnLink(field, label, width) },
        menu:      function (field, label, width) { return new HelperColumnMenu(field, label, width) },
        money:     function (field, label, width) { return new HelperColumnMoney(field, label, width) },
        number:    function (field, label, width) { return new HelperColumnNumber(field, label, width) },
        numbers:   function (field, label, width) { return new HelperColumnNumbers(field, label, width) },
        progress:  function (field, label, width) { return new HelperColumnProgress(field, label, width) },
        switch:    function (field, label, width) { return new HelperColumnSwitch(field, label, width) },
    };

    controls = {
        button:       function (content, id)      { return new HelperControlButton(content, id) },
        buttonGroup:  function (id)               { return new HelperControlButtonGroup(id) },
        caption:      function (title, value, id) { return new HelperControlCaption(title, value, id) },
        columns:      function (id)               { return new HelperControlColumns(id) },
        custom:       function (content, id)      { return new HelperControlCustom(content, id) },
        divider:      function (width, id)        { return new HelperControlDivider(width, id) },
        dropdown:     function (content, id)      { return new HelperControlDropdown(content, id) },
        filterClear:  function (content, id)      { return new HelperControlFilterClear(content, id) },
        link:         function (content, url, id) { return new HelperControlLink(content, url, id) },
        pageJump:     function (id)               { return new HelperControlPageJump(id) },
        pageSize:     function (list, id)         { return new HelperControlPageSize(list, id) },
        pages:        function (id)               { return new HelperControlPages(id) },
        search:       function (id)               { return new HelperControlSearch(id) },
        total:        function (id)               { return new HelperControlTotal(id) },
    };

    filters = {
        text:          function (field, label, id) { return new HelperFilterText(field, label, id) },
        checkbox:      function (field, label, id) { return new HelperFilterCheckbox(field, label, id) },
        date:          function (field, label, id) { return new HelperFilterDate(field, label, id) },
        dateMonth:     function (field, label, id) { return new HelperFilterDateMonth(field, label, id) },
        dateRange:     function (field, label, id) { return new HelperFilterDateRange(field, label, id) },
        datetime:      function (field, label, id) { return new HelperFilterDateTime(field, label, id) },
        datetimeRange: function (field, label, id) { return new HelperFilterDateTimeRange(field, label, id) },
        number:        function (field, label, id) { return new HelperFilterNumber(field, label, id) },
        radio:         function (field, label, id) { return new HelperFilterRadio(field, label, id) },
        select:        function (field, label, id) { return new HelperFilterSelect(field, label, id) },
        switch:        function (field, label, id) { return new HelperFilterSwitch(field, label, id) },
    };

    search = {
        text:          function (field, label, id) { return new HelperSearchText(field, label, id) },
        checkbox:      function (field, label, id) { return new HelperSearchCheckbox(field, label, id) },
        checkboxBtn:   function (field, label, id) { return new HelperSearchCheckboxBtn(field, label, id) },
        date:          function (field, label, id) { return new HelperSearchDate(field, label, id) },
        dateMonth:     function (field, label, id) { return new HelperSearchDateMonth(field, label, id) },
        dateRange:     function (field, label, id) { return new HelperSearchDateRange(field, label, id) },
        datetime:      function (field, label, id) { return new HelperSearchDatetime(field, label, id) },
        datetimeRange: function (field, label, id) { return new HelperSearchDatetimeRange(field, label, id) },
        number:        function (field, label, id) { return new HelperSearchNumber(field, label, id) },
        radio:         function (field, label, id) { return new HelperSearchRadio(field, label, id) },
        radioBtn:      function (field, label, id) { return new HelperSearchRadioBtn(field, label, id) },
        select:        function (field, label, id) { return new HelperSearchSelect(field, label, id) },
        switch:        function (field, label, id) { return new HelperSearchSwitch(field, label, id) },
    };


    /**
     * Инициализация
     * @param {Object}     options
     * @private
     */
    constructor(options) {

        if (options && Utils.isObject(options)) {
            this._options = $.extend(true, {}, this._options, options);
        }


        if (Controller._helpers) {
            if (Object.keys(Controller._helpers.columns).length > 0) {

                for (const [name, helper] of Object.entries(Controller._helpers.columns)) {
                    this.columns[name] = helper;
                }
            }
            if (Object.keys(Controller._helpers.controls).length > 0) {

                for (const [name, helper] of Object.entries(Controller._helpers.controls)) {
                    this.controls[name] = helper;
                }
            }
            if (Object.keys(Controller._helpers.controls).length > 0) {

                for (const [name, helper] of Object.entries(Controller._helpers.controls)) {
                    this.controls[name] = helper;
                }
            }
        }
    }


    /**
     * Инициализация событий таблицы
     */
    initEvents() {

        let table = this;

        // Показ строк
        this.on('records_show', function () {

            // Переход по ссылке
            if (typeof table._options.onClickUrl === 'string' && table._options.onClickUrl) {
                Elements.getTrRecords(table.getId()).click(function () {
                    let recordKey = $(this).data('record-index');
                    let record    = table.getRecordByIndex(recordKey);

                    if ( ! record) {
                        return;
                    }

                    let url = table._options.onClickUrl;

                    $.each(record.data, function (field, value) {
                        let fieldQuote = field.replace(/([^\w\d])/g, '\\$1');
                        url = url.replace(
                            new RegExp('\\[' + fieldQuote + '\\]', 'g'),
                            value
                        );
                    });

                    if (url && url !== '#') {
                        location.href = url;
                    }
                });
            }

            // Событие нажатия на строку
            if (['function', 'string'].indexOf(typeof table._options.onClick)) {

                Elements.getTrRecords(table.getId()).click(function (event) {
                    let recordKey = $(this).data('record-index');
                    let record    = table.getRecordByIndex(recordKey);

                    if ( ! record) {
                        return;
                    }

                    let prop = {
                        table: table,
                        record: record,
                        event: event,
                    };

                    if (typeof table._options.onClick === 'function') {
                        table._options.onClick(prop);

                    } else if (typeof table._options.onClick === 'string') {
                        let func = new Function('prop', table._options.onClick);
                        func(prop);
                    }
                });
            }

            // Раскрытие строки
            Elements.getNoWrapToggles(table.getId()).click(function (event) {

                event.cancelBubble = true;
                event.preventDefault();

                let parent = $(this).parent();

                if (parent.hasClass('shown')) {
                    $(this).removeClass('bi-caret-up-fill');
                    $(this).addClass('bi-caret-down-fill');
                    parent.removeClass('shown');
                } else {
                    $(this).removeClass('bi-caret-down-fill');
                    $(this).addClass('bi-caret-up-fill');
                    parent.addClass('shown');
                }
            });

            // Фиксация колонок
            Elements.fixedColsLeft(table.getId())
            Elements.fixedColsRight(table.getId())
        });


        // Показ таблицы
        this.on('table_show', function () {

            let sortableColumns = Elements.getTableSortable(table.getId());
            if (sortableColumns[0]) {
                sortableColumns.click(function (event) {
                    let field = $(this).data('field');

                    if (field) {
                        let sorting      = [];
                        let currentOrder = null;

                        $.each(table._sort, function (key, sortField) {

                            if (field === sortField.field) {
                                currentOrder = sortField.order;
                                return false;
                            }
                        });


                        if (currentOrder === null) {
                            sorting.push({
                                field: field,
                                order: 'asc',
                            });

                        } else if (currentOrder === 'asc') {
                            sorting.push({
                                field: field,
                                order: 'desc',
                            });
                        }


                        if (sorting.length === 0) {
                            table.sortDefault();

                        } else {
                            table.sortFields(sorting);
                        }
                    }
                });
            }


            if (window.hasOwnProperty('bootstrap') && bootstrap.hasOwnProperty('Tooltip')) {
                $('.coreui-table__column-description', Elements.getTableThead(table.getId())).each(function () {
                    new bootstrap.Tooltip(this);
                });
            }
        });


        // События смены состояния
        if (this._options.saveState && this._options.id) {
            this.on('records_sort', function () {
                Private.setStorageField(table.getId(), 'sort', table._sort);
            });

            this.on('search_change', function () {
                Private.setStorageField(table.getId(), 'search', table.getSearchData());
            });

            this.on('filters_change', function () {
                Private.setStorageField(table.getId(), 'filters', table.getFilterData());
            });

            this.on('page_size_update', function () {
                Private.setStorageField(table.getId(), 'page_size', table._recordsPerPage);
            });

            this.on('columns_change', function () {
                let columns = [];

                table._columns.map(function (column) {
                    let columnOptions = column.getOptions();

                    columns.push({
                        field: columnOptions.field,
                        isShow: column.isShow(),
                    })
                });

                Private.setStorageField(table.getId(), 'columns', columns);
            });
        }


        Private._trigger(this, 'table_show', [this ]);
        Private._trigger(this, 'container_show');

        // Вызов события показа строк
        if ( ! this._isRecordsRequest) {
            Private._trigger(this, 'records_show', [this ]);
        }
    }


    /**
     * Получение идентификатора таблицы
     * @returns {string}
     */
    getId() {
        return this._id;
    }


    /**
     * Установка опций таблицы
     * @param {Object} options
     */
    setOptions(options) {

        if ( ! Utils.isObject(options)) {
            return;
        }

        this._options = $.extend(true, this._options, options);
    }


    /**
     * Получение опций таблицы
     * @returns {*}
     */
    getOptions() {

        return $.extend(true, {}, this._options);
    }


    /**
     * Рендер таблицы
     * @param {HTMLElement|string} element
     * @returns {*}
     */
    render(element) {

        Private.init(Controller, this);

        let that        = this;
        let widthSizes  = [];
        let heightSizes = [];
        let options     = this.getOptions();
        let render      = {
            headersOut: [],
            headersIn: [],
            footersIn: [],
            footersOut: []
        };

        this._recordsTotal = this._records.length;


        if (options.width > 0) {
            let unit = typeof options.width === 'number' ? 'px' : '';
            widthSizes.push('width:' + options.width + unit);
        }

        if (options.minWidth > 0) {
            let unit = typeof options.minWidth === 'number' ? 'px' : '';
            widthSizes.push('min-width:' + options.minWidth + unit);
        }

        if (options.maxWidth > 0) {
            let unit = typeof options.maxWidth === 'number' ? 'px' : '';
            widthSizes.push('max-width:' + options.maxWidth + unit);

            options.overflow = true;
        }


        if (options.height > 0) {
            let unit = typeof options.height === 'number' ? 'px' : '';
            heightSizes.push('height:' + options.height + unit);
        }

        if (options.minHeight > 0) {
            let unit = typeof options.minHeight === 'number' ? 'px' : '';
            heightSizes.push('min-height:' + options.minHeight + unit);
        }

        if (options.maxHeight > 0) {
            let unit = typeof options.maxHeight === 'number' ? 'px' : '';
            heightSizes.push('max-height:' + options.maxHeight + unit);

            options.overflow = true;
        }



        // Верхние элементы управления
        if (Array.isArray(this._controlsPositions.header) &&
            this._controlsPositions.header.length > 0
        ) {
            this._controlsPositions.header.map(function (header) {
                let controlsLeft   = [];
                let controlsCenter = [];
                let controlsRight  = [];

                if (Array.isArray(header.left) && header.left.length > 0) {
                    header.left.map(function (control) {
                        let controlRender = Render.renderControl(that, control);

                        if (controlRender) {
                            controlsLeft.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(header.center) && header.center.length > 0) {
                    header.center.map(function (control) {
                        let controlRender = Render.renderControl(that, control);

                        if (controlRender) {
                            controlsCenter.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(header.right) && header.right.length > 0) {
                    header.right.map(function (control) {
                        let controlRender = Render.renderControl(that, control);

                        if (controlRender) {
                            controlsRight.push(controlRender);
                        }
                    });
                }

                if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                    if (header.type === 'in') {
                        let headerControls = $(
                            Utils.render(Tpl['table/controls/header.html'], {
                                controlsLeft: controlsLeft,
                                controlsCenter: controlsCenter,
                                controlsRight: controlsRight,
                            })
                        );

                        if (controlsLeft.length > 0) {
                            $.each(controlsLeft, function (key, control) {
                                headerControls.find('.coreui-table__controls_left').append(control)
                            });
                        }

                        if (controlsCenter.length > 0) {
                            $.each(controlsCenter, function (key, control) {
                                headerControls.find('.coreui-table__controls_center').append(control)
                            });
                        }

                        if (controlsRight.length > 0) {
                            $.each(controlsRight, function (key, control) {
                                headerControls.find('.coreui-table__controls_right').append(control)
                            });
                        }


                        render.headersIn.push(headerControls);

                    } else {
                        let headerControls = $(
                            Utils.render(Tpl['table/controls/header-out.html'], {
                                controlsLeft: controlsLeft,
                                controlsCenter: controlsCenter,
                                controlsRight: controlsRight,
                            })
                        );

                        if (controlsLeft.length > 0) {
                            $.each(controlsLeft, function (key, control) {
                                headerControls.find('.coreui-table__controls_left').append(control)
                            });
                        }

                        if (controlsCenter.length > 0) {
                            $.each(controlsCenter, function (key, control) {
                                headerControls.find('.coreui-table__controls_center').append(control)
                            });
                        }

                        if (controlsRight.length > 0) {
                            $.each(controlsRight, function (key, control) {
                                headerControls.find('.coreui-table__controls_right').append(control)
                            });
                        }

                        render.headersOut.push(headerControls);
                    }
                }
            });
        }

        // Нижние элементы управления
        if (Array.isArray(this._controlsPositions.footer) &&
            this._controlsPositions.footer.length > 0
        ) {
            this._controlsPositions.footer.map(function (footer) {
                let controlsLeft   = [];
                let controlsCenter = [];
                let controlsRight  = [];

                if (Array.isArray(footer.left) && footer.left.length > 0) {
                    $.each(footer.left, function (key, control) {
                        let controlRender = Render.renderControl(that, control);

                        if (controlRender) {
                            controlsLeft.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(footer.center) && footer.center.length > 0) {
                    $.each(footer.center, function (key, control) {
                        let controlRender = Render.renderControl(that, control);

                        if (controlRender) {
                            controlsCenter.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(footer.right) && footer.right.length > 0) {
                    $.each(footer.right, function (key, control) {
                        let controlRender = Render.renderControl(that, control);

                        if (controlRender) {
                            controlsRight.push(controlRender);
                        }
                    });
                }

                if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                    if (footer.type === 'in') {
                        let footerControls = $(
                            Utils.render(Tpl['table/controls/footer.html'], {
                                controlsLeft: controlsLeft,
                                controlsCenter: controlsCenter,
                                controlsRight: controlsRight,
                            })
                        );


                        if (controlsLeft.length > 0) {
                            $.each(controlsLeft, function (key, control) {
                                footerControls.find('.coreui-table__controls_left').append(control)
                            });
                        }

                        if (controlsCenter.length > 0) {
                            $.each(controlsCenter, function (key, control) {
                                footerControls.find('.coreui-table__controls_center').append(control)
                            });
                        }

                        if (controlsRight.length > 0) {
                            $.each(controlsRight, function (key, control) {
                                footerControls.find('.coreui-table__controls_right').append(control)
                            });
                        }

                        render.footersIn.push(footerControls);
                    } else {
                        let footerControls = $(
                            Utils.render(Tpl['table/controls/footer-out.html'], {
                                controlsLeft: controlsLeft,
                                controlsCenter: controlsCenter,
                                controlsRight: controlsRight,
                            })
                        );


                        if (controlsLeft.length > 0) {
                            $.each(controlsLeft, function (key, control) {
                                footerControls.find('.coreui-table__controls_left').append(control)
                            });
                        }

                        if (controlsCenter.length > 0) {
                            $.each(controlsCenter, function (key, control) {
                                footerControls.find('.coreui-table__controls_center').append(control)
                            });
                        }

                        if (controlsRight.length > 0) {
                            $.each(controlsRight, function (key, control) {
                                footerControls.find('.coreui-table__controls_right').append(control)
                            });
                        }

                        render.footersOut.push(footerControls);
                    }
                }
            });
        }


        // Загрузка записей
        if (this._isRecordsRequest) {
            this.on('container_show', function () {
                if (typeof options.recordsRequest === 'function') {
                    that.loadByFunction(options.recordsRequest);
                } else {
                    that.load(options.recordsRequest.url, options.recordsRequest.method);
                }
            });
        }


        let classes        = [];
        let classesWrapper = [];

        if (options.hasOwnProperty('theme') &&
            typeof options.theme === 'string' &&
            options.theme
        ) {
            classes.push('coreui-theme-' + options.theme);
        }


        if (options.hasOwnProperty('showScrollShadow') &&
            typeof options.showScrollShadow === 'boolean' &&
            options.showScrollShadow
        ) {
            classesWrapper.push('table-scroll-shadow');
        }

        if (options.hasOwnProperty('overflow') &&
            typeof options.overflow === 'boolean' &&
            options.overflow
        ) {
            classesWrapper.push('overflow-x-auto');
        }


        let tableElement     = Render.renderTable(this);
        let containerElement = $(Utils.render(Tpl['container.html'], {
            id: this._id,
            classes: classes.length > 0 ? ' ' + classes.join(' ') : '',
            classesWrapper: classesWrapper.length > 0 ? ' ' + classesWrapper.join(' ') : '',
            classesRoot: classesWrapper.length > 0 ? ' ' + classesWrapper.join(' ') : '',
            widthSizes: widthSizes,
            heightSizes: heightSizes,
        }));


        if (render.headersOut.length > 0) {
            containerElement.prepend(render.headersOut);
        }
        if (render.headersIn.length > 0) {
            containerElement.find('.coreui-table__container').prepend(render.headersIn);
        }
        if (render.footersIn.length > 0) {
            containerElement.find('.coreui-table__container').append(render.footersIn);
        }
        if (render.footersOut.length > 0) {
            containerElement.append(render.footersOut);
        }

        containerElement.find('.coreui-table__wrapper').html(tableElement);



        Controller._instances[this.getId()] = this;


        if (element === undefined) {
            return containerElement;
        }

        // Dom element
        let domElement = null;

        if (typeof element === 'string') {
            domElement = document.getElementById(element);

        } else if (element instanceof HTMLElement) {
            domElement = element;
        }

        if (domElement) {
            $(domElement).html(containerElement);
            this.initEvents();
        }
    }


    /**
     * Блокировка таблицы
     */
    lock() {

        let container = Elements.getContainer(this.getId());

        if (container[0] && ! container.find('.coreui-table-lock')[0]) {
            let html =  Utils.render(Tpl['table/loader.html'], {
                lang: this.getLang()
            });

            container.prepend(html);
        }
    }


    /**
     * Разблокировка таблицы
     */
    unlock() {

        Elements.getLock(this.getId()).hide(50, function () {
            $(this).remove()
        });
    }


    /**
     * Загрузка строк
     * @param {string} url
     * @param {string} method
     */
    load(url, method) {

        this.lock();

        let that   = this;
        let params = {};

        if (url.match(/\[page\]/)) {
            url = url.replace(/\[page\]/g, this._page);
        } else {
            let paramPage = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page')
                ? this._options.requestParams.page
                : 'page';
            params[paramPage] = this._page;
        }

        if (url.match(/\[count\]/)) {
            url = url.replace(/\[count\]/g, this._recordsPerPage);
        } else {
            let paramCount = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count')
                ? this._options.requestParams.count
                : 'count';
            params[paramCount] = this._recordsPerPage;
        }

        if (url.match(/\[start\]/)) {
            url = url.replace(/\[start\]/g, ((this._page - 1) * this._recordsPerPage) + 1);
        } else {
            let paramStart = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start')
                ? this._options.requestParams.start
                : 'start';
            params[paramStart] = ((this._page - 1) * this._recordsPerPage) + 1;
        }

        if (url.match(/\[end\]/)) {
            url = url.replace(/\[end\]/g, ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage));
        } else {
            let paramEnd = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end')
                ? this._options.requestParams.end
                : 'end';
            params[paramEnd] = ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage);
        }


        let searchData = this.getSearchData();
        let filterData = this.getFilterData();

        if (filterData.length > 0) {
            filterData.map(function (filter) {
                searchData.push(filter);
            });
        }

        if (searchData.length > 0) {
            let paramSearch = Utils.isObject(this._options.requestParams) &&
                              this._options.requestParams.hasOwnProperty('search') &&
                              typeof this._options.requestParams.search === 'string'
                ? this._options.requestParams.search
                : 'search';

            params[paramSearch] = {};

            searchData.map(function (searchItem) {
                params[paramSearch][searchItem.field] = searchItem.value
            });
        }

        if (this._sort.length > 0) {
            let paramSort = Utils.isObject(this._options.requestParams) &&
                            this._options.requestParams.hasOwnProperty('sort') &&
                            typeof this._options.requestParams.sort === 'string'
                ? this._options.requestParams.sort
                : 'sort';

            params[paramSort] = this._sort;
        }


        $.ajax({
            url: url,
            method: method || 'GET',
            dataType: "json",
            data: params,
            beforeSend: function(xhr) {
                Private._trigger(that, 'records_load_start', [that, xhr ]);
            },
            success: function (result) {

                if (result.hasOwnProperty('records') &&
                    typeof result.records === 'object' &&
                    Array.isArray(result.records)
                ) {
                    let total = result.hasOwnProperty('total') && Utils.isNumeric(result.total)
                        ? result.total
                        : null;
                    that.setRecords(result.records, total);

                } else {
                    that.setRecords([]);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                that.setRecords([]);
                Private._trigger(that, 'records_load_error', [that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                Private._trigger(that, 'records_load_end', [that, xhr, textStatus ]);
            },
        });
    }


    /**
     * Загрузка строк
     * @param {function} callback
     */
    loadByFunction(callback) {

        let that   = this;
        let params = {};

        let paramPage = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page')
            ? this._options.requestParams.page
            : 'page';

        let paramCount = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count')
            ? this._options.requestParams.count
            : 'count';

        let paramStart = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start')
            ? this._options.requestParams.start
            : 'start';

        let paramEnd = Utils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end')
            ? this._options.requestParams.end
            : 'end';

        params[paramCount] = this._recordsPerPage;
        params[paramPage]  = this._page;
        params[paramStart] = ((this._page - 1) * this._recordsPerPage) + 1;
        params[paramEnd]   = ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage);



        let searchData = this.getSearchData();
        let filterData = this.getFilterData();

        if (filterData.length > 0) {
            $.each(filterData, function (key, filter) {
                searchData.push(filter);
            });
        }

        if (searchData.length > 0) {
            let paramSearch = Utils.isObject(this._options.requestParams) &&
                              this._options.requestParams.hasOwnProperty('search') &&
                              typeof this._options.requestParams.search === 'string'
                ? this._options.requestParams.search
                : 'search';

            params[paramSearch] = {};

            searchData.map(function (searchItem) {
                params[paramSearch][searchItem.field] = searchItem.value
            });
        }

        if (this._sort.length > 0) {
            let paramSort = Utils.isObject(this._options.requestParams) &&
                            this._options.requestParams.hasOwnProperty('sort') &&
                            typeof this._options.requestParams.sort === 'string'
                ? this._options.requestParams.sort
                : 'sort';

            params[paramSort] = this._sort;
        }

        let result = callback(params, this);


        /**
         * Установка записей
         * @param {Object} data
         */
        function setRecords (data) {

            if (data.hasOwnProperty('records') &&
                typeof data.records === 'object' &&
                Array.isArray(data.records)
            ) {
                let total = data.hasOwnProperty('total') && Utils.isNumeric(data.total)
                    ? data.total
                    : null;
                that.setRecords(data.records, total);

            } else {
                that.setRecords([]);
            }
        }



        if (result instanceof Promise) {
            this.lock();

            result
                .then(function (data) {
                    that.unlock();

                    setRecords(data);
                })
                .catch(function () {
                    that.unlock();
                })

        } else if (typeof result === 'object') {
            setRecords(result);
        }
    }


    /**
     * Перезагрузка записей в таблице
     */
    reload() {

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'function') {
                this.loadByFunction(this._options.recordsRequest);
            } else {
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            }
        }
    }


    /**
     * Пересоздание тела таблицы
     */
    refresh() {

        let table = Render.renderTable(this);

        Elements.getTable(this.getId()).replaceWith(table);

        Private._trigger(this, 'table_show', [this ]);
        Private._trigger(this, 'records_show', [this ]);
    }


    /**
     * Установка общего количества записей на странице
     * @param recordsPerPage
     */
    setPageSize(recordsPerPage) {

        this._recordsPerPage = recordsPerPage;

        Private._trigger(this, 'page_size_update');
    }


    /**
     * Выбор всех записей в таблице
     */
    selectAll() {

        Elements.selectTrAll(this.getId())

        Private._trigger(this, 'record_select_all');
    }


    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll() {

        Elements.unselectTrAll(this.getId())

        Private._trigger(this, 'record_unselect_all');
    }


    /**
     * Выбор записи в таблице
     * @param {string} id
     */
    selectRecord(id) {

        let record = this.getRecordById(id);

        if ( ! record) {
            return;
        }

        let tr = Elements.getTrByIndex(this.getId(), record.index);

        if (tr.length === 0) {
            return;
        }

        Elements.selectTr(tr)

        Private._trigger(this, 'record_select', [record ]);
    }


    /**
     * Выбор записи в таблице по индексу
     * @param {int} index
     */
    selectRecordByIndex(index) {

        let record = this.getRecordByIndex(index);

        if ( ! record) {
            return;
        }

        let tr = Elements.getTrByIndex(this.getId(), record.index);

        if (tr.length === 0) {
            return;
        }

        Elements.selectTr(tr)

        Private._trigger(this, 'record_select', [record ]);
    }


    /**
     * Отмена выбора записи в таблице
     * @param {string} id
     */
    unselectRecord(id) {

        let record = this.getRecordById(id);

        if ( ! record) {
            return;
        }

        let tr = Elements.getTrByIndex(this.getId(), record.index);

        if ( ! tr) {
            return;
        }

        Elements.unselectTr(tr)

        Private._trigger(this, 'record_unselect', [record.data ]);
    }


    /**
     * Получение выбранных id
     * @return {array}
     */
    getSelectedRecordsId() {

        let records = [];
        let that    = this;
        let field   = this._options.primaryKey;

        $.each(Elements.getSelectedIndexes(this.getId()), function (key, index) {
            let record = that.getRecordByIndex(index);

            if ( ! record || ! record.data.hasOwnProperty(field)) {
                return;
            }

            records.push(record.data[field]);
        });

        return records;
    }


    /**
     * Получение выбранных записей
     * @return {array}
     */
    getSelectedRecords() {

        let records = [];
        let that    = this;

        $.each(Elements.getSelectedIndexes(this.getId()), function (key, index) {
            let record = that.getRecordByIndex(index);

            if ( ! record) {
                return;
            }

            records.push(record);
        });

        return records;
    }


    /**
     * Получение записи по id
     * @param id
     * @return {object|null}
     * @deprecated
     */
    getRecord(id) {

        let record = this.getRecordById(id);

        if ( ! record) {
            return null;
        }

        return record.data;
    }


    /**
     * Получение записей
     */
    getRecords() {

        let records = []

        $.each(this._records, function (key, record) {
            records.push($.extend(true, {}, record));
        });

        return records;
    }


    /**
     * Получение данных из существующих записей
     * @return {Array}
     */
    getRecordsData() {

        let data = []

        $.each(this._records, function (key, record) {
            data.push($.extend(true, {}, record.data));
        });

        return data;
    }


    /**
     * Переход к предыдущей странице
     */
    prevPage() {

        if (this._page > 1) {
            this._page--;
            this.reload();
        }
    }


    /**
     * Переход к следующей странице
     * @return {array}
     */
    nextPage() {

        let totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0
            ? Math.ceil(this._recordsTotal / this._recordsPerPage)
            : 1;

        if (this._page < totalPages) {
            this._page++;
            this.reload();
        }
    }


    /**
     * Переход к указанной странице
     */
    goPage(page) {

        if (page >= 1) {
            this._page = page;
            this.reload();
        }
    }


    /**
     * Регистрация функции на событие
     * @param {Array|string} eventName
     * @param {function}     callback
     * @param {*}            context
     * @param {boolean}      singleExec
     */
    on(eventName, callback, context, singleExec) {

        let eventNames = [];

        if (Array.isArray(eventName)) {
            $.each(eventName, function (key, name) {
                if (typeof name === 'string' && name) {
                    eventNames.push(name);
                }
            });

        } else if (typeof eventName === 'string' && eventName) {
            eventNames.push(eventName);

        } else {
            return;
        }

        let that = this;

        $.each(eventNames, function (key, name) {

            if ( ! Array.isArray(that._events[name])) {
                that._events[name] = [];
            }

            that._events[name].push({
                context : context ? context : that,
                callback: callback,
                singleExec: !! singleExec,
            });
        });
    }


    /**
     * Получение переводов текущего языка
     * @return {object}
     */
    getLang() {

        return $.extend(true, {}, this._options.langItems);
    }


    /**
     * Установка видимых колонок, не указанные колонки будут скрыты
     * @param {Array} columns
     */
    setColumnsShow(columns) {

        if ( ! Array.isArray(columns)) {
            return;
        }

        let isChange = false;
        let table    = this;

        this._countColumnsShow = 0;


        this._columns.map(function (column) {
            let options = column.getOptions();

            if (options.hasOwnProperty('field') && typeof options.field === 'string') {

                let isShow = columns.indexOf(options.field) >= 0;

                if (column.isShow() !== isShow) {
                    column.setShow(isShow);
                    isChange = true;
                }
            }

            if (column.isShow()) {
                table._countColumnsShow++;
            }
        });


        if (isChange) {
            Private._trigger(this, 'columns_change');
            this.refresh();
        }
    }


    /**
     * Показ колонок
     * @param {Array} columns
     */
    showColumns(columns) {

        if ( ! Array.isArray(columns)) {
            return;
        }

        let isChange = false;
        let table    = this;

        this._countColumnsShow = 0;


        this._columns.map(function (column) {
            let options = column.getOptions();

            if (options.hasOwnProperty('field') &&
                typeof options.field === 'string' &&
                columns.indexOf(options.field) >= 0 &&
                ! column.isShow()
            ) {
                column.setShow(true);
                isChange = true;
            }

            if (column.isShow()) {
                table._countColumnsShow++;
            }
        });


        if (isChange) {
            Private._trigger(this, 'columns_change');
            this.refresh();
        }
    }


    /**
     * Скрытие колонок
     * @param {Array} columns
     */
    hideColumns(columns) {

        if ( ! Array.isArray(columns)) {
            return;
        }

        let isChange = false;
        let table    = this;

        this._countColumnsShow = 0;


        this._columns.map(function (column) {
            let options = column.getOptions();

            if (options.hasOwnProperty('field') &&
                typeof options.field === 'string' &&
                columns.indexOf(options.field) >= 0 &&
                column.isShow()
            ) {
                column.setShow(false);
                isChange = true;
            }

            if (column.isShow()) {
                table._countColumnsShow++;
            }
        });

        if (isChange) {
            Private._trigger(this, 'columns_change');
            this.refresh();
        }
    }


    /**
     * Получение поисковых данных
     * @property {boolean} extOptions
     * @return {*[]}
     */
    getSearchData(extOptions) {

        let searchData = [];

        this._search.map(function (control) {
            let field = control.getField();

            if (field) {
                let value = control.getValue();

                if (value !== null) {
                    let search = {
                        field: field,
                        value: value,
                    }

                    if (extOptions) {
                        search.filter = typeof control.filter === 'function' ? control.filter : null;
                        search.type   = control._options.type;
                    }

                    searchData.push(search);
                }
            }
        });

        return searchData;
    }


    /**
     * Получение данных из фильтров
     * @property {boolean} extOptions
     * @return {*[]}
     */
    getFilterData(extOptions) {

        let filterData = [];

        this._filters.map(function (control) {
            let field = control.getField();

            if (field) {
                let value = control.getValue();

                if (value !== null) {
                    let filter = {
                        field: field,
                        value: value,
                    }

                    if (extOptions) {
                        filter.filter = typeof control.filter === 'function' ? control.filter : null;
                    }

                    filterData.push(filter);
                }
            }
        });

        return filterData;
    }


    /**
     * Поиск по таблице с использованием данных из поиска и фильтров
     */
    searchRecords() {

        let searchData = this.getSearchData();
        let filterData = this.getFilterData();

        this._page = 1;

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'function') {
                this.loadByFunction(this._options.recordsRequest);
            } else {
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            }
        } else {
            Private.searchLocalRecords(this);
            this.refresh();
        }


        Private._trigger(this, 'filters_change', [filterData ]);
        Private._trigger(this, 'search_change', [searchData ]);
    }


    /**
     * Очистка поисковых данных
     */
    clearSearch() {

        $.each(this._search, function (key, search) {
            search.setValue(null);
        });

        this.searchRecords();
    }


    /**
     * Очистка поисковых данных в фильтрах
     */
    clearFilters() {

        $.each(this._filters, function (key, filter) {
            filter.setValue(null);
        });

        this.searchRecords();
    }


    /**
     * Получение записи по индексу
     * @param {string|number} index
     * @return {object|null}
     */
    getRecordByIndex(index) {

        if (['string', 'number'].indexOf(typeof index) < 0 || index === '') {
            return null;
        }

        index = Number(index);

        if (index <= 0) {
            return null;
        }

        let record = null;

        $.each(this._records, function (key, recordItem) {
            if (recordItem.index === index) {
                record = {
                    index: recordItem.index,
                    data: $.extend(true, {}, recordItem.data),
                    meta: recordItem.meta ? $.extend(true, {}, recordItem.meta) : null,
                };
                return false;
            }
        });

        return record;
    }


    /**
     * Получение записи по id
     * @param {string} id
     * @return {object|null}
     */
    getRecordById(id) {

        return this.getRecordByField(this._options.primaryKey, id);
    }


    /**
     * Получение записи по полю и его значению
     * @param {string}        field
     * @param {string|number} value
     * @return {object|null}
     */
    getRecordByField(field, value) {

        let record = null;

        $.each(this._records, function (key, recordItem) {
            if (recordItem.data.hasOwnProperty(field) && recordItem.data[field] === value) {
                record = $.extend(true, {}, recordItem);

                return false;
            }
        });

        return record;
    }


    /**
     * Получение контрола по его id
     * @param {string} id
     * @return {object}
     */
    getControlById(id) {

        let result = null;

        $.each(this._controls, function (key, control) {
            if (control.hasOwnProperty('getId') &&
                typeof control.getId === 'function' &&
                control.getId() === id
            ) {
                result = control;
                return false;
            }
        });

        return result;
    }


    /**
     * Получение контрола поиска по его id
     * @param {string} id
     * @return {object}
     */
    getSearchControlById(id) {

        let result = null;

        $.each(this._search, function (key, search) {
            if (search.hasOwnProperty('getId') &&
                typeof search.getId === 'function' &&
                search.getId() === id
            ) {
                result = search;
                return false;
            }
        });

        return result;
    }


    /**
     * Сортировка по полям
     * @param {Array} sorting
     */
    sortFields(sorting) {

        if ( ! Array.isArray(sorting)) {
            return;
        }

        let that              = this;
        let columnsConverters = {};

        this._sort = [];

        $.each(sorting, function (key, sort) {
            if ( ! Utils.isObject(sort) ||
                 ! sort.hasOwnProperty('field') ||
                 ! sort.hasOwnProperty('order') ||
                typeof sort.field !== 'string' ||
                typeof sort.order !== 'string' ||
                 ! sort.field ||
                 ! sort.order
            ) {
                return;
            }


            let columnSortable = false;

            $.each(that._columns, function (key, column) {
                let options = column.getOptions();

                if (options.hasOwnProperty('field') &&
                    options.hasOwnProperty('sortable') &&
                    typeof options.field === 'string' &&
                    options.field === sort.field &&
                    options.sortable
                ) {
                    columnSortable = true;

                    if (typeof column.convertToString === 'function') {
                        columnsConverters[options.field] = column.convertToString;
                    }

                    return false;
                }
            });


            if (columnSortable) {
                that._sort.push({
                    field: sort.field,
                    order: sort.order,
                });
            }
        });


        this._page = 1;

        if (this._sort.length >= 0) {
            if (this._isRecordsRequest) {
                if (typeof this._options.recordsRequest === 'function') {
                    this.loadByFunction(this._options.recordsRequest);
                } else {
                    this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
                }
                Private.setColumnsSort(this, this._sort);

            } else {
                this._records = Private.sortRecordsByFields(this._records, this._sort, columnsConverters);
                this.refresh();
            }
        }

        Private._trigger(this, 'records_sort', [this ]);
    }


    /**
     * Сортировка по умолчанию
     */
    sortDefault() {

        this._sort = [];

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'function') {
                this.loadByFunction(this._options.recordsRequest);
            } else {
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            }
            Private.setColumnsSort(this);

        } else {
            this._records = Private.sortRecordsBySeq(this._records);
            this.refresh();
        }

        Private._trigger(this, 'records_sort', [this ]);
    }


    /**
     * Удаление строки из таблицы по индексу
     * @param index
     */
    removeRecordByIndex(index) {

        let recordKey = null;

        $.each(this._records, function (key, recordItem) {
            if (recordItem.index === index) {
                recordKey = key;
                return false;
            }
        });

        if (recordKey !== null && recordKey >= 0) {
            this._records.splice(recordKey, 1);

            let that = this;
            let tr   = Elements.getTrByIndex(this.getId(), index);

            if (tr.length >= 0) {
                let emptyRecords = that._records.length === 0;

                tr.fadeOut('fast', function () {
                    tr.remove();

                    if (emptyRecords) {
                        let tbody = Elements.getTableTbody(that.getId());

                        tbody.append(
                            Utils.render(Tpl['table/record/empty.html'], {
                                columnsCount: that._countColumnsShow,
                                lang: that.getLang(),
                            })
                        );
                    }
                });
            }

            this._recordsNumber--;
        }
    }


    /**
     * Добавление строки в таблицу после строки с индексом
     * @param {object} recordData
     * @param {number} index
     */
    addRecordAfterIndex(recordData, index) {

        let tr = Elements.getTrByIndex(this.getId(), index);

        if (tr.length >= 0) {
            let record = Private.addRecord(this, recordData, index);

            if (record) {
                Elements.getTrEmpty(this.getId()).remove();

                tr.after(
                    Render.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    }


    /**
     * Добавление строки в таблицу перед строкой с индексом
     * @param {object} recordData
     * @param {number} index
     */
    addRecordBeforeIndex(recordData, index) {

        let tr = Elements.getTrByIndex(this.getId(), index);

        if (tr.length >= 0) {
            let record = Private.addRecordBefore(this, recordData, index);

            if (record) {
                Elements.getTrEmpty(this.getId()).remove();

                tr.before(
                    Render.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    }


    /**
     * Добавление строки в начало таблицы
     * @param {object} recordData
     */
    addRecordFirst(recordData) {

        let tbody = Elements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = Private.addRecord(this, recordData, 0);

            if (record) {
                Elements.getTrEmpty(this.getId()).remove();

                tbody.prepend(
                    Render.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    }


    /**
     * Добавление строки в конец таблицы
     * @param {object} recordData
     */
    addRecordLast(recordData) {

        let tbody = Elements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = Private.addRecord(this, recordData);

            if (record) {
                Elements.getTrEmpty(this.getId()).remove();

                tbody.append(
                    Render.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    }


    /**
     * Установка записей для таблицы
     * @param {Array}  records
     * @param {number} total
     */
    setRecords(records, total) {

        if ( ! Array.isArray(records)) {
            return;
        }

        this._recordsTotal = Utils.isNumeric(total) ? parseInt(total) : records.length;

        Private.setRecords(this, records);

        if (records.length > 0) {
            this._recordsNumber = this._page === 1
                ? 1
                : ((this._page - 1) * this._recordsPerPage) + 1;
        }

        let recordsElements = Render.renderRecords(this, this._records);
        let tableBody       = Elements.getTableTbody(this.getId());

        tableBody.html('');

        $.each(recordsElements, function (key, recordElement) {
            tableBody.append(recordElement);
        });


        Private._trigger(this, 'records_show', [this ]);
    }


    /**
     * Получение количества строк
     * @return {number}
     */
    getRecordsCount() {

        let count = 0;

        if (this._isRecordsRequest) {
            count = this._recordsTotal;

        } else {

            this._records.map(function (record) {
                if (record.show) {
                    count++;
                }
            });
        }

        return count;
    }


    /**
     * Раскрытие / скрытие дополнительных данных строки
     * @param {number}                                   recordIndex
     * @param {HTMLElement|jQuery|string|Array|function} content
     * @param {boolean}                                  isRebuild - true default
     */
    expandRecordContent(recordIndex, content, isRebuild) {

        let recordElement  = Elements.getTrByIndex(this.getId(), recordIndex);
        let recordExpanded = Elements.getExpandRow(recordElement);

        if (recordElement.hasClass('record-expanded')) {

            if (recordExpanded) {
                if (isRebuild === undefined || isRebuild) {
                    Elements.removeExpandRow(recordExpanded);
                } else {
                    Elements.hideExpandRow(recordExpanded);
                }
            }

            recordElement.removeClass('record-expanded');
            Private._trigger(this, 'record_expand_hide', [recordIndex]);

        } else {
            if (recordExpanded) {
                Elements.showExpandRow(recordExpanded);
                recordElement.addClass('record-expanded');
                Private._trigger(this, 'record_expand_show', [recordIndex]);

            } else {
                let recordIndex = recordElement.data('record-index');

                if (typeof content === 'function') {
                    let callbackResult = content();

                    if (callbackResult instanceof Promise) {
                        let that = this;

                        callbackResult
                            .then(function (result) {
                                Elements.addExpandRow(that, recordElement, result);
                                Private._trigger(that, 'record_expand_show', [recordIndex]);

                            }).catch(function () {
                                Elements.addExpandRow(that, recordElement, '');
                                Private._trigger(that, 'record_expand_show', [recordIndex]);
                            });

                    } else{
                        Elements.addExpandRow(this, recordElement, callbackResult);
                        Private._trigger(this, 'record_expand_show', [recordIndex]);
                    }

                } else {
                    Elements.addExpandRow(this, recordElement, content);
                    Private._trigger(this, 'record_expand_show', [recordIndex]);
                }
            }
        }
    }


    /**
     * Раскрытие / скрытие дополнительных данных строки
     * @param {number}  recordIndex
     * @param {string}  url
     * @param {boolean} isRebuild
     */
    expandRecordUrl(recordIndex, url, isRebuild) {

        let that = this;

        this.expandRecordContent(recordIndex, function () {

            that.lock();

            return new Promise(function (resolve, reject) {

                $.ajax({
                    method : 'get',
                    url    : url,
                    success: function (response, textStatus, xhr) {
                        let result = response;

                        if (typeof response === 'string') {
                            if (String(xhr.getResponseHeader('Content-Type')).indexOf('application/json') === 0) {
                                try {
                                    result = JSON.parse(response);
                                } catch (e) {
                                    console.warn(e);
                                }
                            }
                        }

                        resolve(result);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        reject(xhr, textStatus, errorThrown);
                    },
                    complete: function(xhr, textStatus) {
                        that.unlock();
                    },
                });
            });

        }, isRebuild);
    }


    /**
     * @return {Object}
     */
    addHeaderOut() {
        return this.addHeader('out');
    }


    /**
     * @return {Object}
     */
    addHeaderIn() {
        return this.addHeader('in');
    }


    /**
     * @param {string} type
     * @return {ToolBox}
     */
    addHeader(type) {

        if ( ! Array.isArray(this._options.header)) {
            this._options.header = [];
        }

        let toolBox = new ToolBox(type);

        //this._options.header = this._options.header.slice();
        this._options.header.unshift(toolBox);

        return toolBox;
    }


    /**
     * @return {ToolBox}
     */
    addFooterOut() {
        return this.addFooter('out');
    }


    /**
     * @return {ToolBox}
     */
    addFooterIn() {
        return this.addFooter('in');
    }


    /**
     * @param {string} type
     * @return {ToolBox}
     */
    addFooter(type) {

        if ( ! Array.isArray(this._options.footer)) {
            this._options.footer = [];
        }

        let toolBox = new ToolBox(type);

        this._options.footer.push(toolBox);

        return toolBox;
    }


    /**
     *
     * @param width
     */
    setSearchLabelWidth(width) {

        if ( ! Utils.isObject(this._options.search)) {
            this._options.search = {};
        }

        this._options.search.labelWidth = width
    }


    /**
     * @param {Array} fields
     */
    addSearch(fields) {

        if (Array.isArray(fields) && fields.length > 0) {
            let that = this;

            fields.map(function (field, i) {

                if (field instanceof Search) {
                    that._options.search.controls.push(field.toObject());

                } else if (Utils.isObject(field)) {
                    that._options.search.controls.push(field);
                }
            });
        }
    }


    /**
     * @param {Array} columns
     */
    addColumns(columns) {

        if (Array.isArray(columns) && columns.length > 0) {
            let that = this;

            columns.map(function (column, i) {

                if (column instanceof Column) {
                    that._options.columns.push(column.toObject());

                } else if (Utils.isObject(column)) {
                    that._options.columns.push(column);
                }
            });
        }
    }
}


export default Table;