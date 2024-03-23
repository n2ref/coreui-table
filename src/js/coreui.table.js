
import coreuiTableInstance from './coreui.table.instance';

let coreuiTable = {

    columns: {},
    controls: {},
    filters: {},
    search: {},
    lang: {},

    _instances: {},
    _settings: {
        lang: 'ru',
    },

    /**
     * @param {object} options
     * @returns {CoreUI.table.instance}
     */
    create: function (options) {

        let instance = $.extend(true, {}, coreuiTableInstance);
        instance._init(options instanceof Object ? options : {});

        let tableId = instance.getId();
        this._instances[tableId] = instance;

        return instance;
    },


    /**
     * @param {string} id
     * @returns {CoreUI.table.instance|null}
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