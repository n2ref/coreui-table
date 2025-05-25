import HelperSearch from "../search";


class HelperSearchDatetime extends HelperSearch {

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
     * @param {string} value
     * @return {HelperSearchDatetime}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperSearchDatetime}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperSearchDatetime}
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

export default HelperSearchDatetime;