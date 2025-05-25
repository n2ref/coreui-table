import HelperSearch from "../search";


class HelperSearchNumber extends HelperSearch {

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

        super('number', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} valueStart
     * @param {string} valueEnd
     * @return {HelperSearchNumber}
     */
    setValue(valueStart, valueEnd) {

        this._valueStart = valueStart;
        this._valueEnd   = valueEnd;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperSearchNumber}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperSearchNumber}
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
        if (this._attr)  { result.attr = this._attr; }

        if (this._valueStart !== null || this._valueEnd !== null) {
            result.value = {
                start: this._valueStart,
                end: this._valueEnd
            };
        }

        return result;
    }
}

export default HelperSearchNumber;