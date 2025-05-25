import HelperColumn from "../column";


class HelperColumnNumber extends HelperColumn {


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('number');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }

}

export default HelperColumnNumber;