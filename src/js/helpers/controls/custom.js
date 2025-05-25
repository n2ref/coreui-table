import HelperControl from "../control";


class HelperControlCustom extends HelperControl {

    _content = null;


    /**
     * @param {string} content
     * @param {string} id
     */
    constructor(content, id) {

        super('custom', id);

        if (content) {
            this.setContent(content);
        }
    }


    /**
     * @param {string} content
     * @return {HelperControlCustom}
     */
    setContent(content) {

        this._content = content;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._content) { result.content = this._content; }

        return result;
    }
}

export default HelperControlCustom;