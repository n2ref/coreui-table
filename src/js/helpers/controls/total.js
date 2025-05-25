import HelperControl from "../control";


class HelperControlTotal extends HelperControl {

    _attr = null;


    /**
     * @param {string} id
     */
    constructor(id) {

        super('total', id);
    }


    /**
     * @param {Object} attr
     * @return {HelperControlTotal}
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

export default HelperControlTotal;