
class HelperControlButtonGroupDropdown {

    _content  = null;
    _position = null;
    _attr     = null;
    _items    = [];


    /**
     * @param {string} content
     * @param {string} position
     */
    constructor(content, position) {

        if (content) {
            this._content = content;
        }
        if (position) {
            this._position = position;
        }
    }


    /**
     * @param {string} content
     * @return {HelperControlButtonGroupDropdown}
     */
    setContent(content) {
        this._content = content;
        return this;
    }


    /**
     * @param {string} position
     * @return {HelperControlButtonGroupDropdown}
     */
    setPosition(position) {
        this._position = position;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlButtonGroupDropdown}
     */
    setAttr(attr) {

        this._attr = $.extend(true, this._attr || {}, attr);
        return this;
    }


    /**
     * @param {string}   content
     * @param {function} onClick
     * @return {HelperControlButtonGroupDropdown}
     */
    addButton(content, onClick) {

        this._items.push({
            type: 'button',
            content: content,
            onClick: onClick,
        });

        return this;
    }


    /**
     * @param {string} content
     * @param {string} url
     * @return {HelperControlButtonGroupDropdown}
     */
    addLink(content, url) {

        this._items.push({
            type: 'link',
            content: content,
            url: url,
        });
        return this;
    }


    /**
     * @return {HelperControlButtonGroupDropdown}
     */
    addDivider() {

        this._items.push({
            type: 'divider',
        });
        return this;
    }


    /**
     * @return {Object}
     */
    toObject() {

        let result = {
            type: 'dropdown'
        }

        if (this._content)  { result.content = this._content; }
        if (this._position) { result.position = this._position; }
        if (this._attr)     { result.attr = this._attr; }
        if (this._items)    { result.items = this._items; }

        return result;
    }
}

export default HelperControlButtonGroupDropdown;