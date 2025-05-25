import HelperColumn from "../column";


class HelperColumnMoney extends HelperColumn {

    _currency = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('money');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }


    /**
     * @param {string} currency
     * @return {HelperColumnMoney}
     */
    setNoWrapToggle(currency) {

        this._currency = currency;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._currency) { result.currency = this._currency; }

        return result;
    }
}

export default HelperColumnMoney;