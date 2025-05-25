import HelperControl from "../control";


class HelperControlPageJump extends HelperControl {

    _attr = null;


    /**
     * @param {string} id
     */
    constructor(id) {

        super('page_jump', id);
    }


    /**
     * @param {Object} attr
     * @return {HelperControlPageJump}
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

        if (this._attr) { result.attr = this._attr; }

        return result;
    }
}

export default HelperControlPageJump;