import HelperControl from "../control";


class HelperControlPages extends HelperControl {

    _showNext = null;
    _showPrev = null;
    _count    = null;
    _attr     = null;


    /**
     * @param {string} id
     */
    constructor(id) {

        super('pages', id);
    }


    /**
     * @param {int} count
     * @return {HelperControlPages}
     */
    setCount(count) {

        this._count = count;
        return this;
    }


    /**
     * @param {boolean} show
     * @return {HelperControlPages}
     */
    setShowNext(show) {

        this._showNext = show;
        return this;
    }


    /**
     * @param {boolean} show
     * @return {HelperControlPages}
     */
    setShowPrev(show) {

        this._showPrev = show;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlPages}
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

        if (this._count)    { result.count    = this._count; }
        if (this._showNext) { result.showNext = this._showNext; }
        if (this._showPrev) { result.showPrev = this._showPrev; }
        if (this._attr)     { result.attr     = this._attr; }

        return result;
    }
}

export default HelperControlPages;