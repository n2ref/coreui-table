import HelperFilter from "../filter";


class HelperFilterSwitch extends HelperFilter {

    _label  = null;
    _width  = null;
    _value  = null;
    _valueY = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('switch', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} label
     * @return {HelperFilterSwitch}
     */
    setLabel(label) {

        this._label = label;
        return this;
    }


    /**
     * @param {string} value
     * @return {HelperFilterSwitch}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {string} valueY
     * @return {HelperFilterSwitch}
     */
    setValueY(valueY) {

        this._valueY = valueY;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperFilterSwitch}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._label !== null)  { result.label  = this._label; }
        if (this._width !== null)  { result.width  = this._width; }
        if (this._value !== null)  { result.value  = this._value; }
        if (this._valueY !== null) { result.valueY = this._valueY; }

        return result;
    }
}

export default HelperFilterSwitch;