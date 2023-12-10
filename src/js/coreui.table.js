
import coreuiFormInstance from './coreui.table.instance';

var coreuiTable = {

    columns: {},
    controls: {},
    filters: {},
    search: {},
    lang: {},

    _instances: {},

    /**
     * @param {object} options
     * @returns {CoreUI.table.instance}
     */
    create: function (options) {

        let instance = $.extend(true, {}, coreuiFormInstance);
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
    }
}

export default coreuiTable;