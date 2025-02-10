
import 'ejs/ejs.min';

let TableUtils = {

    _templates: {},


    /**
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    mergeAttr: function (attr1, attr2) {

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
    isNumeric: function(num) {
        return (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && ! isNaN(num);
    },


    /**
     * @returns {string}
     * @private
     */
    hashCode: function() {
        return this.crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },


    /**
     * Проверка на объект
     * @param value
     */
    isObject: function (value) {

        return typeof value === 'object' &&
            ! Array.isArray(value) &&
            value !== null;
    },


    /**
     * @param str
     * @returns {number}
     */
    crc32: function (str) {

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
    },


    /**
     * Рендер шаблона
     * @param {string} template
     * @param {object} options
     * @returns {string}
     */
    render: function (template, options) {

        let tplName = this.crc32(template);

        if ( ! this._templates.hasOwnProperty(tplName)) {
            this._templates[tplName] = ejs.compile(template)
        }

        return this._templates[tplName](options);
    },


    /**
     * Размерность строки
     * @param {string} str
     * @param {int}    count
     * @param {string} repeat
     * @returns {string}
     */
    strPadLeft: function(str, count, repeat) {

        str = String(str);

        if (str.length >= count) {
            return str;
        }

        repeat = repeat ? repeat : '0';

        return (repeat.repeat(count) + str).slice(-(count));
    }
}


export default TableUtils;