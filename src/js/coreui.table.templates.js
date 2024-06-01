let tpl = Object.create(null)
tpl['columns/badge.html'] = '<span class="badge text-bg-<%= type %>"><%= text %></span>'
tpl['columns/button.html'] = '<button type="button"<%- attr %>><%- content %></button>'
tpl['columns/image.html'] = '<img <%- attr %>/>'
tpl['columns/link.html'] = '<a <%- attr %>><%- content %></a>'
tpl['columns/menu.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown" <%- attr %>> <%- content %> </button> <ul class="dropdown-menu dropdown-menu-<%= position %>"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a href="<%= item.url %>"<%- item.attr %>><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" id="btn-dropdown-<%= item.id %>"<%- item.attr %>> <%- item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } else if (item.type === \'header\') { %> <li><h6 class="dropdown-header"><%= item.content %></h6></li> <% } %> <% }) %> </ul> </div>'
tpl['columns/progress.html'] = '<% if (description !== null) { %> <small class="text-body-secondary"><%= description %></small> <% } %> <div <%- attr %>> <div class="progress-bar bg-<%= color %>" style="width:<%= percent %>%;"><%= percentText %></div> </div>'
tpl['columns/select_label.html'] = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">'
tpl['columns/select.html'] = '<input class="coreui-table__select form-check-input" type="checkbox" value="<%= index %>">'
tpl['columns/switch.html'] = '<div class="form-switch"> <input class="form-check-input coreui-table__switch" type="checkbox" data-field="<%= field %>" value="record.index"<% if (checked) { %> checked<% } %><% if (disabled) { %> disabled<% } %>> </div>'
tpl['controls/button_group.html'] = ' <div class="btn-group" role="group"> <% $.each(buttons, function(key, button) { %> <% if (button.type === \'link\') { %> <a href="<%= button.url %>"<%- button.attr %>><%= button.content %></a> <% } else if (button.type === \'button\') { %> <button type="button" id="btn-grp-<%= button.id %>"<%- button.attr %>> <%= button.content %> </button> <% } else if (button.type === \'dropdown\') { %> <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- button.attr %>> <%- button.content %> </button> <ul class="dropdown-menu dropdown-menu-<%= button.position %>"> <% $.each(button.items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.url %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div> <% } %> <% }) %> </div>'
tpl['controls/button.html'] = '<button type="button"<%- attr %>><%- content %></button>'
tpl['controls/caption.html'] = '<div class="d-flex flex-column me-3"> <small class="text-body-secondary fw-medium"> <%= title %> <% if (description) { %> <i class="bi bi-question-circle coreui-table__cursor_help" title="<%= description %>"></i> <% } %> </small> <b class="text-nowrap"><%= value %></b> </div>'
tpl['controls/columns-container.html'] = ' <div class="coreui-table__columns px-3 pt-3 pb-4"> <div class="mb-3"> <div class="form-check coreui-table__check_all"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" <% if (showAll === true) { %>checked<% } %>> <%= lang.all %> </label> </div> <% $.each(columns, function(key, column) { %> <div class="form-check coreui-table_check-column"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" value="<%= column.field %>" <% if (column.show === true) { %>checked<% } %>> <%= column.label %> </label> </div> <% }); %> </div> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div>'
tpl['controls/columns.html'] = '<button type="button"<%- btnAttr %>><%-btnContent%></button>'
tpl['controls/divider.html'] = '<div <%- attr %>></div>'
tpl['controls/dropdown.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>> <%- content %> </button> <ul class="dropdown-menu dropdown-menu-<%= position %>"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.url %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div>'
tpl['controls/filter_clear.html'] = ' <button type="button" <%- attr %>><%- content %></button>'
tpl['controls/link.html'] = '<a href="<%- url %>"<%- attr %>><%- content %></a>'
tpl['controls/page-jump.html'] = ' <div class="coreui-table__page_jump_container"> <div <%- attr %>> <input type="number" class="form-control border-secondary-subtle" min="1"> <button class="btn btn-outline-secondary border-secondary-subtle" type="button"> <i class="bi bi-chevron-compact-right"></i> </button> </div> </div>'
tpl['controls/page-size.html'] = ' <select <%- attr %>> <% $.each(recordsPerPageList, function(key, count) { %> <option value="<%= count %>"<% if (recordsPerPage == count) { %>selected<% } %>> <% if (count == \'0\') { %><%= lang.all %><% } else { %><%= count %><% } %> </option> <% }); %> </select>'
tpl['controls/pages.html'] = ' <nav> <ul <%- attr %>> <% if (showPrev) { %> <li class="page-item coreui-table__page_prev <% if ( ! isActivePrev) { %> disabled<% } %>"> <button type="button" class="page-link"> <i class="bi bi-chevron-left"></i> </button> </li> <% } %> <% if (showPageFirst) { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> 1 </button> </li> <% } %> <% if (showDividerStart) { %> <li class="page-item disabled"> <span class="page-link px-1">...</span> </li> <% } %> <% $.each(pages, function(key, page) { %> <% if (page == currentPage) { %> <li class="page-item active"> <span class="page-link"><%= page %></span> </li> <% } else { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> <%= page %> </button> </li> <% } %> <% }); %> <% if (showDividerEnd) { %> <li class="page-item disabled"> <span class="page-link px-1">...</span> </li> <% } %> <% if (showPageLast) { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> <%= pagesTotal %> </button> </li> <% } %> <% if (showNext) { %> <li class="page-item coreui-table__page_next<% if ( ! isActiveNext) { %> disabled<% } %>"> <button type="button" class="page-link"> <i class="bi bi-chevron-right"></i> </button> </li> <% } %> </ul> </nav>'
tpl['controls/search-clear.html'] = ' <button type="button" <%- attr %>> <%- content %> </button> '
tpl['controls/search-container.html'] = ' <div class="coreui-table__search px-3 pt-3 pb-4"> <div class="mb-3"> <% $.each(controls, function(key, control) { %> <div class="mb-2 d-flex flex-column flex-md-row "> <label class="col-form-label fw-medium text-start text-md-end pe-2" style="min-width:<%= labelWidth %>;width:<%= labelWidth %>"> <%= control.label %> <% if (control.description) { %> <div class="text-muted fw-normal"> <small><%= control.description %></small> </div> <% } %> </label> <div class="flex-fill search-control-<%= control.id %>"> <%- control.content %> <% if (control.suffix) { %> <%= control.suffix %> <% } %> </div> </div> <% }); %> </div> <div class="d-flex flex-sm-wrap flex-md-nowrap"> <div class="d-none d-md-block" style="width:<%= labelWidth %>;min-width:<%= labelWidth %>"></div> <div class="d-flex justify-content-start flex-wrap gap-2"> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div> </div> </div>'
tpl['controls/search.html'] = '<div class="btn-group"> <button type="button"<%- btnAttr %>><%- btnContent %></button> <%- btnClear %> </div> '
tpl['controls/total.html'] = '<div <%- attr %>> <small><%= lang.total %>: <span class="coreui-table__count-total"><%= recordsTotal %></span></small> </div>'
tpl['filters/checkbox.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="checkbox" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>'
tpl['filters/date_month.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="month" <%- attr %>> </div>'
tpl['filters/date_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>> </div>'
tpl['filters/date.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- attr %>> </div>'
tpl['filters/datetime_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>> </div>'
tpl['filters/datetime.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- attr %>> </div>'
tpl['filters/number.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="number" <%- attrStart %>> <input type="number" <%- attrEnd %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>'
tpl['filters/radio.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="radio" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>'
tpl['filters/select.html'] = '<div class="input-group flex-nowrap"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select> </div>'
tpl['filters/switch.html'] = '<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> <% if (label != \'\') { %> <label class="form-check-label" for="<%= (field + id) %>"><%= label %></label> <% } %> </div>'
tpl['filters/text.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="text" <%- attr %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>'
tpl['search/checkbox.html'] = ' <div class="pt-2"> <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="checkbox" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %> </div>'
tpl['search/date_month.html'] = ' <input type="month" <%- attr %>>'
tpl['search/date_range.html'] = ' <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>>'
tpl['search/date.html'] = ' <input type="date" <%- attr %>>'
tpl['search/datetime_range.html'] = ' <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>>'
tpl['search/datetime.html'] = ' <input type="datetime-local" <%- attr %>>'
tpl['search/number.html'] = ' <input type="number" <%- startAttr %>> <input type="number" <%- endAttr %>>'
tpl['search/radio.html'] = '<div class="pt-2"> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="radio" name="<%= field %>" value=""<%= checkedAll ? \' checked\' : \'\' %>> <%= lang.all %> </label> </div> <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="radio" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %> </div>'
tpl['search/select.html'] = ' <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select>'
tpl['search/switch.html'] = '<div class="form-check form-switch pt-2"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> </div>'
tpl['search/text.html'] = ' <input type="text" <%- attr %>>'
tpl['table-columns-footer.html'] = '<tr> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.content %></td> <% }); %> </tr>'
tpl['table-columns-header.html'] = '<tr class="fw-medium bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.content %></td> <% }); %> </tr>'
tpl['table-columns.html'] = '<tr class="fw-medium bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>> <span class="coreui-table__column-label"><%- column.label %></span> <% if (column.description) { %> <small class="coreui-table__column-description bi bi-question-circle text-body-secondary" title="<%= column.description %>"></small> <% } %> <% if (column.sortable === \'asc\') { %> <i class="coreui-table__column-sort bi bi-sort-down-alt"></i> <% } else if (column.sortable === \'desc\') { %> <i class="coreui-table__column-sort bi bi-sort-down"></i> <% } %> </td> <% }); %> </tr>'
tpl['table-control.html'] = '<div id="coreui-table-control-<%= id %>" class="coreui-table__control"></div>'
tpl['table-controls-footer-out.html'] = ' <div class="coreui-table__footer d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> </div>'
tpl['table-controls-footer.html'] = ' <div class="coreui-table__footer ps-1 pe-1 d-flex justify-content-between border-top border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> </div>'
tpl['table-controls-header-out.html'] = ' <div class="coreui-table__header d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> </div>'
tpl['table-controls-header.html'] = ' <div class="coreui-table__header ps-1 pe-1 d-flex justify-content-between border-bottom border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> </div>'
tpl['table-loader.html'] = '<div class="coreui-table-lock position-absolute w-100 top-0 bottom-0"> <div class="coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0"></div> <div class="coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary"> <div class="spinner-border text-secondary align-self-center"></div> <span class="lh-lg"><%= lang.loading %></span> </div> </div>'
tpl['table-record-expand.html'] = '<tr class="coreui-table__record-expanded" style="display: none"> <td colspan="<%= colspan %>"></td> </tr>'
tpl['table-record-group.html'] = '<tr<%- attr %>> <td colspan="<%= colspan %>"></td> </tr>'
tpl['table-record.html'] = '<tr<%- record.attr %> data-record-index="<%= record.index %>"> <% $.each(record.fields, function(key2, field) { %> <td<%- field.attr %>></td> <% }); %> </tr>'
tpl['table-records-empty.html'] = '<tr> <td class="text-center" colspan="<%= columnsCount %>"><%= lang.emptyRecords %></td> </tr>'
tpl['table-wrapper.html'] = ' <div id="coreui-table-<%= id %>" class="coreui-table<%= classes %>"<% if (widthSizes) { %> style="<%= widthSizes.join(\';\') %>"<% } %>> <div class="coreui-table__container position-relative"> <div class="coreui-table__wrapper<%= classesWrapper %>" <% if (heightSizes) { %>style="<%= heightSizes.join(\';\') %>"<% } %>></div> </div> </div>'
tpl['table.html'] = ' <table class="table <%= classes %> mb-0"> <colgroup> <% $.each(colGroups, function(key, columnGroup) { %> <col<% if (columnGroup.style) { %> style="<%= columnGroup.style %>"<% } %>/> <% }); %> </colgroup> <% if (showHeaders) { %> <thead<% if (theadAttr) { %> <%- theadAttr %>"<% } %>> <%- columnsHeader %> <%- columns %> </thead> <% } %> <tbody></tbody> <% if (columnsFooter != \'\') { %> <tfoot> <%- columnsFooter %> </tfoot> <% } %> </table>';
export default tpl;