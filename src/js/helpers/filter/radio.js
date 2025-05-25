import HelperFilter from "../filter";


class HelperFilterRadio extends HelperFilter {

    _label   = null;
    _values  = null;
    _options = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('radio', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} label
     * @return {HelperFilterRadio}
     */
    setLabel(label) {

        this._label = label;
        return this;
    }


    /**
     * @param {Array} checkedItems
     * @return {HelperFilterRadio}
     */
    setValue(checkedItems) {

        this._values = checkedItems;
        return this;
    }


    /**
     * @param {Array} options
     * @return {HelperFilterRadio}
     */
    setOptions(options) {

        this._options = options;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._label)   { result.label   = this._label; }
        if (this._values)  { result.value   = this._values; }
        if (this._options) { result.options = this._options; }

        return result;
    }
}

export default HelperFilterRadio;