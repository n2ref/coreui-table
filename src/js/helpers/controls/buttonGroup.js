import HelperControl                    from "../control";
import HelperControlButtonGroupDropdown from "./buttonGroup/dropdown";


class HelperControlButtonGroup extends HelperControl {

    _content = '';
    _items   = [];
    _attr    = null;


    /**
     * @param id
     */
    constructor(id) {

        super('buttonGroup', id);
    }


    /**
     * @param {string}   content
     * @param {function} onClick
     * @param {Object}   attr
     * @return {HelperControlButtonGroup}
     */
    addButton(content, onClick, attr) {

        this._items.push({
            type: 'button',
            content: content,
            onClick: onClick,
            attr: attr,
        });

        return this;
    }


    /**
     * @param {string} content
     * @param {string} url
     * @param {Object} attr
     * @return {HelperControlButtonGroup}
     */
    addLink(content, url, attr) {

        this._items.push({
            type: 'link',
            content: content,
            url: url,
            attr: attr,
        });
        return this;
    }


    /**
     * @param {string} content
     * @param {string} position
     * @return {HelperControlButtonGroupDropdown}
     */
    addDropdown(content, position) {

        let dropdown = new HelperControlButtonGroupDropdown(content, position);

        this._items.push(dropdown);

        return dropdown;
    }


    /**
     * @param {string} content
     * @return {HelperControlButtonGroup}
     */
    setContent(content) {
        this._content = content;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlButtonGroup}
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
        if (this.attr)     { result.attr    = this._attr }

        if (this._items)   {
            result.items = [];

            this._items.map(function (item) {
                if (item instanceof HelperControlButtonGroupDropdown) {
                    result.items.push(item.toObject());
                } else {
                    result.items.push(item);
                }
            })
        }

        return result;
    }
}

export default HelperControlButtonGroup;