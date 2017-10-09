
/**
 *
 * @param options
 * @constructor
 */
function CoreUITable(options) {
    if ( ! options instanceof Object) {
        throw new Error('Указанные данные не являются объектом');
    }

    if (options.type === undefined) {
        throw new Error('Не удалось распознать тип указанных данных');
    }

    if (options.type !== 'table') {
        throw new Error('Некорректный тип указанных данных');
    }

    if (options.name === undefined || options.name.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') === '') {
        throw new Error('Не указан идентификатор панели');
    }

    if (options.view === undefined) {
        options.view = 'default';
    }

    var defaultOptions = {
        name: null,
        type: null,
        url: null,
        method: 'GET',
        show : {
            toolbar: true,
            footer: true,
            approximateQuantity: false,
            lineNumbers: true,
            rowSelect: true,
            columnManagement: false,
            refresh: false,
            exportData: false,
            fastSearch: false
        },
        locutions: {
            ru: {
                search: 'Поиск',
                cancel: 'Отмена',
                apply: 'Применить',
                add: 'Добавить',
                remove: 'Удалить',
                of: 'из',
                all: 'все',
                refresh: 'Обновить',
                columnManagement: 'Управление колонками',
                exportData: 'Экспорт',
                any: 'Любой',
                empty: 'Нет данных',
                dateMask: 'дд.мм.гггг',
                from: 'от',
                to: 'до'
            },
            en: {
                search: 'Search',
                cancel: 'Cancel',
                apply: 'Apply',
                add: 'Add',
                remove: 'Remove',
                of: 'of',
                all: 'all',
                refresh: 'Refresh',
                columnManagement: 'Column management',
                exportData: 'Export',
                any: 'Any',
                empty: 'No data',
                dateMask: 'dd.mm.yyyy',
                from: 'from',
                to: 'to'
            }
        },
        lang: 'ru',
        addUrl: null,
        deleteUrl: null,
        editUrl: null,
        buttons: [],
        buttonsExtra: [],
        columnGroups: [],
        columns: [],
        searches: [],
        onAdd: function (event) {

        },
        onClick: function (event) {

        },
        onDelete: function (event) {

        },
        sortData: {},
        recordsPerPage: 25,
        page: 1,
        recordsTotal: null,
        reorderRows: false,
        primaryKey: 'id',
        records: []
    };

    this._name           = options.name;
    this._events         = [];
    this._options        = Object.assign(defaultOptions, options);
    this._page           = this._options.page > 0 ? this._options.page : 1;
    this._recordsPerPage = this._options.recordsPerPage > 0 ? this._options.recordsPerPage : 25;


    this._options.show.searchCancel = false;

    if (this._options.searches.length > 0) {
        outerLoop:
        for (var i = 0; i < this._options.searches.length; i++) {
            switch (this._options.searches[i].type) {
                case 'numeric':
                case 'date':
                    if ( !! this._options.searches[i].valueFrom || !! this._options.searches[i].valueTo) {
                        this._options.show.searchCancel = true;
                        break outerLoop;
                    }
                    break;

                case 'checkbox':
                case 'radio':
                    if ( !! this._options.searches[i].checked) {
                        this._options.show.searchCancel = true;
                        break outerLoop;
                    }
                    break;

                case 'select':
                    if ( !! this._options.searches[i].selected) {
                        this._options.show.searchCancel = true;
                        break outerLoop;
                    }
                    break;

                case 'text':
                default:
                    if ( !! this._options.searches[i].value) {
                        this._options.show.searchCancel = true;
                        break outerLoop;
                    }
                    break;
            }
        }
    }

    CoreUITable._instances[this._name] = this;
}
CoreUITable._instances     = [];
CoreUITable._events_global = [];


/**
 * @param name
 * @returns {CoreUITable}
 */
CoreUITable.get = function(name) {
    if (CoreUITable._instances[name] === undefined) {
        throw new Error('Таблица с указаным именем не найдена');
    }

    return CoreUITable._instances[name];
};



/**
 * @param name
 */
CoreUITable.lock = function(name) {
    var table = CoreUITable.get(name);

    var tableContainer = document.getElementById('coreui-table-' + table._name);
    var progressContainer = tableContainer.getElementsByClassName('coreui-table-progress');
    progressContainer[0].getElementsByClassName('progress')[0].style.display = 'block';
};


/**
 * @param name
 */
CoreUITable.ulnlock = function(name) {
    var table = CoreUITable.get(name);

    var tableContainer    = document.getElementById('coreui-table-' + table._name);
    var progressContainer = tableContainer.getElementsByClassName('coreui-table-progress');
    progressContainer[0].getElementsByClassName('progress')[0].style.display = 'none';
};


/**
 * @param name
 * @returns {CoreUITable}
 */
CoreUITable.refresh = function(name) {
    var table = CoreUITable.get(name);

};


/**
 * @param tableName
 * @param elementClass
 */
CoreUITable.fadeToggle = function(tableName, elementClass) {

    var tableContainer = document.getElementById('coreui-table-' + tableName);
    var elements       = tableContainer.getElementsByClassName(elementClass);

    if (elements[0]) {
        var element = elements[0];
        var timer   = null;
        var op      = null;


        if (element.offsetWidth <= 0 || element.offsetHeight <= 0) {
            op = 0;
            element.style.opacity = 0;
            element.style.display = null;

            timer = setInterval(function () {
                if (op >= 1) {
                    element.style.opacity = null;
                    clearInterval(timer);
                } else {
                    element.style.opacity = op;
                    op += .1;
                }
            }, 15);

        } else {
            op = 1;
            element.style.opacity = 1;

            timer = setInterval(function () {
                if (op <= 0) {
                    element.style.display = 'none';
                    element.style.opacity = null;
                    clearInterval(timer);
                } else {
                    element.style.opacity = op;
                    op -= .1;
                }
            }, 15);
        }
    }
};


/**
 * @param tableName
 * @param id
 */
CoreUITable.searchToggle = function(tableName) {

    var tableContainer   = document.getElementById('coreui-table-' + tableName);
    var columnsContainer = tableContainer.querySelectorAll('.coreui-table-columns');

    if (columnsContainer[0].offsetWidth > 0 && columnsContainer[0].offsetHeight > 0) {
        columnsContainer[0].style.display = 'none';
    }

    CoreUITable.fadeToggle(tableName, 'coreui-table-search');
};


/**
 * @param tableName
 * @param id
 */
CoreUITable.columnsToggle = function(tableName) {

    var tableContainer  = document.getElementById('coreui-table-' + tableName);
    var searchContainer = tableContainer.querySelectorAll('.coreui-table-search');

    if (searchContainer[0].offsetWidth > 0 && searchContainer[0].offsetHeight > 0) {
        searchContainer[0].style.display = 'none';
    }

    CoreUITable.fadeToggle(tableName, 'coreui-table-columns');
};


/**
 * @param tableName
 * @param id
 */
CoreUITable.searchCancel = function(tableName) {

    // var tableContainer  = document.getElementById('coreui-table-' + tableName);
    // var searchContainer = tableContainer.querySelectorAll('.coreui-table-search');
    //
    // if (searchContainer[0].offsetWidth > 0 && searchContainer[0].offsetHeight > 0) {
    //     searchContainer[0].style.display = 'none';
    // }
    //
    // CoreUITable.fadeToggle(tableName, 'coreui-table-columns');
};


/**
 * @param tableName
 * @param id
 */
CoreUITable.refocusInputs = function(tableName) {

    var tableContainer   = document.getElementById('coreui-table-' + tableName);
    var controlContainer = tableContainer.querySelectorAll('.coreui-table-form-group.coreui-table-control-text, .coreui-table-form-group.coreui-table-control-date');

    if (controlContainer.length > 0) {
        for (var i = 0; i < controlContainer.length; i++) {
            var isUsed   = false;
            var controls = controlContainer[i].querySelectorAll('.coreui-table-form-control');

            if (controls.length > 0) {
                for (var j = 0; j < controls.length; j++) {
                    if (controls[0] && controls[0].value) {
                        isUsed = true;
                        break;
                    }
                }
            }

            if (isUsed) {
                controlContainer[i].classList.add('coreui-used');
            } else {
                controlContainer[i].classList.remove('coreui-used');
            }
        }
    }

    // min max limit value
    var controlLimitContainer = tableContainer.querySelectorAll('.coreui-table-form-group.coreui-table-control-date, .coreui-table-form-group.coreui-table-control-number');
    if (controlLimitContainer.length > 0) {
        for (var i = 0; i < controlLimitContainer.length; i++) {
            var dateFrom = controlLimitContainer[i].querySelectorAll('.coreui-table-control-from');
            var dateTo   = controlLimitContainer[i].querySelectorAll('.coreui-table-control-to');

            if (dateFrom[0] && dateTo[0]) {
                if (dateFrom[0].value) {
                    dateTo[0].setAttribute('min', dateFrom[0].value);
                }
                if (dateTo[0].value) {
                    dateFrom[0].setAttribute('max', dateTo[0].value);
                }
            }
        }
    }
};


/**
 * @param tableName
 * @param id
 */
CoreUITable.rowState = function (tableName, id) {
    var table = CoreUITable.get(tableName);

    var tableContainer = document.getElementById('coreui-table-' + table._name);
    var row            = tableContainer.querySelectorAll('.coreui-table-row[data-id="' + id + '"]');

    if (row[0]) {
        var check = row[0].querySelectorAll('.coreui-table-check input[type=checkbox]');
        if (check[0]) {
            if (check[0].checked) {
                if ( ! row[0].classList.contains("checked")) {
                    row[0].classList.add("checked")
                }
            } else {
                if (row[0].classList.contains("checked")) {
                    row[0].classList.remove("checked")
                }
            }
        }
    }
};



/**
 * @param tableName
 * @param id
 */
CoreUITable.rowsToggle = function (tableName) {
    var table = CoreUITable.get(tableName);

    var tableContainer = document.getElementById('coreui-table-' + table._name);
    var checkedAll     = tableContainer.querySelectorAll('.coreui-table-check-all input[type=checkbox]');

    if (checkedAll[0]) {
        var rows = tableContainer.querySelectorAll('.coreui-table-row');
        if (rows[0]) {
            for (var i = 0; i < rows.length; i++) {
                var check = rows[i].querySelectorAll('.coreui-table-check input[type=checkbox]');

                if (check[0]) {
                    if (checkedAll[0].checked) {
                        check[0].checked = true;
                        if ( ! rows[i].classList.contains("checked")) {
                            rows[i].classList.add("checked")
                        }
                    } else {
                        check[0].checked = false;
                        if (rows[i].classList.contains("checked")) {
                            rows[i].classList.remove("checked")
                        }
                    }
                }
            }
        }
    }
};


/**
 *
 * @param element
 */
CoreUITable.initEvents = function (element) {

    if ( ! element) {
        element = document;
    }

    var panel_tabs = element.getElementsByClassName('coreui-panel-tabs');
    if (panel_tabs.length > 0) {
        for (var i = 0; i < panel_tabs.length; i++) {
            var links              = panel_tabs[i].getElementsByTagName('a');
            var dropdown_toggles   = panel_tabs[i].getElementsByClassName('dropdown-toggle');

            if (links.length > 0) {
                for (var l = 0; l < links.length; l++) {
                    if ( ! links[l].parentNode.classList.contains('disabled') &&
                         ! links[l].classList.contains('dropdown-toggle')
                    ) {
                        // Click listener
                        links[l].addEventListener('click', function (event) {
                            var tab_id    = this.parentNode.dataset.id;
                            var panelName = '';
                            if (this.parentNode.parentNode.classList.contains('dropdown-menu')) {
                                panelName = this.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.name;
                                this.parentNode.parentNode.parentNode.classList.remove('open');
                            } else {
                                panelName = this.parentNode.parentNode.parentNode.dataset.name;
                            }
                            CoreUITable.get(panelName).activeTab(tab_id, this, event);
                        }, false);
                    }
                }
            }

            if (dropdown_toggles.length > 0) {
                for (var j = 0; j < dropdown_toggles.length; j++) {
                    dropdown_toggles[j].addEventListener('click', function () {
                        this.parentNode.classList.toggle('open');
                    }, false);
                }
            }
        }
    }
};


/**
 *
 * @param eventName
 * @param callback
 */
CoreUITable.onGlobal = function(eventName, callback) {
    if (typeof CoreUITable._events_global[eventName] !== 'object') {
        CoreUITable._events_global[eventName] = [];
    }
    CoreUITable._events_global[eventName].push(callback);
};


/**
 * @param name
 * @param page
 */
CoreUITable.nextPage = function(name) {
    var table = CoreUITable.get(name);

    table.loadPage(table._page + 1);
};


/**
 * @param name
 * @param page
 */
CoreUITable.prevPage = function(name) {
    var table = CoreUITable.get(name);

    if (table._page >= 2) {
        table.loadPage(table._page - 1)
    }
};


/**
 * @param name
 * @param recordsPerPage
 */
CoreUITable.changeRecordsPerPage = function(name, recordsPerPage) {
    var table = CoreUITable.get(name);

    table._recordsPerPage = recordsPerPage;
    table.loadPage(1);
};


/**
 * Смена статуса
 * @param name
 * @param field
 * @param id
 */
CoreUITable.changeStatus = function(name, field, id) {
    var table = CoreUITable.get(name);

    var toggleCheckbox = document.getElementById('toggle-' + table._name + '-' + field + '-' + id);

    if (toggleCheckbox) {

        console.log(toggleCheckbox.checked)

        if (toggleCheckbox.checked) {
        }
    }
};


/**
 *
 * @param name
 * @param context
 * @param params
 */
CoreUITable.callGlobalEvents = function(name, context, params) {
    if (CoreUITable._events_global[name] instanceof Object && CoreUITable._events_global[name].length > 0) {
        for (var j = 0; j < CoreUITable._events_global[name].length; j++) {
            CoreUITable._events_global[name][j].apply(context, params);
        }
    }
};


/**
 * @param page
 */
CoreUITable.prototype.loadPage = function(page) {

    this._page = page;

    var tableContainer = document.getElementById('coreui-table-' + this._name);
    var recordsFrom    = tableContainer.querySelectorAll('.coreui-records-from');
    var recordsTo      = tableContainer.querySelectorAll('.coreui-records-to');

    if (recordsFrom[0]) {
        recordsFrom[0].textContent = this._recordsPerPage > 0 ? this._recordsPerPage * (this._page - 1) + 1 : 1;
    }
    if (recordsTo[0]) {
        recordsTo[0].textContent = this._recordsPerPage > 0 ? this._recordsPerPage * this._page : this._options.recordsTotal;
    }

    var tbody = tableContainer.querySelectorAll('.coreui-table > tbody');
    if (tbody[0]) {
        tbody[0].innerHTML = this._renderData();
    }
};


/**
 *
 * @param element
 */
CoreUITable.prototype.render = function(element) {

    var tpl = '<div id="coreui-table-<%= name %>" class="coreui-table-wrapper">' +
                   '<table class="coreui-table">' +
                       '<thead>' +
                           '<tr class="coreui-table-service">' +
                               '<td colspan="100">' +
                                   '<div class="coreui-pull-left">' +
                                       // Детальный поиск
                                       '<% if (searches.length > 0) { %>' +
                                           '<span href="javascript:void(0);" class="coreui-btn coreui-btn-default"' +
                                                 'onclick="CoreUITable.searchToggle(\'<%= name %>\')"><%= locutions[lang].search %></span>' +
                                           '<% if (show.searchCancel) { %>' +
                                               ' <span href="javascript:void(0);" class="coreui-btn coreui-btn-default"' +
                                                      'onclick="CoreUITable.searchCancel(\'<%= name %>\')"><%= locutions[lang].cancel %></span>' +
                                           '<% } %>' +
                                       // Быстрый поиск
                                       '<% } else if (show.fastSearch) { %>' +
                                           '<div class="coreui-fast-search">' +
                                               '<div class="coreui-addon"><i class="fa fa-search"></i></div>' +
                                               '<input type="text" placeholder="<%= locutions[lang].search %>">' +
                                           '</div>' +
                                       '<% } %>' +
                                   '</div>' +
                                   '<div class="coreui-pull-right">' +
                                       // Кнопки
                                       '<% if (buttons.length > 0) { %>' +
                                           '<% for (var i = 0; i < buttons.length; i++) { %>' +
                                               '<% if (buttons[i].type == "link") { %>' +
                                                   '<a href="<%= buttons[i].href %>" class="coreui-btn coreui-btn-default"><%= buttons[i].text %></a>' +
                                               '<% } else if (buttons[i].type == "html") { %><%- buttons[i].html %><% } %>' +
                                           '<% } %>' +
                                       '<% } %>' +
                                       // Добавление
                                       '<% if (addUrl) { %>' +
                                           '<a href="<%= addUrl %>" class="coreui-btn coreui-btn-success"><%= locutions[lang].add %></a>' +
                                       // Удаление
                                       '<% } if (deleteUrl) { %>' +
                                           '<a href="<%= deleteUrl %>" class="coreui-btn coreui-btn-warning"><%= locutions[lang].remove %></a>' +
                                       '<% } %>' +
                                       // Дополнительные кнопки
                                       '<% if (show.refresh || show.columnManagement || show.exportData || buttonsExtra.length > 0) { %>' +
                                           '<div class="coreui-table-dropdown">' +
                                               '<span class="coreui-btn coreui-btn-default coreui-btn-lg"' +
                                                  'onclick="CoreUITable.fadeToggle(\'<%= name %>\', \'coreui-table-dropdown-menu\')"><i class="coreui-table-more-vertical"></i></span>' +
                                               '<ul class="coreui-table-dropdown-menu" style="display:none">' +
                                                   '<% if (show.refresh) { %>' +
                                                       '<li><a href="javascript:void(0);" onclick="CoreUITable.fadeToggle(\'<%= name %>\', \'progress\')"><%= locutions[lang].refresh %></a></li>' +
                                                   '<% } if (show.columnManagement) { %>' +
                                                       '<li><a href="javascript:void(0);" onclick="CoreUITable.columnsToggle(\'<%= name %>\')"><%= locutions[lang].columnManagement %></a></li>' +
                                                   '<% } if (show.exportData) { %>' +
                                                       '<li><a href="javascript:void(0);" onclick="CoreUITable.exportData(\'<%= name %>\')"><%= locutions[lang].exportData %></a></li>' +
                                                   '<% } if (buttonsExtra.length > 0) { %>' +
                                                       '<% for (var i = 0; i < buttonsExtra.length; i++) { %>' +
                                                           '<li><a href="<%= buttonsExtra[i].href %>"><%= buttonsExtra[i].text %></a></li>' +
                                                       '<% } %>' +
                                                   '<% } %>' +
                                               '</ul>' +
                                           '</div>' +
                                       '<% } %>' +
                                   '</div>' +
                               '</td>' +
                           '</tr>' +
                           // Панель поиска
                           '<% if (searches.length > 0) { %>' +
                               '<tr class="coreui-table-search" style="display: none">' +
                                   '<td colspan="100">' +
                                       '<form class="coreui-table-form" action="" method="post">' +
                                           '<% for (var i = 0; i < searches.length; i++) { %>' +
                                               '<% if ( ! searches[i].type || searches[i].type == "text") { %>' +
                                                   '<div class="coreui-table-form-group coreui-table-control-text<% if (searches[i].value) { %> coreui-used<% } %>">' +
                                                       '<input class="coreui-table-form-control" type="text" name="<%= searches[i].field %>"' +
                                                              ' onblur="CoreUITable.refocusInputs(\'<%= name %>\')"' +
                                                              '<% if (searches[i].placeholder) { %> placeholder="<%= searches[i].placeholder %>"<% } %>' +
                                                              '<% if (searches[i].value) { %> value="<%= searches[i].value %>"<% } %>>' +
                                                       '<label class="coreui-control-label"><%= searches[i].caption %></label>' +
                                                   '</div>' +
                                               '<% } else if (searches[i].type == "date") { %>' +
                                                   '<div class="coreui-table-form-group coreui-table-control-date coreui-normal-control<% if (searches[i].valueFrom || searches[i].valueTo) { %> coreui-used<% } %>">' +
                                                       '<label class="coreui-control-label"><%= searches[i].caption %></label>' +
                                                       '<div class="coreui-table-control-date">' +
                                                           '<input class="coreui-table-form-control coreui-table-control-from coreui-pull-left" type="date" name="<%= searches[i].field %>[0]"' +
                                                                  ' onblur="CoreUITable.refocusInputs(\'<%= name %>\')"' +
                                                                  '<% if (searches[i].dateMask) { %> placeholder="<%= locutions[lang].dateMask %>"<% } %>' +
                                                                  '<% if (searches[i].min) { %> min="<%= searches[i].min %>"<% } %>' +
                                                                  '<% if (searches[i].max) { %> max="<%= searches[i].max %>"<% } %>' +
                                                                  '<% if (searches[i].pattern) { %> pattern="<%= searches[i].pattern %>"<% } %>' +
                                                                  '<% if (searches[i].valueFrom) { %> value="<%= searches[i].valueFrom %>"<% } %>>' +
                                                           '<input class="coreui-table-form-control coreui-table-control-to coreui-pull-right" type="date" name="<%= searches[i].field %>[1]"' +
                                                                  ' onblur="CoreUITable.refocusInputs(\'<%= name %>\')"' +
                                                                  '<% if (searches[i].dateMask) { %> placeholder="<%= locutions[lang].dateMask %>"<% } %>' +
                                                                  '<% if (searches[i].min) { %> min="<%= searches[i].min %>"<% } %>' +
                                                                  '<% if (searches[i].max) { %> max="<%= searches[i].max %>"<% } %>' +
                                                                  '<% if (searches[i].pattern) { %> pattern="<%= searches[i].pattern %>"<% } %>' +
                                                                  '<% if (searches[i].valueTo) { %> value="<%= searches[i].valueTo %>"<% } %>>' +
                                                       '</div>' +
                                                   '</div>' +
                                               '<% } else if (searches[i].type == "number") { %>' +
                                                   '<div class="coreui-table-form-group coreui-table-control-number coreui-normal-control">' +
                                                       '<label class="coreui-control-label"><%= searches[i].caption %></label>' +
                                                       '<div class="coreui-table-control-number">' +
                                                           '<input class="coreui-table-form-control coreui-table-control-from coreui-pull-left" type="number" name="<%= searches[i].field %>[0]" ' +
                                                                  'placeholder="<%= locutions[lang].from %>" ' +
                                                                  'onblur="CoreUITable.refocusInputs(\'<%= name %>\')"' +
                                                                  '<% if (searches[i].min) { %> min="<%= searches[i].min %>"<% } %>' +
                                                                  '<% if (searches[i].max) { %> max="<%= searches[i].max %>"<% } %>' +
                                                                  '<% if (searches[i].valueFrom) { %> value="<%= searches[i].valueFrom %>"<% } %>>' +
                                                           '<input class="coreui-table-form-control coreui-table-control-to coreui-pull-right" type="number" name="<%= searches[i].field %>[1]"' +
                                                                  'placeholder="<%= locutions[lang].to %>" ' +
                                                                  'onblur="CoreUITable.refocusInputs(\'<%= name %>\')"' +
                                                                  '<% if (searches[i].min) { %> min="<%= searches[i].min %>"<% } %>' +
                                                                  '<% if (searches[i].max) { %> max="<%= searches[i].max %>"<% } %>' +
                                                                  '<% if (searches[i].valueTo) { %> value="<%= searches[i].valueTo %>"<% } %>>' +
                                                       '</div>' +
                                                   '</div>' +
                                               '<% } else if (searches[i].type == "checkbox") { %>' +
                                                   '<% if (Object.keys(searches[i].options).length > 0) { %>' +
                                                       '<div class="coreui-table-form-group coreui-table-control-checkbox coreui-normal-control">' +
                                                           '<label class="coreui-control-label"><%= searches[i].caption %></label>' +
                                                           '<% for (var checkboxOption in searches[i].options) { if (searches[i].options.hasOwnProperty(checkboxOption)) { %>' +
                                                               '<div class="coreui-table-checkbox"><label>' +
                                                                    '<input type="checkbox" name="<%= searches[i].field %>[]" ' +
                                                                           'value="<%= checkboxOption %>"' +
                                                                           '<% if (searches[i].checked == checkboxOption) { %> checked="checked"<% } %>> ' +
                                                                    '<%= searches[i].options[checkboxOption] %>' +
                                                               '</label></div>' +
                                                           '<% }} %>' +
                                                       '</div>' +
                                                   '<% } %>' +
                                               '<% } else if (searches[i].type == "radio") { %>' +
                                                   '<% if (Object.keys(searches[i].options).length > 0) { %>' +
                                                       '<div class="coreui-table-form-group coreui-table-control-radio coreui-normal-control">' +
                                                           '<label class="coreui-control-label"><%= searches[i].caption %></label>' +
                                                           '<div class="coreui-table-radio">' +
                                                               '<label><input type="radio" name="<%= searches[i].field %>[]" value="" checked="checked"> <%= locutions[lang].any %></label>' +
                                                           '</div>' +
                                                           '<% for (var radioOption in searches[i].options) { if (searches[i].options.hasOwnProperty(radioOption)) { %>' +
                                                                '<div class="coreui-table-radio"><label>' +
                                                                    '<input type="radio" name="<%= searches[i].field %>[]" ' +
                                                                           'value="<%= radioOption %>"' +
                                                                           '<% if (searches[i].checked == radioOption) { %> checked="checked"<% } %>> ' +
                                                                    '<%= searches[i].options[radioOption] %>' +
                                                                '</label></div>' +
                                                           '<% }} %>' +
                                                       '</div>' +
                                                   '<% } %>' +
                                               '<% } else if (searches[i].type == "select" && Object.keys(searches[i].options).length > 0) { %>' +
                                                   '<div class="coreui-table-form-group coreui-table-control-select coreui-normal-control">' +
                                                       '<label class="coreui-control-label"><%= searches[i].caption %></label>' +
                                                       '<div>' +
                                                           '<div class="coreui-select-container">' +
                                                               '<div class="coreui-select-arrow"></div>' +
                                                               '<select name="<%= searches[i].field %>">' +
                                                                   '<option value=""><%= locutions[lang].any %></option>' +
                                                                   '<% for (var selectOption in searches[i].options) { if (searches[i].options.hasOwnProperty(selectOption)) { %>' +
                                                                        '<option value="<%= selectOption %>"<% if (searches[i].selected == selectOption) { %> selected="selected"<% } %>>' +
                                                                            '<%= searches[i].options[selectOption] %>' +
                                                                        '</option>' +
                                                                   '<% }} %>' +
                                                               '</select>' +
                                                           '</div>' +
                                                       '</div>' +
                                                   '</div>' +
                                               '<% } %>' +
                                           '<% } %>' +
                                           '<div class="coreui-table-form-group">' +
                                               '<input type="submit" class="coreui-btn coreui-btn-primary" ' +
                                                      'value="<%= locutions[lang].search %>" onclick="return false;">' +
                                           '</div>' +
                                       '</form>' +
                                   '</td>' +
                               '</tr>' +
                           '<% } %>' +
                           // Выключение колонок
                           '<% if (show.columnManagement) { %>' +
                               '<tr class="coreui-table-columns" style="display: none">' +
                                   '<td colspan="100">' +
                                       '<div class="coreui-table-form-group coreui-normal-control">' +
                                           '<% if (columns.length > 0) { %>' +
                                               '<% for (var i = 0; i < columns.length; i++) { %>' +
                                                   '<% if (columns[i].type !== "status") { %>' +
                                                       '<div class="checkbox"><label>' +
                                                           '<input type="checkbox" onclick="console.log(1)" ' +
                                                               '<% if (columns[i].show === undefined || columns[i].show) { %>checked="checked"<% } %>' +
                                                               '> <%= columns[i].caption %>' +
                                                       '</label></div>' +
                                                   '<% } %>' +
                                               '<% } %>' +
                                           '<% } %>' +
                                       '</div>' +
                                       '<div class="coreui-table-form-group">' +
                                           '<input type="submit" class="coreui-btn coreui-btn-primary" ' +
                                                  'value="<%= locutions[lang].apply %>" onclick="return false;">' +
                                       '</div>' +
                                   '</td>' +
                               '</tr>' +
                           '<% } %>' +
                           '<tr class="coreui-table-header">' +
                               // Выбор колонок
                               '<% if (show.rowSelect) { %>' +
                                   '<th width="1%" class="coreui-table-check-all">' +
                                       '<input type="checkbox" onclick="CoreUITable.rowsToggle(\'<%= name %>\')">' +
                                   '</th>' +
                               '<% } %>' +
                               // Нумерация колонок
                               '<% if (show.lineNumbers) { %>' +
                                   '<th width="1%" class="coreui-table-num">#</th>' +
                               '<% } %>' +
                               // Названия колонок
                               '<% if (columns.length > 0) { %>' +
                                   '<% for (var i = 0; i < columns.length; i++) { %>' +
                                       '<% if (columns[i].show === undefined || columns[i].show) { %>' +
                                           '<th<% if (columns[i].size) { %> style="width:<%= columns[i].size %>"<% } %>"' +
                                               '<% if (columns[i].sortable) { %> class="sortable"<% } %>>' +
                                               '<span><%= columns[i].caption %></span>' +
                                           '</th>' +
                                       '<% } %>' +
                                   '<% } %>' +
                               '<% } %>' +
                           '</tr>' +
                           '<tr class="coreui-table-progress">' +
                               '<td colspan="100">' +
                                   '<div class="progress" style="display: none">' +
                                       '<div class="indeterminate"></div>' +
                                   '</div>' +
                               '</td>' +
                           '</tr>' +
                       '</thead>' +
                       '<tbody>' +
                       '<% if (records.length > 0 && columns.length > 0) { %>' +
                            '<%- content %>' +
                       '<% }  else { %>' +
                            '<tr class="coreui-table-empty"><td colspan="100">' +
                                '<i><%= locutions[lang].empty %></i>' +
                            '</td></tr>' +
                       '<% } %>' +
                       '</tbody>' +
                       '<% if (show.footer) { %>' +
                           '<tfoot>' +
                               '<tr><td colspan="100">' +
                                   '<div class="row">' +
                                       '<div class="col-xs-6">' +
                                           '<span class="coreui-btn coreui-btn-default coreui-btn-lg" onclick="CoreUITable.prevPage(\'<%= name %>\')"><i class="fa fa-chevron-left"></i></span>' +
                                           '<span class="coreui-btn coreui-btn-default coreui-btn-lg" onclick="CoreUITable.nextPage(\'<%= name %>\')"><i class="fa fa-chevron-right"></i></span> ' +
                                           '<span class="coreui-records-from"><%= (recordsPerPage * (page - 1)) + 1 %></span>-<span class="coreui-records-to"><%= recordsPerPage * page %></span> <%= locutions[lang].of %> <% if (show.approximateQuantity) { %>~<% } %><span class="coreui-records-total"><%= recordsTotal %></span>' +
                                       '</div>' +
                                       '<div class="col-xs-6">' +
                                           '<div class="coreui-select-container coreui-pull-right">' +
                                               '<div class="coreui-select-arrow"></div>' +
                                               '<select onchange="CoreUITable.changeRecordsPerPage(\'<%= name %>\', this.value)">' +
                                                   '<option value="<%= recordsPerPage %>"><%= recordsPerPage %></option>' +
                                                   '<option value="<%= recordsPerPage * 2 %>"><%= recordsPerPage * 2 %></option>' +
                                                   '<option value="<%= recordsPerPage * 4 %>"><%= recordsPerPage * 4 %></option>' +
                                                   '<option value="<%= recordsPerPage * 20 %>"><%= recordsPerPage * 20 %></option>' +
                                                   '<option value="0"><%= locutions[lang].all %></option>' +
                                               '</select>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                               '</td></tr>' +
                           '</tfoot>' +
                       '<% } %>' +
                   '</table>' +
               '</div>';


    var cloneOptions = Object.assign({}, this._options);
    cloneOptions.content = this._renderData();

    var html = this._templater(tpl, cloneOptions);

    if (element === undefined) {
        return html;
    }

    var domElement = {};

    if (typeof element === 'string') {
        domElement = document.getElementById(element);

        if ( ! domElement) {
            return '';
        }
    } else if (element instanceof HTMLElement) {
        domElement = element;
    }


    this.callEvents('show.coreui.panel', window, [this._name]);
    CoreUITable.callGlobalEvents('show.coreui.panel', window, [this._name]);

    domElement.innerHTML = html;

    this.callEvents('shown.coreui.panel', window, [this._name]);
    CoreUITable.callGlobalEvents('shown.coreui.panel', window, [this._name]);

    CoreUITable.initEvents(domElement);
};

/**
 *
 * @param eventName
 * @param callback
 */
CoreUITable.prototype.on = function(eventName, callback) {
    if (typeof this._events[eventName] !== 'object') {
        this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
};


/**
 *
 * @param name
 * @param context
 * @param params
 */
CoreUITable.prototype.callEvents = function(name, context, params) {
    if (this._events[name] instanceof Object && this._events[name].length > 0) {
        for (var i = 0; i < this._events[name].length; i++) {
            this._events[name][i].apply(context, params);
        }
    }
};


/**
 *
 * @param template
 * @param options
 */
CoreUITable.prototype._templater = function(template, options) {
    ejs=function(){function require(p){if("fs"==p)return{};if("path"==p)return{};var path=require.resolve(p),
    mod=require.modules[path];if(!mod)throw new Error('failed to require "'+p+'"');if(!mod.exports){mod.exports={};
    mod.call(mod.exports,mod,mod.exports,require.relative(path))}return mod.exports}require.modules={};
    require.resolve=function(path){var orig=path,reg=path+".js",index=path+"/index.js";return require.modules[reg]&&
    reg||require.modules[index]&&index||orig};require.register=function(path,fn){require.modules[path]=fn};
    require.relative=function(parent){return function(p){if("."!=p.substr(0,1))return require(p);
    var path=parent.split("/"),segs=p.split("/");path.pop();for(var i=0;i<segs.length;i++){var seg=segs[i];
    if(".."==seg)path.pop();else if("."!=seg)path.push(seg)}return require(path.join("/"))}};
    require.register("ejs.js",function(module,exports,require){var utils=require("./utils"),path=require("path"),
    dirname=path.dirname,extname=path.extname,join=path.join,fs=require("fs"),read=fs.readFileSync;
    var filters=exports.filters=require("./filters");var cache={};exports.clearCache=function(){cache={}};function
    filtered(js){return js.substr(1).split("|").reduce(function(js,filter){var parts=filter.split(":"),
    name=parts.shift(),args=parts.join(":")||"";if(args)args=", "+args;return"filters."+name+"("+js+args+")"})}
    function rethrow(err,str,filename,lineno){var lines=str.split("\n"),start=Math.max(lineno-3,0),
    end=Math.min(lines.length,lineno+3);var context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;
    return(curr==lineno?" >> ":"    ")+curr+"| "+line}).join("\n");err.path=filename;err.message=(filename||"ejs")+
    ":"+lineno+"\n"+context+"\n\n"+err.message;throw err}var parse=exports.parse=function(str,options){
    var options=options||{},open=options.open||exports.open||"<%",close=options.close||exports.close||"%>",filename=
    options.filename,compileDebug=options.compileDebug!==false,buf="";buf+="var buf = [];";if(false!==options._with)
    buf+="\nwith (locals || {}) { (function(){ ";buf+="\n buf.push('";var lineno=1;var consumeEOL=false;for(
    var i=0,len=str.length;i<len;++i){var stri=str[i];if(str.slice(i,open.length+i)==open){i+=open.length;var prefix,
    postfix,line=(compileDebug?"__stack.lineno=":"")+lineno;switch(str[i]){case"=":prefix="', escape(("+line+", ";
    postfix=")), '";++i;break;case"-":prefix="', ("+line+", ";postfix="), '";++i;break;default:prefix="');"+line+
    ";";postfix="; buf.push('"}var end=str.indexOf(close,i);if(end<0){throw new Error(
    'Could not find matching close tag "'+close+'".')}var js=str.substring(i,end),start=i,include=null,n=0;if("-"==
    js[js.length-1]){js=js.substring(0,js.length-2);consumeEOL=true}if(0==js.trim().indexOf("include")){var name=js.
    trim().slice(7).trim();if(!filename)throw new Error("filename option is required for includes");var path=
    resolveInclude(name,filename);include=read(path,"utf8");include=exports.parse(include,{filename:path,_with:false
    ,open:open,close:close,compileDebug:compileDebug});buf+="' + (function(){"+include+"})() + '";js=""}while(~(n=js
    .indexOf("\n",n)))n++,lineno++;if(js.substr(0,1)==":")js=filtered(js);if(js){if(js.lastIndexOf("//")>js.
    lastIndexOf("\n"))js+="\n";buf+=prefix;buf+=js;buf+=postfix}i+=end-start+close.length-1}else if(stri=="\\"){buf
    +="\\\\"}else if(stri=="'"){buf+="\\'"}else if(stri=="\r"){}else if(stri=="\n"){if(consumeEOL){consumeEOL=false}
    else{buf+="\\n";lineno++}}else{buf+=stri}}if(false!==options._with)buf+="'); })();\n} \nreturn buf.join('');";
    else buf+="');\nreturn buf.join('');";return buf};var compile=exports.compile=function(str,options){options=
    options||{};var escape=options.escape||utils.escape;var input=JSON.stringify(str),compileDebug=options.
    compileDebug!==false,client=options.client,filename=options.filename?JSON.stringify(options.filename):
    "undefined";if(compileDebug){str=["var __stack = { lineno: 1, input: "+input+", filename: "+filename+" };",
    rethrow.toString(),"try {",exports.parse(str,options),"} catch (err) {",
    "  rethrow(err, __stack.input, __stack.filename, __stack.lineno);","}"].join("\n")}else{str=exports.parse(str,
    options)}if(options.debug)console.log(str);if(client)str="escape = escape || "+escape.toString()+";\n"+str;try
    {var fn=new Function("locals, filters, escape, rethrow",str)}catch(err){if("SyntaxError"==err.name){err.message
    +=options.filename?" in "+filename:" while compiling ejs"}throw err}if(client)return fn;return function(locals)
    {return fn.call(this,locals,filters,escape,rethrow)}};exports.render=function(str,options){var fn,options=
    options||{};if(options.cache){if(options.filename){fn=cache[options.filename]||(cache[options.filename]=compile
    (str,options))}else{throw new Error('"cache" option requires "filename".')}}else{fn=compile(str,options)}options
    .__proto__=options.locals;return fn.call(options.scope,options)};exports.renderFile=function(path,options,fn){
    var key=path+":string";if("function"==typeof options){fn=options,options={}}options.filename=path;var str;try{
    str=options.cache?cache[key]||(cache[key]=read(path,"utf8")):read(path,"utf8")}catch(err){fn(err);return}fn(null
    ,exports.render(str,options))};function resolveInclude(name,filename){var path=join(dirname(filename),name);var
    ext=extname(name);if(!ext)path+=".ejs";return path}exports.__express=exports.renderFile;if(require.extensions){
    require.extensions[".ejs"]=function(module,filename){filename=filename||module.filename;var options={filename:
    filename,client:true},template=fs.readFileSync(filename).toString(),fn=compile(template,options);module._compile
    ("module.exports = "+fn.toString()+";",filename)}}else if(require.registerExtension){require.registerExtension
    (".ejs",function(src){return compile(src,{})})}});require.register("filters.js",function(module,exports,require)
    {exports.first=function(obj){return obj[0]};exports.last=function(obj){return obj[obj.length-1]};exports.
    capitalize=function(str){str=String(str);return str[0].toUpperCase()+str.substr(1,str.length)};exports.downcase=
    function(str){return String(str).toLowerCase()};exports.upcase=function(str){return String(str).toUpperCase()};
    exports.sort=function(obj){return Object.create(obj).sort()};exports.sort_by=function(obj,prop){return Object.
    create(obj).sort(function(a,b){a=a[prop],b=b[prop];if(a>b)return 1;if(a<b)return-1;return 0})};exports.size=
    exports.length=function(obj){return obj.length};exports.plus=function(a,b){return Number(a)+Number(b)};exports.
    minus=function(a,b){return Number(a)-Number(b)};exports.times=function(a,b){return Number(a)*Number(b)};exports.
    divided_by=function(a,b){return Number(a)/Number(b)};exports.join=function(obj,str){return obj.join(str||", ")};
    exports.truncate=function(str,len,append){str=String(str);if(str.length>len){str=str.slice(0,len);if(append)str
    +=append}return str};exports.truncate_words=function(str,n){var str=String(str),words=str.split(/ +/);return
    words.slice(0,n).join(" ")};exports.replace=function(str,pattern,substitution){return String(str).replace(
    pattern,substitution||"")};exports.prepend=function(obj,val){return Array.isArray(obj)?[val].concat(obj):val+obj
    };exports.append=function(obj,val){return Array.isArray(obj)?obj.concat(val):obj+val};exports.map=function(arr,
    prop){return arr.map(function(obj){return obj[prop]})};exports.reverse=function(obj){return Array.isArray(obj)?
    obj.reverse():String(obj).split("").reverse().join("")};exports.get=function(obj,prop){return obj[prop]};exports
    .json=function(obj){return JSON.stringify(obj)}});require.register("utils.js",function(module,exports,require){
    exports.escape=function(html){return String(html).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"
    ).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}});return require("ejs")}();

    return ejs.render(template, options);
}


/**
 * @private
 * @return string
 */
CoreUITable.prototype._renderData = function() {

    var tpl = '<% for (var i = (recordsPerPage > 0 ? (page - 1) * recordsPerPage : 0); i < records.length && (recordsPerPage > 0 ? (i >= (page - 1) * recordsPerPage && i < page * recordsPerPage) : true); i++) { %>' +
                  '<tr class="coreui-table-row edit-row" data-id="<% if (records[i].data[primaryKey] !== undefined) { %>' +
                           '<%= records[i].data[primaryKey] %>' +
                      '<% } %>' +
                      // Атрибуты строки
                      '"<% if (records[i].attr) { %>' +
                          '<% Object.keys(records[i].attr).map(function(attributeName) { %>' +
                              ' <%= attributeName %>="<%= records[i].attr[attributeName] %>"' +
                          '<% }) %>' +
                      '<% } %>' +
                      '>' +
                      // Выбор строки
                      '<% if (show.rowSelect) { %>' +
                          '<td class="coreui-table-check" onclick="event.cancelBubble=true">' +
                              '<input type="checkbox" onclick="CoreUITable.rowState(\'<%= name %>\', \'<%= records[i].data[primaryKey] %>\')">' +
                          '</td>' +
                      '<% } %>' +
                      // Номер строки
                      '<% if (show.lineNumbers) { %>' +
                          '<td width="1%" class="coreui-table-num" ' +
                              'title="<% if (records[i].data[primaryKey] !== undefined) {%><%= records[i].data[primaryKey] %><% } %>">' +
                              '<%- i + 1 %>' +
                          '</td>' +
                      '<% } %>' +
                      // Данные
                      '<% for (var j = 0; j < columns.length; j++) { %>' +
                          '<% if (columns[j].show === undefined || columns[j].show) { %>' +
                              '<% if (records[i].data[columns[j].field] !== undefined) { %>' +
                                  // Атрибуты ячейки
                                  '<td<% if (columns[j].attr) { %>' +
                                      '<% Object.keys(columns[j].attr).map(function(attributeName) { %>' +
                                          ' <%= attributeName %>="<%= columns[j].attr[attributeName] %>"' +
                                      '<% }) %>' +
                                      // Bubble
                                      '<% } if (columns[j].type === "status" || columns[j].type === "html") { %>' +
                                          ' onclick="event.cancelBubble=true"' +
                                      '<% } %>>' +
                                      // Значения
                                      '<% if (columns[j].type !== "status") { %>' +
                                           // Любой тип
                                          '<% if (typeof columns[j].render === "function") { %>' +
                                               '<%- columns[j].render(records[i], j) %>' +
                                          '<% } else { %>' +
                                              '<% if (columns[j].type === "html") { %>' +
                                                   '<%- records[i].data[columns[j].field] %>' +
                                              '<% } else { %>' +
                                                   '<%= records[i].data[columns[j].field] %>' +
                                              '<% } %>' +
                                           '<% } %>' +
                                      '<% } else if (records[i].data[primaryKey] !== undefined) { %>' +
                                           // Тип Статус
                                          '<input id="toggle-<%= name %>-<%= columns[j].field %>-<%= records[i].data[primaryKey] %>"' +
                                                 '<% if (records[i].data[columns[j].field]) { %> checked="checked"<% } %>' +
                                                  'type="checkbox" style="display: none"' +
                                                  'onchange="CoreUITable.changeStatus(\'<%= name %>\', \'<%= columns[j].field %>\', \'<%= records[i].data[primaryKey] %>\')">' +
                                          '<label class="coreui-table-toggle" for="toggle-<%= name %>-<%= columns[j].field %>-<%= records[i].data[primaryKey] %>"></label>' +
                                       '<% } %>' +
                                   '</td>' +
                              '<% } else { %>' +
                                  '<td></td>' +
                              '<% } %>' +
                          '<% } %>' +
                      '<% } %>' +
                  '</tr>' +
              '<% } %>';


    var cloneOptions = Object.assign({}, this._options);
    cloneOptions.recordsPerPage = this._recordsPerPage;
    cloneOptions.page           = this._page;

    return this._templater(tpl, cloneOptions);
};


document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        var dropdowns = document.getElementsByClassName('coreui-table-dropdown');
        if (dropdowns.length > 0) {
            for (var i = 0; i < dropdowns.length; i++) {
                var isInside = event.target === dropdowns[i];
                if ( ! isInside) {
                    var elem  = event.target;
                    var count = 0;
                    while ((elem = elem.parentNode) !== null && count < 5) {
                        if (elem === dropdowns[i]) {
                            isInside = true;
                            break;
                        }
                        count++;
                    }
                }

                if ( ! isInside && dropdowns[i].offsetWidth > 0 && dropdowns[i].offsetHeight > 0) {
                    var dropdownMenu = dropdowns[i].getElementsByClassName('coreui-table-dropdown-menu');
                    if (dropdownMenu[0]) {
                        dropdownMenu[0].style.display = 'none';
                    }
                }
            }
        }
    }, false);
});
