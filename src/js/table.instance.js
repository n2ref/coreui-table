
import TableTpl      from './table.tpl';
import TableUtils    from "./table.utils";
import TableRender   from "./table.render";
import TableElements from "./table.elements";
import TablePrivate  from "./table.private";


class TableInstance {

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

    _id = '';
    _page = 1;
    _recordsIndex = 1;
    _recordsPerPage = 25;
    _recordsTotal = 0;
    _recordsNumber = 1;
    _seq = 1;
    _isRecordsRequest = false;
    _countColumnsShow = 0;

    _records = [];
    _sort = [];
    _columns = [];
    _search = [];
    _filters = [];
    _controls = [];
    _controlsPositions = {
        header: [],
        footer: [],
    }
    _events = {}


    /**
     * Инициализация
     * @param {object} tableWrapper
     * @param {object} options
     * @private
     */
    constructor(tableWrapper, options) {

        this._options = $.extend(true, {}, this._options, options);
        this._events  = {};
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : TableUtils.hashCode();

        if (this._options.page > 0) {
            this._page = this._options.page;
        }

        if (this._options.saveState && this._options.id) {
            let pageSize = TablePrivate.getStorageField(this._id, 'page_size');

            if (TableUtils.isNumeric(pageSize) && pageSize > 0) {
                this._recordsPerPage = pageSize;

            } else if (this._options.recordsPerPage > 0) {
                this._recordsPerPage = this._options.recordsPerPage;
            }

        } else if (this._options.recordsPerPage > 0) {
            this._recordsPerPage = this._options.recordsPerPage;
        }

        this._isRecordsRequest = (
            this._options.hasOwnProperty('recordsRequest') &&
            (
                typeof this._options.recordsRequest === 'function' ||
                (TableUtils.isObject(this._options.recordsRequest) &&
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
            TablePrivate.setRecords(this, this._options.records);
        }

        // Очистка записей после инициализации
        this._options.records = [];

        // Инициализация колонок
        if (typeof this._options.columns === 'object' &&
            Array.isArray(this._options.columns) &&
            this._options.columns.length > 0
        ) {
            TablePrivate.initColumns(tableWrapper, this, this._options.columns);
        }


        // Инициализация поисковых полей
        if (TableUtils.isObject(this._options.search) &&
            typeof this._options.search.controls === 'object' &&
            Array.isArray(this._options.search.controls) &&
            this._options.search.controls.length > 0
        ) {
            TablePrivate.initSearch(tableWrapper, this, this._options.search.controls);
        }


        // Инициализация контролов и фильтров
        if (this._options.hasOwnProperty('header') &&
            Array.isArray(this._options.header) &&
            this._options.header.length > 0
        ) {
            TablePrivate.initControls(tableWrapper, this, this._options.header, 'header');
        }

        if (this._options.hasOwnProperty('footer') &&
            Array.isArray(this._options.footer) &&
            this._options.footer.length > 0
        ) {
            TablePrivate.initControls(tableWrapper, this, this._options.footer, 'footer');
        }


        if (this._options.saveState && this._options.id) {

            // Поиск по сохраненным поисковым данным
            if ( ! this._isRecordsRequest) {
                TablePrivate.searchLocalRecords(this);
            }

            // Сортировка
            let sort = TablePrivate.getStorageField(this.getId(), 'sort');

            if (Array.isArray(sort) && sort.length > 0) {
                TablePrivate.initSort(this, sort);

                if ( ! this._isRecordsRequest && this._records.length > 0) {
                    this._records = TablePrivate.sortRecordsByFields(this._records, this._sort);
                }
            }

        } else {
            if (this._options.hasOwnProperty('sort') &&
                Array.isArray(this._options.sort) &&
                this._options.sort.length > 0
            ) {
                TablePrivate.initSort(this, this._options.sort);
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
                TableElements.getTrRecords(table.getId()).click(function () {
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

                TableElements.getTrRecords(table.getId()).click(function (event) {
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
            TableElements.getNoWrapToggles(table.getId()).click(function (event) {

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
            TableElements.fixedColsLeft(table.getId())
            TableElements.fixedColsRight(table.getId())
        });


        // Показ таблицы
        this.on('table_show', function () {

            let sortableColumns = TableElements.getTableSortable(table.getId());
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
                $('.coreui-table__column-description', TableElements.getTableThead(table.getId())).each(function () {
                    new bootstrap.Tooltip(this);
                });
            }
        });


        // События смены состояния
        if (this._options.saveState && this._options.id) {
            this.on('records_sort', function () {
                TablePrivate.setStorageField(table.getId(), 'sort', table._sort);
            });

            this.on('search_change', function () {
                TablePrivate.setStorageField(table.getId(), 'search', table.getSearchData());
            });

            this.on('filters_change', function () {
                TablePrivate.setStorageField(table.getId(), 'filters', table.getFilterData());
            });

            this.on('page_size_update', function () {
                TablePrivate.setStorageField(table.getId(), 'page_size', table._recordsPerPage);
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

                TablePrivate.setStorageField(table.getId(), 'columns', columns);
            });
        }


        TablePrivate._trigger(this, 'table_show', [ this ]);
        TablePrivate._trigger(this, 'container_show');

        // Вызов события показа строк
        if ( ! this._isRecordsRequest) {
            TablePrivate._trigger(this, 'records_show', [ this ]);
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
     * Получение опций таблицы
     * @returns {*}
     */
    getOptions() {

        return $.extend(true, {}, this._options);
    }


    /**
     *
     * @param element
     * @returns {*}
     */
    render(element) {

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
                        let controlRender = TableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsLeft.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(header.center) && header.center.length > 0) {
                    header.center.map(function (control) {
                        let controlRender = TableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsCenter.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(header.right) && header.right.length > 0) {
                    header.right.map(function (control) {
                        let controlRender = TableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsRight.push(controlRender);
                        }
                    });
                }

                if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                    if (header.type === 'in') {
                        let headerControls = $(
                            TableUtils.render(TableTpl['table/controls/header.html'], {
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
                            TableUtils.render(TableTpl['table/controls/header-out.html'], {
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
                        let controlRender = TableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsLeft.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(footer.center) && footer.center.length > 0) {
                    $.each(footer.center, function (key, control) {
                        let controlRender = TableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsCenter.push(controlRender);
                        }
                    });
                }

                if (Array.isArray(footer.right) && footer.right.length > 0) {
                    $.each(footer.right, function (key, control) {
                        let controlRender = TableRender.renderControl(that, control);

                        if (controlRender) {
                            controlsRight.push(controlRender);
                        }
                    });
                }

                if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
                    if (footer.type === 'in') {
                        let footerControls = $(
                            TableUtils.render(TableTpl['table/controls/footer.html'], {
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
                            TableUtils.render(TableTpl['table/controls/footer-out.html'], {
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


        let tableElement     = TableRender.renderTable(this);
        let containerElement = $(TableUtils.render(TableTpl['container.html'], {
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

        let container = TableElements.getContainer(this.getId());

        if (container[0] && ! container.find('.coreui-table-lock')[0]) {
            let html =  TableUtils.render(TableTpl['table/loader.html'], {
                lang: this.getLang()
            });

            container.prepend(html);
        }
    }


    /**
     * Разблокировка таблицы
     */
    unlock () {

        TableElements.getLock(this.getId()).hide(50, function () {
            $(this).remove()
        });
    }


    /**
     * Загрузка строк
     * @param {string} url
     * @param {string} method
     */
    load (url, method) {

        this.lock();

        let that   = this;
        let params = {};

        if (url.match(/\[page\]/)) {
            url = url.replace(/\[page\]/g, this._page);
        } else {
            let paramPage = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page')
                ? this._options.requestParams.page
                : 'page';
            params[paramPage] = this._page;
        }

        if (url.match(/\[count\]/)) {
            url = url.replace(/\[count\]/g, this._recordsPerPage);
        } else {
            let paramCount = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count')
                ? this._options.requestParams.count
                : 'count';
            params[paramCount] = this._recordsPerPage;
        }

        if (url.match(/\[start\]/)) {
            url = url.replace(/\[start\]/g, ((this._page - 1) * this._recordsPerPage) + 1);
        } else {
            let paramStart = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start')
                ? this._options.requestParams.start
                : 'start';
            params[paramStart] = ((this._page - 1) * this._recordsPerPage) + 1;
        }

        if (url.match(/\[end\]/)) {
            url = url.replace(/\[end\]/g, ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage));
        } else {
            let paramEnd = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end')
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
            let paramSearch = TableUtils.isObject(this._options.requestParams) &&
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
            let paramSort = TableUtils.isObject(this._options.requestParams) &&
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
                TablePrivate._trigger(that, 'records_load_start', [ that, xhr ]);
            },
            success: function (result) {

                if (result.hasOwnProperty('records') &&
                    typeof result.records === 'object' &&
                    Array.isArray(result.records)
                ) {
                    let total = result.hasOwnProperty('total') && TableUtils.isNumeric(result.total)
                        ? result.total
                        : null;
                    that.setRecords(result.records, total);

                } else {
                    that.setRecords([]);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                that.setRecords([]);
                TablePrivate._trigger(that, 'records_load_error', [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                TablePrivate._trigger(that, 'records_load_end', [ that, xhr, textStatus ]);
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

        let paramPage = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page')
            ? this._options.requestParams.page
            : 'page';

        let paramCount = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count')
            ? this._options.requestParams.count
            : 'count';

        let paramStart = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start')
            ? this._options.requestParams.start
            : 'start';

        let paramEnd = TableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end')
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
            let paramSearch = TableUtils.isObject(this._options.requestParams) &&
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
            let paramSort = TableUtils.isObject(this._options.requestParams) &&
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
                let total = data.hasOwnProperty('total') && TableUtils.isNumeric(data.total)
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

        let table = TableRender.renderTable(this);

        TableElements.getTable(this.getId()).replaceWith(table);

        TablePrivate._trigger(this, 'table_show', [ this ]);
        TablePrivate._trigger(this, 'records_show', [ this ]);
    }


    /**
     * Установка общего количества записей на странице
     * @param recordsPerPage
     */
    setPageSize(recordsPerPage) {

        this._recordsPerPage = recordsPerPage;

        TablePrivate._trigger(this, 'page_size_update');
    }


    /**
     * Выбор всех записей в таблице
     */
    selectAll() {

        TableElements.selectTrAll(this.getId())

        TablePrivate._trigger(this, 'record_select_all');
    }


    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll() {

        TableElements.unselectTrAll(this.getId())

        TablePrivate._trigger(this, 'record_unselect_all');
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

        let tr = TableElements.getTrByIndex(this.getId(), record.index);

        if (tr.length === 0) {
            return;
        }

        TableElements.selectTr(tr)

        TablePrivate._trigger(this, 'record_select', [ record ]);
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

        let tr = TableElements.getTrByIndex(this.getId(), record.index);

        if (tr.length === 0) {
            return;
        }

        TableElements.selectTr(tr)

        TablePrivate._trigger(this, 'record_select', [ record ]);
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

        let tr = TableElements.getTrByIndex(this.getId(), record.index);

        if ( ! tr) {
            return;
        }

        TableElements.unselectTr(tr)

        TablePrivate._trigger(this, 'record_unselect', [ record.data ]);
    }


    /**
     * Получение выбранных id
     * @return {array}
     */
    getSelectedRecordsId() {

        let records = [];
        let that    = this;
        let field   = this._options.primaryKey;

        $.each(TableElements.getSelectedIndexes(this.getId()), function (key, index) {
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

        $.each(TableElements.getSelectedIndexes(this.getId()), function (key, index) {
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
     * @deprecated getRecordsData
     */
    getData() {

        return this.getRecordsData();
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
            TablePrivate._trigger(this, 'columns_change');
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
            TablePrivate._trigger(this, 'columns_change');
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
            TablePrivate._trigger(this, 'columns_change');
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
            TablePrivate.searchLocalRecords(this);
            this.refresh();
        }


        TablePrivate._trigger(this, 'filters_change', [ filterData ]);
        TablePrivate._trigger(this, 'search_change', [ searchData ]);
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
            if ( ! TableUtils.isObject(sort) ||
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
                TablePrivate.setColumnsSort(this, this._sort);

            } else {
                this._records = TablePrivate.sortRecordsByFields(this._records, this._sort, columnsConverters);
                this.refresh();
            }
        }

        TablePrivate._trigger(this, 'records_sort', [ this ]);
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
            TablePrivate.setColumnsSort(this);

        } else {
            this._records = TablePrivate.sortRecordsBySeq(this._records);
            this.refresh();
        }

        TablePrivate._trigger(this, 'records_sort', [ this ]);
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
            let tr   = TableElements.getTrByIndex(this.getId(), index);

            if (tr.length >= 0) {
                let emptyRecords = that._records.length === 0;

                tr.fadeOut('fast', function () {
                    tr.remove();

                    if (emptyRecords) {
                        let tbody = TableElements.getTableTbody(that.getId());

                        tbody.append(
                            TableUtils.render(TableTpl['table/record/empty.html'], {
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

        let tr = TableElements.getTrByIndex(this.getId(), index);

        if (tr.length >= 0) {
            let record = TablePrivate.addRecord(this, recordData, index);

            if (record) {
                TableElements.getTrEmpty(this.getId()).remove();

                tr.after(
                    TableRender.renderRecord(this, record)
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

        let tr = TableElements.getTrByIndex(this.getId(), index);

        if (tr.length >= 0) {
            let record = TablePrivate.addRecordBefore(this, recordData, index);

            if (record) {
                TableElements.getTrEmpty(this.getId()).remove();

                tr.before(
                    TableRender.renderRecord(this, record)
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

        let tbody = TableElements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = TablePrivate.addRecord(this, recordData, 0);

            if (record) {
                TableElements.getTrEmpty(this.getId()).remove();

                tbody.prepend(
                    TableRender.renderRecord(this, record)
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

        let tbody = TableElements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = TablePrivate.addRecord(this, recordData);

            if (record) {
                TableElements.getTrEmpty(this.getId()).remove();

                tbody.append(
                    TableRender.renderRecord(this, record)
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

        this._recordsTotal = TableUtils.isNumeric(total) ? parseInt(total) : records.length;

        TablePrivate.setRecords(this, records);

        if (records.length > 0) {
            this._recordsNumber = this._page === 1
                ? 1
                : ((this._page - 1) * this._recordsPerPage) + 1;
        }

        let recordsElements = TableRender.renderRecords(this, this._records);
        let tableBody       = TableElements.getTableTbody(this.getId());

        tableBody.html('');

        $.each(recordsElements, function (key, recordElement) {
            tableBody.append(recordElement);
        });


        TablePrivate._trigger(this, 'records_show', [ this ]);
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

        let recordElement  = TableElements.getTrByIndex(this.getId(), recordIndex);
        let recordExpanded = TableElements.getExpandRow(recordElement);

        if (recordElement.hasClass('record-expanded')) {

            if (recordExpanded) {
                if (isRebuild === undefined || isRebuild) {
                    TableElements.removeExpandRow(recordExpanded);
                } else {
                    TableElements.hideExpandRow(recordExpanded);
                }
            }

            recordElement.removeClass('record-expanded');
            TablePrivate._trigger(this, 'record_expand_hide', [recordIndex]);

        } else {
            if (recordExpanded) {
                TableElements.showExpandRow(recordExpanded);
                recordElement.addClass('record-expanded');
                TablePrivate._trigger(this, 'record_expand_show', [recordIndex]);

            } else {
                let recordIndex = recordElement.data('record-index');

                if (typeof content === 'function') {
                    let callbackResult = content();

                    if (callbackResult instanceof Promise) {
                        let that = this;

                        callbackResult
                            .then(function (result) {
                                TableElements.addExpandRow(that, recordElement, result);
                                TablePrivate._trigger(that, 'record_expand_show', [recordIndex]);

                            }).catch(function () {
                                TableElements.addExpandRow(that, recordElement, '');
                                TablePrivate._trigger(that, 'record_expand_show', [recordIndex]);
                            });

                    } else{
                        TableElements.addExpandRow(this, recordElement, callbackResult);
                        TablePrivate._trigger(this, 'record_expand_show', [recordIndex]);
                    }

                } else {
                    TableElements.addExpandRow(this, recordElement, content);
                    TablePrivate._trigger(this, 'record_expand_show', [recordIndex]);
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
}


export default TableInstance;