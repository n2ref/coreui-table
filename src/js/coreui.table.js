
import coreuiTableInstance from './coreui.table.instance';
import coreuiTableUtils    from "./coreui.table.utils";

let coreuiTable = {

    columns: {},
    controls: {},
    filters: {},
    search: {},
    lang: {},

    _instances: {},
    _settings: {
        lang: 'en',
    },

    /**
     * @param {object} options
     * @returns {object}
     */
    create: function (options) {

        if ( ! options.hasOwnProperty('lang') || typeof options.lang !== 'string') {
            options.lang = this.getSetting('lang');
        }

        let langItems     = this.lang.hasOwnProperty(options.lang) ? this.lang[options.lang] : {};
        options.langItems = options.hasOwnProperty('langItems') && coreuiTableUtils.isObject(options.langItems)
            ? $.extend(true, {}, langItems, options.langItems)
            : langItems;


        let instance = $.extend(true, {}, coreuiTableInstance);
        instance._init(this, options instanceof Object ? options : {});

        let tableId = instance.getId();
        this._instances[tableId] = instance;

        return instance;
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
    }
}

export default coreuiTable;