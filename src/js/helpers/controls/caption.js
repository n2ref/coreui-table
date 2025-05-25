import HelperControl from "../control";


class HelperControlCaption extends HelperControl {

    _title  = null;
    _description = null;
    _value  = null;


    /**
     * @param {string} title
     * @param {string} value
     * @param {string} id
     */
    constructor(title, value, id) {

        super('caption', id);

        if (title) {
            this.setTitle(title);
        }

        if (value) {
            this.setValue(value);
        }
    }


    /**
     * @param {string} title
     * @return {HelperControlCaption}
     */
    setTitle(title) {

        this._title = title;
        return this;
    }


    /**
     * @param {string} value
     * @return {HelperControlCaption}
     */
    setValue(value) {

        this._value = value;
        return this;
    }


    /**
     * @param {string} text
     * @return {HelperControlCaption}
     */
    setDescription(text) {

        this._description = text;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._title)       { result.title = this._title; }
        if (this._description) { result.description  = this._description; }
        if (this._value)       { result.value  = this._value; }

        return result;
    }
}

export default HelperControlCaption;