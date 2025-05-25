import HelperControl from "../control";


class HelperControlDivider extends HelperControl {

    _text  = null;
    _width = null;
    _attr  = null;


    /**
     * @param {int}    width
     * @param {string} id
     */
    constructor(width, id) {

        super('divider', id);

        if (width) {
            this.setWidth(width);
        }
    }


    /**
     * @param {int} width
     * @return {HelperControlDivider}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * @param {string} text
     * @return {HelperControlDivider}
     */
    setText(text) {

        this._text = text;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlDivider}
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


        if (this._width) { result.width = this._width; }
        if (this._text)  { result.text  = this._text; }
        if (this._attr)  { result.attr  = this._attr; }

        return result;
    }
}

export default HelperControlDivider;