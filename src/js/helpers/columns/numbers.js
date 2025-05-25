import HelperColumn from "../column";


class HelperColumnNumbers extends HelperColumn {


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('numbers');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }

}

export default HelperColumnNumbers;