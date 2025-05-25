import HelperColumn from "../column";


class HelperColumnText extends HelperColumn {

    _isNoWrap       = null;
    _isNoWrapToggle = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('text');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }


    /**
     * @param {boolean} isNoWrap
     * @return {HelperColumnText}
     */
    setNoWrap(isNoWrap) {

        this._isNoWrap = isNoWrap;
        return this;
    }


    /**
     * @param {boolean} isNoWrapToggle
     * @return {HelperColumnText}
     */
    setNoWrapToggle(isNoWrapToggle) {

        this._isNoWrapToggle = isNoWrapToggle;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._isNoWrap !== null)       { result.noWrap       = this._isNoWrap; }
        if (this._isNoWrapToggle !== null) { result.noWrapToggle = this._isNoWrapToggle; }

        return result;
    }
}

export default HelperColumnText;