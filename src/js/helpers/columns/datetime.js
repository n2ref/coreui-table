import HelperColumn from "../column";


class HelperColumnDatetime extends HelperColumn {

    _format = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('datetime');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }


    /**
     * Установка формата даты YYYY, MM, M, DD, D, hh, mm, m, ss, s
     * @param {string} format
     * @return {HelperColumnDatetime}
     */
    setFormat(format) {

        this._format = format;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._format) { result.format = this._format; }

        return result;
    }
}

export default HelperColumnDatetime;