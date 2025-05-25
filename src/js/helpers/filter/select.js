import HelperFilter from "../filter";


class HelperFilterSelect extends HelperFilter {

    _label   = null;
    _width   = null;
    _values  = null;
    _options = null;
    _attr    = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('select', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} label
     * @return {HelperFilterSelect}
     */
    setLabel(label) {

        this._label = label;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperFilterSelect}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {Array} checkedItems
     * @return {HelperFilterSelect}
     */
    setValue(checkedItems) {

        this._values = checkedItems;
        return this;
    }


    /**
     * @param {Array} options
     * @return {HelperFilterSelect}
     */
    setOptions(options) {

        this._options = options;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperFilterSelect}
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

        if (this._label)   { result.label   = this._label; }
        if (this._width)   { result.width   = this._width; }
        if (this._values)  { result.value   = this._values; }
        if (this._options) { result.options = this._options; }
        if (this._attr)    { result.attr    = this._attr; }

        return result;
    }
}

export default HelperFilterSelect;