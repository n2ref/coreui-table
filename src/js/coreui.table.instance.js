
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
        page: 1,
        recordsPerPage: 25,

        recordsRequest: {
            method: 'GET',
            url: null,  // '/mod/index/orders/?page=[page]'
            params: {
                page: 'page',
                count: 'count',
                start: 'start',
                end: 'end',
                search: 'search',
                filter: 'filter',
            },
        },

        show: {
            columnHeaders: true
        },
        onClick: null,
        onClickUrl: null,
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
    _isRecordsRequest: false,

    _records: [],
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
    },


    /**
     * Инициализация событий таблицы
     */
    initEvents: function () {

        let that = this;

        // Показ строк
        this.on('show-records', function () {

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

            // Фиксация колонок
            coreuiTableElements.fixedColsLeft(that.getId())
            coreuiTableElements.fixedColsRight(that.getId())
        });



        this._trigger('shown');

        // Вызов события показа строк
        if ( ! this._isRecordsRequest) {
            this._trigger('show-records', this, [ this ]);
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
                        let headerControls = ejs.render(coreuiTableTpl['table-controls-header.html'], {
                            controlsLeft: controlsLeft,
                            controlsCenter: controlsCenter,
                            controlsRight: controlsRight,
                        });

                        render.headersIn.push(headerControls);

                    } else {
                        let headerControls = ejs.render(coreuiTableTpl['table-controls-header-out.html'], {
                            controlsLeft: controlsLeft,
                            controlsCenter: controlsCenter,
                            controlsRight: controlsRight,
                        });

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
                        let footerControls = ejs.render(coreuiTableTpl['table-controls-footer.html'], {
                            controlsLeft: controlsLeft,
                            controlsCenter: controlsCenter,
                            controlsRight: controlsRight,
                        });

                        render.footersIn.push(footerControls);
                    } else {
                        let footerControls = ejs.render(coreuiTableTpl['table-controls-footer-out.html'], {
                            controlsLeft: controlsLeft,
                            controlsCenter: controlsCenter,
                            controlsRight: controlsRight,
                        });

                        render.footersOut.push(footerControls);
                    }
                }
            });
        }


        // Загрузка записей
        if (this._isRecordsRequest) {
            this.on('shown', function () {
                that.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
            });
        }

        let table = coreuiTableRender.renderTable(this);


        let html = ejs.render(coreuiTableTpl['table-wrapper.html'], {
            id: this._id,
            lang: this.getLang(),
            widthSizes: widthSizes,
            heightSizes: heightSizes,
            recordsTotal: this._recordsTotal,
            render: {
                headersOut : render.headersOut,
                headersIn : render.headersIn,
                footersIn : render.footersIn,
                footersOut : render.footersOut,
                table : table
            },
        });

        if (element === undefined) {
            return html;
        }

        // Dom element
        let domElement = {};

        if (typeof element === 'string') {
            domElement = document.getElementById(element);

            if ( ! domElement) {
                return '';
            }

        } else if (element instanceof HTMLElement) {
            domElement = element;
        }


        domElement.innerHTML = html;

        this.initEvents();
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
     * @param {object} params
     */
    load: function (url, method, params) {

        this.lock();

        let that   = this;

        params = coreuiTableUtils.isObject(params) ? params : {};

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


        $.ajax({
            url: url,
            method: method || 'GET',
            dataType: "json",
            data: params,
            beforeSend: function(xhr) {
                that._trigger('start-load-records', that, [ that, xhr ]);
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
                that._trigger('error-load-records', that, [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                that._trigger('end-load-records', that, [ that, xhr, textStatus ]);
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

        this._trigger('show-records', this, [ this ]);
    },


    /**
     * Установка общего количества записей на странице
     * @param recordsPerPage
     */
    setPageSize: function (recordsPerPage) {

        this._recordsPerPage = recordsPerPage;

        this._trigger('update-page-size', this);
    },


    /**
     * Выбор всех записей в таблице
     */
    selectAll: function () {

        coreuiTableElements.selectTrAll(this.getId())

        this._trigger('select-all', this);
    },


    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll: function () {

        coreuiTableElements.unselectTrAll(this.getId())

        this._trigger('unselect-all', this);
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

        this._trigger('select', this, [ record ]);
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

        this._trigger('unselect', this, [ record.data ]);
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
     * @param eventName
     * @param callback
     * @param context
     * @param singleExec
     */
    on: function(eventName, callback, context, singleExec) {
        if (typeof this._events[eventName] !== 'object') {
            this._events[eventName] = [];
        }
        this._events[eventName].push({
            context : context || this,
            callback: callback,
            singleExec: !! singleExec,
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
            let search = coreuiTableUtils.isObject(this._options.recordsRequest.params) &&
                         this._options.recordsRequest.params.hasOwnProperty('search') &&
                         typeof this._options.recordsRequest.params.search === 'string'
                ? this._options.recordsRequest.params.search
                : 'search';

            let filter = coreuiTableUtils.isObject(this._options.recordsRequest.params) &&
                         this._options.recordsRequest.params.hasOwnProperty('filter') &&
                         typeof this._options.recordsRequest.params.filter === 'string'
                ? this._options.recordsRequest.params.filter
                : 'filter';

            let params = {};

            if (searchData.length > 0) {
                params[search] = searchData;
            }
            if (filterData.length > 0) {
                params[filter] = filterData;
            }

            this.load(this._options.recordsRequest.url, this._options.recordsRequest.method, params);

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


        this._trigger('filters_change', this, [ filterData ]);
        this._trigger('search_change', this, [ searchData ]);
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
                record = $.extend(true, {}, recordItem);
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
     * Удаление строки из таблицы по индексу
     * @param index
     */
    removeRecordByIndex: function (index) {

        let tr = coreuiTableElements.getTrByIndex(this, index);

        if (tr.length >= 0) {
            tr.fadeOut('fast', function () {
                tr.remove();
            });

            if (this._records.hasOwnProperty(index)) {
                this._records.slice(index, 1);
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

        let htmlRecords = coreuiTableRender.renderRecords(this, this._records);

        coreuiTableElements.getTableTbody(this.getId())
            .html(htmlRecords);

        this._trigger('show-records', this, [ this ]);
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
     * Выполнения зарегистрированных функций в указанном событии
     * @param {string}      name
     * @param {object|null} context
     * @param {Array}       params
     * @private
     */
    _trigger: function(name, context, params) {

        params = params || [];

        if (this._events[name] instanceof Object && this._events[name].length > 0) {
            for (let i = 0; i < this._events[name].length; i++) {
                let callback = this._events[name][i].callback;

                context = context || this._events[name][i].context;

                callback.apply(context, params);

                if (this._events[name][i].singleExec) {
                    this._events[name].splice(i, 1);
                }
            }
        }
    }
}


export default coreuiTableInstance;