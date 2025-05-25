
class HelperControl {

    _id    = '';
    _type  = '';
    _props = null;


    /**
     * @param type
     * @param id
     */
    constructor(type, id) {

        this._type = type

        if (id) {
            this._id = id;
        }
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

        if (this._id) {
            result.id = this._id;
        }

        if (this._props) {
            result = $.extend(true, this._props, result);
        }

        return result;
    }
}

export default HelperControl;