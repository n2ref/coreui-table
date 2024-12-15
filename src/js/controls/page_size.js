
import coreuiTableTpl   from "../coreui.table.templates";
import coreuiTableUtils from '../coreui.table.utils';
import Control          from "../abstract/Control";


class ControlPageSize extends Control {

    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    constructor(table, options) {

        let optionsOriginal = {
            id: null,
            type: 'page_size',
            attr: {
                class: 'form-select'
            },
            list: [ 25, 50, 100, 1000 ]
        };

        if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
            options.attr = coreuiTableUtils.mergeAttr(optionsOriginal.attr, options.attr);
        }

        options = $.extend(true, optionsOriginal, options);

        super(table, options);


        if ( ! Array.isArray(this._options.list)) {
            this._options.list = [];
        }

        if (this._options.list.indexOf(this._table._recordsPerPage) < 0) {
            this._options.list.unshift(this._table._recordsPerPage);
        }
    }


    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render() {

        let attributes = [];
        let table      = this._table;

        if (coreuiTableUtils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let control = coreuiTableUtils.render(coreuiTableTpl['controls/page-size.html'], {
            recordsPerPageList: this._options.list,
            recordsPerPage: table._recordsPerPage,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: table.getLang(),
        });

        let selectPageSize = $('select', control);

        selectPageSize.change(function () {
            table._page = 1;
            table.setPageSize(Number(selectPageSize.val()));
            table.reload();
        });

        table.on('page_size_update', function () {
            selectPageSize.val(table._recordsPerPage);
        });

        return control;
    }
}

export default ControlPageSize;