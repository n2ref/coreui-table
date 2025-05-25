
import Table from './table';

let Controller = {

    columns: {},
    controls: {},
    filters: {},
    search: {},
    lang: {},

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

        return new Table(options instanceof Object ? options : {});
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