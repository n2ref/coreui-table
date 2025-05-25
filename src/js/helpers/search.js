
class HelperSearch {

    _id               = '';
    _type             = '';
    _field            = '';
    _label            = '';
    _description      = '';
    _descriptionLabel = '';
    _suffix           = '';
    _props            = null;


    /**
     * @param {string} type
     * @param {string} id
     */
    constructor(type, id) {

        this._type = type;

        if (id) {
            this._id = id;
        }
    }


    /**
     * @param {string} field
     * @return {SearchText}
     */
    setField(field) {

        this._field = field;
        return this;
    }


    /**
     * @param {string} label
     * @return {SearchText}
     */
    setLabel(label) {

        this._label = label;
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
            type:  this._type,
            field: this._field,
            label: this._label,
        }

        if (this._id) {
            result.id = this._id;
        }

        if (this._description) {
            result.description = this._description;
        }

        if (this._descriptionLabel) {
            result.descriptionLabel = this._descriptionLabel;
        }

        if (this._suffix) {
            result.suffix = this._suffix;
        }

        if (this._props) {
            result = $.extend(true, this._props, result);
        }

        return result;
    }
}

export default HelperSearch;