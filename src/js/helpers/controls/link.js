import HelperControl from "../control";


class HelperControlLink extends HelperControl {

    _content = '';
    _url     = '';
    _onClick = null;
    _attr    = null;


    /**
     * @param content
     * @param url
     * @param id
     */
    constructor(content, url, id) {

        super('link', id);

        if (content) {
            this.setContent(content);
        }

        if (url) {
            this.setUrl(url);
        }
    }


    /**
     * @param {function} onClick
     * @return {HelperControlLink}
     */
    setOnClick(onClick) {
        this._onClick = onClick;
        return this;
    }


    /**
     * @param {string} content
     * @return {HelperControlLink}
     */
    setContent(content) {
        this._content = content;
        return this;
    }


    /**
     * @param {string} url
     * @return {HelperControlLink}
     */
    setUrl(url) {
        this._url = url;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlLink}
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
        if (this._url)     { result.url = this._url }
        if (this._onClick) { result.onClick = this._onClick }
        if (this._attr)    { result.attr = this._attr }

        return result;
    }
}

export default HelperControlLink;