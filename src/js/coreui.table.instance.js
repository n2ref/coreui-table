
import '../../node_modules/ejs/ejs.min';
import coreuiTable         from './coreui.table';
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
        lang: 'ru',
        size: '',
        striped: false,
        hover: false,
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

        recordsRequest: {
            method: 'GET',
            url: null,  // '/mod/index/orders/?page=[page]'
            params: {
                page: 'page',
                count: 'count',
                start: 'start',
                end: 'end',
                sort: 'sort',
                search: 'search',
                filter: 'filter',
            },
        },

        show: {
            columnHeaders: true
        },
        onClick: null,
        onClickUrl: null,
        sort: [],
        header: [],
        footer: [],
        columnGroupsHeader: [],
        columns: [],
        columnGroupsFooter: [],
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
     * @param {object} options
     * @private
     */
    _init: function (options) {

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
            coreuiTableUtils.isObject(this._options.recordsRequest) &&
            this._options.recordsRequest.hasOwnProperty('url') &&
            typeof this._options.recordsRequest.url === 'string' &&
            this._options.recordsRequest.url !== '' &&
            this._options.recordsRequest.url !== '#'
        );

        if (this._isRecordsRequest) {
            if ( ! this._options.recordsRequest.hasOwnProperty('method') ||
                typeof this._options.recordsRequest.method !== 'string'
            ) {
                this._options.recordsRequest.method = 'GET';
            }

        } else if (Array.isArray(this._options.records)) {
            coreuiTablePrivate._setRecords(this, this._options.records);
        }

        // Инициализация колонок
        if (typeof this._options.columns === 'object' &&
            Array.isArray(this._options.columns) &&
            this._options.columns.length > 0
        ) {
            coreuiTablePrivate._initColumns(this, this._options.columns);
        }


        // Инициализация поисковых полей
        if (typeof this._options.search === 'object' &&
            Array.isArray(this._options.search) &&
            this._options.search.length > 0
        ) {
            coreuiTablePrivate._initSearch(this, this._options.search);
        }


        // Инициализация контролов и фильтров
        if (this._options.hasOwnProperty('header') &&
            Array.isArray(this._options.header) &&
            this._options.header.length > 0
        ) {
            coreuiTablePrivate._initControls(this, this._options.header, 'header');
        }

        if (this._options.hasOwnProperty('footer') &&
            Array.isArray(this._options.footer) &&
            this._options.footer.length > 0
        ) {
            coreuiTablePrivate._initControls(this, this._options.footer, 'footer');
        }


        // Сортировка
        if (this._options.saveState && this._options.id) {
            let sort = coreuiTablePrivate.getStorageField(this.getId(), 'sort');

            if (Array.isArray(sort) && sort.length > 0) {
                coreuiTablePrivate._initSort(this, sort);

                if (this._records.length > 0) {
                    this._records = coreuiTablePrivate.sortRecordsByFields(this._records, this._sort);
                }
            }

        } else {
            if (this._options.hasOwnProperty('sort') &&
                Array.isArray(this._options.sort) &&
                this._options.sort.length > 0
            ) {
                coreuiTablePrivate._initSort(this, this._options.sort);
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
            if (typeof that._options.onClick === 'function') {
                coreuiTableElements.getTrRecords(that.getId()).click(function (event) {
                    let recordKey = $(this).data('record-index');
                    let record    = that.getRecordByIndex(recordKey);

                    if ( ! record) {
                        return;
                    }

                    that._options.onClick(event, record);
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
        let render      = {
            headersOut: [],
            headersIn: [],
            footersIn: [],
            footersOut: []
        };

        this._recordsTotal = this._records.length;


        if (this._options.width > 0) {
            let unit = typeof this._options.width === 'number' ? 'px' : '';
            widthSizes.push('width:' + this._options.width + unit);
        }

        if (this._options.minWidth > 0) {
            let unit = typeof this._options.minWidth === 'number' ? 'px' : '';
            widthSizes.push('min-width:' + this._options.minWidth + unit);
        }

        if (this._options.maxWidth > 0) {
            let unit = typeof this._options.maxWidth === 'number' ? 'px' : '';
            widthSizes.push('max-width:' + this._options.maxWidth + unit);

            this._options.overflow = true;
        }


        if (this._options.height > 0) {
            let unit = typeof this._options.height === 'number' ? 'px' : '';
            heightSizes.push('height:' + this._options.height + unit);
        }

        if (this._options.minHeight > 0) {
            let unit = typeof this._options.minHeight === 'number' ? 'px' : '';
            heightSizes.push('min-height:' + this._options.minHeight + unit);
        }

        if (this._options.maxHeight > 0) {
            let unit = typeof this._options.maxHeight === 'number' ? 'px' : '';
            heightSizes.push('max-height:' + this._options.maxHeight + unit);

            this._options.overflow = true;
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
                            ejs.render(coreuiTableTpl['table-controls-header.html'], {
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
                            ejs.render(coreuiTableTpl['table-controls-header-out.html'], {
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
                            ejs.render(coreuiTableTpl['table-controls-footer.html'], {
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
                            ejs.render(coreuiTableTpl['table-controls-footer-out.html'], {
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
                that.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            });
        }

        let tableElement     = coreuiTableRender.renderTable(this);
        let containerElement = $(
            ejs.render(coreuiTableTpl['table-wrapper.html'], {
                id: this._id,
                lang: this.getLang(),
                widthSizes: widthSizes,
                heightSizes: heightSizes,
                recordsTotal: this._recordsTotal,
                overflow: !! this._options.overflow,
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
            let html =  ejs.render(coreuiTableTpl['table-loader.html'], {
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
            let paramPage = coreuiTableUtils.isObject(this._options.recordsRequest.params) && this._options.recordsRequest.params.hasOwnProperty('page')
                ? this._options.recordsRequest.params.page
                : 'page';
            params[paramPage] = this._page;
        }

        if (url.match(/\[count\]/)) {
            url = url.replace(/\[count\]/g, this._recordsPerPage);
        } else {
            let paramCount = coreuiTableUtils.isObject(this._options.recordsRequest.params) && this._options.recordsRequest.params.hasOwnProperty('count')
                ? this._options.recordsRequest.params.count
                : 'count';
            params[paramCount] = this._recordsPerPage;
        }

        if (url.match(/\[start\]/)) {
            url = url.replace(/\[start\]/g, ((this._page - 1) * this._recordsPerPage) + 1);
        } else {
            let paramStart = coreuiTableUtils.isObject(this._options.recordsRequest.params) && this._options.recordsRequest.params.hasOwnProperty('start')
                ? this._options.recordsRequest.params.start
                : 'start';
            params[paramStart] = ((this._page - 1) * this._recordsPerPage) + 1;
        }

        if (url.match(/\[end\]/)) {
            url = url.replace(/\[end\]/g, ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage));
        } else {
            let paramEnd = coreuiTableUtils.isObject(this._options.recordsRequest.params) && this._options.recordsRequest.params.hasOwnProperty('end')
                ? this._options.recordsRequest.params.end
                : 'end';
            params[paramEnd] = ((this._page - 1) * this._recordsPerPage) + Number(this._recordsPerPage);
        }


        let searchData = this.getSearchData();
        let filterData = this.getFilterData();

        if (searchData.length > 0) {
            let paramSearch = coreuiTableUtils.isObject(this._options.recordsRequest.params) &&
                              this._options.recordsRequest.params.hasOwnProperty('search') &&
                              typeof this._options.recordsRequest.params.search === 'string'
                ? this._options.recordsRequest.params.search
                : 'search';

            params[paramSearch] = searchData;
        }

        if (filterData.length > 0) {
            let paramFilters = coreuiTableUtils.isObject(this._options.recordsRequest.params) &&
                              this._options.recordsRequest.params.hasOwnProperty('filter') &&
                              typeof this._options.recordsRequest.params.filter === 'string'
                ? this._options.recordsRequest.params.filter
                : 'filter';

            params[paramFilters] = filterData;
        }

        if (this._sort.length > 0) {
            let paramSort = coreuiTableUtils.isObject(this._options.recordsRequest.params) &&
                            this._options.recordsRequest.params.hasOwnProperty('sort') &&
                            typeof this._options.recordsRequest.params.sort === 'string'
                ? this._options.recordsRequest.params.sort
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
                    that.showRecords(result.records, total);

                } else {
                    that.showRecords([]);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                that.showRecords([]);
                coreuiTablePrivate._trigger(that, 'records_load_error', [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                coreuiTablePrivate._trigger(that, 'records_load_end', [ that, xhr, textStatus ]);
            },
        });
    },


    /**
     * Перезагрузка записей в таблице
     */
    reload: function () {

        if (this._isRecordsRequest) {
            this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
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
            records.push($.extend(true, {}, record.data));
        });

        return records;
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
     * Получение переводов
     * @return {object}
     */
    getLang: function () {

        let result = {};

        if (this._options.lang && coreuiTable.lang.hasOwnProperty(this._options.lang)) {
            result = coreuiTable.lang[this._options.lang];

        } else {
            let lang = coreuiTable.getSetting('lang')

            if (lang && coreuiTable.lang.hasOwnProperty(lang)) {
                result = coreuiTable.lang[lang];

            } else if (Object.keys(coreuiTable.lang).length > 0) {
                result = coreuiTable.lang[Object.keys(coreuiTable.lang)[0]];
            }
        }

        return $.extend(true, {}, result);
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
                        value: value
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
                        value: value
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
            this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);

        } else {
            $.each(this._records, function (index, record) {

                let isShow = true;

                if (searchData.length > 0) {
                    isShow = coreuiTablePrivate._isFilteredRecord(searchData, record.data);
                }

                if (isShow && filterData.length > 0) {
                    isShow = coreuiTablePrivate._isFilteredRecord(filterData, record.data);
                }

                record.show = isShow;
            });

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

        let that = this;

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
                this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);

            } else {
                this.records = coreuiTablePrivate.sortRecordsByFields(this._records, this._sort);
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
            this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);

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

        if (recordKey) {
            this._records.slice(recordKey, 1);

            let tr = coreuiTableElements.getTrByIndex(this, index);

            if (tr.length >= 0) {
                tr.fadeOut('fast', function () {
                    tr.remove();
                });
            }
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
            let record = coreuiTablePrivate._addRecord(this, recordData, index);

            if (record) {
                tr.after(
                    coreuiTableRender.renderRecord(this, record)
                );
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
            let record = coreuiTablePrivate._addRecordBefore(this, recordData, index);

            if (record) {
                tr.before(
                    coreuiTableRender.renderRecord(this, record)
                );
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
            let record = coreuiTablePrivate._addRecord(this, recordData, 0);

            tbody.prepend(
                coreuiTableRender.renderRecord(this, record)
            );
        }
    },


    /**
     * Добавление строки в конец таблицы
     * @param {object} recordData
     */
    addRecordLast: function (recordData) {

        let tbody = coreuiTableElements.getTableTbody(this.getId());

        if (tbody.length >= 0) {
            let record = coreuiTablePrivate._addRecord(this, recordData);

            tbody.append(
                coreuiTableRender.renderRecord(this, record)
            );
        }
    },


    /**
     * Показ указанных записей в таблице
     * @param {Array}  records
     * @param {number} total
     */
    showRecords: function (records, total) {

        if ( ! Array.isArray(records)) {
            return;
        }

        this._recordsTotal = coreuiTableUtils.isNumeric(total) ? parseInt(total) : records.length;

        coreuiTablePrivate._setRecords(this, records);

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
        })


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
                if (typeof content === 'function') {
                    let callbackResult = content();

                    if (callbackResult instanceof Promise) {
                        let that = this;

                        callbackResult
                            .then(function (result) {
                                coreuiTableElements.addExpandRow(that, recordElement, result);

                            }).catch(function () {
                                coreuiTableElements.addExpandRow(that, recordElement, '');
                            });

                    } else{
                        coreuiTableElements.addExpandRow(this, recordElement, callbackResult);
                    }

                } else {
                    coreuiTableElements.addExpandRow(this, recordElement, content);
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