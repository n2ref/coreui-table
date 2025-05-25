
import Tpl   from "../tpl";
import Utils from "../utils";
import Control          from "../abstract/Control";


class ControlFilterClear extends Control {

    /**
     * Инициализация
     * @param {Table} table
     * @param {Object}              options
     */
    constructor(table, options) {

        options = $.extend(true, {
            id: null,
            type: 'filter_clear',
            content: null,
            attr: {
                class: 'btn btn-secondary'
            },
        }, options);

        super(table, options);

        if ( ! this._options.hasOwnProperty('content') ||
            typeof this._options.content !== 'string'
        ) {
            this._options.content = '<i class="bi bi-x"></i> ' + table.getLang().clear
        }
    }


    /**
     * Формирование контента
     * @returns {string}
     */
    render() {

        let options = this.getOptions();
        let table   = this._table;

        if ( ! Utils.isObject(options.attr)) {
            options.attr = {};
        }

        if (options.attr.hasOwnProperty('type')) {
            delete options.attr.type;
        }

        let filterData = table.getFilterData();

        if (filterData.length === 0) {
            if (options.attr.hasOwnProperty('style') && typeof options.attr.style === 'string') {
                options.attr.style += ';display:none;'
            } else {
                options.attr.style = "display:none"
            }
        }

        let attr = [];

        $.each(options.attr, function (name, value) {
            if (['string', 'number'].indexOf(typeof value) >= 0) {
                attr.push(name + '="' + value + '"');
            }
        });


        let button = $(Utils.render(Tpl['controls/filter_clear.html'], {
            attr: attr.length > 0 ? (' ' + attr.join(' ')) : '',
            content: options.content ? options.content : '',
        }));


        button.click(function () {
            table.clearFilters();
        });


        table.on('filters_change', function (filterData) {
            if (filterData.length > 0) {
                button.show();
            } else {
                button.hide();
            }
        });

        return button;
    }
}

export default ControlFilterClear;