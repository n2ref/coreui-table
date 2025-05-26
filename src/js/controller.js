
import Table from './table';

import langEn from "./lang/en";
import langRu from "./lang/ru";

import ControlLink        from "./controls/link";
import ControlButton      from "./controls/button";
import ControlDropdown    from "./controls/dropdown";
import ControlButtonGroup from "./controls/button_group";
import ControlCustom      from "./controls/custom";
import ControlPageSize    from "./controls/page_size";
import ControlPageJump    from "./controls/page_jump";
import ControlPages       from "./controls/pages";
import ControlTotal       from "./controls/total";
import ControlSearch      from "./controls/search";
import ControlColumns     from "./controls/columns";
import ControlCaption     from "./controls/caption";
import ControlFilterClear from "./controls/filter_clear";
import ControlDivider     from "./controls/divider";

import FilterText           from "./filters/text";
import FilterNumber         from "./filters/number";
import FilterDate           from "./filters/date";
import FilterDatetime       from "./filters/datetime";
import FilterDateMonth      from "./filters/date_month";
import FilterDateRange      from "./filters/date_range";
import FilterDatetimeRange  from "./filters/datetime_range";
import FilterCheckbox       from "./filters/checkbox";
import FilterRadio          from "./filters/radio";
import FilterSelect         from "./filters/select";
import FilterSwitch         from "./filters/switch";

import SearchText          from "./search/text";
import SearchNumber        from "./search/number";
import SearchDate          from "./search/date";
import SearchDateMonth     from "./search/date_month";
import SearchDatetime      from "./search/datetime";
import SearchDateRange     from "./search/date_range";
import SearchDatetimeRange from "./search/datetime_range";
import SearchCheckbox      from "./search/checkbox";
import SearchCheckboxBtn   from "./search/checkboxBtn";
import SearchRadio         from "./search/radio";
import SearchRadioBtn      from "./search/radioBtn";
import SearchSelect        from "./search/select";
import SearchSwitch        from "./search/switch";

import ColumnDate      from "./columns/date";
import ColumnDatetime  from "./columns/datetime";
import ColumnDateHuman from "./columns/date_human";
import ColumnHtml      from "./columns/html";
import ColumnNumber    from "./columns/number";
import ColumnMoney     from "./columns/money";
import ColumnNumbers   from "./columns/numbers";
import ColumnSelect    from "./columns/select";
import ColumnSwitch    from "./columns/switch";
import ColumnText      from "./columns/text";
import ColumnButton    from "./columns/button";
import ColumnLink      from "./columns/link";
import ColumnMenu      from "./columns/menu";
import ColumnBadge     from "./columns/badge";
import ColumnComponent from "./columns/component";
import ColumnProgress  from "./columns/progress";
import ColumnImage     from "./columns/image";



let Controller = {

    columns: {
        date      : ColumnDate,
        datetime  : ColumnDatetime,
        dateHuman : ColumnDateHuman,
        html      : ColumnHtml,
        number    : ColumnNumber,
        money     : ColumnMoney,
        numbers   : ColumnNumbers,
        select    : ColumnSelect,
        switch    : ColumnSwitch,
        text      : ColumnText,
        button    : ColumnButton,
        link      : ColumnLink,
        menu      : ColumnMenu,
        badge     : ColumnBadge,
        component : ColumnComponent,
        progress  : ColumnProgress,
        image     : ColumnImage,
    },
    controls: {
        link        : ControlLink,
        button      : ControlButton,
        dropdown    : ControlDropdown,
        buttonGroup : ControlButtonGroup,
        custom      : ControlCustom,
        pageSize    : ControlPageSize,
        pageJump    : ControlPageJump,
        pages       : ControlPages,
        total       : ControlTotal,
        search      : ControlSearch,
        columns     : ControlColumns,
        caption     : ControlCaption,
        filterClear : ControlFilterClear,
        divider     : ControlDivider,
    },
    filters: {
        text          : FilterText,
        number        : FilterNumber,
        date          : FilterDate,
        datetime      : FilterDatetime,
        dateMonth     : FilterDateMonth,
        dateRange     : FilterDateRange,
        datetimeRange : FilterDatetimeRange,
        checkbox      : FilterCheckbox,
        radio         : FilterRadio,
        select        : FilterSelect,
        switch        : FilterSwitch,
    },
    search: {
        text          : SearchText,
        number        : SearchNumber,
        date          : SearchDate,
        dateMonth     : SearchDateMonth,
        datetime      : SearchDatetime,
        dateRange     : SearchDateRange,
        datetimeRange : SearchDatetimeRange,
        checkbox      : SearchCheckbox,
        checkboxBtn   : SearchCheckboxBtn,
        radio         : SearchRadio,
        radioBtn      : SearchRadioBtn,
        select        : SearchSelect,
        switch        : SearchSwitch,
    },

    lang: {
        ru: langRu,
        en: langEn,
    },

    _helpers: {
        columns: {},
        controls: {},
        filters: {},
        search: {},
    },
    _instances: {},
    _settings: {
        lang: 'en',
    },

    /**
     * @param {object} options
     * @returns {Table}
     */
    create: function (options) {

        let table = new Table(options instanceof Object ? options : {});

        this._instances[table.getId()] = table;

        return table;
    },


    /**
     * @param {string} id
     * @returns {object|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ( ! $('#coreui-table-' + id)[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    },


    /**
     * Установка настроек
     * @param {object} settings
     */
    setSettings: function(settings) {

        this._settings = $.extend(true, {}, this._settings, settings);
    },


    /**
     * Получение значения настройки
     * @param {string} name
     */
    getSetting: function(name) {

        let value = null;

        if (this._settings.hasOwnProperty(name)) {
            value = this._settings[name];
        }

        return value;
    },


    /**
     * Регистрация нового типа колонки
     * @param {string}       type
     * @param {Class|Object} column
     * @param {function}     callbackHelper
     */
    regColumn: function (type, column, callbackHelper) {

        this.columns[type] = column;

        if (typeof callbackHelper === 'function') {
            this._helpers.columns[type] = callbackHelper;
        }
    },


    /**
     * Регистрация нового типа контрола
     * @param {string}       type
     * @param {Class|Object} control
     * @param {function}     callbackHelper
     */
    regControl: function (type, control, callbackHelper) {

        this.controls[type] = control;

        if (typeof callbackHelper === 'function') {
            this._helpers.controls[type] = callbackHelper;
        }
    },


    /**
     * Регистрация нового типа фильтров
     * @param {string}       type
     * @param {Class|Object} filter
     * @param {function}     callbackHelper
     */
    regFilter: function (type, filter, callbackHelper) {

        this.filters[type] = filter;

        if (typeof callbackHelper === 'function') {
            this._helpers.filters[type] = callbackHelper;
        }
    },


    /**
     * Регистрация нового типа поиска
     * @param {string}       type
     * @param {Class|Object} search
     * @param {function}     callbackHelper
     */
    regSearch: function (type, search, callbackHelper) {

        this.search[type] = search;

        if (typeof callbackHelper === 'function') {
            this._helpers.search[type] = callbackHelper;
        }
    }
}

export default Controller;