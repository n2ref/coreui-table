import HelperControl from "../control";


class HelperControlPageSize extends HelperControl {

    _attr = null;
    _list = null;


    /**
     * @param {Array}  list
     * @param {string} id
     */
    constructor(list, id) {

        super('page_jump', id);

        if (list) {
            this.setList(list);
        }
    }


    /**
     * @param {Array} list
     * @return {HelperControlPageSize}
     */
    setList(list) {

        this._list = list;
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperControlPageSize}
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
        if (this._list) { result.list = this._list; }

        return result;
    }
}

export default HelperControlPageSize;