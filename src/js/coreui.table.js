
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.table = {

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

        let instance = $.extend(true, {}, this.instance);
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
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    _mergeAttr: function (attr1, attr2) {

        let mergeAttr = Object.assign({}, attr1);

        if (typeof attr2 === 'object') {
            $.each(attr2, function (name, value) {
                if (mergeAttr.hasOwnProperty(name)) {
                    if (name === 'class') {
                        mergeAttr[name] += ' ' + value;

                    } else if (name === 'style') {
                        mergeAttr[name] += ';' + value;

                    } else {
                        mergeAttr[name] = value;
                    }

                } else {
                    mergeAttr[name] = value;
                }
            });
        }

        return mergeAttr;
    },


    /**
     * Проверка на число
     * @param num
     * @returns {boolean}
     * @private
     */
    _isNumeric: function(num) {
        return (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && ! isNaN(num);
    },


    /**
     * @returns {string}
     * @private
     */
    _hashCode: function() {
        return this._crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },


    /**
     * @param str
     * @returns {number}
     * @private
     */
    _crc32: function (str) {

        for (var a, o = [], c = 0; c < 256; c++) {
            a = c;
            for (var f = 0; f < 8; f++) {
                a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1
            }
            o[c] = a
        }

        for (var n = -1, t = 0; t < str.length; t++) {
            n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))]
        }

        return (-1 ^ n) >>> 0;
    }
}