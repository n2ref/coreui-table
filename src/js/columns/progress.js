import coreuiTable      from "../coreui.table";
import coreuiTableUtils from "../coreui.table.utils";
import coreuiTableTpl   from "../coreui.table.templates";

coreuiTable.columns.progress = {

    _table: null,
    _options: {
        type: 'progress',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null,
        attr: {},

        showPercent: null,
        barColor: 'primary',
        barWidth: null,
        barHeight: null,
    },


    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function (table, options) {

        this._table   = table;
        this._options = $.extend(true, {}, this._options, options);
    },


    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function (isShow) {
        this._options.show = !! isShow;
    },


    /**
     * Видимости колонки
     */
    isShow: function () {
        return !! this._options.show;
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {
        return $.extend(true, {}, this._options);
    },


    /**
     * Формирование контента
     * @param {object|string|number} content
     * @param {object}              record
     * @returns {string}
     */
    render: function(content, record) {

        if (
            ( ! coreuiTableUtils.isNumeric(content)) &&
            (
                ! coreuiTableUtils.isObject(content) ||
                ! content.hasOwnProperty('percent') ||
                ! coreuiTableUtils.isNumeric(content.percent)
            )
        ) {
            return '';
        }

        let description = null;
        let percent     = 0;
        let percentText = '';
        let color       = typeof this._options.barColor === 'string' ? this._options.barColor : 'primary';
        let attr        = this._options.attr;

        attr = coreuiTableUtils.mergeAttr(attr, { class: 'progress' });

        if (this._options.barWidth) {
            let barWidth = coreuiTableUtils.isNumeric(this._options.barWidth)
                ? (this._options.barWidth + 'px')
                : this._options.barWidth;
            attr = coreuiTableUtils.mergeAttr(attr, { style: 'width:' + barWidth });
        }

        if (this._options.barHeight) {
            let barHeight = coreuiTableUtils.isNumeric(this._options.barHeight)
                ? (this._options.barHeight + 'px')
                : this._options.barHeight;
            attr = coreuiTableUtils.mergeAttr(attr, { style: 'height:' + barHeight });
        }


        if (coreuiTableUtils.isNumeric(content)) {
            if (content < 0 ) {
                percent = 0;

            } else if (content > 100 ) {
                percent = 100;

            } else {
                percent = content;
            }

            attr = coreuiTableUtils.mergeAttr(attr, { class: 'mt-1' });

        } else {
            if (content.percent < 0 ) {
                percent = 0;

            } else if (content.percent > 100 ) {
                percent = 100;

            } else {
                percent = content.percent;
            }


            if (content.hasOwnProperty('color') && typeof content.color === 'string') {
                color = content.color;
            }

            if (content.hasOwnProperty('description') &&
                typeof content.description === 'string' &&
                content.description !== ''
            ) {
                description = content.description;
            } else {
                attr = coreuiTableUtils.mergeAttr(attr, { class: 'mt-1' });
            }
        }

        if (this._options.showPercent) {
            percentText = percent + '%';
        }


        let attributes = [];

        $.each(attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attributes.push(name + '="' + value + '"');
            }
        });


        return ejs.render(coreuiTableTpl['columns/progress.html'], {
            description: description,
            percent: percent,
            percentText: percentText,
            color: color,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
        });
    }
}