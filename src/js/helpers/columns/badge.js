import HelperColumn from "../column";


class HelperColumnBadge extends HelperColumn {

    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('badge');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }
}

export default HelperColumnBadge;