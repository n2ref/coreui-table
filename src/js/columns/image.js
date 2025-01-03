import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";
import Column           from "../abstract/Column";

class ColumnsImage extends Column {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            type: 'image',
            field: null,
            label: null,
            show: true,
            width: null,
            minWidth: null,
            maxWidth: null,
            attr: {},
            imgWidth: null,
            imgHeight: null,
            imgBorder: null,
            imgStyle: null,
        }, options);

        super(table, options);

        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);
    }


    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render(content, record) {

        if (typeof content !== 'string' || content === '') {
            return '';
        }

        let attr = this._options.attr;

        attr.src = content;

        if (this._options.imgWidth) {
            let imgWidth = coreuiTableUtils.isNumeric(this._options.imgWidth)
                ? (this._options.imgWidth + 'px')
                : this._options.imgWidth;
            attr = coreuiTableUtils.mergeAttr(attr, { style: 'width:' + imgWidth });
        }

        if (this._options.imgHeight) {
            let imgHeight = coreuiTableUtils.isNumeric(this._options.imgHeight)
                ? (this._options.imgHeight + 'px')
                : this._options.imgHeight;
            attr = coreuiTableUtils.mergeAttr(attr, { style: 'height:' + imgHeight });
        }

        if (this._options.imgBorder) {
            attr = coreuiTableUtils.mergeAttr(attr, { class: 'border border-secondary-subtle' });
        }

        if (this._options.imgStyle && typeof this._options.imgStyle === 'string') {
            switch (this._options.imgStyle) {
                case 'circle':  attr = coreuiTableUtils.mergeAttr(attr, { class: 'rounded-circle' }); break;
                case 'thumb':   attr = coreuiTableUtils.mergeAttr(attr, { class: 'img-thumbnail' }); break;
                case 'rounded': attr = coreuiTableUtils.mergeAttr(attr, { class: 'rounded' }); break;
            }
        }


        let attributes = [];

        $.each(attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });

        return coreuiTableUtils.render(coreuiTableTpl['columns/image.html'], {
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}


export default ColumnsImage;