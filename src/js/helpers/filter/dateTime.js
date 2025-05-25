import HelperFilter from "../filter";


class HelperFilterDateTime extends HelperFilter {

    _label = null;
    _width = null;
    _value = null;
    _attr  = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('datetime', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} label
     * @return {HelperFilterDateTime}
     */
    setLabel(label) {

        this._label = label;
        return this;
    }


    /**
     * @param {string} value
     * @return {HelperFilterDateTime}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperFilterDateTime}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperFilterDateTime}
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

        if (this._label) { result.label = this._label; }
        if (this._width) { result.width = this._width; }
        if (this._value) { result.value = this._value; }
        if (this._attr)  { result.attr  = this._attr; }

        return result;
    }
}

export default HelperFilterDateTime;