import HelperColumn from "../column";


class HelperColumnButton extends HelperColumn {

    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('button');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }

        this.setSort(false);
    }
}

export default HelperColumnButton;