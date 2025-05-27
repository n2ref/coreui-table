import HelperControl from "../control";


class HelperControlFilterClear extends HelperControl {

    _content = null;
    _attr    = { class: 'btn btn-secondary' };


    /**
     * @param {string} content
     * @param {string} id
     */
    constructor(content, id) {

        super('filterClear', id);

        if (content) {
            this.setContent(content);
        }
    }


    /**
     * @param {string} content
     * @return {HelperControlFilterClear}
     */
    setContent(content) {

        this._content = content;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlFilterClear}
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

export default HelperControlFilterClear;