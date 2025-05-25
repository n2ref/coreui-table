import Utils from "../../utils";
import Tpl   from "../../tpl";


let controlPages = {


    /**
     * Формирование контрола
     * @param {Table} table
     * @param {object}              options
     * @return {jQuery}
     */
    render: function (table, options) {

        let attributes       = [];
        let showPrev         = !! options.show.prev;
        let showNext         = !! options.show.next;
        let showDividerStart = false;
        let showDividerEnd   = false;
        let showPageFirst    = false;
        let showPageLast     = false;
        let pages            = [];
        let pagesTotal       = table._recordsTotal > 0 && table._recordsPerPage > 0
            ? Math.ceil(table._recordsTotal / table._recordsPerPage)
            : 1;


        if (Utils.isObject(options.attr)) {
            $.each(options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        if (table._recordsTotal > 0 &&
            options.count > 0 &&
            Utils.isNumeric(options.count)
        ) {
            let count     = Math.min(options.count, pagesTotal);
            let countHalf = Math.max(0, Math.floor(count / 2));

            if (count % 2 === 0) {
                countHalf -= 1;
            }

            let start = table._page > 1
                ? Math.max(1, table._page - countHalf)
                : table._page;

            if (start + count > pagesTotal) {
                start = pagesTotal - (count - 1);
            }

            for (let i = 0; i < count; i++) {
                pages.push(start + i);
            }
        } else {
            if (options.count > 0 &&
                table._page > 1
            ) {
                pages.push(table._page);
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

        let control = $(Utils.render(Tpl['controls/pages.html'], {
            currentPage: table._page,
            isActivePrev: table._page > 1,
            isActiveNext: table._page < pagesTotal,
            pagesTotal: pagesTotal,

            showPrev: showPrev,
            showPageFirst: showPageFirst,
            showDividerStart: showDividerStart,

            pages: pages,

            showDividerEnd: showDividerEnd,
            showPageLast: showPageLast,
            showNext: showNext,

            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: table.getLang(),
        }));


        let btnPrev = control.find('.coreui-table__page_prev')
        if (btnPrev[0]) {
            if (table._page <= 1) {
                btnPrev.addClass('disabled');

            } else {
                btnPrev.click(function () {
                    if (table._page > 1) {
                        table.prevPage();
                    }
                })
            }
        }


        let btnNext = control.find('.coreui-table__page_next')
        if (btnNext[0]) {
            btnNext.click(function () {
                table.nextPage();
            })
        }


        let btnPages = control.find('.coreui-table__page')
        if (btnPages[0]) {
            btnPages.click(function () {
                let page = Number($.trim($(this).text()));

                if (page > 0) {
                    table.goPage(page);
                }
            })
        }

        return control;
    }
}

export default controlPages;