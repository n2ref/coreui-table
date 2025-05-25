
class HelperFilter {

    _id    = '';
    _type  = '';
    _field = null;
    _props = null;


    /**
     * @param {string} type
     * @param {string} id
     */
    constructor(type, id) {

        this._type = 'filter:' + type;

        if (id) {
            this._id = id;
        }
    }


    /**
     * @param {string} field
     * @return {Filter}
     */
    setField(field) {

        this._field = field;
        return this;
    }


    /**
     * Установка свойств
     * @param {Object} props
     */
    setProp(props) {

        this._props = $.extend(true, this._props || {}, props);
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {

        let result = {
            type: this._type
        }

        if (this._field) { result.field = this._field; }
        if (this._id)    { result.id    = this._id; }

        if (this._props) {
            result = $.extend(true, this._props, result);
        }

        return result;
    }
}

export default HelperFilter;