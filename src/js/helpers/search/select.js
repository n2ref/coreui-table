import HelperSearch from "../search";
import Utils        from "../../utils";


class HelperSearchSelect extends HelperSearch {

    _options = null;
    _width   = null;
    _value   = null;
    _attr    = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('select', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} value
     * @return {HelperSearchSelect}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {int} width
     * @return {FilterText}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {Array} options
     * @return {HelperSearchSelect}
     */
    setOptions(options) {

        this._options = options;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperSearchSelect}
     */
    setAttr(attr) {

        this._attr = $.extend(true, this._attr || {}, attr);
        return this;
    }


    /**
     * @return {HelperSearchSelect}
     */
    setAttrMultiple() {

        if ( ! Utils.isObject(this._attr)) {
            this._attr = {};
        }

        this._attr.multiple = 'multiple';
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._width)   { result.width   = this._width; }
        if (this._options) { result.options = this._options; }
        if (this._value)   { result.value   = this._value; }
        if (this._attr)    { result.attr    = this._attr; }

        return result;
    }
}

export default HelperSearchSelect;