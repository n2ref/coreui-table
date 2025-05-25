import HelperSearch from "../search";


class HelperSearchSwitch extends HelperSearch {

    _valueY = null;
    _value  = null;


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
     * @param {string} value
     * @return {HelperSearchSwitch}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {string} valueY
     * @return {HelperSearchSwitch}
     */
    setValueY(valueY) {

        this._valueY = valueY;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._value !== null)  { result.value = this._value; }
        if (this._valueY !== null) { result.valueY = this._valueY; }

        return result;
    }
}

export default HelperSearchSwitch;