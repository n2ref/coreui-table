

let coreuiTableElements = {

    /**
     * Получение контейнера таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getContainer: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container');
    },


    /**
     * Получение обертки таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getLock: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table-lock');
    },


    /**
     * Получение обертки таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getWrapper: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper');
    },


    /**
     * Получение поискового контейнера
     * @param {string} tableId
     * @return {jQuery}
     */
    getSearchContainer: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__search');
    },


    /**
     * Получение поискового контейнера
     * @param {string} tableId
     * @return {jQuery}
     */
    getColumnsContainer: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__columns');
    },


    /**
     * Получение контейнера поискового контрола
     * @param {string} tableId
     * @param {string} controlId
     * @return {jQuery}
     */
    getSearchControl: function (tableId, controlId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > .coreui-table__search .search-control-' + controlId);
    },


    /**
     * Получение контейнера контрола
     * @param {string} tableId
     * @param {string} controlId
     * @return {jQuery}
     */
    getControl: function (tableId, controlId) {

        return $('#coreui-table-' + tableId + '  #coreui-table-control-' + controlId);
    },


    /**
     * Получение таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getTable: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table');
    },


    /**
     * Получение тела таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getTableTbody: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody');
    },


    /**
     * Получение строк записей
     * @param {string} tableId
     * @return {jQuery}
     */
    getTrRecords: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record');
    },


    /**
     * Получение элемента строки по ключу
     * @param {string} tableId
     * @param {int}    index
     * @return {jQuery}
     */
    getTrByIndex: function (tableId, index) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr[data-record-index="' + index + '"]');
    },


    /**
     * Получение выбранных на таблице элементов
     * @param {string} tableId
     * @return {Array}
     */
    getSelectedIndexes: function (tableId) {

        let indexes = [];

        $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked')
            .each(function (key, element) {
                indexes.push($(element).val());
            });

        return indexes;
    },


    /**
     * Получение выбранных на таблице элементов
     * @param {string} tableId
     * @return {Array}
     */
    getRowsSwitches: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__switch_container');
    },


    /**
     * Получение элементов выбора строк
     * @param {string} tableId
     * @return {Array}
     */
    getRowsSelects: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > tbody > tr.coreui-table__record > td.coreui-table__select_container');
    },


    /**
     * Получение элемента для выбора всех строк
     * @param {string} tableId
     * @return {Array}
     */
    getRowsSelectAll: function (tableId) {

        return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > thead > tr > td > .coreui-table__select-all');
    },


    /**
     * Выделение строки в таблице
     * @param {jQuery} tr
     */
    selectTr(tr) {

        tr.addClass('table-primary');
        $('.coreui-table__select', tr).prop('checked', true);
    },


    /**
     * Выделение всех строк в таблице
     * @param {string} tableId
     */
    selectTrAll(tableId) {

        let tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', true);
        $(tableContainer + ' > tbody > tr.coreui-table__record').addClass('table-primary');
        $(tableContainer + ' > tbody > tr.coreui-table__record > td > .coreui-table__select').prop('checked', true);
    },


    /**
     * Снятие выделение строки в таблице
     * @param {jQuery} tr
     */
    unselectTr(tr) {

        $(tr).removeClass('table-primary');
        $('.coreui-table__select', tr).prop('checked', false);
    },


    /**
     * Снятие выделение со всех строк в таблице
     * @param {string} tableId
     */
    unselectTrAll(tableId) {

        let tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table';

        $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', false);
        $(tableContainer + ' > tbody > tr.coreui-table__record').removeClass('table-primary');
        $(tableContainer + ' > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select').prop('checked', false);
    },


    /**
     * Фиксация колонок слева
     * @param {string} tableId
     */
    fixedColsLeft: function (tableId) {

        let tableWrapper = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper';
        let colOffset    = 0;

        $(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_left').each(function () {
            let index = $(this).index() + 1;

            if (index !== 1) {
                $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('left', colOffset + 'px');
                $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('left', colOffset + 'px');
            }

            colOffset += $(this).outerWidth();
        });
    },


    /**
     * Фиксация колонок справа
     * @param {string} tableId
     */
    fixedColsRight: function (tableId) {

        let tableWrapper = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper';
        let colOffset    = 0;

        $($(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_right').get().reverse()).each(function () {
            let index  = $(this).index() + 1;

            if (index !== 1) {
                $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('right', colOffset + 'px');
                $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')').css('right', colOffset + 'px');
            }

            colOffset += $(this).outerWidth();
        });
    }
}

export default coreuiTableElements;