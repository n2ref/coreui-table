
CoreUI.table.instance = {

    _options: {
        id: null,
        class: '',
        primaryKey: 'id',
        lang: 'ru',
        size: 'sm',
        striped: true,
        hover: true,
        width: null,
        minWidth: null,
        maxWidth: null,
        height: null,
        minHeight: null,
        naxHeight: null,
        page: 1,
        recordsPerPage: 25,
        recordsPerPageList: [ 25, 50, 100, 1000 ], // 0 - all
        pageParam: 'page',
        recordsPerPageParam: 'count',
        method: 'GET',
        url: null,  // '/mod/index/orders/?page=[page]'
        show: {
            total: false,
            columnHeaders: true,
            pages: false,
            pagesJump: false,
            prePageList: false
        },
        onClick: null,
        onClickUrl: null,
        controls: [],
        columnGroups: [],
        columns: [],
        footer: [],
        records: []
    },

    _page: 1,
    _recordsPerPage: 25,
    _recordsTotal: 0,
    _recordsNumber: 1,

    _columns: [],
    _search: [],
    _filter: [],
    _events: {},


    /**
     * Инициализация
     * @param {object} options
     * @private
     */
    _init: function (options) {

        this._options = $.extend(true, {}, this._options, options);
        this._events  = {};


        if ( ! this._options.id) {
            this._options.id = CoreUI.table._hashCode();
        }

        if (this._options.page > 0) {
            this._page = this._options.page;
        }
        if (this._options.recordsPerPage > 0) {
            this._recordsPerPage = this._options.recordsPerPage;
        }

        let that = this;


        // Инициализация колонок
        if (typeof this._options.columns === 'object' &&
            Array.isArray(this._options.columns) &&
            this._options.columns.length > 0
        ) {
            $.each(this._options.columns, function (key, column) {
                if (typeof column.type === 'undefined' ||
                    ! CoreUI.table.columns.hasOwnProperty(column.type)
                ) {
                    column.type = 'text';
                }

                let columnInstance = $.extend(true, {}, CoreUI.table.columns[column.type]);
                columnInstance.init(that, column);
                that._columns.push(columnInstance);
            });
        }
    },


    /**
     *
     */
    initEvents: function () {

        let that         = this;
        let tableWrapper = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper';

        // Показ строк
        this.on('show-records.coreui.table', function () {

            // Переход по ссылке
            if (typeof that._options.onClickUrl === 'string' && that._options.onClickUrl) {
                $(tableWrapper + ' > table > tbody > tr.coreui-table__record').click(function () {
                    let recordKey = $(this).data('record-key');
                    let record    = that._getRecordByKey(recordKey);

                    if ( ! record) {
                        return;
                    }

                    let url = that._options.onClickUrl;

                    $.each(record, function (field, value) {
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
                $(tableWrapper + ' > table > tbody > tr.coreui-table__record').click(function (event) {
                    let recordKey = $(this).data('record-key');
                    let record    = that._getRecordByKey(recordKey);

                    if ( ! record) {
                        return;
                    }

                    that._options.onClick(event, record);
                });
            }

            // Фиксация колонок
            let colOffset = 0;
            $(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_left').each(function () {
                let index  = $(this).index() + 1;

                if (index !== 1) {
                    $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('left', colOffset + 'px');
                    $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('left', colOffset + 'px');
                }

                colOffset += $(this).outerWidth();
            });

            colOffset = 0;
            $($(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_right').get().reverse()).each(function () {
                let index  = $(this).index() + 1;

                if (index !== 1) {
                    $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('right', colOffset + 'px');
                    $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('right', colOffset + 'px');
                }

                colOffset += $(this).outerWidth();
            });
        });



        // Страницы
        let btnPrev = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_prev')
        if (btnPrev[0]) {
            btnPrev.click(function () {
                if (that._page > 1) {
                    that.prevPage();
                }
            })
        }

        let btnNext = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_next')
        if (btnNext[0]) {
            btnNext.click(function () {
                that.nextPage();
            })
        }

        let inputGoPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_go_container input');
        let btnGoPage   = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__page_go')
        if (btnGoPage[0]) {
            btnGoPage.click(function () {
                that.goPage(inputGoPage.val());
            });
            inputGoPage.keyup(function (event) {
                event;
            });
        }

        let selectPerPage = $(tableWrapper + ' > table > tfoot > tr > td .coreui-table__pages_list_container select');
        if (selectPerPage[0]) {
            selectPerPage.change(function () {
                that._page           = 1;
                that._recordsPerPage = selectPerPage.val();
                that.reload();
            });
        }



        this._trigger('shown.coreui.table');

        // Вызов события показа строк
        if (( ! this._options.url || this._options.url === '#') &&
            typeof this._options.records === 'object' &&
            Array.isArray(this._options.records) &&
            this._options.records.length > 0
        ) {
            this._trigger('show-records.coreui.table', this, [ this ]);
        }
    },


    /**
     *
     * @returns {*}
     */
    getId: function () {
        return this._options.id;
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
        let htmlRecords = '';
        let render      = {
            controls: [],
            columnsHeader: [],
            columns: [],
            columnGroups: [],
            records: [],
            footer: '',
            pages: '',
        };

        this._recordsTotal = this._options.records.length;


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



        // Элементы управления
        if (typeof this._options.controls === 'object' &&
            Array.isArray(this._options.controls) &&
            this._options.controls.length > 0
        ) {
            $.each(this._options.controls, function (key, control) {
                if (CoreUI.table.controls.hasOwnProperty(control.type)) {

                    let controlInstance = $.extend(true, {}, CoreUI.table.controls[control.type]);
                    controlInstance.init(that, control);

                    render.controls.push({
                        id: controlInstance.getId(),
                        content: controlInstance.render(),
                    });

                    that.on('shown.coreui.table', function () {
                        controlInstance.initEvents()
                    });
                }
            });
        }


        // Колонки
        if (this._columns.length > 0) {
            $.each(this._columns, function (key, column) {
                let columnOptions = column.getOptions();
                let attributes    = [];

                if (columnOptions.fixed && typeof columnOptions.fixed === 'string') {
                    columnOptions.attrHeader = CoreUI.table._mergeAttr(columnOptions.attrHeader, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });

                    columnOptions.attr = CoreUI.table._mergeAttr(columnOptions.attr, {
                        class: 'coreui-table__fixed_' + columnOptions.fixed
                    });
                }

                if (columnOptions.attrHeader && typeof columnOptions.attrHeader === 'object') {
                    $.each(columnOptions.attrHeader, function (name, value) {
                        attributes.push(name + '="' + value + '"');
                    });
                }

                render.columnGroups.push({
                    width: columnOptions.hasOwnProperty('width') ? columnOptions.width : '',
                    unit: typeof columnOptions.width === 'number' ? 'px' : ''
                });

                render.columns.push({
                    attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
                    label: columnOptions.hasOwnProperty('label') ? columnOptions.label : ""
                });
            });
        }


        // Строки
        if (this._options.url && this._options.url !== '#') {
            this.on('shown.coreui.table', function () {
                that.load(this._options.url);
            });

        } else {
            if (typeof this._options.records === 'object' &&
                Array.isArray(this._options.records) &&
                this._options.records.length > 0
            ) {
                that._recordsTotal = this._options.records.length;

                $.each(this._options.records, function (key, record) {
                    render.records.push(that._renderRecord(record, key));
                    that._recordsNumber++;
                });

                htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records.html'], {
                    records: render.records,
                });

            } else {
                htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records-empty.html'], {
                    columnsCount: this._columns.length ? this._columns.length : 1,
                    lang: this._getLang(),
                });
            }
        }


        // Страницы
        if (typeof this._options.show === 'object' &&
            (this._options.show.pages ||
             this._options.show.pagesJump ||
             this._options.show.prePageList)
        ) {
            let totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0
                ? Math.ceil(this._recordsTotal / this._recordsPerPage)
                : 1;

            if (this._options.recordsPerPageList.indexOf(this._recordsPerPage) < 0) {
                this._options.recordsPerPageList.unshift(this._recordsPerPage);
            }

            render.pages = CoreUI.table.ejs.render(CoreUI.table.tpl['table-pages.html'], {
                columnsCount: this._columns.length ? this._columns.length : 1,
                table: this._options,
                lang: this._getLang(),
                currentPage: this._page,
                pagesTotal: totalPages,
                prevPage: this._page > 1,
                nextPage: this._page < totalPages,
                recordsPerPage: this._recordsPerPage,
                recordsPerPageList: this._options.recordsPerPageList
            })
        }


        if (typeof this._options.columnGroups === 'object' &&
            Array.isArray(this._options.columnGroups) &&
            this._options.columnGroups.length > 0
        ) {
            let rows = [];

            $.each(this._options.columnGroups, function (key, headerRow) {
                if (typeof headerRow === 'object' && Array.isArray(headerRow)) {
                    let cells = [];

                    $.each(headerRow, function (key, headerColumn) {
                        if (typeof headerColumn === 'object' && ! Array.isArray(headerColumn)) {
                            let attributes = [];

                            if (headerColumn.attr && typeof headerColumn.attr === 'object') {
                                $.each(headerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                label: headerColumn.hasOwnProperty('label') ? headerColumn.label : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(
                        CoreUI.table.ejs.render(CoreUI.table.tpl['table-columns.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            render.columnsHeader = rows.join('');
        }

        if (typeof this._options.footer === 'object' &&
            Array.isArray(this._options.footer) &&
            this._options.footer.length > 0
        ) {
            let rows = [];

            $.each(this._options.footer, function (key, footerRow) {
                if (typeof footerRow === 'object' && Array.isArray(footerRow)) {
                    let cells = [];

                    $.each(footerRow, function (key, footerColumn) {
                        if (typeof footerColumn === 'object' && ! Array.isArray(footerColumn)) {
                            let attributes = [];

                            if (footerColumn.attr && typeof footerColumn.attr === 'object') {
                                $.each(footerColumn.attr, function (name, value) {
                                    attributes.push(name + '="' + value + '"');
                                });
                            }

                            cells.push({
                                label: footerColumn.hasOwnProperty('label') ? footerColumn.label : '',
                                attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
                            });
                        }
                    });

                    rows.push(
                        CoreUI.table.ejs.render(CoreUI.table.tpl['table-columns-footer.html'], {
                            columns: cells,
                        })
                    );
                }
            });

            render.footer = rows.join('');
        }


        let htmlColumns = CoreUI.table.ejs.render(CoreUI.table.tpl['table-columns.html'], {
            columns: render.columns,
        });


        let html = CoreUI.table.ejs.render(CoreUI.table.tpl['table.html'], {
            table: this._options,
            lang: this._getLang(),
            widthSizes: widthSizes,
            heightSizes: heightSizes,
            recordsTotal: this._recordsTotal,
            render: {
                columnGroups : render.columnGroups,
                columnsHeader : render.columnsHeader,
                controls : render.controls,
                columns  : htmlColumns,
                records  : htmlRecords,
                footer   : render.footer,
                pages   : render.pages,
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
     *
     */
    lock: function () {

        let container = $('#coreui-table-' + this._options.id + ' > .coreui-table__container');

        if (container[0] && ! container.find('.coreui-table-lock')[0]) {
            let html =  CoreUI.table.ejs.render(CoreUI.table.tpl['table-loader.html'], {
                lang: this._getLang()
            });

            container.prepend(html);
        }
    },


    /**
     *
     */
    unlock: function () {

        $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table-lock').hide(50, function () {
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
            url = url.replace(/\[page\]/, this._page);
        } else {
            params[this._options.pageParam] = this._page;
        }

        if (url.match(/\[per_page\]/)) {
            url = url.replace(/\[per_page\]/, this._recordsPerPage);
        } else {
            params[this._options.recordsPerPageParam] = this._recordsPerPage;
        }

        if (Object.keys(params).length > 0) {
            url += url.match(/\?/)
                ? '&' + $.param(params)
                : '?' + $.param(params);
        }

        $.ajax({
            url: url,
            method: method || 'GET',
            dataType: "json",
            beforeSend: function(xhr) {
                that._trigger('start-load-records.coreui.table', that, [ that, xhr ]);
            },
            success: function (result) {

                if (result.hasOwnProperty('records') &&
                    typeof result.records === 'object' &&
                    Array.isArray(result.records)
                ) {
                    let total = result.hasOwnProperty('total') && CoreUI.table._isNumeric(result.total) ? result.total : null;
                    that._viewRecords(result.records, total);

                } else {
                    that._viewRecords([]);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                that._viewRecords([]);
                that._trigger('error-load-records.coreui.table', that, [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                that._trigger('end-load-records.coreui.table', that, [ that, xhr, textStatus ]);
            },
        });
    },


    /**
     * Перезагрузка записей в таблице
     */
    reload: function () {

        if (this._options.url && this._options.url !== '#') {
            this.load(this._options.url, this._options.method)
        }
    },


    /**
     * Выбор всех записей в таблице
     */
    selectAll: function () {

        let tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', true);
        $(tableContainer + ' > tbody > tr.coreui-table__record').addClass('table-primary');
        $(tableContainer + ' > tbody > tr.coreui-table__record > td > .coreui-table__select').prop('checked', true);

        this._trigger('select-all.coreui.table', this);
    },


    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll: function () {

        let tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', false);
        $(tableContainer + ' > tbody > tr.coreui-table__record').removeClass('table-primary');
        $(tableContainer + ' > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select').prop('checked', false);

        this._trigger('unselect-all.coreui.table', this);
    },


    /**
     * Выбор записи в таблице
     * @param {string} primaryKey
     */
    selectRecord: function (primaryKey) {

        let recordItem = this._getRecordByPrimaryKey(primaryKey);

        if ( ! recordItem) {
            return;
        }

        let row = this._getRowByKey(recordItem.key);

        if ( ! row) {
            return;
        }

        $(row).addClass('table-primary');
        $('.coreui-table__select', row).prop('checked', true);

        this._trigger('select.coreui.table', this, [ recordItem.record ]);
    },


    /**
     * Отмена выбора записи в таблице
     * @param {string} primaryKey
     */
    unselectRecord: function (primaryKey) {

        let recordItem = this._getRecordByPrimaryKey(primaryKey);

        if ( ! recordItem) {
            return;
        }

        let row = this._getRowByKey(recordItem.key);

        if ( ! row) {
            return;
        }

        $(row).removeClass('table-primary');
        $('.coreui-table__select', row).prop('checked', false);

        this._trigger('unselect.coreui.table', this, [ recordItem.record ]);
    },


    /**
     * Получение выбранных id
     * @return {array}
     */
    getSelected: function () {

        let primaryKeys = [];
        let that        = this;
        let field       = this._options.primaryKey;

        $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked')
            .each(function (key, element) {
                let record = that._getRecordByKey($(element).val());

                if ( ! record || ! record.hasOwnProperty(field)) {
                    return;
                }

                primaryKeys.push(record[field]);
            });



        return primaryKeys;
    },


    /**
     * Получение выбранных записей
     * @return {array}
     */
    getSelectedRecords: function () {

        let records = [];
        let that    = this;

        $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked')
            .each(function (key, element) {
                let record = that._getRecordByKey($(element).val());

                if ( ! record) {
                    return;
                }

                records.push(record);
            });



        return records;
    },


    /**
     * Получение записи по id
     * @param primaryKey
     * @return {object|null}
     */
    getRecord: function (primaryKey) {

        let recordItem = this._getRecordByPrimaryKey(primaryKey);

        if ( ! recordItem) {
            return null;
        }

        return recordItem.record;
    },


    /**
     * Получение записей
     */
    getRecords: function () {

        return this._options.records
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
     * @param name
     * @param context
     * @param params
     * @private
     */
    _trigger: function(name, context, params) {

        params = params || [];

        if (this._events[name] instanceof Object && this._events[name].length > 0) {
            for (var i = 0; i < this._events[name].length; i++) {
                let callback = this._events[name][i].callback;

                context = context || this._events[name][i].context;

                callback.apply(context, params);

                if (this._events[name][i].singleExec) {
                    this._events[name].splice(i, 1);
                }
            }
        }
    },


    /**
     * Получение настроек языка
     * @private
     */
    _getLang: function () {

        return CoreUI.table.lang.hasOwnProperty(this._options.lang)
            ? CoreUI.table.lang[this._options.lang]
            : CoreUI.table.lang['ru'];
    },


    /**
     * Получение записи по ключу
     * @param recordKey
     * @return {object|null}
     * @private
     */
    _getRecordByKey: function (recordKey) {

        if (typeof recordKey === 'undefined' || recordKey === '') {
            return null;
        }

        let record = this._options.records.hasOwnProperty(recordKey)
            ? this._options.records[recordKey]
            : null;

        if ( ! record) {
            return null;
        }

        return record;
    },


    /**
     * Получение записи по id
     * @param {string} primaryKey
     * @return {object|null}
     * @private
     */
    _getRecordByPrimaryKey: function (primaryKey) {

        if (typeof primaryKey === 'undefined' || primaryKey === '') {
            return null;
        }

        let record    = null;
        let recordKey = null;
        let field     = this._options.primaryKey;

        $.each(this._options.records, function (key, recordItem) {
            if (recordItem.hasOwnProperty(field) && recordItem[field] === primaryKey) {
                recordKey = key;
                record    = recordItem;
                return false;
            }
        });

        if ( ! record) {
            return null;
        }

        return {
            key: recordKey,
            record: record,
        };
    },


    /**
     * Получение элемента строки по ключу
     * @param {int} recordKey
     * @private
     */
    _getRowByKey: function (recordKey) {

        return $('#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr[data-record-key="' + recordKey + '"]');
    },


    /**
     * Показ указанных записей в таблице
     * @param records
     * @param total
     * @private
     */
    _viewRecords: function (records, total) {

        this._recordsTotal = CoreUI.table._isNumeric(total) ? parseInt(total) : records.length;
        let that           = this;
        let htmlRecords    = '';
        let totalPages     = this._recordsTotal > 0 && this._recordsPerPage > 0
            ? Math.ceil(this._recordsTotal / this._recordsPerPage)
            : 1;

        this._options.records = records;

        that._recordsNumber = this._page === 1 ? 1 : ((this._page - 1) * this._recordsPerPage) + 1;

        if (records.length > 0) {
            let renderRecorders = [];

            $.each(records, function (key, record) {
                renderRecorders.push(that._renderRecord(record, key));
                that._recordsNumber++;
            });

            htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records.html'], {
                records: renderRecorders,
            });

        } else {
            htmlRecords = CoreUI.table.ejs.render(CoreUI.table.tpl['table-records-empty.html'], {
                columnsCount: this._columns.length > 0 ? this._columns.length : 1,
                lang: this._getLang(),
            });
        }


        let tableContainer = '#coreui-table-' + this._options.id + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > tfoot > tr > td .coreui-table__page_current').text(this._page);
        $(tableContainer + ' > tfoot > tr > td .coreui-table__pages_total').text(totalPages);
        $(tableContainer + ' > tfoot > tr > td .coreui-table__page_prev').attr('disabled', this._page <= 1);
        $(tableContainer + ' > tfoot > tr > td .coreui-table__page_next').attr('disabled', this._page >= totalPages);

        $(tableContainer + ' > tbody').html(htmlRecords);
        $('#coreui-table-' + this._options.id + ' .coreui-table__count-total').text(this._recordsTotal);

        this._trigger('show-records.coreui.table', this, [ this ]);
    },


    /**
     * @param {object} record
     * @param {int}    recordKey
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    _renderRecord: function (record, recordKey) {

        let that        = this;
        let fields      = [];
        let recordProps = typeof record.coreui === 'object' && ! Array.isArray(record.coreui) ? record.coreui : null;
        let recordAttr  = {
            class: 'coreui-table__record'
        };

        $.each(this._columns, function (key, column) {
            fields.push(that._renderField(column, record, recordKey));
        });

        if (typeof this._options.onClickUrl === 'string' && this._options.onClickUrl) {
            recordAttr.class += ' coreui-table_pointer';
        }

        if (recordProps) {
            recordAttr = CoreUI.table._mergeAttr(recordAttr, recordProps.attr);
        }

        let recordAttrResult = [];

        $.each(recordAttr, function (name, value) {
            recordAttrResult.push(name + '="' + value + '"');
        });

        return {
            attr: recordAttrResult.length > 0 ? (' ' + recordAttrResult.join(' ')) : '',
            fields: fields
        };
    },


    /**
     *
     * @param {object} column
     * @param {object} record
     * @param {int} recordKey
     * @returns {{ attr: (string), content: (string) }}
     * @private
     */
    _renderField: function (column, record, recordKey) {

        let columnOptions = column.getOptions();
        let columnField   = typeof columnOptions.field === 'string' ? columnOptions.field : null;
        let content       = '';
        let recordProps   = typeof record.coreui === 'object' && ! Array.isArray(record.coreui) ? record.coreui : null;
        let fieldProps    = recordProps && recordProps.hasOwnProperty('fields') && recordProps.fields.hasOwnProperty(columnField)
            ? recordProps.fields[columnField]
            : null;
        let fieldAttr = typeof columnOptions.attr === 'object' && ! Array.isArray(columnOptions.attr)
            ? columnOptions.attr
            : {};

        if (fieldProps && typeof fieldProps.attr === 'object' && ! Array.isArray(fieldProps.attr)) {
            fieldAttr = CoreUI.table._mergeAttr(fieldAttr, fieldProps.attr);

        }

        if (typeof columnOptions.render === 'function') {
            content = columnOptions.render(record);
        } else {
            content = columnField && record.hasOwnProperty(columnField)
                ? record[columnField]
                : '';
        }

        content = column.render(content, record, recordKey);

        let fieldAttrResult = [];

        $.each(fieldAttr, function (name, value) {
            fieldAttrResult.push(name + '="' + value + '"');
        });

        return {
            attr:    fieldAttrResult.length > 0 ? (' ' + fieldAttrResult.join(' ')) : '',
            content: content,
        };
    }
}