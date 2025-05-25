import HelperSearch from "../search";
import Utils        from "../../utils";

class HelperSearchText extends HelperSearch {

    _width = null;
    _value = null;
    _attr  = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('text', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} value
     * @return {HelperSearchText}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperSearchText}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {string} text
     * @return {HelperSearchText}
     */
    setAttrPlaceholder(text) {

        if ( ! Utils.isObject(this._attr)) {
            this._attr = {};
        }

        this._attr.placeholder = text;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperSearchText}
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

        if (this._width) { result.width = this._width; }
        if (this._value) { result.value = this._value; }
        if (this._attr)  { result.attr = this._attr; }

        return result;
    }
}

export default HelperSearchText;