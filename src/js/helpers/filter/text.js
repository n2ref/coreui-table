import HelperFilter from "../filter";
import Utils        from "../../utils";


class HelperFilterText extends HelperFilter {

    _label      = null;
    _width      = null;
    _autoSearch = null;
    _btn        = null;
    _value      = null;
    _attr       = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} id
     */
    constructor(field, label, id) {

        super('text', id);

        if (field) {
            this.setField(field);
        }

        if (label) {
            this.setLabel(label);
        }
    }


    /**
     * @param {string} label
     * @return {HelperFilterText}
     */
    setLabel(label) {

        this._label = label;
        return this;
    }


    /**
     * @param {string} value
     * @return {HelperFilterText}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {int} width
     * @return {HelperFilterText}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {boolean} isAutoSearch
     * @return {HelperFilterText}
     */
    setAutoSearch(isAutoSearch) {

        this._autoSearch = isAutoSearch;
        return this;
    }


    /**
     * @param {string} content
     * @param {Object} attr
     * @return {HelperFilterText}
     */
    setButton(content, attr) {

        this._btn = {
            content: content
        };

        if (attr && Utils.isObject(attr)) {
            this._btn.attr = attr;
        }

        return this;
    }


    /**
     * @param {string} text
     * @return {HelperFilterText}
     */
    setAttrPlaceholder(text) {

        this._attr.placeholder = text;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperFilterText}
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

        if (this._label !== null)      { result.label = this._label; }
        if (this._width !== null)      { result.width = this._width; }
        if (this._value !== null)      { result.value = this._value; }
        if (this._autoSearch !== null) { result.autoSearch = this._autoSearch; }
        if (this._btn !== null)        { result.btn  = this._btn; }
        if (this._attr !== null)       { result.attr = this._attr; }

        return result;
    }
}

export default HelperFilterText;