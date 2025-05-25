import HelperColumn from "../column";


class HelperColumnSwitch extends HelperColumn {

    _valueY   = null;
    _valueN   = null;
    _disabled = null;
    _onChange = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('switch');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }


    /**
     * @param {string|number} valueY
     * @return {HelperColumnSwitch}
     */
    setValueY(valueY) {

        this._valueY = valueY;
        return this;
    }


    /**
     * @param {string|number} valueN
     * @return {HelperColumnSwitch}
     */
    setValueN(valueN) {

        this._valueN = valueN;
        return this;
    }


    /**
     * @param {boolean} disabled
     * @return {HelperColumnSwitch}
     */
    setDisabled(disabled) {

        this._disabled = disabled;
        return this;
    }


    /**
     * @param {function} onChange
     * @return {HelperColumnSwitch}
     */
    setOnChange(onChange) {

        this._onChange = onChange;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._valueY)   { result.valueY   = this._valueY; }
        if (this._valueN)   { result.valueN   = this._valueN; }
        if (this._disabled) { result.disabled = this._disabled; }
        if (this._onChange) { result.onChange = this._onChange; }

        return result;
    }
}

export default HelperColumnSwitch;