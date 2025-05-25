import HelperFilter from "../filter";


class HelperFilterDateTime extends HelperFilter {

    _label      = null;
    _width      = null;
    _valueStart = null;
    _valueEnd   = null;
    _attr       = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('datetimeRange', id);

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
     * @param {string} valueStart
     * @param {string} valueEnd
     * @return {HelperFilterDateTime}
     */
    setValue(valueStart, valueEnd) {

        this._valueStart = valueStart;
        this._valueEnd   = valueEnd;
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
        if (this._valueStart !== null || this._valueEnd !== null) {
            result.value = {
                start: this._valueStart,
                end:   this._valueEnd,
            };
        }
        if (this._attr)  { result.attr  = this._attr; }

        return result;
    }
}

export default HelperFilterDateTime;