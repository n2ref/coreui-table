import HelperControl from "../control";


class HelperControlSearch extends HelperControl {

    _button         = null;
    _buttonClear    = null;
    _buttonComplete = null;


    /**
     * @param {string} id
     */
    constructor(id) {

        super('search', id);
    }


    /**
     * @param {string} content
     * @param {Object} attr
     * @return {HelperControlSearch}
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
     * @return {HelperControlSearch}
     */
    setButtonClear(content, attr) {

        this._buttonClear = {
            content: content
        };

        if (attr) {
            this._buttonClear.attr = attr;
        }

        return this;
    }


    /**
     * @param {string} content
     * @param {Object} attr
     * @return {HelperControlSearch}
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
        if (this._buttonClear)    { result.btnClear    = this._buttonClear; }
        if (this._buttonComplete) { result.btnComplete = this._buttonComplete; }

        return result;
    }
}

export default HelperControlSearch;