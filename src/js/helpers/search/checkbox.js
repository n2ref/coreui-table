import HelperSearch from "../search";


class HelperSearchCheckbox extends HelperSearch {

    _options = null;
    _value   = null;
    _attr    = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('checkbox', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} value
     * @return {HelperSearchCheckbox}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {Array} options
     * @return {HelperSearchCheckbox}
     */
    setOptions(options) {

        this._options = options;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperSearchCheckbox}
     */
    setAttr(attr) {

        this._attr = $.extend(true, this._attr || {}, attr);
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._options) { result.options = this._options; }
        if (this._value)   { result.value   = this._value; }
        if (this._attr)    { result.attr    = this._attr; }

        return result;
    }
}

export default HelperSearchCheckbox;