import HelperColumn from "../column";


class HelperColumnLink extends HelperColumn {

    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('link');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }


    /**
     * @param {boolean} isNoWrap
     * @return {HelperColumnLink}
     */
    setNoWrap(isNoWrap) {

        this._isNoWrap = isNoWrap;
        return this;
    }


    /**
     * @param {boolean} isNoWrapToggle
     * @return {HelperColumnLink}
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

export default HelperColumnLink;