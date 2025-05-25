import HelperColumn from "../column";


class HelperColumnProgress extends HelperColumn {

    _barColor    = null;
    _showPercent = null;
    _barWidth    = null;
    _barHeight   = null;


    /**
     * @param {string} field
     * @param {string} label
     * @param {string} width
     */
    constructor(field, label, width) {

        super('progress');

        if (field) { this.setField(field); }
        if (label) { this.setLabel(label); }
        if (width) { this.setWidth(width); }
    }


    /**
     * Установка цвета
     * @param {string} color
     * @return {HelperColumnProgress}
     */
    setBarColor(color) {

        this._barColor = color;
        return this;
    }


    /**
     * Установка отображения процентов
     * @param {boolean} showPercent
     * @return {HelperColumnProgress}
     */
    setShowPercent(showPercent) {

        this._showPercent = showPercent;
        return this;
    }


    /**
     * Установка ширины бара
     * @param {string} width
     * @return {HelperColumnProgress}
     */
    setBarWidth(width) {

        this._barWidth = width;
        return this;
    }


    /**
     * Установка высоты бара
     * @param {string} height
     * @return {HelperColumnProgress}
     */
    setBarHeight(height) {

        this._barHeight = height;
        return this;
    }


    /**
     * Установка ширины и высоты бара
     * @param {string} width
     * @param {string} height
     * @return {HelperColumnProgress}
     */
    setBarSize(width, height) {

        this._barWidth  = width;
        this._barHeight = height;
        return this;
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {
        let result = super.toObject();

        if (this._showPercent !== null) { result.showPercent = this._showPercent; }
        if (this._barColor !== null)    { result.barColor    = this._barColor; }
        if (this._barWidth !== null)    { result.barWidth    = this._barWidth; }
        if (this._barHeight !== null)   { result.barHeight   = this._barHeight; }

        return result;
    }
}

export default HelperColumnProgress;