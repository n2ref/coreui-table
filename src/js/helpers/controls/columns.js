import HelperControl from "../control";


class HelperControlColumns extends HelperControl {

    _button         = null;
    _buttonComplete = null;


    /**
     * @param {string} id
     */
    constructor(id) {

        super('columns', id);
    }


    /**
     * @param {string} content
     * @param {Object} attr
     * @return {HelperControlColumns}
     */
    setBtn(content, attr) {

        this._button = {
            content: content
        };

        if (attr) {
            this._button.attr = attr;
        }

        return this;
    }


    /**
     * @param {string} content
     * @param {Object} attr
     * @return {HelperControlColumns}
     */
    setButtonComplete(content, attr) {

        this._buttonComplete = {
            content: content
        };

        if (attr) {
            this._buttonComplete.attr = attr;
        }

        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {

        let result = super.toObject();

        if (this._button)         { result.btn         = this._button; }
        if (this._buttonComplete) { result.btnComplete = this._buttonComplete; }

        return result;
    }
}

export default HelperControlColumns;