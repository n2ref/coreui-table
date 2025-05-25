import HelperColumn from "../column";


class HelperColumnImage extends HelperColumn {

    _style = null;
    _border = null;
    _imgWidth = null;
    _imgHeight = null;

    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('image');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }

        this.setSort(false);
    }


    /**
     * Установка стиля
     * @param {string} style
     * @return {HelperColumnImage}
     */
    setImgStyle(style) {

        this._style = style;
        return this;
    }


    /**
     * Установка наличия границ
     * @param {boolean} border
     * @return {HelperColumnImage}
     */
    setImgBorder(border) {

        this._border = !! border;
        return this;
    }


    /**
     * Установка ширины картинки
     * @param {int} width
     * @return {HelperColumnImage}
     */
    setImgWidth(width) {

        this._imgWidth = width;
        return this;
    }


    /**
     * Установка высоты картинки
     * @param {int} height
     * @return {HelperColumnImage}
     */
    setImgHeight(height) {

        this._imgHeight = height;
        return this;
    }


    /**
     * Установка ширины и высоты картинки
     * @param {int} width
     * @param {int} height
     * @return {HelperColumnImage}
     */
    setImgSize(width, height) {

        this._imgWidth  = width;
        this._imgHeight = height;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._style !== null)     { result.imgStyle  = this._style; }
        if (this._border !== null)    { result.imgBorder = this._border; }
        if (this._imgWidth !== null)  { result.imgWidth  = this._imgWidth; }
        if (this._imgHeight !== null) { result.imgHeight = this._imgHeight; }

        return result;
    }
}

export default HelperColumnImage;