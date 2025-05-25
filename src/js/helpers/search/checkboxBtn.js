import HelperSearch from "../search";


class HelperSearchCheckboxBtn extends HelperSearch {

    _options     = null;
    _optionClass = null;
    _value       = null;
    _attr        = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('checkboxBtn', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} value
     * @return {HelperSearchCheckboxBtn}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {Array} options
     * @return {HelperSearchCheckboxBtn}
     */
    setOptions(options) {

        this._options = options;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperSearchCheckboxBtn}
     */
    setAttr(attr) {

        this._attr = $.extend(true, this._attr || {}, attr);
        return this;
    }


    /**
     * Установка класса для внешнего вида
     * @param {setAttr} optionClass
     * @return {HelperSearchCheckboxBtn}
     */
    setOptionClass(optionClass) {

        this._optionClass = optionClass;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._options)     { result.options     = this._options; }
        if (this._optionClass) { result.optionClass = this._optionClass; }
        if (this._value)       { result.value       = this._value; }
        if (this._attr)        { result.attr        = this._attr; }

        return result;
    }
}

export default HelperSearchCheckboxBtn;