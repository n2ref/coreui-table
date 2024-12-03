
import coreuiTableUtils    from '../coreui.table.utils';
import coreuiTableTpl      from "../coreui.table.templates";
import coreuiTableElements from "../coreui.table.elements";

let ControlPages = {

    _id: null,
    _table: null,
    _options: {
        show: {
            prev: true,
            next: true,
        },
        count: 3,
        attr: {
            class: 'pagination mb-0'
        }
    },


    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function (table, options) {

        if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
            options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
        }

        this._options = $.extend({}, this._options, options);
        this._table   = table;
        this._id      = coreuiTableUtils.hashCode();
    },


    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function () {

        let that    = this;
        let control = coreuiTableElements.getControl(this._table.getId(), this.getId());

        this._initEvents();

        this._table.on('records_show', function () {
            control.html(that.render());
            that._initEvents();
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

        let attributes       = [];
        let showPrev         = !! this._options.show.prev;
        let showNext         = !! this._options.show.next;
        let showDividerStart = false;
        let showDividerEnd   = false;
        let showPageFirst    = false;
        let showPageLast     = false;
        let pages            = [];
        let pagesTotal       = this._table._recordsTotal > 0 && this._table._recordsPerPage > 0
            ? Math.ceil(this._table._recordsTotal / this._table._recordsPerPage)
            : 1;

        if (this._table._recordsTotal > 0 &&
            this._options.count > 0 &&
            coreuiTableUtils.isNumeric(this._options.count)
        ) {
            let count     = Math.min(this._options.count, pagesTotal);
            let countHalf = Math.max(0, Math.floor(count / 2));

            if (count % 2 === 0) {
                countHalf -= 1;
            }

            let start = this._table._page > 1
                ? Math.max(1, this._table._page - countHalf)
                : this._table._page;

            if (start + count > pagesTotal) {
                start = pagesTotal - (count - 1);
            }

            for (let i = 0; i < count; i++) {
                pages.push(start + i);
            }
        } else {
            if (this._options.count > 0 &&
                this._table._page > 1
            ) {
                pages.push(this._table._page);
            }
        }

        if (pages.length > 0) {
            if (pages[0] >= 2) {
                showPageFirst = true;
            }
            if (pages[0] >= 3) {
                showDividerStart = true;
            }

            if (pages[pages.length - 1] + 1 < pagesTotal) {
                showDividerEnd = true;
            }
            if (pages[pages.length - 1] < pagesTotal) {
                showPageLast = true;
            }
        }

        if (coreuiTableUtils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                attributes.push(name + '="' + value + '"');
            });
        }

        return coreuiTableUtils.render(coreuiTableTpl['controls/pages.html'], {
            currentPage: this._table._page,
            isActivePrev: this._table._page > 1,
            isActiveNext: this._table._page < pagesTotal,
            pagesTotal: pagesTotal,

            showPrev: showPrev,
            showPageFirst: showPageFirst,
            showDividerStart: showDividerStart,

            pages: pages,

            showDividerEnd: showDividerEnd,
            showPageLast: showPageLast,
            showNext: showNext,

            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: this._table.getLang(),
        });
    },


    /**
     * Инициализация событий на элементах
     * @private
     */
    _initEvents: function () {

        let that    = this;
        let control = coreuiTableElements.getControl(this._table.getId(), this.getId());

        let btnPrev = $('.coreui-table__page_prev', control)
        if (btnPrev[0]) {
            if (that._table._page <= 1) {
                btnPrev.addClass('disabled');
            }

            btnPrev.click(function () {
                if (that._table._page > 1) {
                    that._table.prevPage();
                }
            })
        }

        let btnNext = $('.coreui-table__page_next', control)
        if (btnNext[0]) {
            btnNext.click(function () {
                that._table.nextPage();
            })
        }

        let pages = $('.coreui-table__page', control)
        if (pages[0]) {
            pages.click(function () {
                let page = Number($.trim($(this).text()));

                if (page > 0) {
                    that._table.goPage(page);
                }
            })
        }
    }
}

export default ControlPages;