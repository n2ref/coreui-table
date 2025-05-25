import HelperControl from "../control";


class HelperControlDropdown extends HelperControl {

    _content  = '';
    _items    = [];
    _attr     = null;


    /**
     * @param content
     * @param id
     */
    constructor(content, id) {

        super('dropdown', id);

        if (content) {
            this.setContent(content);
        }
    }


    /**
     * @param {string}   content
     * @param {function} onClick
     * @return {HelperControlDropdown}
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
     * @return {HelperControlDropdown}
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
     * @return {HelperControlDropdown}
     */
    addDivider() {

        this._items.push({
            type: 'divider',
        });
        return this;
    }


    /**
     * @param {string} content
     * @return {HelperControlDropdown}
     */
    setContent(content) {
        this._content = content;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlDropdown}
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
        if (this._items)   { result.items   = this._items }
        if (this._attr)    { result.attr    = this._attr }

        return result;
    }
}

export default HelperControlDropdown;