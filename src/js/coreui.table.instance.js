
import coreuiTableTpl      from './coreui.table.templates';
import coreuiTableUtils    from "./coreui.table.utils";
import coreuiTableRender   from "./coreui.table.render";
import coreuiTableElements from "./coreui.table.elements";
import coreuiTablePrivate  from "./coreui.table.private";


let coreuiTableInstance = {

    _options: {
        id: null,
        class: '',
        primaryKey: 'id',
        lang: 'en',
        langList: {},
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
        noBorder: false,
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
    },

    _id: '',
    _page: 1,
    _recordsIndex: 1,
    _recordsPerPage: 25,
    _recordsTotal: 0,
    _recordsNumber: 1,
    _seq: 1,
    _isRecordsRequest: false,
    _countColumnsShow: 0,

    _records: [],
    _sort: [],
    _columns: [],
    _search: [],
    _filters: [],
    _controls: [],
    _controlsPositions: {
        header: [],
        footer: [],
    },
    _events: {},


    /**
     * Инициализация
     * @param {object} tableWrapper
     * @param {object} options
     * @private
     */
    _init: function (tableWrapper, options) {

        this._options = $.extend(true, {}, this._options, options);
        this._events  = {};
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiTableUtils.hashCode();

        if (this._options.page > 0) {
            this._page = this._options.page;
        }
        if (this._options.recordsPerPage > 0) {
            this._recordsPerPage = this._options.recordsPerPage;
        }

        this._isRecordsRequest = (
            this._options.hasOwnProperty('recordsRequest') &&
            (
                typeof this._options.recordsRequest === 'function' ||
                (coreuiTableUtils.isObject(this._options.recordsRequest) &&
                this._options.recordsRequest.hasOwnProperty('url') &&
                typeof this._options.recordsRequest.url === 'string' &&
                this._options.recordsRequest.url !== '' &&
                this._options.recordsRequest.url !== '#')
            )
        );

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'object' &&
                ( ! this._options.recordsRequest.hasOwnProperty('method') ||
                 typeof this._options.recordsRequest.method !== 'string')
            ) {
                this._options.recordsRequest.method = 'GET';
            }

        } else if (Array.isArray(this._options.records)) {
            coreuiTablePrivate.setRecords(this, this._options.records);
        }

        // Очистка записей после инициализации
        this._options.records = [];

        // Инициализация колонок
        if (typeof this._options.columns === 'object' &&
            Array.isArray(this._options.columns) &&
            this._options.columns.length > 0
        ) {
            coreuiTablePrivate.initColumns(tableWrapper, this, this._options.columns);
        }


        // Инициализация поисковых полей
        if (coreuiTableUtils.isObject(this._options.search) &&
            typeof this._options.search.controls === 'object' &&
            Array.isArray(this._options.search.controls) &&
            this._options.search.controls.length > 0
        ) {
            coreuiTablePrivate.initSearch(tableWrapper, this, this._options.search.controls);
        }


        // Инициализация контролов и фильтров
        if (this._options.hasOwnProperty('header') &&
            Array.isArray(this._options.header) &&
            this._options.header.length > 0
        ) {
            coreuiTablePrivate.initControls(tableWrapper, this, this._options.header, 'header');
        }

        if (this._options.hasOwnProperty('footer') &&
            Array.isArray(this._options.footer) &&
            this._options.footer.length > 0
        ) {
            coreuiTablePrivate.initControls(tableWrapper, this, this._options.footer, 'footer');
        }


        if (this._options.saveState && this._options.id) {

            // Поиск по сохраненным поисковым данным
            if ( ! this._isRecordsRequest) {
                coreuiTablePrivate.searchLocalRecords(this);
            }

            // Сортировка
            let sort = coreuiTablePrivate.getStorageField(this.getId(), 'sort');

            if (Array.isArray(sort) && sort.length > 0) {
                coreuiTablePrivate.initSort(this, sort);

                if ( ! this._isRecordsRequest && this._records.length > 0) {
                    this._records = coreuiTablePrivate.sortRecordsByFields(this._records, this._sort);
                }
            }

        } else {
            if (this._options.hasOwnProperty('sort') &&
                Array.isArray(this._options.sort) &&
                this._options.sort.length > 0
            ) {
                coreuiTablePrivate.initSort(this, this._options.sort);
            }
        }
    },


    /**
     * Инициализация событий таблицы
     */
    initEvents: function () {

        let that = this;

        // Показ строк
        this.on('records_show', function () {

            // Переход по ссылке
            if (typeof that._options.onClickUrl === 'string' && that._options.onClickUrl) {
                coreuiTableElements.getTrRecords(that.getId()).click(function () {
                    let recordKey = $(this).data('record-index');
                    let record    = that.getRecordByIndex(recordKey);

                    if ( ! record) {
                        return;
                    }

                    let url = that._options.onClickUrl;

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
            if (['function', 'string'].indexOf(typeof that._options.onClick)) {

                coreuiTableElements.getTrRecords(that.getId()).click(function (event) {
                    let recordKey = $(this).data('record-index');
                    let record    = that.getRecordByIndex(recordKey);

                    if ( ! record) {
                        return;
                    }

                    if (typeof that._options.onClick === 'function') {
                        that._options.onClick(event, record);

                    } else if (typeof that._options.onClick === 'string') {
                        let func = new Function('event', 'record', that._options.onClick);

                        func(event, record);
                    }
                });
            }

            // Раскрытие строки
            coreuiTableElements.getNoWrapToggles(that.getId()).click(function (event) {

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
            coreuiTableElements.fixedColsLeft(that.getId())
            coreuiTableElements.fixedColsRight(that.getId())
        });


        // Показ таблицы
        this.on('table_show', function () {

            let sortableColumns = coreuiTableElements.getTableSortable(that.getId());
            if (sortableColumns[0]) {
                sortableColumns.click(function () {
                    let field = $(this).data('field');

                    if (field) {
                        let sorting      = [];
                        let currentOrder = null;

                        $.each(that._sort, function (key, sortField) {

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
                            that.sortDefault();

                        } else {
                            that.sortFields(sorting);
                        }
                    }
                });
            }


            if (window.hasOwnProperty('bootstrap') && bootstrap.hasOwnProperty('Tooltip')) {
                $('.coreui-table__column-description', coreuiTableElements.getTableThead(that.getId())).each(function () {
                    new bootstrap.Tooltip(this);
                });
            }
        });


        // События смены состояния
        if (this._options.saveState && this._options.id) {
            this.on('records_sort', function () {
                coreuiTablePrivate.setStorageField(that.getId(), 'sort', that._sort);
            });

            this.on('search_change', function () {
                coreuiTablePrivate.setStorageField(that.getId(), 'search', that.getSearchData());
            });

            this.on('filters_change', function () {
                coreuiTablePrivate.setStorageField(that.getId(), 'filters', that.getFilterData());
            });

            this.on('columns_change', function () {
                let columns = [];

                $.each(that._columns, function (key, column) {
                    let columnOptions = column.getOptions();

                    columns.push({
                        field: columnOptions.field,
                        isShow: column.isShow(),
                    })
                });

                coreuiTablePrivate.setStorageField(that.getId(), 'columns', columns);
            });
        }


        coreuiTablePrivate._trigger(this, 'table_show', [ this ]);
        coreuiTablePrivate._trigger(this, 'container_show');

        // Вызов события показа строк
        if ( ! this._isRecordsRequest) {
            coreuiTablePrivate._trigger(this, 'records_show', [ this ]);
        }
    },


    /**
     * Получение идентификатора таблицы
     * @returns {string}
     */
    getId: function () {
        return this._id;
    },


    /**
     * Получение опций таблицы
     * @returns {*}
     */
    getOptions: function () {

        return $.extend(true, {}, this._options);
    },


    /**
     *
     * @param element
     * @returns {*}
     */
    render: function(element) {

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
            $.each(this._controlsPositions.header, function (key, header) {
                let controlsLeft   = [];
                let controlsCenter = [];
                let controlsRight  = [];

                if (Array.isArray(header.left) && header.left.length > 0) {
                    $.each(header.left, function (key, control) {
                        let controlRender = coreuiTableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsLeft.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(header.center) && header.center.length > 0) {
                    $.each(header.center, function (key, control) {
                        let controlRender = coreuiTableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsCenter.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(header.right) && header.right.length > 0) {
                    $.each(header.right, function (key, control) {
                        let controlRender = coreuiTableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsRight.push(controlRender);
                        }
                    });
                }

                if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                    if (header.type === 'in') {
                        let headerControls = $(
                            coreuiTableUtils.render(coreuiTableTpl['table-controls-header.html'], {
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
                            coreuiTableUtils.render(coreuiTableTpl['table-controls-header-out.html'], {
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
            $.each(this._controlsPositions.footer, function (key, footer) {
                let controlsLeft   = [];
                let controlsCenter = [];
                let controlsRight  = [];

                if (Array.isArray(footer.left) && footer.left.length > 0) {
                    $.each(footer.left, function (key, control) {
                        let controlRender = coreuiTableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsLeft.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(footer.center) && footer.center.length > 0) {
                    $.each(footer.center, function (key, control) {
                        let controlRender = coreuiTableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsCenter.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(footer.right) && footer.right.length > 0) {
                    $.each(footer.right, function (key, control) {
                        let controlRender = coreuiTableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsRight.push(controlRender);
                        }
                    });
                }

                if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                    if (footer.type === 'in') {
                        let footerControls = $(
                            coreuiTableUtils.render(coreuiTableTpl['table-controls-footer.html'], {
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
                            coreuiTableUtils.render(coreuiTableTpl['table-controls-footer-out.html'], {
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

        if (options.hasOwnProperty('noBorder') &&
            typeof options.noBorder === 'boolean' &&
            options.noBorder
        ) {
            classes.push('coreui-table__no_border');
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


        let tableElement     = coreuiTableRender.renderTable(this);
        let containerElement = $(
            coreuiTableUtils.render(coreuiTableTpl['table-wrapper.html'], {
                id: this._id,
                classes: classes.length > 0 ? ' ' + classes.join(' ') : '',
                classesWrapper: classesWrapper.length > 0 ? ' ' + classesWrapper.join(' ') : '',
                widthSizes: widthSizes,
                heightSizes: heightSizes,
            })
        );


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
    },


    /**
     * Блокировка таблицы
     */
    lock: function () {

        let container = coreuiTableElements.getContainer(this.getId());

        if (container[0] && ! container.find('.coreui-table-lock')[0]) {
            let html =  coreuiTableUtils.render(coreuiTableTpl['table-loader.html'], {
                lang: this.getLang()
            });

            container.prepend(html);
        }
    },


    /**
     * Разблокировка таблицы
     */
    unlock: function () {

        coreuiTableElements.getLock(this.getId()).hide(50, function () {
            $(this).remove()
        });
    },


    /**
     * Загрузка строк
     * @param {string} url
     * @param {string} method
     */
    load: function (url, method) {

        this.lock();

        let that   = this;
        let params = {};

        if (url.match(/\[page\]/)) {
            url = url.replace(/\[page\]/g, this._page);
        } else {
            let paramPage = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page')
                ? this._options.requestParams.page
                : 'page';
            params[paramPage] = this._page;
        }

        if (url.match(/\[count\]/)) {
            url = url.replace(/\[count\]/g, this._recordsPerPage);
        } else {
            let paramCount = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count')
                ? this._options.requestParams.count
                : 'count';
            params[paramCount] = this._recordsPerPage;
        }

        if (url.match(/\[start\]/)) {
            url = url.replace(/\[start\]/g, ((this._page - 1) * this._recordsPerPage) + 1);
        } else {
            let paramStart = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start')
                ? this._options.requestParams.start
                : 'start';
            params[paramStart] = ((this._page - 1) * this._recordsPerPage) + 1;
        }

        if (url.match(/\[end\]/)) {
            url = url.replace(/\[end\]/g, ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage));
        } else {
            let paramEnd = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end')
                ? this._options.requestParams.end
                : 'end';
            params[paramEnd] = ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage);
        }


        let searchData = this.getSearchData();
        let filterData = this.getFilterData();

        if (filterData.length > 0) {
            $.each(filterData, function (key, filter) {
                searchData.push(filter);
            });
        }

        if (searchData.length > 0) {
            let paramSearch = coreuiTableUtils.isObject(this._options.requestParams) &&
                              this._options.requestParams.hasOwnProperty('search') &&
                              typeof this._options.requestParams.search === 'string'
                ? this._options.requestParams.search
                : 'search';

            params[paramSearch] = searchData;
        }

        if (this._sort.length > 0) {
            let paramSort = coreuiTableUtils.isObject(this._options.requestParams) &&
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
                coreuiTablePrivate._trigger(that, 'records_load_start', [ that, xhr ]);
            },
            success: function (result) {

                if (result.hasOwnProperty('records') &&
                    typeof result.records === 'object' &&
                    Array.isArray(result.records)
                ) {
                    let total = result.hasOwnProperty('total') && coreuiTableUtils.isNumeric(result.total)
                        ? result.total
                        : null;
                    that.setRecords(result.records, total);

                } else {
                    that.setRecords([]);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                that.setRecords([]);
                coreuiTablePrivate._trigger(that, 'records_load_error', [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                coreuiTablePrivate._trigger(that, 'records_load_end', [ that, xhr, textStatus ]);
            },
        });
    },


    /**
     * Загрузка строк
     * @param {function} callback
     */
    loadByFunction: function (callback) {

        let that   = this;
        let params = {};

        let paramPage = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page')
            ? this._options.requestParams.page
            : 'page';

        let paramCount = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count')
            ? this._options.requestParams.count
            : 'count';

        let paramStart = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start')
            ? this._options.requestParams.start
            : 'start';

        let paramEnd = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end')
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
            let paramSearch = coreuiTableUtils.isObject(this._options.requestParams) &&
                              this._options.requestParams.hasOwnProperty('search') &&
                              typeof this._options.requestParams.search === 'string'
                ? this._options.requestParams.search
                : 'search';

            params[paramSearch] = searchData;
        }

        if (this._sort.length > 0) {
            let paramSort = coreuiTableUtils.isObject(this._options.requestParams) &&
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
                let total = data.hasOwnProperty('total') && coreuiTableUtils.isNumeric(data.total)
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
    },


    /**
     * Перезагрузка записей в таблице
     */
    reload: function () {

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'function') {
                this.loadByFunction(this._options.recordsRequest);
            } else {
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            }
        }
    },


    /**
     * Пересоздание тела таблицы
     */
    refresh: function () {

        let table = coreuiTableRender.renderTable(this);

        coreuiTableElements.getTable(this.getId()).replaceWith(table);

        coreuiTablePrivate._trigger(this, 'table_show', [ this ]);
        coreuiTablePrivate._trigger(this, 'records_show', [ this ]);
    },


    /**
     * Установка общего количества записей на странице
     * @param recordsPerPage
     */
    setPageSize: function (recordsPerPage) {

        this._recordsPerPage = recordsPerPage;

        coreuiTablePrivate._trigger(this, 'page_size_update');
    },


    /**
     * Выбор всех записей в таблице
     */
    selectAll: function () {

        coreuiTableElements.selectTrAll(this.getId())

        coreuiTablePrivate._trigger(this, 'record_select_all');
    },


    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll: function () {

        coreuiTableElements.unselectTrAll(this.getId())

        coreuiTablePrivate._trigger(this, 'record_unselect_all');
    },


    /**
     * Выбор записи в таблице
     * @param {string} id
     */
    selectRecord: function (id) {

        let record = this.getRecordById(id);

        if ( ! record) {
            return;
        }

        let tr = coreuiTableElements.getTrByIndex(this.getId(), record.index);

        if (tr.length === 0) {
            return;
        }

        coreuiTableElements.selectTr(tr)

        coreuiTablePrivate._trigger(this, 'record_select', [ record ]);
    },


    /**
     * Отмена выбора записи в таблице
     * @param {string} id
     */
    unselectRecord: function (id) {

        let record = this.getRecordById(id);

        if ( ! record) {
            return;
        }

        let tr = coreuiTableElements.getTrByIndex(this.getId(), record.index);

        if ( ! tr) {
            return;
        }

        coreuiTableElements.unselectTr(tr)

        coreuiTablePrivate._trigger(this, 'record_unselect', [ record.data ]);
    },


    /**
     * Получение выбранных id
     * @return {array}
     */
    getSelectedRecordsId: function () {

        let records = [];
        let that    = this;
        let field   = this._options.primaryKey;

        $.each(coreuiTableElements.getSelectedIndexes(this.getId()), function (key, index) {
            let record = that.getRecordByIndex(index);

            if ( ! record || ! record.data.hasOwnProperty(field)) {
                return;
            }

            records.push(record.data[field]);
        });

        return records;
    },


    /**
     * Получение выбранных записей
     * @return {array}
     */
    getSelectedRecords: function () {

        let records = [];
        let that    = this;

        $.each(coreuiTableElements.getSelectedIndexes(this.getId()), function (key, index) {
            let record = that.getRecordByIndex(index);

            if ( ! record) {
                return;
            }

            records.push(record);
        });

        return records;
    },


    /**
     * Получение записи по id
     * @param id
     * @return {object|null}
     */
    getRecord: function (id) {

        let record = this.getRecordById(id);

        if ( ! record) {
            return null;
        }

        return record.data;
    },


    /**
     * Получение записей
     */
    getRecords: function () {

        let records = []

        $.each(this._records, function (key, record) {
            records.push($.extend(true, {}, record));
        });

        return records;
    },


    /**
     * Получение данных из существующих записей
     * @return {Array}
     */
    getData: function () {

        let data = []

        $.each(this._records, function (key, record) {
            data.push($.extend(true, {}, record.data));
        });

        return data;
    },


    /**
     * Переход к предыдущей странице
     */
    prevPage: function () {

        if (this._page > 1) {
            this._page--;
            this.reload();
        }
    },


    /**
     * Переход к следующей странице
     * @return {array}
     */
    nextPage: function () {

        let totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0
            ? Math.ceil(this._recordsTotal / this._recordsPerPage)
            : 1;

        if (this._page < totalPages) {
            this._page++;
            this.reload();
        }
    },


    /**
     * Переход к указанной странице
     */
    goPage: function (page) {

        if (page >= 1) {
            this._page = page;
            this.reload();
        }
    },


    /**
     * Регистрация функции на событие
     * @param {Array|string} eventName
     * @param {function}     callback
     * @param {*}            context
     * @param {boolean}      singleExec
     */
    on: function(eventName, callback, context, singleExec) {

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
    },


    /**
     * Получение переводов текущего языка
     * @return {object}
     */
    getLang: function () {

        return $.extend(true, {}, this._options.langList);
    },


    /**
     * Установка видимых колонок, не указанные колонки будут скрыты
     * @param {Array} columns
     */
    setColumnsShow: function (columns) {

        if ( ! Array.isArray(columns)) {
            return;
        }

        $.each(this._columns, function (key, column) {
            let options = column.getOptions();

            if (options.hasOwnProperty('field') && typeof options.field === 'string') {
                column.setShow(columns.indexOf(options.field) >= 0);
            }
        });


        coreuiTablePrivate._trigger(this, 'columns_change');
    },


    /**
     * Получение поисковых данных
     * @return {*[]}
     */
    getSearchData: function () {

        let searchData = [];

        $.each(this._search, function (key, control) {
            let options = control.getOptions();

            if (options.hasOwnProperty('field') &&
                typeof options.field === 'string' &&
                options.field
            ) {
                let value = control.getValue();

                if (value !== null) {
                    searchData.push({
                        field: options.field,
                        value: value,
                        alg: control.hasOwnProperty('getAlgorithm') && typeof control.getAlgorithm === 'function' ? control.getAlgorithm() : null
                    });
                }
            }
        });

        return searchData;
    },


    /**
     * Получение данных из фильтров
     * @return {*[]}
     */
    getFilterData: function () {

        let filterData = [];

        $.each(this._filters, function (key, control) {
            let options = control.getOptions();

            if (options.hasOwnProperty('field') &&
                typeof options.field === 'string' &&
                options.field
            ) {

                let value = control.getValue();

                if (value !== null) {
                    filterData.push({
                        field: options.field,
                        value: value,
                        alg: control.hasOwnProperty('getAlgorithm') && typeof control.getAlgorithm === 'function' ? control.getAlgorithm() : null
                    });
                }
            }
        });

        return filterData;
    },


    /**
     * Поиск по таблице с использованием данных из поиска и фильтров
     */
    searchRecords: function () {

        let searchData = this.getSearchData();
        let filterData = this.getFilterData();

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'function') {
                this.loadByFunction(this._options.recordsRequest);
            } else {
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            }
        } else {
            coreuiTablePrivate.searchLocalRecords(this);
            this.refresh();
        }


        coreuiTablePrivate._trigger(this, 'filters_change', [ filterData ]);
        coreuiTablePrivate._trigger(this, 'search_change', [ searchData ]);
    },


    /**
     * Очистка поисковых данных
     */
    searchClear: function () {

        $.each(this._search, function (key, search) {
            search.setValue(null);
        });

        this.searchRecords();
    },


    /**
     * Очистка поисковых данных в фильтрах
     */
    filtersClear: function () {

        $.each(this._filters, function (key, filter) {
            filter.setValue(null);
        });

        this.searchRecords();
    },


    /**
     * Получение записи по индексу
     * @param {string|number} index
     * @return {object|null}
     */
    getRecordByIndex: function (index) {

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
    },


    /**
     * Получение записи по id
     * @param {string} id
     * @return {object|null}
     */
    getRecordById: function (id) {

        return this.getRecordByField(this._options.primaryKey, id);
    },


    /**
     * Получение записи по полю
     * @param {string}        field
     * @param {string|number} value
     * @return {object|null}
     */
    getRecordByField: function (field, value) {

        if (['string', 'number'].indexOf(typeof field) < 0 || field === '') {
            return null;
        }

        let record = null;

        $.each(this._records, function (key, recordItem) {
            if (recordItem.data.hasOwnProperty(field) && recordItem.data[field] === value) {
                record = $.extend(true, {}, recordItem);

                return false;
            }
        });

        return record;
    },


    /**
     * Получение контрола по его id
     * @param {string} id
     * @return {object}
     */
    getControlById: function (id) {

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
    },


    /**
     * Получение контрола поиска по его id
     * @param {string} id
     * @return {object}
     */
    getSearchControlById: function (id) {

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
    },


    /**
     * Сортировка по полям
     * @param {Array} sorting
     */
    sortFields: function (sorting) {

        if ( ! Array.isArray(sorting)) {
            return;
        }

        let that              = this;
        let columnsConverters = {};

        this._sort = [];

        $.each(sorting, function (key, sort) {
            if ( ! coreuiTableUtils.isObject(sort) ||
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

                    if (column.hasOwnProperty('convertToString') &&
                        typeof column.convertToString === 'function'
                    ) {
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


        if (this._sort.length >= 0) {
            if (this._isRecordsRequest) {
                if (typeof this._options.recordsRequest === 'function') {
                    this.loadByFunction(this._options.recordsRequest);
                } else {
                    this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
                }
                coreuiTablePrivate.setColumnsSort(this, this._sort);

            } else {
                this.records = coreuiTablePrivate.sortRecordsByFields(this._records, this._sort, columnsConverters);
                this.refresh();
            }
        }

        coreuiTablePrivate._trigger(this, 'records_sort', [ this ]);
    },


    /**
     * Сортировка по умолчанию
     */
    sortDefault: function () {

        this._sort = [];

        if (this._isRecordsRequest) {
            if (typeof this._options.recordsRequest === 'function') {
                this.loadByFunction(this._options.recordsRequest);
            } else {
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            }
            coreuiTablePrivate.setColumnsSort(this);

        } else {
            this.records = coreuiTablePrivate.sortRecordsBySeq(this._records);
            this.refresh();
        }

        coreuiTablePrivate._trigger(this, 'records_sort', [ this ]);
    },


    /**
     * Удаление строки из таблицы по индексу
     * @param index
     */
    removeRecordByIndex: function (index) {

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
            let tr   = coreuiTableElements.getTrByIndex(this.getId(), index);

            if (tr.length >= 0) {
                tr.fadeOut('fast', function () {
                    tr.remove();

                    if (that._records.length === 0) {
                        let tbody = coreuiTableElements.getTableTbody(that.getId());

                        tbody.append(
                            coreuiTableUtils.render(coreuiTableTpl['table-records-empty.html'], {
                                columnsCount: that._countColumnsShow,
                                lang: that.getLang(),
                            })
                        );
                    }
                });
            }

            this._recordsNumber--;
        }
    },


    /**
     * Добавление строки в таблицу после строки с индексом
     * @param {object} recordData
     * @param {number} index
     */
    addRecordAfterIndex: function (recordData, index) {

        let tr = coreuiTableElements.getTrByIndex(this.getId(), index);

        if (tr.length >= 0) {
            let record = coreuiTablePrivate.addRecord(this, recordData, index);

            if (record) {
                coreuiTableElements.getTrEmpty(this.getId()).remove();

                tr.after(
                    coreuiTableRender.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    },


    /**
     * Добавление строки в таблицу перед строкой с индексом
     * @param {object} recordData
     * @param {number} index
     */
    addRecordBeforeIndex: function (recordData, index) {

        let tr = coreuiTableElements.getTrByIndex(this.getId(), index);

        if (tr.length >= 0) {
            let record = coreuiTablePrivate.addRecordBefore(this, recordData, index);

            if (record) {
                coreuiTableElements.getTrEmpty(this.getId()).remove();

                tr.before(
                    coreuiTableRender.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    },


    /**
     * Добавление строки в начало таблицы
     * @param {object} recordData
     */
    addRecordFirst: function (recordData) {

        let tbody = coreuiTableElements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = coreuiTablePrivate.addRecord(this, recordData, 0);

            if (record) {
                coreuiTableElements.getTrEmpty(this.getId()).remove();

                tbody.prepend(
                    coreuiTableRender.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    },


    /**
     * Добавление строки в конец таблицы
     * @param {object} recordData
     */
    addRecordLast: function (recordData) {

        let tbody = coreuiTableElements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = coreuiTablePrivate.addRecord(this, recordData);

            if (record) {
                coreuiTableElements.getTrEmpty(this.getId()).remove();

                tbody.append(
                    coreuiTableRender.renderRecord(this, record)
                );
                this._recordsNumber++;
            }
        }
    },


    /**
     * Показ указанных записей в таблице
     * @param {Array}  records
     * @param {number} total
     */
    setRecords: function (records, total) {

        if ( ! Array.isArray(records)) {
            return;
        }

        this._recordsTotal = coreuiTableUtils.isNumeric(total) ? parseInt(total) : records.length;

        coreuiTablePrivate.setRecords(this, records);

        if (records.length > 0) {
            this._recordsNumber = this._page === 1
                ? 1
                : ((this._page - 1) * this._recordsPerPage) + 1;
        }

        let recordsElements = coreuiTableRender.renderRecords(this, this._records);
        let tableBody       = coreuiTableElements.getTableTbody(this.getId());

        tableBody.html('');

        $.each(recordsElements, function (key, recordElement) {
            tableBody.append(recordElement);
        });


        coreuiTablePrivate._trigger(this, 'records_show', [ this ]);
    },


    /**
     * Получение количества строк
     * @return {number}
     */
    getRecordsCount: function () {

        let count = 0;

        if (this._isRecordsRequest) {
            count = this._recordsTotal;

        } else {

            $.each(this._records, function (key, record) {
                if (record.show) {
                    count++;
                }
            });
        }

        return count;
    },


    /**
     * Раскрытие / скрытие дополнительных данных строки
     * @param {number}                                   recordIndex
     * @param {HTMLElement|jQuery|string|Array|function} content
     * @param {boolean}                                  isRebuild - true default
     */
    expandRecordContent: function (recordIndex, content, isRebuild) {

        let recordElement  = coreuiTableElements.getTrByIndex(this.getId(), recordIndex);
        let recordExpanded = coreuiTableElements.getExpandRow(recordElement);

        if (recordElement.hasClass('record-expanded')) {

            if (recordExpanded) {
                if (isRebuild === undefined || isRebuild) {
                    coreuiTableElements.removeExpandRow(recordExpanded);
                } else {
                    coreuiTableElements.hideExpandRow(recordExpanded);
                }
            }

            recordElement.removeClass('record-expanded');
            coreuiTablePrivate._trigger(this, 'record_expand_hide', [recordIndex]);

        } else {
            if (recordExpanded) {
                coreuiTableElements.showExpandRow(recordExpanded);
                recordElement.addClass('record-expanded');
                coreuiTablePrivate._trigger(this, 'record_expand_show', [recordIndex]);

            } else {
                let recordIndex = recordElement.data('record-index');

                if (typeof content === 'function') {
                    let callbackResult = content();

                    if (callbackResult instanceof Promise) {
                        let that = this;

                        callbackResult
                            .then(function (result) {
                                coreuiTableElements.addExpandRow(that, recordElement, result);
                                coreuiTablePrivate._trigger(that, 'record_expand_show', [recordIndex]);

                            }).catch(function () {
                                coreuiTableElements.addExpandRow(that, recordElement, '');
                                coreuiTablePrivate._trigger(that, 'record_expand_show', [recordIndex]);
                            });

                    } else{
                        coreuiTableElements.addExpandRow(this, recordElement, callbackResult);
                        coreuiTablePrivate._trigger(this, 'record_expand_show', [recordIndex]);
                    }

                } else {
                    coreuiTableElements.addExpandRow(this, recordElement, content);
                    coreuiTablePrivate._trigger(this, 'record_expand_show', [recordIndex]);
                }
            }
        }
    },


    /**
     * Раскрытие / скрытие дополнительных данных строки
     * @param {number}  recordIndex
     * @param {string}  url
     * @param {boolean} isRebuild
     */
    expandRecordUrl: function (recordIndex, url, isRebuild) {

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
}


export default coreuiTableInstance;