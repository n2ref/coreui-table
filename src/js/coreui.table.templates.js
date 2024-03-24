let tpl = Object.create(null)
tpl['table-columns-footer.html'] = '<tr> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.label %></td> <% }); %> </tr>'
tpl['table-columns.html'] = '<tr class="fw-medium bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>> <%- column.label %> <% if (column.description) { %> <small class="bi bi-question-circle text-body-secondary coreui-table__cursor_help" title="<%= column.description %>"></small> <% } %> <% if (column.sortable === \'asc\') { %> <i class="bi bi-sort-down-alt"></i> <% } else if (column.sortable === \'desc\') { %> <i class="bi bi-sort-down"></i> <% } %> </td> <% }); %> </tr>'
tpl['table-control.html'] = ' <div id="coreui-table-control-<%= control.id %>" class="coreui-table__control"> <%- control.content %> </div>'
tpl['table-controls-footer-out.html'] = ' <div class="coreui-table__footer d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>'
tpl['table-controls-footer.html'] = ' <div class="coreui-table__footer ps-1 pe-1 d-flex justify-content-between border-top border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>'
tpl['table-controls-header-out.html'] = ' <div class="coreui-table__header d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>'
tpl['table-controls-header.html'] = ' <div class="coreui-table__header ps-1 pe-1 d-flex justify-content-between border-bottom border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls d-flex justify-content-start gap-2 flex-wrap flex-fill my-1 align-items-center"> <%- controlsLeft.join(\'\') %> </div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls d-flex justify-content-center gap-2 flex-wrap flex-fill my-1 align-items-center"> <%- controlsCenter.join(\'\') %> </div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls d-flex justify-content-end gap-2 flex-wrap flex-fill my-1 align-items-center"> <%- controlsRight.join(\'\') %> </div> <% } %> </div>'
tpl['table-loader.html'] = '<div class="coreui-table-lock position-absolute w-100 top-0 bottom-0"> <div class="coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0"></div> <div class="coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary"> <div class="spinner-border text-secondary align-self-center"></div> <span class="lh-lg"><%= lang.loading %></span> </div> </div>'
tpl['table-record.html'] = '<tr<%- record.attr %> data-record-index="<%= record.index %>"> <% $.each(record.fields, function(key2, field) { %> <td<%- field.attr %>></td> <% }); %> </tr>'
tpl['table-records-empty.html'] = '<tr> <td class="text-center" colspan="<%= columnsCount %>"><%= lang.emptyRecords %></td> </tr>'
tpl['table-wrapper.html'] = ' <div id="coreui-table-<%= id %>" class="coreui-table"<%- render.attr %> <% if (widthSizes) { %>style="<%= widthSizes.join(\';\') %>"<% } %>> <%- render.headersOut.join(\'\') %> <div class="coreui-table__container position-relative"> <%- render.headersIn.join(\'\') %> <div class="coreui-table__wrapper table-responsive overflow-x-auto" <% if (heightSizes) { %>style="<%= heightSizes.join(\';\') %>"<% } %>></div> <%- render.footersIn.join(\'\') %> </div> <%- render.footersOut.join(\'\') %> </div>'
tpl['table.html'] = ' <table class="table <%= classes %> mb-0"> <colgroup> <% $.each(colGroups, function(key, columnGroup) { %> <col<% if (columnGroup.style) { %> style="<%= columnGroup.style %>"<% } %>/> <% }); %> </colgroup> <% if (show.columnHeaders) { %> <thead> <%- columnGroupsHeader %> <%- columns %> </thead> <% } %> <tbody></tbody> <% if (columnGroupsFooter != \'\') { %> <tfoot> <%- columnGroupsFooter %> </tfoot> <% } %> </table>'
tpl['controls/button.html'] = '<button type="button"<%- attr %>><%- content %></button>'
tpl['controls/button_group.html'] = ' <div class="btn-group" role="group"> <% $.each(buttons, function(key, button) { %> <% if (button.type === \'link\') { %> <a href="<%= button.link %>"<%- button.attr %>><%= button.content %></a> <% } else if (button.type === \'button\') { %> <button type="button" id="btn-<%= button.id %>"<%- button.attr %>> <%= button.content %> </button> <% } else if (button.type === \'dropdown\') { %> <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- button.attr %>> <%- button.content %> </button> <ul class="dropdown-menu"> <% $.each(button.items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.link %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div> <% } %> <% }) %> </div>'
tpl['controls/caption.html'] = '<div class="d-flex flex-column me-3"> <small class="text-body-secondary fw-medium"> <%= title %> <% if (description) { %> <i class="bi bi-question-circle coreui-table__cursor_help" title="<%= description %>"></i> <% } %> </small> <b class="text-nowrap"><%= value %></b> </div>'
tpl['controls/columns-container.html'] = ' <div class="coreui-table__columns px-3 pt-3 pb-4"> <div class="mb-3"> <div class="form-check coreui-table__check_all"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" <% if (showAll === true) { %>checked<% } %>> <%= lang.all %> </label> </div> <% $.each(columns, function(key, column) { %> <div class="form-check coreui-table_check-column"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" value="<%= column.field %>" <% if (column.show === true) { %>checked<% } %>> <%= column.label %> </label> </div> <% }); %> </div> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div>'
tpl['controls/columns.html'] = '<button type="button"<%- btnAttr %>><%-btnContent%></button>'
tpl['controls/dropdown.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>> <%- content %> </button> <ul class="dropdown-menu"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.link %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div>'
tpl['controls/link.html'] = '<a href="<%- href %>"<%- attr %>><%- content %></a>'
tpl['controls/page-jump.html'] = ' <div class="coreui-table__page_jump_container"> <div <%- attr %>> <input type="number" class="form-control border-secondary-subtle" min="1"> <button class="btn btn-outline-secondary border-secondary-subtle" type="button"> <i class="bi bi-chevron-compact-right"></i> </button> </div> </div>'
tpl['controls/page-size.html'] = ' <select <%- attr %>> <% $.each(recordsPerPageList, function(key, count) { %> <option value="<%= count %>"<% if (recordsPerPage == count) { %>selected<% } %>> <% if (count == \'0\') { %><%= lang.all %><% } else { %><%= count %><% } %> </option> <% }); %> </select>'
tpl['controls/pages.html'] = ' <nav> <ul <%- attr %>> <% if (showPrev) { %> <li class="page-item coreui-table__page_prev <% if ( ! isActivePrev) { %> disabled<% } %>"> <button type="button" class="page-link text-secondary"> <i class="bi bi-chevron-left"></i> </button> </li> <% } %> <% if (showPageFirst) { %> <li class="page-item"> <button type="button" class="page-link text-secondary coreui-table__page"> 1 </button> </li> <% } %> <% if (showDividerStart) { %> <li class="page-item disabled"> <span class="page-link text-secondary px-1">...</span> </li> <% } %> <% $.each(pages, function(key, page) { %> <% if (page == currentPage) { %> <li class="page-item"> <span class="page-link"><%= page %></span> </li> <% } else { %> <li class="page-item"> <button type="button" class="page-link text-secondary coreui-table__page"> <%= page %> </button> </li> <% } %> <% }); %> <% if (showDividerEnd) { %> <li class="page-item disabled"> <span class="page-link text-secondary px-1">...</span> </li> <% } %> <% if (showPageLast) { %> <li class="page-item"> <button type="button" class="page-link text-secondary coreui-table__page"> <%= pagesTotal %> </button> </li> <% } %> <% if (showNext) { %> <li class="page-item coreui-table__page_next<% if ( ! isActiveNext) { %> disabled<% } %>"> <button type="button" class="page-link text-secondary"> <i class="bi bi-chevron-right"></i> </button> </li> <% } %> </ul> </nav>'
tpl['controls/search-clear.html'] = ' <button type="button" <%- attr %>> <%- content %> </button> '
tpl['controls/search-container.html'] = ' <div class="coreui-table__search px-3 pt-3 pb-4"> <div class="mb-3"> <% $.each(controls, function(key, control) { %> <div class="mb-2 row"> <label class="col-12 col-md-2 col-form-label fw-medium text-start text-md-end pe-2"> <%= control.label %> <% if (control.description) { %> <div class="text-muted fw-normal"> <small><%= control.description %></small> </div> <% } %> </label> <div class="col-12 col-md-10 search-control-<%= control.id %>"> <%- control.content %> <% if (control.prefix) { %> <%= control.prefix %> <% } %> </div> </div> <% }); %> </div> <div class="row"> <div class="col-12 col-md-10 offset-0 offset-md-2"> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div> </div> </div>'
tpl['controls/search.html'] = '<div class="btn-group"> <button type="button"<%- btnAttr %>><%- btnContent %></button> <%- btnClear %> </div> '
tpl['controls/total.html'] = '<div <%- attr %>> <small><%= lang.total %>: <span class="coreui-table__count-total"><%= recordsTotal %></span></small> </div>'
tpl['search/checkbox.html'] = ' <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %>'
tpl['search/date.html'] = ' <input type="date" <%- attr %>>'
tpl['search/datetime.html'] = ' <input type="datetime-local" <%- attr %>>'
tpl['search/datetime_range.html'] = ' <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>>'
tpl['search/date_month.html'] = ' <input type="month" <%- attr %>>'
tpl['search/date_range.html'] = ' <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>>'
tpl['search/number.html'] = ' <input type="number" <%- startAttr %>> <input type="number" <%- endAttr %>>'
tpl['search/radio.html'] = '<div class="form-check"> <label class="form-check-label"> <input class="form-check-input" type="radio" name="<%= field %>" value=""<%= checkedAll ? \' checked\' : \'\' %>> <%= lang.all %> </label> </div> <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label"> <input class="form-check-input" type="radio" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %>'
tpl['search/select.html'] = ' <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select>'
tpl['search/switch.html'] = '<div class="form-check form-switch pt-2"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> </div>'
tpl['search/text.html'] = ' <input type="text" <%- attr %>>'
tpl['filters/checkbox.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="checkbox" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>'
tpl['filters/clear.html'] = ' <button type="button" <%- attr %>><%- content %></button>'
tpl['filters/date.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- attr %>> </div>'
tpl['filters/datetime.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- attr %>> </div>'
tpl['filters/datetime_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>> </div>'
tpl['filters/date_month.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="month" <%- attr %>> </div>'
tpl['filters/date_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>> </div>'
tpl['filters/number.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="number" <%- attrStart %>> <input type="number" <%- attrEnd %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>'
tpl['filters/radio.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="radio" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>'
tpl['filters/select.html'] = '<div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select> </div>'
tpl['filters/switch.html'] = '<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> <% if (label != \'\') { %> <label class="form-check-label" for="<%= (field + id) %>"><%= label %></label> <% } %> </div>'
tpl['filters/text.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="text" <%- attr %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>'
tpl['columns/button.html'] = '<button type="button"<%- attr %>><%- content %></button>'
tpl['columns/switch.html'] = '<div class="form-switch"> <input class="form-check-input coreui-table__switch" type="checkbox" data-field="<%= field %>" value="record.index"<% if (checked) { %> checked<% } %><% if (disabled) { %> disabled<% } %>> </div>';
export default tpl;