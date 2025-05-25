import HelperControl from "../control";


class HelperControlButton extends HelperControl {

    _content = '';
    _onClick = null;
    _attr    = null;


    /**
     * @param content
     * @param id
     */
    constructor(content, id) {

        super('button', id);

        if (content) {
            this.setContent(content);
        }
    }


    /**
     * @param {function} onClick
     * @return {HelperControlButton}
     */
    setOnClick(onClick) {
        this._onClick = onClick;
        return this;
    }


    /**
     * @param {string} content
     * @return {HelperControlButton}
     */
    setContent(content) {
        this._content = content;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlButton}
     */
    setAttr(attr) {

        this._attr = $.extend(true, this._attr || {}, attr);
        return this;
    }


    /**
     * @return {Object}
     */
    toObject() {

        let result = super.toObject();

        if (this._content) { result.content = this._content }
        if (this._onClick) { result.onClick = this._onClick }
        if (this._attr)    { result.attr    = this._attr }

        return result;
    }
}

export default HelperControlButton;