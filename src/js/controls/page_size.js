
import TableTpl   from "../table.tpl";
import TableUtils from '../table.utils';
import Control          from "../abstract/Control";


class ControlPageSize extends Control {

    /**
     * Инициализация
     * @param {TableInstance} table
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

        if (options.hasOwnProperty('attr') && TableUtils.isObject(options.attr)) {
            options.attr = TableUtils.mergeAttr(optionsOriginal.attr, options.attr);
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
     * @returns {jQuery}
     */
    render() {

        let attributes = [];
        let table      = this._table;

        if (TableUtils.isObject(this._options.attr)) {
            $.each(this._options.attr, function (name, value) {
                if (['string', 'number'].indexOf(typeof value) >= 0) {
                    attributes.push(name + '="' + value + '"');
                }
            });
        }

        let control = $(TableUtils.render(TableTpl['controls/page-size.html'], {
            recordsPerPageList: this._options.list,
            recordsPerPage: table._recordsPerPage,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : '',
            lang: table.getLang(),
        }));

        control.change(function () {
            table._page = 1;
            table.setPageSize(Number(control.val()));
            table.reload();
        });

        table.on('page_size_update', function () {
            control.val(table._recordsPerPage);
        });

        return control;
    }
}

export default ControlPageSize;