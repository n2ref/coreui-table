(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.CoreUI = global.CoreUI || {}, global.CoreUI.table = factory()));
})(this, (function () { 'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var tpl = Object.create(null);
  tpl['columns/badge.html'] = '<span class="badge text-bg-<%= type %>"><%= text %></span>';
  tpl['columns/button.html'] = '<button type="button"<%- attr %>><%- content %></button>';
  tpl['columns/image.html'] = '<img <%- attr %>/>';
  tpl['columns/link.html'] = '<a <%- attr %>><%- content %></a>';
  tpl['columns/menu.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>> <%- content %> </button> <ul class="dropdown-menu dropdown-menu-<%= position %>"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a href="<%= item.url %>"<%- item.attr %>><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" id="btn-dropdown-<%= item.id %>"<%- item.attr %>> <%- item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } else if (item.type === \'header\') { %> <li><h6 class="dropdown-header"><%= item.content %></h6></li> <% } %> <% }) %> </ul> </div>';
  tpl['columns/progress.html'] = '<% if (description !== null) { %> <small class="text-body-secondary"><%= description %></small> <% } %> <div <%- attr %>> <div class="progress-bar bg-<%= color %>" style="width:<%= percent %>%;"><%= percentText %></div> </div>';
  tpl['columns/select_label.html'] = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">';
  tpl['columns/select.html'] = '<input class="coreui-table__select form-check-input" type="checkbox" value="<%= index %>">';
  tpl['columns/switch.html'] = '<div class="form-switch"> <input class="form-check-input coreui-table__switch" type="checkbox" data-field="<%= field %>" value="record.index"<% if (checked) { %> checked<% } %><% if (disabled) { %> disabled<% } %>> </div>';
  tpl['container.html'] = ' <div id="coreui-table-<%= id %>" class="coreui-table<%= classes %>"<% if (widthSizes) { %> style="<%= widthSizes.join(\';\') %>"<% } %>> <div class="coreui-table__container position-relative"> <div class="coreui-table__wrapper<%= classesWrapper %>" <% if (heightSizes) { %>style="<%= heightSizes.join(\';\') %>"<% } %>></div> </div> </div>';
  tpl['controls/button_group.html'] = ' <div class="btn-group" role="group"> <% $.each(buttons, function(key, button) { %> <% if (button.type === \'link\') { %> <a href="<%= button.url %>"<%- button.attr %>><%= button.content %></a> <% } else if (button.type === \'button\') { %> <button type="button" id="btn-grp-<%= button.id %>"<%- button.attr %>> <%= button.content %> </button> <% } else if (button.type === \'dropdown\') { %> <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- button.attr %>> <%- button.content %> </button> <ul class="dropdown-menu dropdown-menu-<%= button.position %>"> <% $.each(button.items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.url %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div> <% } %> <% }) %> </div>';
  tpl['controls/button.html'] = '<button type="button"<%- attr %>><%- content %></button>';
  tpl['controls/caption.html'] = '<div class="d-flex flex-column me-3"> <small class="text-body-secondary fw-medium"> <%= title %> <% if (description) { %> <i class="bi bi-question-circle coreui-table__cursor_help" title="<%= description %>"></i> <% } %> </small> <b class="text-nowrap"><%= value %></b> </div>';
  tpl['controls/columns-container.html'] = ' <div class="coreui-table__columns px-3 pt-3 pb-4"> <div class="mb-3"> <div class="form-check coreui-table__check_all"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" <% if (showAll === true) { %>checked<% } %>> <%= lang.all %> </label> </div> <% $.each(columns, function(key, column) { %> <div class="form-check coreui-table_check-column"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" value="<%= column.field %>" <% if (column.show === true) { %>checked<% } %>> <%= column.label %> </label> </div> <% }); %> </div> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div>';
  tpl['controls/columns.html'] = '<button type="button"<%- btnAttr %>><%-btnContent%></button>';
  tpl['controls/divider.html'] = '<div <%- attr %>></div>';
  tpl['controls/dropdown.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>> <%- content %> </button> <ul class="dropdown-menu dropdown-menu-<%= position %>"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a class="dropdown-item" href="<%= item.url %>"><%= item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" class="dropdown-item" id="btn-dropdown-<%= item.id %>"> <%= item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } %> <% }) %> </ul> </div>';
  tpl['controls/filter_clear.html'] = ' <button type="button" <%- attr %>><%- content %></button>';
  tpl['controls/link.html'] = '<a href="<%- url %>"<%- attr %>><%- content %></a>';
  tpl['controls/page-jump.html'] = ' <div class="coreui-table__page_jump_container"> <div <%- attr %>> <input type="number" class="form-control border-secondary-subtle" min="1"> <button class="btn btn-outline-secondary border-secondary-subtle" type="button"> <i class="bi bi-chevron-compact-right"></i> </button> </div> </div>';
  tpl['controls/page-size.html'] = ' <select <%- attr %>> <% $.each(recordsPerPageList, function(key, count) { %> <option value="<%= count %>"<% if (recordsPerPage == count) { %>selected<% } %>> <% if (count == \'0\') { %><%= lang.all %><% } else { %><%= count %><% } %> </option> <% }); %> </select>';
  tpl['controls/pages.html'] = ' <nav> <ul <%- attr %>> <% if (showPrev) { %> <li class="page-item coreui-table__page_prev <% if ( ! isActivePrev) { %> disabled<% } %>"> <button type="button" class="page-link"> <i class="bi bi-chevron-left"></i> </button> </li> <% } %> <% if (showPageFirst) { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> 1 </button> </li> <% } %> <% if (showDividerStart) { %> <li class="page-item disabled"> <span class="page-link px-1">...</span> </li> <% } %> <% $.each(pages, function(key, page) { %> <% if (page == currentPage) { %> <li class="page-item active"> <span class="page-link"><%= page %></span> </li> <% } else { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> <%= page %> </button> </li> <% } %> <% }); %> <% if (showDividerEnd) { %> <li class="page-item disabled"> <span class="page-link px-1">...</span> </li> <% } %> <% if (showPageLast) { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> <%= pagesTotal %> </button> </li> <% } %> <% if (showNext) { %> <li class="page-item coreui-table__page_next<% if ( ! isActiveNext) { %> disabled<% } %>"> <button type="button" class="page-link"> <i class="bi bi-chevron-right"></i> </button> </li> <% } %> </ul> </nav>';
  tpl['controls/search-clear.html'] = ' <button type="button" <%- attr %>> <%- content %> </button> ';
  tpl['controls/search-container.html'] = ' <div class="coreui-table__search px-3 pt-3 pb-4"> <div class="mb-3"> <% $.each(controls, function(key, control) { %> <div class="mb-2 d-flex flex-column flex-md-row "> <label class="col-form-label fw-medium text-start text-md-end pe-2" style="min-width:<%= labelWidth %>;width:<%= labelWidth %>"> <%= control.label %> <% if (control.descriptionLabel) { %> <div class="text-muted fw-normal"> <small><%= control.descriptionLabel %></small> </div> <% } %> </label> <div class="flex-fill search-control-<%= control.id %>"> <%- control.content %> <% if (control.suffix) { %> <%= control.suffix %> <% } %> <% if (control.description) { %> <div class="text-muted fw-normal"> <small><%= control.description %></small> </div> <% } %> </div> </div> <% }); %> </div> <div class="d-flex flex-sm-wrap flex-md-nowrap"> <div class="d-none d-md-block" style="width:<%= labelWidth %>;min-width:<%= labelWidth %>"></div> <div class="d-flex justify-content-start flex-wrap gap-2"> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div> </div> </div>';
  tpl['controls/search.html'] = '<div class="btn-group"> <button type="button"<%- btnAttr %>><%- btnContent %></button> <%- btnClear %> </div> ';
  tpl['controls/total.html'] = '<div <%- attr %>> <small><%= lang.total %>: <span class="coreui-table__count-total"><%= recordsTotal %></span></small> </div>';
  tpl['filters/checkbox.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="checkbox" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>';
  tpl['filters/date_month.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="month" <%- attr %>> </div>';
  tpl['filters/date_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>> </div>';
  tpl['filters/date.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- attr %>> </div>';
  tpl['filters/datetime_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>> </div>';
  tpl['filters/datetime.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- attr %>> </div>';
  tpl['filters/number.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="number" <%- attrStart %>> <input type="number" <%- attrEnd %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>';
  tpl['filters/radio.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="radio" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>';
  tpl['filters/select.html'] = '<div class="input-group flex-nowrap"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select> </div>';
  tpl['filters/switch.html'] = '<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> <% if (label != \'\') { %> <label class="form-check-label" for="<%= (field + id) %>"><%= label %></label> <% } %> </div>';
  tpl['filters/text.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="text" <%- attr %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>';
  tpl['search/checkbox-btn.html'] = ' <div class="pt-2"> <div class="btn-group"> <% $.each(options, function(key, option) { %> <input class="btn-check" type="checkbox" name="<%= field %>" value="<%- option.value %>" id="<%= option.hash %>" autocomplete="off" <%= option.checked ? \' checked\' : \'\' %>> <label class="<%= option.optionsClass %>" for="<%= option.hash %>"><%= option.text %></label> <% }); %> </div> </div>';
  tpl['search/checkbox.html'] = ' <div class="pt-2"> <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="checkbox" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %> </div>';
  tpl['search/date_month.html'] = ' <input type="month" <%- attr %>>';
  tpl['search/date_range.html'] = ' <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>>';
  tpl['search/date.html'] = ' <input type="date" <%- attr %>>';
  tpl['search/datetime_range.html'] = ' <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>>';
  tpl['search/datetime.html'] = ' <input type="datetime-local" <%- attr %>>';
  tpl['search/number.html'] = ' <input type="number" <%- startAttr %>> <input type="number" <%- endAttr %>>';
  tpl['search/radio-btn.html'] = '<div class="pt-2"> <div class="btn-group"> <input class="btn-check" type="radio" name="<%= field %>" value="" id="<%= optionAllHash %>" autocomplete="off" <%= checkedAll ? \' checked\' : \'\' %>> <label class="<%= optionOptionsClass %>" for="<%= optionAllHash %>"><%= lang.all %></label> <% $.each(options, function(key, option) { %> <input class="btn-check" type="radio" name="<%= field %>" value="<%- option.value %>" id="<%= option.hash %>" autocomplete="off" <%= option.checked ? \' checked\' : \'\' %>"> <label class="<%= option.optionsClass %>" for="<%= option.hash %>"><%= option.text %></label> <% }); %> </div> </div>';
  tpl['search/radio.html'] = '<div class="pt-2"> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="radio" name="<%= field %>" value=""<%= checkedAll ? \' checked\' : \'\' %>> <%= lang.all %> </label> </div> <% $.each(options, function(key, option) { %> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="radio" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %> </div>';
  tpl['search/select.html'] = ' <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select>';
  tpl['search/switch.html'] = '<div class="form-check form-switch pt-2"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> </div>';
  tpl['search/text.html'] = ' <input type="text" <%- attr %>>';
  tpl['table.html'] = ' <table class="table <%= classes %> mb-0"> <colgroup> <% $.each(colGroups, function(key, columnGroup) { %> <col<% if (columnGroup.style) { %> style="<%= columnGroup.style %>"<% } %>/> <% }); %> </colgroup> <% if (showHeaders) { %> <thead<% if (theadAttr) { %> <%- theadAttr %>"<% } %>> <%- columnsHeader %> </thead> <% } %> <tbody></tbody> <% if (columnsFooter != \'\') { %> <tfoot> <%- columnsFooter %> </tfoot> <% } %> </table>';
  tpl['table/columns/footer.html'] = '<tr> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.content %></td> <% }); %> </tr>';
  tpl['table/columns/header.html'] = '<tr class="fw-medium bg-white"> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.content %></td> <% }); %> </tr>';
  tpl['table/columns/menu/button.html'] = '<li><button <%- attr%>><%- text %></button></li>';
  tpl['table/columns/menu/divider.html'] = '<li><hr class="dropdown-divider"></li>';
  tpl['table/columns/menu/header.html'] = '<li><h6 class="dropdown-header"><%- text %></h6></li>';
  tpl['table/columns/menu/link.html'] = '<li><a <%- attr%>><%- text %></a></li>';
  tpl['table/columns/td.html'] = '<td<%- attr%>> <span class="coreui-table__column-label"><%- label %></span> <% if (description) { %> <small class="coreui-table__column-description bi bi-question-circle text-body-secondary" title="<%= description %>" data-bs-toggle="tooltip" data-bs-placement="bottom"></small> <% } %> <% if (sortable === \'asc\') { %> <i class="coreui-table__column-sort bi bi-sort-down-alt"></i> <% } else if (sortable === \'desc\') { %> <i class="coreui-table__column-sort bi bi-sort-down"></i> <% } %> <% if (issetMenu) { %> <div class="dropdown d-inline fw-normal coreui-table__column-menu"> <span class="dropdown-toggle <%= menuShowAlways %>" data-bs-toggle="dropdown"> <i class="bi bi-three-dots-vertical"></i> </span> <ul class="dropdown-menu dropdown-menu-<%= menuPosition %>"></ul> </div> <% } %> </td>';
  tpl['table/columns/tr.html'] = '<tr class="fw-medium bg-white"></tr>';
  tpl['table/control.html'] = '<div id="coreui-table-control-<%= id %>" class="coreui-table__control"></div>';
  tpl['table/controls/footer-out.html'] = ' <div class="coreui-table__footer d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> </div>';
  tpl['table/controls/footer.html'] = ' <div class="coreui-table__footer ps-1 pe-1 d-flex justify-content-between border-top border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> </div>';
  tpl['table/controls/header-out.html'] = ' <div class="coreui-table__header d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> </div>';
  tpl['table/controls/header.html'] = ' <div class="coreui-table__header ps-1 pe-1 d-flex justify-content-between border-bottom border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> </div>';
  tpl['table/loader.html'] = '<div class="coreui-table-lock position-absolute w-100 top-0 bottom-0"> <div class="coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0"></div> <div class="coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary"> <div class="spinner-border text-secondary align-self-center"></div> <span class="lh-lg"><%= lang.loading %></span> </div> </div>';
  tpl['table/record.html'] = '<tr<%- attr %> data-record-index="<%= index %>"> <% $.each(fields, function(key, field) { %> <td<%- field.attr %>></td> <% }); %> </tr>';
  tpl['table/record/empty.html'] = '<tr class="coreui-table__record-empty"> <td class="text-center" colspan="<%= columnsCount %>"><%= lang.emptyRecords %></td> </tr>';
  tpl['table/record/expand.html'] = '<tr class="coreui-table__record-expanded" style="display: none"> <td colspan="<%= colspan %>"></td> </tr>';
  tpl['table/record/group.html'] = '<tr<%- attr %>> <td colspan="<%= colspan %>"></td> </tr>';

  (function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.ejs = f();
    }
  })(function () {
    return function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof require && require;
              if (!f && c) return c(i, !0);
              if (u) return u(i, !0);
              var a = new Error("Cannot find module '" + i + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var p = n[i] = {
              exports: {}
            };
            e[i][0].call(p.exports, function (r) {
              var n = e[i][1][r];
              return o(n || r);
            }, p, p.exports, r, e, n, t);
          }
          return n[i].exports;
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
      }
      return r;
    }()({
      1: [function (require, module, exports) {

        var fs = require("fs");
        var path = require("path");
        var utils = require("./utils");
        var scopeOptionWarned = false;
        var _VERSION_STRING = require("../package.json").version;
        var _DEFAULT_OPEN_DELIMITER = "<";
        var _DEFAULT_CLOSE_DELIMITER = ">";
        var _DEFAULT_DELIMITER = "%";
        var _DEFAULT_LOCALS_NAME = "locals";
        var _NAME = "ejs";
        var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
        var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
        var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
        var _BOM = /^\uFEFF/;
        var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
        exports.cache = utils.cache;
        exports.fileLoader = fs.readFileSync;
        exports.localsName = _DEFAULT_LOCALS_NAME;
        exports.promiseImpl = new Function("return this;")().Promise;
        exports.resolveInclude = function (name, filename, isDir) {
          var dirname = path.dirname;
          var extname = path.extname;
          var resolve = path.resolve;
          var includePath = resolve(isDir ? filename : dirname(filename), name);
          var ext = extname(name);
          if (!ext) {
            includePath += ".ejs";
          }
          return includePath;
        };
        function resolvePaths(name, paths) {
          var filePath;
          if (paths.some(function (v) {
            filePath = exports.resolveInclude(name, v, true);
            return fs.existsSync(filePath);
          })) {
            return filePath;
          }
        }
        function getIncludePath(path, options) {
          var includePath;
          var filePath;
          var views = options.views;
          var match = /^[A-Za-z]+:\\|^\//.exec(path);
          if (match && match.length) {
            path = path.replace(/^\/*/, "");
            if (Array.isArray(options.root)) {
              includePath = resolvePaths(path, options.root);
            } else {
              includePath = exports.resolveInclude(path, options.root || "/", true);
            }
          } else {
            if (options.filename) {
              filePath = exports.resolveInclude(path, options.filename);
              if (fs.existsSync(filePath)) {
                includePath = filePath;
              }
            }
            if (!includePath && Array.isArray(views)) {
              includePath = resolvePaths(path, views);
            }
            if (!includePath && typeof options.includer !== "function") {
              throw new Error('Could not find the include file "' + options.escapeFunction(path) + '"');
            }
          }
          return includePath;
        }
        function handleCache(options, template) {
          var func;
          var filename = options.filename;
          var hasTemplate = arguments.length > 1;
          if (options.cache) {
            if (!filename) {
              throw new Error("cache option requires a filename");
            }
            func = exports.cache.get(filename);
            if (func) {
              return func;
            }
            if (!hasTemplate) {
              template = fileLoader(filename).toString().replace(_BOM, "");
            }
          } else if (!hasTemplate) {
            if (!filename) {
              throw new Error("Internal EJS error: no file name or template " + "provided");
            }
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
          func = exports.compile(template, options);
          if (options.cache) {
            exports.cache.set(filename, func);
          }
          return func;
        }
        function tryHandleCache(options, data, cb) {
          var result;
          if (!cb) {
            if (typeof exports.promiseImpl == "function") {
              return new exports.promiseImpl(function (resolve, reject) {
                try {
                  result = handleCache(options)(data);
                  resolve(result);
                } catch (err) {
                  reject(err);
                }
              });
            } else {
              throw new Error("Please provide a callback function");
            }
          } else {
            try {
              result = handleCache(options)(data);
            } catch (err) {
              return cb(err);
            }
            cb(null, result);
          }
        }
        function fileLoader(filePath) {
          return exports.fileLoader(filePath);
        }
        function includeFile(path, options) {
          var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
          opts.filename = getIncludePath(path, opts);
          if (typeof options.includer === "function") {
            var includerResult = options.includer(path, opts.filename);
            if (includerResult) {
              if (includerResult.filename) {
                opts.filename = includerResult.filename;
              }
              if (includerResult.template) {
                return handleCache(opts, includerResult.template);
              }
            }
          }
          return handleCache(opts);
        }
        function rethrow(err, str, flnm, lineno, esc) {
          var lines = str.split("\n");
          var start = Math.max(lineno - 3, 0);
          var end = Math.min(lines.length, lineno + 3);
          var filename = esc(flnm);
          var context = lines.slice(start, end).map(function (line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
          }).join("\n");
          err.path = filename;
          err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
          throw err;
        }
        function stripSemi(str) {
          return str.replace(/;(\s*$)/, "$1");
        }
        exports.compile = function compile(template, opts) {
          var templ;
          if (opts && opts.scope) {
            if (!scopeOptionWarned) {
              console.warn("`scope` option is deprecated and will be removed in EJS 3");
              scopeOptionWarned = true;
            }
            if (!opts.context) {
              opts.context = opts.scope;
            }
            delete opts.scope;
          }
          templ = new Template(template, opts);
          return templ.compile();
        };
        exports.render = function (template, d, o) {
          var data = d || utils.createNullProtoObjWherePossible();
          var opts = o || utils.createNullProtoObjWherePossible();
          if (arguments.length == 2) {
            utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
          }
          return handleCache(opts, template)(data);
        };
        exports.renderFile = function () {
          var args = Array.prototype.slice.call(arguments);
          var filename = args.shift();
          var cb;
          var opts = {
            filename: filename
          };
          var data;
          var viewOpts;
          if (typeof arguments[arguments.length - 1] == "function") {
            cb = args.pop();
          }
          if (args.length) {
            data = args.shift();
            if (args.length) {
              utils.shallowCopy(opts, args.pop());
            } else {
              if (data.settings) {
                if (data.settings.views) {
                  opts.views = data.settings.views;
                }
                if (data.settings["view cache"]) {
                  opts.cache = true;
                }
                viewOpts = data.settings["view options"];
                if (viewOpts) {
                  utils.shallowCopy(opts, viewOpts);
                }
              }
              utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
            }
            opts.filename = filename;
          } else {
            data = utils.createNullProtoObjWherePossible();
          }
          return tryHandleCache(opts, data, cb);
        };
        exports.Template = Template;
        exports.clearCache = function () {
          exports.cache.reset();
        };
        function Template(text, optsParam) {
          var opts = utils.hasOwnOnlyObject(optsParam);
          var options = utils.createNullProtoObjWherePossible();
          this.templateText = text;
          this.mode = null;
          this.truncate = false;
          this.currentLine = 1;
          this.source = "";
          options.client = opts.client || false;
          options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
          options.compileDebug = opts.compileDebug !== false;
          options.debug = !!opts.debug;
          options.filename = opts.filename;
          options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
          options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
          options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
          options.strict = opts.strict || false;
          options.context = opts.context;
          options.cache = opts.cache || false;
          options.rmWhitespace = opts.rmWhitespace;
          options.root = opts.root;
          options.includer = opts.includer;
          options.outputFunctionName = opts.outputFunctionName;
          options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
          options.views = opts.views;
          options.async = opts.async;
          options.destructuredLocals = opts.destructuredLocals;
          options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
          if (options.strict) {
            options._with = false;
          } else {
            options._with = typeof opts._with != "undefined" ? opts._with : true;
          }
          this.opts = options;
          this.regex = this.createRegex();
        }
        Template.modes = {
          EVAL: "eval",
          ESCAPED: "escaped",
          RAW: "raw",
          COMMENT: "comment",
          LITERAL: "literal"
        };
        Template.prototype = {
          createRegex: function () {
            var str = _REGEX_STRING;
            var delim = utils.escapeRegExpChars(this.opts.delimiter);
            var open = utils.escapeRegExpChars(this.opts.openDelimiter);
            var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
            str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
            return new RegExp(str);
          },
          compile: function () {
            var src;
            var fn;
            var opts = this.opts;
            var prepended = "";
            var appended = "";
            var escapeFn = opts.escapeFunction;
            var ctor;
            var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
            if (!this.source) {
              this.generateSource();
              prepended += '  var __output = "";\n' + "  function __append(s) { if (s !== undefined && s !== null) __output += s }\n";
              if (opts.outputFunctionName) {
                if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                  throw new Error("outputFunctionName is not a valid JS identifier.");
                }
                prepended += "  var " + opts.outputFunctionName + " = __append;" + "\n";
              }
              if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
                throw new Error("localsName is not a valid JS identifier.");
              }
              if (opts.destructuredLocals && opts.destructuredLocals.length) {
                var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
                for (var i = 0; i < opts.destructuredLocals.length; i++) {
                  var name = opts.destructuredLocals[i];
                  if (!_JS_IDENTIFIER.test(name)) {
                    throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                  }
                  if (i > 0) {
                    destructuring += ",\n  ";
                  }
                  destructuring += name + " = __locals." + name;
                }
                prepended += destructuring + ";\n";
              }
              if (opts._with !== false) {
                prepended += "  with (" + opts.localsName + " || {}) {" + "\n";
                appended += "  }" + "\n";
              }
              appended += "  return __output;" + "\n";
              this.source = prepended + this.source + appended;
            }
            if (opts.compileDebug) {
              src = "var __line = 1" + "\n" + "  , __lines = " + JSON.stringify(this.templateText) + "\n" + "  , __filename = " + sanitizedFilename + ";" + "\n" + "try {" + "\n" + this.source + "} catch (e) {" + "\n" + "  rethrow(e, __lines, __filename, __line, escapeFn);" + "\n" + "}" + "\n";
            } else {
              src = this.source;
            }
            if (opts.client) {
              src = "escapeFn = escapeFn || " + escapeFn.toString() + ";" + "\n" + src;
              if (opts.compileDebug) {
                src = "rethrow = rethrow || " + rethrow.toString() + ";" + "\n" + src;
              }
            }
            if (opts.strict) {
              src = '"use strict";\n' + src;
            }
            if (opts.debug) {
              console.log(src);
            }
            if (opts.compileDebug && opts.filename) {
              src = src + "\n" + "//# sourceURL=" + sanitizedFilename + "\n";
            }
            try {
              if (opts.async) {
                try {
                  ctor = new Function("return (async function(){}).constructor;")();
                } catch (e) {
                  if (e instanceof SyntaxError) {
                    throw new Error("This environment does not support async/await");
                  } else {
                    throw e;
                  }
                }
              } else {
                ctor = Function;
              }
              fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
            } catch (e) {
              if (e instanceof SyntaxError) {
                if (opts.filename) {
                  e.message += " in " + opts.filename;
                }
                e.message += " while compiling ejs\n\n";
                e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
                e.message += "https://github.com/RyanZim/EJS-Lint";
                if (!opts.async) {
                  e.message += "\n";
                  e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
                }
              }
              throw e;
            }
            var returnedFn = opts.client ? fn : function anonymous(data) {
              var include = function (path, includeData) {
                var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
                if (includeData) {
                  d = utils.shallowCopy(d, includeData);
                }
                return includeFile(path, opts)(d);
              };
              return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
            };
            if (opts.filename && typeof Object.defineProperty === "function") {
              var filename = opts.filename;
              var basename = path.basename(filename, path.extname(filename));
              try {
                Object.defineProperty(returnedFn, "name", {
                  value: basename,
                  writable: false,
                  enumerable: false,
                  configurable: true
                });
              } catch (e) {}
            }
            return returnedFn;
          },
          generateSource: function () {
            var opts = this.opts;
            if (opts.rmWhitespace) {
              this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
            }
            this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
            var self = this;
            var matches = this.parseTemplateText();
            var d = this.opts.delimiter;
            var o = this.opts.openDelimiter;
            var c = this.opts.closeDelimiter;
            if (matches && matches.length) {
              matches.forEach(function (line, index) {
                var closing;
                if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                  closing = matches[index + 2];
                  if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                    throw new Error('Could not find matching close tag for "' + line + '".');
                  }
                }
                self.scanLine(line);
              });
            }
          },
          parseTemplateText: function () {
            var str = this.templateText;
            var pat = this.regex;
            var result = pat.exec(str);
            var arr = [];
            var firstPos;
            while (result) {
              firstPos = result.index;
              if (firstPos !== 0) {
                arr.push(str.substring(0, firstPos));
                str = str.slice(firstPos);
              }
              arr.push(result[0]);
              str = str.slice(result[0].length);
              result = pat.exec(str);
            }
            if (str) {
              arr.push(str);
            }
            return arr;
          },
          _addOutput: function (line) {
            if (this.truncate) {
              line = line.replace(/^(?:\r\n|\r|\n)/, "");
              this.truncate = false;
            }
            if (!line) {
              return line;
            }
            line = line.replace(/\\/g, "\\\\");
            line = line.replace(/\n/g, "\\n");
            line = line.replace(/\r/g, "\\r");
            line = line.replace(/"/g, '\\"');
            this.source += '    ; __append("' + line + '")' + "\n";
          },
          scanLine: function (line) {
            var self = this;
            var d = this.opts.delimiter;
            var o = this.opts.openDelimiter;
            var c = this.opts.closeDelimiter;
            var newLineCount = 0;
            newLineCount = line.split("\n").length - 1;
            switch (line) {
              case o + d:
              case o + d + "_":
                this.mode = Template.modes.EVAL;
                break;
              case o + d + "=":
                this.mode = Template.modes.ESCAPED;
                break;
              case o + d + "-":
                this.mode = Template.modes.RAW;
                break;
              case o + d + "#":
                this.mode = Template.modes.COMMENT;
                break;
              case o + d + d:
                this.mode = Template.modes.LITERAL;
                this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + "\n";
                break;
              case d + d + c:
                this.mode = Template.modes.LITERAL;
                this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + "\n";
                break;
              case d + c:
              case "-" + d + c:
              case "_" + d + c:
                if (this.mode == Template.modes.LITERAL) {
                  this._addOutput(line);
                }
                this.mode = null;
                this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
                break;
              default:
                if (this.mode) {
                  switch (this.mode) {
                    case Template.modes.EVAL:
                    case Template.modes.ESCAPED:
                    case Template.modes.RAW:
                      if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                        line += "\n";
                      }
                  }
                  switch (this.mode) {
                    case Template.modes.EVAL:
                      this.source += "    ; " + line + "\n";
                      break;
                    case Template.modes.ESCAPED:
                      this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))" + "\n";
                      break;
                    case Template.modes.RAW:
                      this.source += "    ; __append(" + stripSemi(line) + ")" + "\n";
                      break;
                    case Template.modes.COMMENT:
                      break;
                    case Template.modes.LITERAL:
                      this._addOutput(line);
                      break;
                  }
                } else {
                  this._addOutput(line);
                }
            }
            if (self.opts.compileDebug && newLineCount) {
              this.currentLine += newLineCount;
              this.source += "    ; __line = " + this.currentLine + "\n";
            }
          }
        };
        exports.escapeXML = utils.escapeXML;
        exports.__express = exports.renderFile;
        exports.VERSION = _VERSION_STRING;
        exports.name = _NAME;
        if (typeof window != "undefined") {
          window.ejs = exports;
        }
      }, {
        "../package.json": 6,
        "./utils": 2,
        fs: 3,
        path: 4
      }],
      2: [function (require, module, exports) {

        var regExpChars = /[|\\{}()[\]^$+*?.]/g;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var hasOwn = function (obj, key) {
          return hasOwnProperty.apply(obj, [key]);
        };
        exports.escapeRegExpChars = function (string) {
          if (!string) {
            return "";
          }
          return String(string).replace(regExpChars, "\\$&");
        };
        var _ENCODE_HTML_RULES = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&#34;",
          "'": "&#39;"
        };
        var _MATCH_HTML = /[&<>'"]/g;
        function encode_char(c) {
          return _ENCODE_HTML_RULES[c] || c;
        }
        var escapeFuncStr = "var _ENCODE_HTML_RULES = {\n" + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + "    }\n" + "  , _MATCH_HTML = /[&<>'\"]/g;\n" + "function encode_char(c) {\n" + "  return _ENCODE_HTML_RULES[c] || c;\n" + "};\n";
        exports.escapeXML = function (markup) {
          return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
        };
        function escapeXMLToString() {
          return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
        }
        try {
          if (typeof Object.defineProperty === "function") {
            Object.defineProperty(exports.escapeXML, "toString", {
              value: escapeXMLToString
            });
          } else {
            exports.escapeXML.toString = escapeXMLToString;
          }
        } catch (err) {
          console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
        }
        exports.shallowCopy = function (to, from) {
          from = from || {};
          if (to !== null && to !== undefined) {
            for (var p in from) {
              if (!hasOwn(from, p)) {
                continue;
              }
              if (p === "__proto__" || p === "constructor") {
                continue;
              }
              to[p] = from[p];
            }
          }
          return to;
        };
        exports.shallowCopyFromList = function (to, from, list) {
          list = list || [];
          from = from || {};
          if (to !== null && to !== undefined) {
            for (var i = 0; i < list.length; i++) {
              var p = list[i];
              if (typeof from[p] != "undefined") {
                if (!hasOwn(from, p)) {
                  continue;
                }
                if (p === "__proto__" || p === "constructor") {
                  continue;
                }
                to[p] = from[p];
              }
            }
          }
          return to;
        };
        exports.cache = {
          _data: {},
          set: function (key, val) {
            this._data[key] = val;
          },
          get: function (key) {
            return this._data[key];
          },
          remove: function (key) {
            delete this._data[key];
          },
          reset: function () {
            this._data = {};
          }
        };
        exports.hyphenToCamel = function (str) {
          return str.replace(/-[a-z]/g, function (match) {
            return match[1].toUpperCase();
          });
        };
        exports.createNullProtoObjWherePossible = function () {
          if (typeof Object.create == "function") {
            return function () {
              return Object.create(null);
            };
          }
          if (!({
            __proto__: null
          } instanceof Object)) {
            return function () {
              return {
                __proto__: null
              };
            };
          }
          return function () {
            return {};
          };
        }();
        exports.hasOwnOnlyObject = function (obj) {
          var o = exports.createNullProtoObjWherePossible();
          for (var p in obj) {
            if (hasOwn(obj, p)) {
              o[p] = obj[p];
            }
          }
          return o;
        };
      }, {}],
      3: [function (require, module, exports) {}, {}],
      4: [function (require, module, exports) {
        (function (process) {
          function normalizeArray(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          }
          exports.resolve = function () {
            var resolvedPath = "",
              resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : process.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                continue;
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function (p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          };
          exports.normalize = function (path) {
            var isAbsolute = exports.isAbsolute(path),
              trailingSlash = substr(path, -1) === "/";
            path = normalizeArray(filter(path.split("/"), function (p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          };
          exports.isAbsolute = function (path) {
            return path.charAt(0) === "/";
          };
          exports.join = function () {
            var paths = Array.prototype.slice.call(arguments, 0);
            return exports.normalize(filter(paths, function (p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/"));
          };
          exports.relative = function (from, to) {
            from = exports.resolve(from).substr(1);
            to = exports.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "") break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "") break;
              }
              if (start > end) return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          };
          exports.sep = "/";
          exports.delimiter = ":";
          exports.dirname = function (path) {
            if (typeof path !== "string") path = path + "";
            if (path.length === 0) return ".";
            var code = path.charCodeAt(0);
            var hasRoot = code === 47;
            var end = -1;
            var matchedSlash = true;
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  end = i;
                  break;
                }
              } else {
                matchedSlash = false;
              }
            }
            if (end === -1) return hasRoot ? "/" : ".";
            if (hasRoot && end === 1) {
              return "/";
            }
            return path.slice(0, end);
          };
          function basename(path) {
            if (typeof path !== "string") path = path + "";
            var start = 0;
            var end = -1;
            var matchedSlash = true;
            var i;
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1) return "";
            return path.slice(start, end);
          }
          exports.basename = function (path, ext) {
            var f = basename(path);
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length);
            }
            return f;
          };
          exports.extname = function (path) {
            if (typeof path !== "string") path = path + "";
            var startDot = -1;
            var startPart = 0;
            var end = -1;
            var matchedSlash = true;
            var preDotState = 0;
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  startPart = i + 1;
                  break;
                }
                continue;
              }
              if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
              if (code === 46) {
                if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
              } else if (startDot !== -1) {
                preDotState = -1;
              }
            }
            if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
              return "";
            }
            return path.slice(startDot, end);
          };
          function filter(xs, f) {
            if (xs.filter) return xs.filter(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs)) res.push(xs[i]);
            }
            return res;
          }
          var substr = "ab".substr(-1) === "b" ? function (str, start, len) {
            return str.substr(start, len);
          } : function (str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
          };
        }).call(this, require("_process"));
      }, {
        _process: 5
      }],
      5: [function (require, module, exports) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function () {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process.nextTick = function (fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function () {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function (name) {
          return [];
        };
        process.binding = function (name) {
          throw new Error("process.binding is not supported");
        };
        process.cwd = function () {
          return "/";
        };
        process.chdir = function (dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function () {
          return 0;
        };
      }, {}],
      6: [function (require, module, exports) {
        module.exports = {
          name: "ejs",
          description: "Embedded JavaScript templates",
          keywords: ["template", "engine", "ejs"],
          version: "3.1.9",
          author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
          license: "Apache-2.0",
          bin: {
            ejs: "./bin/cli.js"
          },
          main: "./lib/ejs.js",
          jsdelivr: "ejs.min.js",
          unpkg: "ejs.min.js",
          repository: {
            type: "git",
            url: "git://github.com/mde/ejs.git"
          },
          bugs: "https://github.com/mde/ejs/issues",
          homepage: "https://github.com/mde/ejs",
          dependencies: {
            jake: "^10.8.5"
          },
          devDependencies: {
            browserify: "^16.5.1",
            eslint: "^6.8.0",
            "git-directory-deploy": "^1.5.1",
            jsdoc: "^4.0.2",
            "lru-cache": "^4.0.1",
            mocha: "^10.2.0",
            "uglify-js": "^3.3.16"
          },
          engines: {
            node: ">=0.10.0"
          },
          scripts: {
            test: "npx jake test"
          }
        };
      }, {}]
    }, {}, [1])(1);
  });

  var coreuiTableUtils = {
    _templates: {},
    /**
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    mergeAttr: function mergeAttr(attr1, attr2) {
      var mergeAttr = Object.assign({}, attr1);
      if (_typeof(attr2) === 'object') {
        $.each(attr2, function (name, value) {
          if (mergeAttr.hasOwnProperty(name)) {
            if (name === 'class') {
              mergeAttr[name] += ' ' + value;
            } else if (name === 'style') {
              mergeAttr[name] += ';' + value;
            } else {
              mergeAttr[name] = value;
            }
          } else {
            mergeAttr[name] = value;
          }
        });
      }
      return mergeAttr;
    },
    /**
     * Проверка на число
     * @param num
     * @returns {boolean}
     * @private
     */
    isNumeric: function isNumeric(num) {
      return (typeof num === 'number' || typeof num === "string" && num.trim() !== '') && !isNaN(num);
    },
    /**
     * @returns {string}
     * @private
     */
    hashCode: function hashCode() {
      return this.crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },
    /**
     * Проверка на объект
     * @param value
     */
    isObject: function isObject(value) {
      return _typeof(value) === 'object' && !Array.isArray(value) && value !== null;
    },
    /**
     * @param str
     * @returns {number}
     */
    crc32: function crc32(str) {
      for (var a, o = [], c = 0; c < 256; c++) {
        a = c;
        for (var f = 0; f < 8; f++) {
          a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
        }
        o[c] = a;
      }
      for (var n = -1, t = 0; t < str.length; t++) {
        n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))];
      }
      return (-1 ^ n) >>> 0;
    },
    /**
     * Рендер шаблона
     * @param {string} template
     * @param {object} options
     * @returns {string}
     */
    render: function render(template, options) {
      var tplName = this.crc32(template);
      if (!this._templates.hasOwnProperty(tplName)) {
        this._templates[tplName] = ejs.compile(template);
      }
      return this._templates[tplName](options);
    }
  };

  var coreuiTableRender = {
    /**
     * Сборка таблицы
     * @param {object} table
     * @private
     */
    renderTable: function renderTable(table) {
      var options = table.getOptions();
      var recordsElements = [];
      var columnsHeader = '';
      var columnsFooter = '';
      var colGroups = [];
      var columnElements = $(tpl['table/columns/tr.html']);

      // Колонки
      if (table._columns.length > 0) {
        $.each(table._columns, function (key, column) {
          if (!column.isShow()) {
            return;
          }
          var columnOptions = column.getOptions();
          var attributes = [];
          var sortable = null;
          var menuElements = [];
          var menuShowAlways = '';
          var menuPosition = 'end';
          if (columnOptions.hasOwnProperty('field') && typeof columnOptions.field === 'string') {
            columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
              "data-field": columnOptions.field
            });
          }
          if (columnOptions.hasOwnProperty('fixed') && typeof columnOptions.fixed === 'string') {
            columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
              "class": 'coreui-table__fixed_' + columnOptions.fixed
            });
            columnOptions.attr = coreuiTableUtils.mergeAttr(columnOptions.attr, {
              "class": 'coreui-table__fixed_' + columnOptions.fixed
            });
          }
          if (columnOptions.type !== 'numbers') {
            if (columnOptions.hasOwnProperty('sortable') && columnOptions.sortable) {
              columnOptions.attrHeader = coreuiTableUtils.mergeAttr(columnOptions.attrHeader, {
                "class": 'coreui-table__sortable'
              });
            }
            if (table._sort.length > 0 && columnOptions.hasOwnProperty('field') && typeof columnOptions.field === 'string' && columnOptions.field) {
              $.each(table._sort, function (key, sortField) {
                if (columnOptions.field === sortField.field) {
                  if (sortField.order === 'asc') {
                    sortable = 'asc';
                  } else if (sortField.order === 'desc') {
                    sortable = 'desc';
                  }
                  return false;
                }
              });
            }
          }
          if (options.showHeaders && columnOptions.hasOwnProperty('menu') && coreuiTableUtils.isObject(columnOptions.menu) && columnOptions.menu.hasOwnProperty('items') && Array.isArray(columnOptions.menu.items)) {
            if (columnOptions.menu.hasOwnProperty('showAlways') && columnOptions.menu.showAlways) {
              menuShowAlways = 'coreui-table__column-menu-always';
            }
            if (columnOptions.menu.hasOwnProperty('position') && typeof columnOptions.menu.position === 'string') {
              menuPosition = columnOptions.menu.position;
            }
            columnOptions.menu.items.map(function (item) {
              if (coreuiTableUtils.isObject(item) && item.hasOwnProperty('type') && typeof item.type === 'string' && item.type) {
                switch (item.type.toLowerCase()) {
                  case 'button':
                    if (item.hasOwnProperty('text') && typeof item.text === 'string' && item.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0 && item.text.length > 0) {
                      var attrItem = [];
                      var attr = {
                        type: 'button',
                        "class": 'dropdown-item'
                      };
                      if (item.hasOwnProperty('attr') && coreuiTableUtils.isObject(item.attr)) {
                        attr = coreuiTableUtils.mergeAttr(attr, item.attr);
                      }
                      $.each(attr, function (name, value) {
                        attrItem.push(name + '="' + value + '"');
                      });
                      var menuElement = $(coreuiTableUtils.render(tpl['table/columns/menu/button.html'], {
                        text: item.text,
                        attr: attrItem.join(' ')
                      }));
                      menuElement.find('button').click(function () {
                        if (typeof item.onClick === 'function') {
                          item.onClick(table);
                        } else if (typeof item.onClick === 'string') {
                          new Function('table', item.onClick)(table);
                        }
                      });
                      menuElements.push(menuElement);
                    }
                    break;
                  case 'link':
                    if (item.hasOwnProperty('text') && item.hasOwnProperty('url') && typeof item.text === 'string' && typeof item.url === 'string' && item.text.length > 0 && item.url.length > 0) {
                      var _attrItem = [];
                      var _attr = {
                        href: item.url,
                        "class": 'dropdown-item'
                      };
                      if (item.hasOwnProperty('attr') && coreuiTableUtils.isObject(item.attr)) {
                        _attr = coreuiTableUtils.mergeAttr(_attr, item.attr);
                      }
                      $.each(_attr, function (name, value) {
                        _attrItem.push(name + '="' + value + '"');
                      });
                      menuElements.push($(coreuiTableUtils.render(tpl['table/columns/menu/link.html'], {
                        text: item.text,
                        attr: _attrItem.join(' ')
                      })));
                    }
                    break;
                  case 'divider':
                    menuElements.push($(tpl['table/columns/menu/divider.html']));
                    break;
                  case 'header':
                    menuElements.push($(coreuiTableUtils.render(tpl['table/columns/menu/header.html'], {
                      text: item.text
                    })));
                    break;
                }
              }
            });
          }
          if (columnOptions.attrHeader && coreuiTableUtils.isObject(columnOptions.attrHeader)) {
            $.each(columnOptions.attrHeader, function (name, value) {
              attributes.push(name + '="' + value + '"');
            });
          }
          var style = [];
          if (columnOptions.hasOwnProperty('width') && ['string', 'number'].indexOf(_typeof(columnOptions.width)) >= 0) {
            var unit = typeof columnOptions.width === 'number' ? 'px' : '';
            style.push('width:' + columnOptions.width + unit);
          }
          if (columnOptions.hasOwnProperty('minWidth') && ['string', 'number'].indexOf(_typeof(columnOptions.minWidth)) >= 0) {
            var _unit = typeof columnOptions.minWidth === 'number' ? 'px' : '';
            style.push('min-width:' + columnOptions.minWidth + _unit);
          }
          if (columnOptions.hasOwnProperty('maxWidth') && ['string', 'number'].indexOf(_typeof(columnOptions.maxWidth)) >= 0) {
            var _unit2 = typeof columnOptions.maxWidth === 'number' ? 'px' : '';
            style.push('max-width:' + columnOptions.maxWidth + _unit2);
          }
          colGroups.push({
            style: style.length > 0 ? style.join(';') : ''
          });
          if (options.showHeaders) {
            var label = '';
            var description = '';
            if (columnOptions.hasOwnProperty('label') && typeof columnOptions.label === 'string' && (!columnOptions.hasOwnProperty('showLabel') || columnOptions.showLabel)) {
              label = columnOptions.label;
            }
            if (columnOptions.hasOwnProperty('description') && typeof columnOptions.label === 'string') {
              description = columnOptions.description;
            }
            var columnElement = $(coreuiTableUtils.render(tpl['table/columns/td.html'], {
              attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
              label: label,
              description: description,
              sortable: sortable,
              issetMenu: menuElements.length > 0,
              menuPosition: menuPosition,
              menuShowAlways: menuShowAlways ? ' ' + menuShowAlways : ''
            }));
            if (menuElements.length) {
              var menuContainer = columnElement.find('.coreui-table__column-menu ul');
              var menuButton = columnElement.find('.coreui-table__column-menu .dropdown-toggle');
              menuButton.click(function (event) {
                event.originalEvent.cancelBubble = true;
              });
              menuElements.map(function (element) {
                menuContainer.append(element);
              });
            }
            columnElements.append(columnElement);
          }
        });
      }

      // Строки
      if (table._records.length > 0) {
        table._recordsTotal = table.getRecordsCount();
        table._recordsNumber = table._page === 1 ? 1 : (table._page - 1) * table._recordsPerPage + 1;
        recordsElements = coreuiTableRender.renderRecords(table, table._records);
      } else {
        recordsElements = coreuiTableRender.renderRecords(table, []);
      }
      if (options.showHeaders && options.hasOwnProperty('columnsHeader') && Array.isArray(options.columnsHeader) && options.columnsHeader.length > 0) {
        var rows = [];
        $.each(options.columnsHeader, function (key, headerRow) {
          if (Array.isArray(headerRow)) {
            var cells = [];
            $.each(headerRow, function (key, headerColumn) {
              if (coreuiTableUtils.isObject(headerColumn)) {
                var attributes = [];
                if (headerColumn.hasOwnProperty('attr') && coreuiTableUtils.isObject(headerColumn.attr)) {
                  $.each(headerColumn.attr, function (name, value) {
                    attributes.push(name + '="' + value + '"');
                  });
                }
                cells.push({
                  content: headerColumn.hasOwnProperty('content') ? headerColumn.content : '',
                  description: headerColumn.hasOwnProperty('description') ? headerColumn.description : '',
                  attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
                });
              }
            });
            rows.push(coreuiTableUtils.render(tpl['table/columns/header.html'], {
              columns: cells
            }));
          }
        });
        columnsHeader = rows.join('');
      }
      if (options.hasOwnProperty('columnsFooter') && Array.isArray(options.columnsFooter) && options.columnsFooter.length > 0) {
        var _rows = [];
        $.each(options.columnsFooter, function (key, footerRow) {
          if (Array.isArray(footerRow)) {
            var cells = [];
            $.each(footerRow, function (key, footerColumn) {
              if (coreuiTableUtils.isObject(footerColumn)) {
                var attributes = [];
                if (footerColumn.hasOwnProperty('attr') && coreuiTableUtils.isObject(footerColumn.attr)) {
                  $.each(footerColumn.attr, function (name, value) {
                    attributes.push(name + '="' + value + '"');
                  });
                }
                cells.push({
                  content: footerColumn.hasOwnProperty('content') ? footerColumn.content : '',
                  description: footerColumn.hasOwnProperty('description') ? footerColumn.description : '',
                  attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
                });
              }
            });
            _rows.push(coreuiTableUtils.render(tpl['table/columns/footer.html'], {
              columns: cells
            }));
          }
        });
        columnsFooter = _rows.join('');
      }
      var classes = [];
      if (typeof options["class"] === 'string' && options["class"]) {
        classes.push(options["class"]);
      }
      if (!columnsFooter) {
        classes.push('empty-tfoot');
      }
      var theadAttr = [];
      if (options.hasOwnProperty('theadTop') && ['string', 'number'].indexOf(_typeof(options.theadTop)) >= 0) {
        var unit = coreuiTableUtils.isNumeric(options.theadTop) ? 'px' : '';
        theadAttr.push('style="top:' + options.theadTop + unit + '"');
      }
      var tableElement = $(coreuiTableUtils.render(tpl['table.html'], {
        classes: classes.join(' '),
        theadAttr: theadAttr.length > 0 ? theadAttr.join(' ') : '',
        showHeaders: options.showHeaders,
        columnsHeader: columnsHeader,
        colGroups: colGroups,
        columnsFooter: columnsFooter
      }));
      if (options.showHeaders) {
        tableElement.find('thead').append(columnElements);
      }
      var tbody = tableElement.find('tbody');
      recordsElements.map(function (recordElement) {
        tbody.append(recordElement);
      });
      return tableElement;
    },
    /**
     * Сборка записей таблицы
     * @param {object} table
     * @param {Array}  records
     * @return {Array}
     */
    renderRecords: function renderRecords(table, records) {
      var renderRecords = [];
      if (records.length > 0) {
        var that = this;
        var options = table.getOptions();
        var group = options.hasOwnProperty('group') && coreuiTableUtils.isObject(options.group) && options.group.hasOwnProperty('field') && typeof options.group.field === 'string' && options.group.field ? options.group : null;
        var groupValue = null;
        $.each(records, function (key, record) {
          if (record.show) {
            if (group && record.data.hasOwnProperty(group.field) && ['string', 'number'].indexOf(_typeof(record.data[group.field])) >= 0 && groupValue != record.data[group.field]) {
              groupValue = record.data[group.field];
              renderRecords.push(that.renderGroup(table, group, record));
            }
            renderRecords.push(that.renderRecord(table, record));
            table._recordsNumber++;
          }
        });
      }
      if (renderRecords.length === 0) {
        renderRecords = [$(coreuiTableUtils.render(tpl['table/record/empty.html'], {
          columnsCount: table._countColumnsShow,
          lang: table.getLang()
        }))];
      }
      return renderRecords;
    },
    /**
     * Сборка записи таблицы
     * @param {object} table
     * @param {object} record
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    renderRecord: function renderRecord(table, record) {
      var that = this;
      var options = table.getOptions();
      var fields = [];
      var recordAttr = {
        "class": 'coreui-table__record'
      };
      record = $.extend(true, {}, record);
      $.each(table._columns, function (key, column) {
        if (!column.isShow()) {
          return;
        }
        var field = that.renderField(table, column, record);
        if (field) {
          fields.push(field);
        }
      });
      if (typeof options.onClickUrl === 'string' && options.onClickUrl) {
        recordAttr["class"] += ' coreui-table_pointer';
      }
      if (record.meta) {
        recordAttr = coreuiTableUtils.mergeAttr(recordAttr, record.meta.attr);
      }
      var attributes = [];
      $.each(recordAttr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      var recordElement = $(coreuiTableUtils.render(tpl['table/record.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        index: record.index,
        fields: fields
      }));
      $.each(fields, function (key, field) {
        $(recordElement[0].querySelector(':scope > td:nth-child(' + (key + 1) + ')')).append(field.content);
      });
      return recordElement;
    },
    /**
     * Сборка ячейки таблицы
     * @param {object} table
     * @param {object} column
     * @param {object} record
     * @returns {{ attr: (string), content: (string) }}
     * @private
     */
    renderField: function renderField(table, column, record) {
      var columnOptions = column.getOptions();
      var columnField = typeof columnOptions.field === 'string' ? columnOptions.field : null;
      var content = null;
      var fieldProps = record.meta && record.meta.hasOwnProperty('fields') && record.meta.fields.hasOwnProperty(columnField) ? record.meta.fields[columnField] : null;
      var fieldAttr = columnOptions.hasOwnProperty('attr') && coreuiTableUtils.isObject(columnOptions.attr) ? columnOptions.attr : {};
      if (fieldProps && coreuiTableUtils.isObject(fieldProps)) {
        if (fieldProps && fieldProps.hasOwnProperty('show') && !fieldProps.show) {
          return null;
        }
        if (coreuiTableUtils.isObject(fieldProps.attr)) {
          fieldAttr = coreuiTableUtils.mergeAttr(fieldAttr, fieldProps.attr);
        }
      }
      if (columnOptions.hasOwnProperty('fixed') && typeof columnOptions.fixed === 'string') {
        fieldAttr = coreuiTableUtils.mergeAttr(fieldAttr, {
          "class": 'coreui-table__fixed_' + columnOptions.fixed
        });
      }
      if (typeof columnOptions.render === 'function') {
        content = columnOptions.render({
          data: record.data,
          meta: record.meta,
          index: record.index
        }, table);
      } else {
        content = columnField && record.data.hasOwnProperty(columnField) ? record.data[columnField] : null;
      }
      content = column.render(content, record);
      var fieldAttrResult = [];
      $.each(fieldAttr, function (name, value) {
        fieldAttrResult.push(name + '="' + value + '"');
      });
      return {
        attr: fieldAttrResult.length > 0 ? ' ' + fieldAttrResult.join(' ') : '',
        content: content
      };
    },
    /**
     * Сборка записи-группы
     * @param {object} table
     * @param {object} group
     * @param {object} record
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    renderGroup: function renderGroup(table, group, record) {
      var attr = group.hasOwnProperty('attr') && coreuiTableUtils.isObject(group.attr) ? group.attr : {};
      if (attr.hasOwnProperty('class') && typeof attr["class"] === 'string') {
        attr["class"] += ' coreui-table__record-group';
      } else {
        attr["class"] = 'coreui-table__record-group';
      }
      var attributes = [];
      $.each(attr, function (name, value) {
        if (typeof value === 'string') {
          attributes.push(name + '="' + value + '"');
        }
      });
      var recordElement = $(coreuiTableUtils.render(tpl['table/record/group.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        colspan: table._countColumnsShow
      }));
      var content = record.data[group.field];
      if (group.hasOwnProperty('render') && typeof group.render === 'function') {
        var renderContent = group.render(record);
        if (renderContent) {
          content = renderContent;
        }
      }
      recordElement.find(' > td').html(content);
      return recordElement;
    },
    /**
     * Сборка раскрывающейся строки
     * @param {object}       table
     * @param {Array|string} content
     */
    renderExpand: function renderExpand(table, content) {
      if (_typeof(content) === 'object') {
        content = coreuiTableRender.renderComponents(table, content, 'record_expand_show');
      }
      var expandRecord = $(coreuiTableUtils.render(tpl['table/record/expand.html'], {
        colspan: table._countColumnsShow
      }));
      if (['string', 'number'].indexOf(_typeof(content)) >= 0) {
        expandRecord.find('td').html(content);
      } else if (Array.isArray(content)) {
        $.each(content, function (key, item) {
          if (['string', 'number'].indexOf(_typeof(item)) >= 0 || item instanceof HTMLElement || window.hasOwnProperty('jQuery') && item instanceof jQuery) {
            expandRecord.find('td').append(item);
          }
        });
      }
      return expandRecord;
    },
    /**
     * Сборка элемента управления
     * @param {object} table
     * @param {object} control
     * @private
     * @returns {HTMLElement|jQuery}
     */
    renderControl: function renderControl(table, control) {
      if (coreuiTableUtils.isObject(control)) {
        var controlElement = $(coreuiTableUtils.render(tpl['table/control.html'], {
          id: control.getId()
        }));
        controlElement.append(control.render());
        if (control.hasOwnProperty('initEvents') && typeof control.initEvents === 'function') {
          table.on('container_show', function () {
            control.initEvents();
          });
        }
        return controlElement;
      }
    },
    /**
     * Формирование контента компонента
     * @param {object} table
     * @param {object} components
     * @param {string} eventName
     * @return {Array}
     */
    renderComponents: function renderComponents(table, components, eventName) {
      var result = [];
      if (components instanceof Object) {
        if (!Array.isArray(components)) {
          components = [components];
        }
        for (var i = 0; i < components.length; i++) {
          if (typeof components[i] === 'string') {
            result.push(components[i]);
          } else if (!Array.isArray(components[i]) && components[i].hasOwnProperty('component') && components[i].component.substring(0, 6) === 'coreui') {
            var name = components[i].component.split('.')[1];
            if (CoreUI.hasOwnProperty(name) && coreuiTableUtils.isObject(CoreUI[name])) {
              var instance = CoreUI[name].create(components[i]);
              result.push(instance.render());
              if (eventName) {
                table.on(eventName, instance.initEvents, instance, true);
              }
            }
          }
        }
      }
      return result;
    }
  };

  var coreuiTableElements = {
    /**
     * Получение контейнера таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getContainer: function getContainer(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container');
    },
    /**
     * Получение обертки таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getLock: function getLock(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table-lock');
    },
    /**
     * Получение обертки таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getWrapper: function getWrapper(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper');
    },
    /**
     * Получение поискового контейнера
     * @param {string} tableId
     * @return {jQuery}
     */
    getSearchContainer: function getSearchContainer(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__search');
    },
    /**
     * Получение поискового контейнера
     * @param {string} tableId
     * @return {jQuery}
     */
    getColumnsContainer: function getColumnsContainer(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__columns');
    },
    /**
     * Получение контейнера поискового контрола
     * @param {string} tableId
     * @param {string} controlId
     * @return {jQuery}
     */
    getSearchControl: function getSearchControl(tableId, controlId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__search .search-control-' + controlId);
    },
    /**
     * Получение контейнера контрола
     * @param {string} tableId
     * @param {string} controlId
     * @return {jQuery}
     */
    getControl: function getControl(tableId, controlId) {
      return $('#coreui-table-' + tableId + '  #coreui-table-control-' + controlId);
    },
    /**
     * Получение таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getTable: function getTable(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table');
    },
    /**
     * Получение тела таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getTableTbody: function getTableTbody(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody');
    },
    /**
     * Получение заголовков таблицы
     * @param {string} tableId
     * @return {jQuery}
     */
    getTableThead: function getTableThead(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > thead');
    },
    /**
     * Получение ячеек с сортировкой по таблице
     * @param {string} tableId
     * @return {jQuery}
     */
    getTableSortable: function getTableSortable(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > thead > tr > td.coreui-table__sortable');
    },
    /**
     * Получение строк записей
     * @param {string} tableId
     * @return {jQuery}
     */
    getTrRecords: function getTrRecords(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record');
    },
    /**
     * Получение элемента строки по ключу
     * @param {string} tableId
     * @param {int}    index
     * @return {jQuery}
     */
    getTrByIndex: function getTrByIndex(tableId, index) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr[data-record-index="' + index + '"]');
    },
    /**
     * Получение элемента строки по ключу
     * @param {string} tableId
     * @return {jQuery}
     */
    getTrEmpty: function getTrEmpty(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record-empty');
    },
    /**
     * Получение контента под строкой
     * @param {jQuery} recordElement
     * @return {jQuery}
     */
    getExpandRow: function getExpandRow(recordElement) {
      return recordElement.next().hasClass('coreui-table__record-expanded') ? recordElement.next() : null;
    },
    /**
     * Добавление контента под строкой
     * @param {object}       table
     * @param {jQuery}       recordElement
     * @param {Array|string} content
     * @return {jQuery}
     */
    addExpandRow: function addExpandRow(table, recordElement, content) {
      var expandRecord = coreuiTableRender.renderExpand(table, content, 'record_expand_show');
      recordElement.after(expandRecord);
      recordElement.next().show('fast');
      recordElement.addClass('record-expanded');
    },
    /**
     * Скрытие контента под строкой
     * @param {jQuery} recordExpanded
     * @return {jQuery}
     */
    hideExpandRow: function hideExpandRow(recordExpanded) {
      recordExpanded.hide('fast');
    },
    /**
     * Показ контента под строкой
     * @param {jQuery} recordExpanded
     * @return {jQuery}
     */
    showExpandRow: function showExpandRow(recordExpanded) {
      recordExpanded.show('fast');
    },
    /**
     * Удаление контента под строкой
     * @param {jQuery} recordExpanded
     * @return {jQuery}
     */
    removeExpandRow: function removeExpandRow(recordExpanded) {
      recordExpanded.hide('fast', function () {
        $(this).remove();
      });
    },
    /**
     * Получение выбранных на таблице элементов
     * @param {string} tableId
     * @return {Array}
     */
    getSelectedIndexes: function getSelectedIndexes(tableId) {
      var indexes = [];
      $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select:checked').each(function (key, element) {
        indexes.push($(element).val());
      });
      return indexes;
    },
    /**
     * Получение выбранных на таблице элементов
     * @param {string} tableId
     * @return {Array}
     */
    getRowsSwitches: function getRowsSwitches(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table > tbody > tr.coreui-table__record > td.coreui-table__switch_container');
    },
    /**
     * Получение элементов выбора строк
     * @param {string} tableId
     * @return {Array}
     */
    getRowsSelects: function getRowsSelects(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > tbody > tr.coreui-table__record > td.coreui-table__select_container');
    },
    /**
     * Получение элемента для выбора всех строк
     * @param {string} tableId
     * @return {Array}
     */
    getRowsSelectAll: function getRowsSelectAll(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > thead > tr > td .coreui-table__select-all');
    },
    /**
     * Получение элементов для раскрытия ячеек
     * @param {string} tableId
     * @return {Array}
     */
    getNoWrapToggles: function getNoWrapToggles(tableId) {
      return $('#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper  > table > tbody > tr > td.coreui_table__no-wrap > i.toggle');
    },
    /**
     * Выделение строки в таблице
     * @param {jQuery} tr
     */
    selectTr: function selectTr(tr) {
      tr.addClass('table-primary');
      $('.coreui-table__select', tr).prop('checked', true);
    },
    /**
     * Выделение всех строк в таблице
     * @param {string} tableId
     */
    selectTrAll: function selectTrAll(tableId) {
      var tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table';
      $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', true);
      $(tableContainer + ' > tbody > tr.coreui-table__record').addClass('table-primary');
      $(tableContainer + ' > tbody > tr.coreui-table__record > td > .coreui-table__select').prop('checked', true);
    },
    /**
     * Снятие выделение строки в таблице
     * @param {jQuery} tr
     */
    unselectTr: function unselectTr(tr) {
      $(tr).removeClass('table-primary');
      $('.coreui-table__select', tr).prop('checked', false);
    },
    /**
     * Снятие выделение со всех строк в таблице
     * @param {string} tableId
     */
    unselectTrAll: function unselectTrAll(tableId) {
      var tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container > .coreui-table__wrapper > table';
      $(tableContainer + ' > thead > tr > td > .coreui-table__select-all').prop('checked', false);
      $(tableContainer + ' > tbody > tr.coreui-table__record').removeClass('table-primary');
      $(tableContainer + ' > tbody > tr.coreui-table__record > td.coreui-table__select_container > .coreui-table__select').prop('checked', false);
    },
    /**
     * Фиксация колонок слева
     * @param {string} tableId
     */
    fixedColsLeft: function fixedColsLeft(tableId) {
      var tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container';
      var tableWrapper = tableContainer + ' > .coreui-table__wrapper';
      var colOffset = 0;
      $(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_left').each(function () {
        var index = $(this).index() + 1;
        if (index !== 1) {
          $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('left', colOffset + 'px');
          $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')')
          //.addClass('coreui-table__fixed_left')
          .css('left', colOffset + 'px');
        }
        colOffset += $(this).outerWidth();
      });
      if (colOffset > 0) {
        $(tableContainer).addClass('fixed-columns');
      }
    },
    /**
     * Фиксация колонок справа
     * @param {string} tableId
     */
    fixedColsRight: function fixedColsRight(tableId) {
      var tableContainer = '#coreui-table-' + tableId + ' > .coreui-table__container';
      var tableWrapper = tableContainer + ' > .coreui-table__wrapper';
      var colOffset = 0;
      $($(tableWrapper + ' > table > thead > tr:last-child > td.coreui-table__fixed_right').get().reverse()).each(function () {
        var index = $(this).index() + 1;
        if (index !== 1) {
          $(tableWrapper + ' > table > thead > tr:last-child > td:nth-child(' + index + ')').css('right', colOffset + 'px');
          $(tableWrapper + ' > table > tbody > tr > td:nth-child(' + index + ')')
          //.addClass('coreui-table__fixed_left')
          .css('right', colOffset + 'px');
        }
        colOffset += $(this).outerWidth();
      });
      if (colOffset > 0) {
        $(tableContainer).addClass('fixed-columns');
      }
    }
  };

  var coreuiTablePrivate = {
    /**
     * Инициализация колонок
     * @param {object} tableWrapper
     * @param {object} table
     * @param {Array} columns
     * @private
     */
    initColumns: function initColumns(tableWrapper, table, columns) {
      var options = table.getOptions();
      var columnsStorage = options.saveState && options.id ? coreuiTablePrivate.getStorageField(table.getId(), 'columns') : null;
      $.each(columns, function (key, column) {
        if (typeof column.type === 'undefined' || !tableWrapper.columns.hasOwnProperty(column.type)) {
          column.type = 'text';
        }
        if (!column.hasOwnProperty('show') || typeof column.show !== 'boolean') {
          column.show = true;
        }
        if (columnsStorage) {
          $.each(columnsStorage, function (key2, columnStorage) {
            if (columnStorage && columnStorage.hasOwnProperty('field') && columnStorage.hasOwnProperty('isShow') && columnStorage.field === column.field) {
              column.show = !!columnStorage.isShow;
              return false;
            }
          });
        }
        if (column.hasOwnProperty('fixed') && typeof column.fixed === 'string') {
          table._options.overflow = true;
        }
        var columnInstance = $.extend(true, {}, tableWrapper.columns[column.type]);
        columnInstance.init(table, column);
        table._columns.push(columnInstance);
        if (columnInstance.isShow()) {
          table._countColumnsShow++;
        }
      });
    },
    /**
     * Инициализация поисковых полей
     * @param {object} tableWrapper
     * @param {Object} table
     * @param {Array}  searchControls
     * @private
     */
    initSearch: function initSearch(tableWrapper, table, searchControls) {
      var options = table.getOptions();
      var searchValues = options.saveState && options.id ? coreuiTablePrivate.getStorageField(table.getId(), 'search') : null;
      $.each(searchControls, function (key, control) {
        if (!coreuiTableUtils.isObject(control)) {
          control = {};
        }
        if (!control.hasOwnProperty('type') || typeof control.type !== 'string' || !tableWrapper.search.hasOwnProperty(control.type)) {
          control.type = 'text';
        }
        if (options.saveState && options.id) {
          control.value = null;
          if (Array.isArray(searchValues) && control.hasOwnProperty('field')) {
            $.each(searchValues, function (key, search) {
              if (coreuiTableUtils.isObject(search) && search.hasOwnProperty('field') && search.hasOwnProperty('value') && search.field && search.field === control.field) {
                control.value = search.value;
                return false;
              }
            });
          }
        }
        var controlInstance = $.extend(true, {}, tableWrapper.search[control.type]);
        controlInstance.init(table, control);
        table._search.push(controlInstance);
      });
    },
    /**
     * Инициализация контролов и фильтров
     * @param {Object} tableWrapper
     * @param {Object} table
     * @param {Array}  rows
     * @param {string} position
     * @private
     */
    initControls: function initControls(tableWrapper, table, rows, position) {
      var that = this;
      $.each(rows, function (key, row) {
        var type = 'in';
        var controlsLeft = [];
        var controlsCenter = [];
        var controlsRight = [];
        if (typeof row.type === 'string' && ['in', 'out'].indexOf(row.type.toLowerCase()) >= 0) {
          type = row.type.toLowerCase();
        }
        if (row.hasOwnProperty('left') && Array.isArray(row.left)) {
          $.each(row.left, function (key, control) {
            var instance = that.initControl(tableWrapper, table, control);
            if (coreuiTableUtils.isObject(instance)) {
              controlsLeft.push(instance);
            }
          });
        }
        if (row.hasOwnProperty('center') && Array.isArray(row.center)) {
          $.each(row.center, function (key, control) {
            var instance = that.initControl(tableWrapper, table, control);
            if (coreuiTableUtils.isObject(instance)) {
              controlsCenter.push(instance);
            }
          });
        }
        if (row.hasOwnProperty('right') && Array.isArray(row.right)) {
          $.each(row.right, function (key, control) {
            var instance = that.initControl(tableWrapper, table, control);
            if (coreuiTableUtils.isObject(instance)) {
              controlsRight.push(instance);
            }
          });
        }
        if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
          table._controlsPositions[position].push({
            type: type,
            left: controlsLeft,
            center: controlsCenter,
            right: controlsRight
          });
        }
      });
    },
    /**
     * Инициализация контрола или фильтра
     * @param {object} tableWrapper
     * @param {Object} table
     * @param {object} control
     * @private
     */
    initControl: function initControl(tableWrapper, table, control) {
      var instance = null;
      if (coreuiTableUtils.isObject(control) && typeof control.type === 'string') {
        if (tableWrapper.controls.hasOwnProperty(control.type)) {
          instance = $.extend(true, {}, tableWrapper.controls[control.type]);
          instance.init(table, control);
          table._controls.push(instance);
        } else if (control.type.indexOf('filter:') === 0) {
          var filterName = control.type.substring(7);
          if (tableWrapper.filters.hasOwnProperty(filterName)) {
            if (control.hasOwnProperty('field')) {
              var options = table.getOptions();
              if (options.saveState && options.id) {
                var filterValues = options.saveState && options.id ? coreuiTablePrivate.getStorageField(table.getId(), 'filters') : null;
                control.value = null;
                if (Array.isArray(filterValues)) {
                  $.each(filterValues, function (key, filter) {
                    if (coreuiTableUtils.isObject(filter) && filter.hasOwnProperty('field') && filter.hasOwnProperty('value') && filter.field && filter.field === control.field) {
                      control.value = filter.value;
                      return false;
                    }
                  });
                }
              }
            }
            instance = $.extend(true, {}, tableWrapper.filters[filterName]);
            instance.init(table, control);
            table._filters.push(instance);
          }
        }
      }
      return instance;
    },
    /**
     * Инициализация сортировки
     * @param {Object} table
     * @param {Array} sort
     * @private
     */
    initSort: function initSort(table, sort) {
      if (Array.isArray(sort) && sort.length > 0) {
        $.each(sort, function (key, sortField) {
          if (coreuiTableUtils.isObject(sortField) && sortField.hasOwnProperty('field') && sortField.hasOwnProperty('order') && typeof sortField.field === 'string' && typeof sortField.order === 'string' && sortField.field && sortField.order && ['asc', 'desc'].indexOf(sortField.order) >= 0) {
            table._sort.push({
              field: sortField.field,
              order: sortField.order
            });
          }
        });
      }
    },
    /**
     * Поиск по данным таблицы
     * @param {object} table
     */
    searchLocalRecords: function searchLocalRecords(table) {
      var searchData = table.getSearchData();
      var filterData = table.getFilterData();
      var columnsConverters = {};
      $.each(table._columns, function (index, column) {
        if (column.hasOwnProperty('convertToString') && column.hasOwnProperty('getOptions') && typeof column.convertToString === 'function' && typeof column.getOptions === 'function') {
          var options = column.getOptions();
          if (options.hasOwnProperty('field') && typeof options.field === 'string') {
            columnsConverters[options.field] = column.convertToString;
          }
        }
      });
      $.each(table._records, function (index, record) {
        var isShow = true;
        if (searchData.length > 0) {
          isShow = coreuiTablePrivate.isFilteredRecord(searchData, record.data, columnsConverters);
        }
        if (isShow && filterData.length > 0) {
          isShow = coreuiTablePrivate.isFilteredRecord(filterData, record.data, columnsConverters);
        }
        record.show = isShow;
      });
    },
    /**
     * Установка записей
     * @param {Object} table
     * @param {Array}  records
     * @private
     */
    setRecords: function setRecords(table, records) {
      table._recordsIndex = 1;
      table._records = [];
      var that = this;
      $.each(records, function (key, record) {
        that.addRecord(table, record);
      });
    },
    /**
     * Добавление новой записи
     * @param {object} table
     * @param {object} data
     * @param {number} afterIndex
     * @return {object|null}
     * @private
     */
    addRecord: function addRecord(table, data, afterIndex) {
      if (coreuiTableUtils.isObject(data)) {
        data = $.extend(true, {}, data);
        var meta = data.hasOwnProperty('_meta') && coreuiTableUtils.isObject(data._meta) ? data._meta : null;
        if (meta) {
          delete data._meta;
        }
        var record = {
          index: table._recordsIndex++,
          data: data,
          show: true,
          meta: meta,
          seq: table._seq++
        };
        if (typeof afterIndex === 'number') {
          if (afterIndex === 0) {
            table._records.splice(0, 0, record);
            return record;
          } else {
            var index = null;
            $.each(table._records, function (key, record) {
              if (afterIndex === record.index) {
                index = key;
                return false;
              }
            });
            if (index !== null) {
              table._records.splice(index, 0, record);
              return record;
            }
          }
        } else {
          table._records.push(record);
          return record;
        }
      }
      return null;
    },
    /**
     * Добавление новой записи перед указанной
     * @param {object} table
     * @param {object} data
     * @param {number} index
     * @return {object|null}
     * @private
     */
    addRecordBefore: function addRecordBefore(table, data, index) {
      if (coreuiTableUtils.isObject(data) && typeof index === 'number') {
        data = $.extend(true, {}, data);
        var meta = data.hasOwnProperty('_meta') && coreuiTableUtils.isObject(data._meta) ? data._meta : null;
        if (meta) {
          delete data._meta;
        }
        var record = {
          index: table._recordsIndex++,
          data: data,
          show: true,
          meta: meta,
          seq: table._seq++
        };
        var issetKey = false;
        var keyBefore = null;
        $.each(table._records, function (key, record) {
          if (index === record.index) {
            issetKey = true;
            return false;
          }
          keyBefore = key;
        });
        if (issetKey && keyBefore) {
          table._records.splice(keyBefore, 0, record);
          return record;
        }
      }
      return null;
    },
    /**
     * Проверка подходит ли запись под поисковые данные
     * @param {Array}  filters
     * @param {object} recordData
     * @param {object} columnsConverters
     * @return {boolean}
     * @private
     */
    isFilteredRecord: function isFilteredRecord(filters, recordData, columnsConverters) {
      var isShow = true;
      $.each(filters, function (key, filter) {
        var fieldValue = null;
        if (recordData.hasOwnProperty(filter.field) && recordData[filter.field]) {
          if (columnsConverters && columnsConverters.hasOwnProperty(filter.field)) {
            fieldValue = columnsConverters[filter.field](recordData[filter.field]);
          } else if (['string', 'number'].indexOf(_typeof(recordData[filter.field])) >= 0) {
            fieldValue = String(recordData[filter.field]);
          }
        }
        if (fieldValue) {
          if (['string', 'number'].indexOf(_typeof(filter.value)) >= 0) {
            if (filter.hasOwnProperty('alg') && filter.alg === 'strict') {
              if (fieldValue.toLowerCase() != filter.value.toString().toLowerCase()) {
                isShow = false;
                return false;
              }
            } else if (fieldValue.toLowerCase().indexOf(filter.value.toString().toLowerCase()) < 0) {
              isShow = false;
              return false;
            }
          } else if (Array.isArray(filter.value)) {
            if (filter.value.indexOf(fieldValue) < 0) {
              isShow = false;
              return false;
            }
          } else if (coreuiTableUtils.isObject(filter.value) && filter.value.hasOwnProperty('start') && filter.value.hasOwnProperty('end')) {
            var issetStart = ['string', 'number'].indexOf(_typeof(filter.value.start)) >= 0;
            var issetEnd = ['string', 'number'].indexOf(_typeof(filter.value.end)) >= 0;
            if (issetStart && issetEnd) {
              if (fieldValue < filter.value.start || filter.value.end < fieldValue) {
                isShow = false;
                return false;
              }
            } else if (issetStart) {
              if (filter.value.start > fieldValue) {
                isShow = false;
                return false;
              }
            } else if (issetEnd) {
              if (filter.value.end < fieldValue) {
                isShow = false;
                return false;
              }
            }
          }
        } else {
          isShow = false;
          return false;
        }
      });
      return isShow;
    },
    /**
     * Выполнения зарегистрированных функций в указанном событии
     * @param {object} table
     * @param {string} name
     * @param {Array}  params
     * @private
     */
    _trigger: function _trigger(table, name, params) {
      params = params || [];
      if (table._events.hasOwnProperty(name) && table._events[name].length > 0) {
        for (var i = 0; i < table._events[name].length; i++) {
          var callback = table._events[name][i].callback;
          var context = table._events[name][i].context ? table._events[name][i].context : table;
          callback.apply(context, params);
          if (table._events[name][i].singleExec) {
            table._events[name].splice(i, 1);
            i--;
          }
        }
      }
    },
    /**
     * Сортировка записей по seq
     * @param {Array} records
     * @return {*}
     */
    sortRecordsBySeq: function sortRecordsBySeq(records) {
      return records.sort(function (a, b) {
        return a.seq - b.seq;
      });
    },
    /**
     * Сортировка записей по указанным полям
     * @param {Array}  records
     * @param {Array}  fields
     * @param {object} columnsConverters
     */
    sortRecordsByFields: function sortRecordsByFields(records, fields, columnsConverters) {
      return records.sort(function (a, b) {
        for (var i = 0; i < fields.length; i++) {
          var issetAField = a.data.hasOwnProperty(fields[i].field);
          var issetBField = b.data.hasOwnProperty(fields[i].field);
          if (!issetAField && !issetBField) {
            return 0;
          } else if (!issetAField) {
            return 1;
          } else if (!issetBField) {
            return -1;
          }
          var aVal = '';
          var bVal = '';
          if (a.data.hasOwnProperty(fields[i].field) && a.data[fields[i].field]) {
            if (columnsConverters && columnsConverters.hasOwnProperty(fields[i].field)) {
              aVal = columnsConverters[fields[i].field](a.data[fields[i].field]);
            } else if (['string', 'number'].indexOf(_typeof(a.data[fields[i].field])) >= 0) {
              aVal = String(a.data[fields[i].field]);
            }
          }
          if (b.data.hasOwnProperty(fields[i].field) && b.data[fields[i].field]) {
            if (columnsConverters && columnsConverters.hasOwnProperty(fields[i].field)) {
              bVal = columnsConverters[fields[i].field](b.data[fields[i].field]);
            } else if (['string', 'number'].indexOf(_typeof(b.data[fields[i].field])) >= 0) {
              bVal = String(b.data[fields[i].field]);
            }
          }
          if (aVal === null || aVal === undefined || typeof aVal === "function") {
            aVal = '';
          } else if (_typeof(aVal) === 'object') {
            aVal = JSON.stringify(aVal);
          }
          if (bVal === null || bVal === undefined || typeof bVal === "function") {
            bVal = '';
          } else if (_typeof(bVal) === 'object') {
            bVal = JSON.stringify(bVal);
          }
          var val = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          if (fields[i].order === "desc") {
            val = val * -1;
          }
          if (val !== 0) {
            return val;
          }
        }
      });
    },
    /**
     * Установка сортировки для указанных колонок
     * @param {object} table
     * @param {Array}  sort
     */
    setColumnsSort: function setColumnsSort(table, sort) {
      var thead = coreuiTableElements.getTableThead(table.getId());
      $.each(table._columns, function (key, column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && options.hasOwnProperty('sortable') && typeof options.field === 'string' && options.sortable) {
          var sortColumn = null;
          if (Array.isArray(sort)) {
            $.each(sort, function (key, sortItem) {
              if (coreuiTableUtils.isObject(sortItem) && sortItem.hasOwnProperty('field') && sortItem.hasOwnProperty('order') && typeof sortItem.field === 'string' && typeof sortItem.order === 'string' && options.field === sortItem.field) {
                sortColumn = {
                  field: sortItem.field,
                  order: sortItem.order
                };
              }
            });
          }
          var columnElement = thead.find('[data-field="' + options.field + '"]');
          columnElement.find('.coreui-table__column-sort').remove();
          if (sortColumn !== null) {
            if (sortColumn.order === 'asc') {
              columnElement.append('<i class="coreui-table__column-sort bi bi-sort-down-alt"></i>');
            } else {
              columnElement.append('<i class="coreui-table__column-sort bi bi-sort-down"></i>');
            }
          }
        }
      });
    },
    /**
     * Получение данных из хранилища
     * @param {string} tableId
     * @return {object|null}
     */
    getStorage: function getStorage(tableId) {
      var storage = localStorage.getItem('coreui_table');
      try {
        if (typeof storage === 'string' && storage) {
          storage = JSON.parse(storage);
          if (coreuiTableUtils.isObject(storage)) {
            return tableId && typeof tableId === 'string' ? storage.hasOwnProperty(tableId) ? storage[tableId] : null : storage;
          }
        }
        return null;
      } catch (e) {
        return null;
      }
    },
    /**
     * Сохранение данных в хранилище
     * @param {string}      tableId
     * @param {object|null} storage
     */
    setStorage: function setStorage(tableId, storage) {
      if (typeof tableId !== 'string' || !tableId) {
        return;
      }
      var storageAll = this.getStorage();
      if (coreuiTableUtils.isObject(storageAll)) {
        if (storageAll.hasOwnProperty(tableId)) {
          if (storage) {
            storageAll[tableId] = storage;
          } else {
            delete storageAll[tableId];
          }
        } else if (storage) {
          storageAll[tableId] = storage;
        }
      }
      localStorage.setItem('coreui_table', JSON.stringify(storageAll || {}));
    },
    /**
     * Получение поля из хранилища
     * @param tableId
     * @param field
     * @return {*|null}
     */
    getStorageField: function getStorageField(tableId, field) {
      var storage = this.getStorage(tableId) || {};
      return storage.hasOwnProperty(field) ? storage[field] : null;
    },
    /**
     * Сохранение поля в хранилище
     * @param tableId
     * @param field
     * @param data
     */
    setStorageField: function setStorageField(tableId, field, data) {
      var storage = this.getStorage(tableId) || {};
      if (data === null) {
        if (storage.hasOwnProperty(field)) {
          delete storage[field];
        }
      } else {
        storage[field] = data;
      }
      this.setStorage(tableId, storage);
    }
  };

  var coreuiTableInstance = {
    _options: {
      id: null,
      "class": '',
      primaryKey: 'id',
      lang: 'en',
      langItems: {},
      width: null,
      minWidth: null,
      maxWidth: null,
      height: null,
      minHeight: null,
      naxHeight: null,
      overflow: false,
      page: 1,
      recordsPerPage: 25,
      theadTop: 0,
      saveState: false,
      noBorder: false,
      noWrap: false,
      noWrapToggle: false,
      showHeaders: true,
      showScrollShadow: false,
      recordsRequest: {
        method: 'GET',
        url: null // '/mod/index/orders/?page=[page]'
      },
      requestParams: {
        page: 'page',
        count: 'count',
        start: 'start',
        end: 'end',
        sort: 'sort',
        search: 'search'
      },
      group: {
        field: null,
        attr: {},
        render: null
      },
      onClick: null,
      onClickUrl: null,
      sort: [],
      header: [],
      footer: [],
      columnsHeader: [],
      search: {
        labelWidth: 200,
        controls: []
      },
      columns: [],
      columnsFooter: [],
      records: []
    },
    _id: '',
    _page: 1,
    _recordsIndex: 1,
    _recordsPerPage: 25,
    _recordsTotal: 0,
    _recordsNumber: 1,
    _seq: 1,
    _isRecordsRequest: false,
    _countColumnsShow: 0,
    _records: [],
    _sort: [],
    _columns: [],
    _search: [],
    _filters: [],
    _controls: [],
    _controlsPositions: {
      header: [],
      footer: []
    },
    _events: {},
    /**
     * Инициализация
     * @param {object} tableWrapper
     * @param {object} options
     * @private
     */
    _init: function _init(tableWrapper, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._events = {};
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.page > 0) {
        this._page = this._options.page;
      }
      if (this._options.recordsPerPage > 0) {
        this._recordsPerPage = this._options.recordsPerPage;
      }
      this._isRecordsRequest = this._options.hasOwnProperty('recordsRequest') && (typeof this._options.recordsRequest === 'function' || coreuiTableUtils.isObject(this._options.recordsRequest) && this._options.recordsRequest.hasOwnProperty('url') && typeof this._options.recordsRequest.url === 'string' && this._options.recordsRequest.url !== '' && this._options.recordsRequest.url !== '#');
      if (this._isRecordsRequest) {
        if (_typeof(this._options.recordsRequest) === 'object' && (!this._options.recordsRequest.hasOwnProperty('method') || typeof this._options.recordsRequest.method !== 'string')) {
          this._options.recordsRequest.method = 'GET';
        }
      } else if (Array.isArray(this._options.records)) {
        coreuiTablePrivate.setRecords(this, this._options.records);
      }

      // Очистка записей после инициализации
      this._options.records = [];

      // Инициализация колонок
      if (_typeof(this._options.columns) === 'object' && Array.isArray(this._options.columns) && this._options.columns.length > 0) {
        coreuiTablePrivate.initColumns(tableWrapper, this, this._options.columns);
      }

      // Инициализация поисковых полей
      if (coreuiTableUtils.isObject(this._options.search) && _typeof(this._options.search.controls) === 'object' && Array.isArray(this._options.search.controls) && this._options.search.controls.length > 0) {
        coreuiTablePrivate.initSearch(tableWrapper, this, this._options.search.controls);
      }

      // Инициализация контролов и фильтров
      if (this._options.hasOwnProperty('header') && Array.isArray(this._options.header) && this._options.header.length > 0) {
        coreuiTablePrivate.initControls(tableWrapper, this, this._options.header, 'header');
      }
      if (this._options.hasOwnProperty('footer') && Array.isArray(this._options.footer) && this._options.footer.length > 0) {
        coreuiTablePrivate.initControls(tableWrapper, this, this._options.footer, 'footer');
      }
      if (this._options.saveState && this._options.id) {
        // Поиск по сохраненным поисковым данным
        if (!this._isRecordsRequest) {
          coreuiTablePrivate.searchLocalRecords(this);
        }

        // Сортировка
        var sort = coreuiTablePrivate.getStorageField(this.getId(), 'sort');
        if (Array.isArray(sort) && sort.length > 0) {
          coreuiTablePrivate.initSort(this, sort);
          if (!this._isRecordsRequest && this._records.length > 0) {
            this._records = coreuiTablePrivate.sortRecordsByFields(this._records, this._sort);
          }
        }
      } else {
        if (this._options.hasOwnProperty('sort') && Array.isArray(this._options.sort) && this._options.sort.length > 0) {
          coreuiTablePrivate.initSort(this, this._options.sort);
        }
      }
    },
    /**
     * Инициализация событий таблицы
     */
    initEvents: function initEvents() {
      var that = this;

      // Показ строк
      this.on('records_show', function () {
        // Переход по ссылке
        if (typeof that._options.onClickUrl === 'string' && that._options.onClickUrl) {
          coreuiTableElements.getTrRecords(that.getId()).click(function () {
            var recordKey = $(this).data('record-index');
            var record = that.getRecordByIndex(recordKey);
            if (!record) {
              return;
            }
            var url = that._options.onClickUrl;
            $.each(record.data, function (field, value) {
              var fieldQuote = field.replace(/([^\w\d])/g, '\\$1');
              url = url.replace(new RegExp('\\[' + fieldQuote + '\\]', 'g'), value);
            });
            if (url && url !== '#') {
              location.href = url;
            }
          });
        }

        // Событие нажатия на строку
        if (['function', 'string'].indexOf(_typeof(that._options.onClick))) {
          coreuiTableElements.getTrRecords(that.getId()).click(function (event) {
            var recordKey = $(this).data('record-index');
            var record = that.getRecordByIndex(recordKey);
            if (!record) {
              return;
            }
            if (typeof that._options.onClick === 'function') {
              that._options.onClick(event, record);
            } else if (typeof that._options.onClick === 'string') {
              var func = new Function('event', 'record', that._options.onClick);
              func(event, record);
            }
          });
        }

        // Раскрытие строки
        coreuiTableElements.getNoWrapToggles(that.getId()).click(function (event) {
          event.cancelBubble = true;
          event.preventDefault();
          var parent = $(this).parent();
          if (parent.hasClass('shown')) {
            $(this).removeClass('bi-caret-up-fill');
            $(this).addClass('bi-caret-down-fill');
            parent.removeClass('shown');
          } else {
            $(this).removeClass('bi-caret-down-fill');
            $(this).addClass('bi-caret-up-fill');
            parent.addClass('shown');
          }
        });

        // Фиксация колонок
        coreuiTableElements.fixedColsLeft(that.getId());
        coreuiTableElements.fixedColsRight(that.getId());
      });

      // Показ таблицы
      this.on('table_show', function () {
        var sortableColumns = coreuiTableElements.getTableSortable(that.getId());
        if (sortableColumns[0]) {
          sortableColumns.click(function (event) {
            var field = $(this).data('field');
            if (field) {
              var sorting = [];
              var currentOrder = null;
              $.each(that._sort, function (key, sortField) {
                if (field === sortField.field) {
                  currentOrder = sortField.order;
                  return false;
                }
              });
              if (currentOrder === null) {
                sorting.push({
                  field: field,
                  order: 'asc'
                });
              } else if (currentOrder === 'asc') {
                sorting.push({
                  field: field,
                  order: 'desc'
                });
              }
              if (sorting.length === 0) {
                that.sortDefault();
              } else {
                that.sortFields(sorting);
              }
            }
          });
        }
        if (window.hasOwnProperty('bootstrap') && bootstrap.hasOwnProperty('Tooltip')) {
          $('.coreui-table__column-description', coreuiTableElements.getTableThead(that.getId())).each(function () {
            new bootstrap.Tooltip(this);
          });
        }
      });

      // События смены состояния
      if (this._options.saveState && this._options.id) {
        this.on('records_sort', function () {
          coreuiTablePrivate.setStorageField(that.getId(), 'sort', that._sort);
        });
        this.on('search_change', function () {
          coreuiTablePrivate.setStorageField(that.getId(), 'search', that.getSearchData());
        });
        this.on('filters_change', function () {
          coreuiTablePrivate.setStorageField(that.getId(), 'filters', that.getFilterData());
        });
        this.on('columns_change', function () {
          var columns = [];
          that._columns.map(function (column) {
            var columnOptions = column.getOptions();
            columns.push({
              field: columnOptions.field,
              isShow: column.isShow()
            });
          });
          coreuiTablePrivate.setStorageField(that.getId(), 'columns', columns);
        });
      }
      coreuiTablePrivate._trigger(this, 'table_show', [this]);
      coreuiTablePrivate._trigger(this, 'container_show');

      // Вызов события показа строк
      if (!this._isRecordsRequest) {
        coreuiTablePrivate._trigger(this, 'records_show', [this]);
      }
    },
    /**
     * Получение идентификатора таблицы
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Получение опций таблицы
     * @returns {*}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     *
     * @param element
     * @returns {*}
     */
    render: function render(element) {
      var that = this;
      var widthSizes = [];
      var heightSizes = [];
      var options = this.getOptions();
      var render = {
        headersOut: [],
        headersIn: [],
        footersIn: [],
        footersOut: []
      };
      this._recordsTotal = this._records.length;
      if (options.width > 0) {
        var unit = typeof options.width === 'number' ? 'px' : '';
        widthSizes.push('width:' + options.width + unit);
      }
      if (options.minWidth > 0) {
        var _unit = typeof options.minWidth === 'number' ? 'px' : '';
        widthSizes.push('min-width:' + options.minWidth + _unit);
      }
      if (options.maxWidth > 0) {
        var _unit2 = typeof options.maxWidth === 'number' ? 'px' : '';
        widthSizes.push('max-width:' + options.maxWidth + _unit2);
        options.overflow = true;
      }
      if (options.height > 0) {
        var _unit3 = typeof options.height === 'number' ? 'px' : '';
        heightSizes.push('height:' + options.height + _unit3);
      }
      if (options.minHeight > 0) {
        var _unit4 = typeof options.minHeight === 'number' ? 'px' : '';
        heightSizes.push('min-height:' + options.minHeight + _unit4);
      }
      if (options.maxHeight > 0) {
        var _unit5 = typeof options.maxHeight === 'number' ? 'px' : '';
        heightSizes.push('max-height:' + options.maxHeight + _unit5);
        options.overflow = true;
      }

      // Верхние элементы управления
      if (Array.isArray(this._controlsPositions.header) && this._controlsPositions.header.length > 0) {
        $.each(this._controlsPositions.header, function (key, header) {
          var controlsLeft = [];
          var controlsCenter = [];
          var controlsRight = [];
          if (Array.isArray(header.left) && header.left.length > 0) {
            $.each(header.left, function (key, control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsLeft.push(controlRender);
              }
            });
          }
          if (Array.isArray(header.center) && header.center.length > 0) {
            $.each(header.center, function (key, control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsCenter.push(controlRender);
              }
            });
          }
          if (Array.isArray(header.right) && header.right.length > 0) {
            $.each(header.right, function (key, control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsRight.push(controlRender);
              }
            });
          }
          if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
            if (header.type === 'in') {
              var headerControls = $(coreuiTableUtils.render(tpl['table/controls/header.html'], {
                controlsLeft: controlsLeft,
                controlsCenter: controlsCenter,
                controlsRight: controlsRight
              }));
              if (controlsLeft.length > 0) {
                $.each(controlsLeft, function (key, control) {
                  headerControls.find('.coreui-table__controls_left').append(control);
                });
              }
              if (controlsCenter.length > 0) {
                $.each(controlsCenter, function (key, control) {
                  headerControls.find('.coreui-table__controls_center').append(control);
                });
              }
              if (controlsRight.length > 0) {
                $.each(controlsRight, function (key, control) {
                  headerControls.find('.coreui-table__controls_right').append(control);
                });
              }
              render.headersIn.push(headerControls);
            } else {
              var _headerControls = $(coreuiTableUtils.render(tpl['table/controls/header-out.html'], {
                controlsLeft: controlsLeft,
                controlsCenter: controlsCenter,
                controlsRight: controlsRight
              }));
              if (controlsLeft.length > 0) {
                $.each(controlsLeft, function (key, control) {
                  _headerControls.find('.coreui-table__controls_left').append(control);
                });
              }
              if (controlsCenter.length > 0) {
                $.each(controlsCenter, function (key, control) {
                  _headerControls.find('.coreui-table__controls_center').append(control);
                });
              }
              if (controlsRight.length > 0) {
                $.each(controlsRight, function (key, control) {
                  _headerControls.find('.coreui-table__controls_right').append(control);
                });
              }
              render.headersOut.push(_headerControls);
            }
          }
        });
      }

      // Нижние элементы управления
      if (Array.isArray(this._controlsPositions.footer) && this._controlsPositions.footer.length > 0) {
        $.each(this._controlsPositions.footer, function (key, footer) {
          var controlsLeft = [];
          var controlsCenter = [];
          var controlsRight = [];
          if (Array.isArray(footer.left) && footer.left.length > 0) {
            $.each(footer.left, function (key, control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsLeft.push(controlRender);
              }
            });
          }
          if (Array.isArray(footer.center) && footer.center.length > 0) {
            $.each(footer.center, function (key, control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsCenter.push(controlRender);
              }
            });
          }
          if (Array.isArray(footer.right) && footer.right.length > 0) {
            $.each(footer.right, function (key, control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsRight.push(controlRender);
              }
            });
          }
          if (controlsLeft.length > 0 || controlsCenter.length > 0 || controlsRight.length > 0) {
            if (footer.type === 'in') {
              var footerControls = $(coreuiTableUtils.render(tpl['table/controls/footer.html'], {
                controlsLeft: controlsLeft,
                controlsCenter: controlsCenter,
                controlsRight: controlsRight
              }));
              if (controlsLeft.length > 0) {
                $.each(controlsLeft, function (key, control) {
                  footerControls.find('.coreui-table__controls_left').append(control);
                });
              }
              if (controlsCenter.length > 0) {
                $.each(controlsCenter, function (key, control) {
                  footerControls.find('.coreui-table__controls_center').append(control);
                });
              }
              if (controlsRight.length > 0) {
                $.each(controlsRight, function (key, control) {
                  footerControls.find('.coreui-table__controls_right').append(control);
                });
              }
              render.footersIn.push(footerControls);
            } else {
              var _footerControls = $(coreuiTableUtils.render(tpl['table/controls/footer-out.html'], {
                controlsLeft: controlsLeft,
                controlsCenter: controlsCenter,
                controlsRight: controlsRight
              }));
              if (controlsLeft.length > 0) {
                $.each(controlsLeft, function (key, control) {
                  _footerControls.find('.coreui-table__controls_left').append(control);
                });
              }
              if (controlsCenter.length > 0) {
                $.each(controlsCenter, function (key, control) {
                  _footerControls.find('.coreui-table__controls_center').append(control);
                });
              }
              if (controlsRight.length > 0) {
                $.each(controlsRight, function (key, control) {
                  _footerControls.find('.coreui-table__controls_right').append(control);
                });
              }
              render.footersOut.push(_footerControls);
            }
          }
        });
      }

      // Загрузка записей
      if (this._isRecordsRequest) {
        this.on('container_show', function () {
          if (typeof options.recordsRequest === 'function') {
            that.loadByFunction(options.recordsRequest);
          } else {
            that.load(options.recordsRequest.url, options.recordsRequest.method);
          }
        });
      }
      var classes = [];
      var classesWrapper = [];
      if (options.hasOwnProperty('noBorder') && typeof options.noBorder === 'boolean' && options.noBorder) {
        classes.push('coreui-table__no_border');
      }
      if (options.hasOwnProperty('showScrollShadow') && typeof options.showScrollShadow === 'boolean' && options.showScrollShadow) {
        classesWrapper.push('table-scroll-shadow');
      }
      if (options.hasOwnProperty('overflow') && typeof options.overflow === 'boolean' && options.overflow) {
        classesWrapper.push('overflow-x-auto');
      }
      var tableElement = coreuiTableRender.renderTable(this);
      var containerElement = $(coreuiTableUtils.render(tpl['container.html'], {
        id: this._id,
        classes: classes.length > 0 ? ' ' + classes.join(' ') : '',
        classesWrapper: classesWrapper.length > 0 ? ' ' + classesWrapper.join(' ') : '',
        widthSizes: widthSizes,
        heightSizes: heightSizes
      }));
      if (render.headersOut.length > 0) {
        containerElement.prepend(render.headersOut);
      }
      if (render.headersIn.length > 0) {
        containerElement.find('.coreui-table__container').prepend(render.headersIn);
      }
      if (render.footersIn.length > 0) {
        containerElement.find('.coreui-table__container').append(render.footersIn);
      }
      if (render.footersOut.length > 0) {
        containerElement.append(render.footersOut);
      }
      containerElement.find('.coreui-table__wrapper').html(tableElement);
      if (element === undefined) {
        return containerElement;
      }

      // Dom element
      var domElement = null;
      if (typeof element === 'string') {
        domElement = document.getElementById(element);
      } else if (element instanceof HTMLElement) {
        domElement = element;
      }
      if (domElement) {
        $(domElement).html(containerElement);
        this.initEvents();
      }
    },
    /**
     * Блокировка таблицы
     */
    lock: function lock() {
      var container = coreuiTableElements.getContainer(this.getId());
      if (container[0] && !container.find('.coreui-table-lock')[0]) {
        var html = coreuiTableUtils.render(tpl['table/loader.html'], {
          lang: this.getLang()
        });
        container.prepend(html);
      }
    },
    /**
     * Разблокировка таблицы
     */
    unlock: function unlock() {
      coreuiTableElements.getLock(this.getId()).hide(50, function () {
        $(this).remove();
      });
    },
    /**
     * Загрузка строк
     * @param {string} url
     * @param {string} method
     */
    load: function load(url, method) {
      this.lock();
      var that = this;
      var params = {};
      if (url.match(/\[page\]/)) {
        url = url.replace(/\[page\]/g, this._page);
      } else {
        var paramPage = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page') ? this._options.requestParams.page : 'page';
        params[paramPage] = this._page;
      }
      if (url.match(/\[count\]/)) {
        url = url.replace(/\[count\]/g, this._recordsPerPage);
      } else {
        var paramCount = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count') ? this._options.requestParams.count : 'count';
        params[paramCount] = this._recordsPerPage;
      }
      if (url.match(/\[start\]/)) {
        url = url.replace(/\[start\]/g, (this._page - 1) * this._recordsPerPage + 1);
      } else {
        var paramStart = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start') ? this._options.requestParams.start : 'start';
        params[paramStart] = (this._page - 1) * this._recordsPerPage + 1;
      }
      if (url.match(/\[end\]/)) {
        url = url.replace(/\[end\]/g, (this._page - 1) * this._recordsPerPage + Number(this._recordsPerPage));
      } else {
        var paramEnd = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end') ? this._options.requestParams.end : 'end';
        params[paramEnd] = (this._page - 1) * this._recordsPerPage + Number(this._recordsPerPage);
      }
      var searchData = this.getSearchData();
      var filterData = this.getFilterData();
      if (filterData.length > 0) {
        $.each(filterData, function (key, filter) {
          searchData.push(filter);
        });
      }
      if (searchData.length > 0) {
        var paramSearch = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('search') && typeof this._options.requestParams.search === 'string' ? this._options.requestParams.search : 'search';
        params[paramSearch] = searchData;
      }
      if (this._sort.length > 0) {
        var paramSort = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('sort') && typeof this._options.requestParams.sort === 'string' ? this._options.requestParams.sort : 'sort';
        params[paramSort] = this._sort;
      }
      $.ajax({
        url: url,
        method: method || 'GET',
        dataType: "json",
        data: params,
        beforeSend: function beforeSend(xhr) {
          coreuiTablePrivate._trigger(that, 'records_load_start', [that, xhr]);
        },
        success: function success(result) {
          if (result.hasOwnProperty('records') && _typeof(result.records) === 'object' && Array.isArray(result.records)) {
            var total = result.hasOwnProperty('total') && coreuiTableUtils.isNumeric(result.total) ? result.total : null;
            that.setRecords(result.records, total);
          } else {
            that.setRecords([]);
          }
        },
        error: function error(xhr, textStatus, errorThrown) {
          that.setRecords([]);
          coreuiTablePrivate._trigger(that, 'records_load_error', [that, xhr, textStatus, errorThrown]);
        },
        complete: function complete(xhr, textStatus) {
          that.unlock();
          coreuiTablePrivate._trigger(that, 'records_load_end', [that, xhr, textStatus]);
        }
      });
    },
    /**
     * Загрузка строк
     * @param {function} callback
     */
    loadByFunction: function loadByFunction(callback) {
      var that = this;
      var params = {};
      var paramPage = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('page') ? this._options.requestParams.page : 'page';
      var paramCount = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('count') ? this._options.requestParams.count : 'count';
      var paramStart = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('start') ? this._options.requestParams.start : 'start';
      var paramEnd = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('end') ? this._options.requestParams.end : 'end';
      params[paramCount] = this._recordsPerPage;
      params[paramPage] = this._page;
      params[paramStart] = (this._page - 1) * this._recordsPerPage + 1;
      params[paramEnd] = (this._page - 1) * this._recordsPerPage + Number(this._recordsPerPage);
      var searchData = this.getSearchData();
      var filterData = this.getFilterData();
      if (filterData.length > 0) {
        $.each(filterData, function (key, filter) {
          searchData.push(filter);
        });
      }
      if (searchData.length > 0) {
        var paramSearch = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('search') && typeof this._options.requestParams.search === 'string' ? this._options.requestParams.search : 'search';
        params[paramSearch] = searchData;
      }
      if (this._sort.length > 0) {
        var paramSort = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('sort') && typeof this._options.requestParams.sort === 'string' ? this._options.requestParams.sort : 'sort';
        params[paramSort] = this._sort;
      }
      var result = callback(params, this);

      /**
       * Установка записей
       * @param {Object} data
       */
      function setRecords(data) {
        if (data.hasOwnProperty('records') && _typeof(data.records) === 'object' && Array.isArray(data.records)) {
          var total = data.hasOwnProperty('total') && coreuiTableUtils.isNumeric(data.total) ? data.total : null;
          that.setRecords(data.records, total);
        } else {
          that.setRecords([]);
        }
      }
      if (result instanceof Promise) {
        this.lock();
        result.then(function (data) {
          that.unlock();
          setRecords(data);
        })["catch"](function () {
          that.unlock();
        });
      } else if (_typeof(result) === 'object') {
        setRecords(result);
      }
    },
    /**
     * Перезагрузка записей в таблице
     */
    reload: function reload() {
      if (this._isRecordsRequest) {
        if (typeof this._options.recordsRequest === 'function') {
          this.loadByFunction(this._options.recordsRequest);
        } else {
          this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
        }
      }
    },
    /**
     * Пересоздание тела таблицы
     */
    refresh: function refresh() {
      var table = coreuiTableRender.renderTable(this);
      coreuiTableElements.getTable(this.getId()).replaceWith(table);
      coreuiTablePrivate._trigger(this, 'table_show', [this]);
      coreuiTablePrivate._trigger(this, 'records_show', [this]);
    },
    /**
     * Установка общего количества записей на странице
     * @param recordsPerPage
     */
    setPageSize: function setPageSize(recordsPerPage) {
      this._recordsPerPage = recordsPerPage;
      coreuiTablePrivate._trigger(this, 'page_size_update');
    },
    /**
     * Выбор всех записей в таблице
     */
    selectAll: function selectAll() {
      coreuiTableElements.selectTrAll(this.getId());
      coreuiTablePrivate._trigger(this, 'record_select_all');
    },
    /**
     * Отмена выбор всех записей в таблице
     */
    unselectAll: function unselectAll() {
      coreuiTableElements.unselectTrAll(this.getId());
      coreuiTablePrivate._trigger(this, 'record_unselect_all');
    },
    /**
     * Выбор записи в таблице
     * @param {string} id
     */
    selectRecord: function selectRecord(id) {
      var record = this.getRecordById(id);
      if (!record) {
        return;
      }
      var tr = coreuiTableElements.getTrByIndex(this.getId(), record.index);
      if (tr.length === 0) {
        return;
      }
      coreuiTableElements.selectTr(tr);
      coreuiTablePrivate._trigger(this, 'record_select', [record]);
    },
    /**
     * Выбор записи в таблице по индексу
     * @param {int} index
     */
    selectRecordByIndex: function selectRecordByIndex(index) {
      var record = this.getRecordByIndex(index);
      if (!record) {
        return;
      }
      var tr = coreuiTableElements.getTrByIndex(this.getId(), record.index);
      if (tr.length === 0) {
        return;
      }
      coreuiTableElements.selectTr(tr);
      coreuiTablePrivate._trigger(this, 'record_select', [record]);
    },
    /**
     * Отмена выбора записи в таблице
     * @param {string} id
     */
    unselectRecord: function unselectRecord(id) {
      var record = this.getRecordById(id);
      if (!record) {
        return;
      }
      var tr = coreuiTableElements.getTrByIndex(this.getId(), record.index);
      if (!tr) {
        return;
      }
      coreuiTableElements.unselectTr(tr);
      coreuiTablePrivate._trigger(this, 'record_unselect', [record.data]);
    },
    /**
     * Получение выбранных id
     * @return {array}
     */
    getSelectedRecordsId: function getSelectedRecordsId() {
      var records = [];
      var that = this;
      var field = this._options.primaryKey;
      $.each(coreuiTableElements.getSelectedIndexes(this.getId()), function (key, index) {
        var record = that.getRecordByIndex(index);
        if (!record || !record.data.hasOwnProperty(field)) {
          return;
        }
        records.push(record.data[field]);
      });
      return records;
    },
    /**
     * Получение выбранных записей
     * @return {array}
     */
    getSelectedRecords: function getSelectedRecords() {
      var records = [];
      var that = this;
      $.each(coreuiTableElements.getSelectedIndexes(this.getId()), function (key, index) {
        var record = that.getRecordByIndex(index);
        if (!record) {
          return;
        }
        records.push(record);
      });
      return records;
    },
    /**
     * Получение записи по id
     * @param id
     * @return {object|null}
     */
    getRecord: function getRecord(id) {
      var record = this.getRecordById(id);
      if (!record) {
        return null;
      }
      return record.data;
    },
    /**
     * Получение записей
     */
    getRecords: function getRecords() {
      var records = [];
      $.each(this._records, function (key, record) {
        records.push($.extend(true, {}, record));
      });
      return records;
    },
    /**
     * Получение данных из существующих записей
     * @return {Array}
     */
    getData: function getData() {
      var data = [];
      $.each(this._records, function (key, record) {
        data.push($.extend(true, {}, record.data));
      });
      return data;
    },
    /**
     * Переход к предыдущей странице
     */
    prevPage: function prevPage() {
      if (this._page > 1) {
        this._page--;
        this.reload();
      }
    },
    /**
     * Переход к следующей странице
     * @return {array}
     */
    nextPage: function nextPage() {
      var totalPages = this._recordsTotal > 0 && this._recordsPerPage > 0 ? Math.ceil(this._recordsTotal / this._recordsPerPage) : 1;
      if (this._page < totalPages) {
        this._page++;
        this.reload();
      }
    },
    /**
     * Переход к указанной странице
     */
    goPage: function goPage(page) {
      if (page >= 1) {
        this._page = page;
        this.reload();
      }
    },
    /**
     * Регистрация функции на событие
     * @param {Array|string} eventName
     * @param {function}     callback
     * @param {*}            context
     * @param {boolean}      singleExec
     */
    on: function on(eventName, callback, context, singleExec) {
      var eventNames = [];
      if (Array.isArray(eventName)) {
        $.each(eventName, function (key, name) {
          if (typeof name === 'string' && name) {
            eventNames.push(name);
          }
        });
      } else if (typeof eventName === 'string' && eventName) {
        eventNames.push(eventName);
      } else {
        return;
      }
      var that = this;
      $.each(eventNames, function (key, name) {
        if (!Array.isArray(that._events[name])) {
          that._events[name] = [];
        }
        that._events[name].push({
          context: context ? context : that,
          callback: callback,
          singleExec: !!singleExec
        });
      });
    },
    /**
     * Получение переводов текущего языка
     * @return {object}
     */
    getLang: function getLang() {
      return $.extend(true, {}, this._options.langItems);
    },
    /**
     * Установка видимых колонок, не указанные колонки будут скрыты
     * @param {Array} columns
     */
    setColumnsShow: function setColumnsShow(columns) {
      if (!Array.isArray(columns)) {
        return;
      }
      var isChange = false;
      this._columns.map(function (column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string') {
          var isShow = columns.indexOf(options.field) >= 0;
          if (column.isShow() !== isShow) {
            column.setShow(isShow);
            isChange = true;
          }
        }
      });
      if (isChange) {
        coreuiTablePrivate._trigger(this, 'columns_change');
        this.refresh();
      }
    },
    /**
     * Показ колонок
     * @param {Array} columns
     */
    showColumns: function showColumns(columns) {
      if (!Array.isArray(columns)) {
        return;
      }
      var isChange = false;
      this._columns.map(function (column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string' && columns.indexOf(options.field) >= 0 && !column.isShow()) {
          column.setShow(true);
          isChange = true;
        }
      });
      if (isChange) {
        coreuiTablePrivate._trigger(this, 'columns_change');
        this.refresh();
      }
    },
    /**
     * Скрытие колонок
     * @param {Array} columns
     */
    hideColumns: function hideColumns(columns) {
      if (!Array.isArray(columns)) {
        return;
      }
      var isChange = false;
      this._columns.map(function (column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string' && columns.indexOf(options.field) >= 0 && column.isShow()) {
          column.setShow(false);
          isChange = true;
        }
      });
      if (isChange) {
        coreuiTablePrivate._trigger(this, 'columns_change');
        this.refresh();
      }
    },
    /**
     * Получение поисковых данных
     * @return {*[]}
     */
    getSearchData: function getSearchData() {
      var searchData = [];
      $.each(this._search, function (key, control) {
        var options = control.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
          var value = control.getValue();
          if (value !== null) {
            searchData.push({
              field: options.field,
              value: value,
              alg: control.hasOwnProperty('getAlgorithm') && typeof control.getAlgorithm === 'function' ? control.getAlgorithm() : null
            });
          }
        }
      });
      return searchData;
    },
    /**
     * Получение данных из фильтров
     * @return {*[]}
     */
    getFilterData: function getFilterData() {
      var filterData = [];
      $.each(this._filters, function (key, control) {
        var options = control.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
          var value = control.getValue();
          if (value !== null) {
            filterData.push({
              field: options.field,
              value: value,
              alg: control.hasOwnProperty('getAlgorithm') && typeof control.getAlgorithm === 'function' ? control.getAlgorithm() : null
            });
          }
        }
      });
      return filterData;
    },
    /**
     * Поиск по таблице с использованием данных из поиска и фильтров
     */
    searchRecords: function searchRecords() {
      var searchData = this.getSearchData();
      var filterData = this.getFilterData();
      if (this._isRecordsRequest) {
        if (typeof this._options.recordsRequest === 'function') {
          this.loadByFunction(this._options.recordsRequest);
        } else {
          this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
        }
      } else {
        coreuiTablePrivate.searchLocalRecords(this);
        this.refresh();
      }
      coreuiTablePrivate._trigger(this, 'filters_change', [filterData]);
      coreuiTablePrivate._trigger(this, 'search_change', [searchData]);
    },
    /**
     * Очистка поисковых данных
     */
    clearSearch: function clearSearch() {
      $.each(this._search, function (key, search) {
        search.setValue(null);
      });
      this.searchRecords();
    },
    /**
     * Очистка поисковых данных в фильтрах
     */
    clearFilters: function clearFilters() {
      $.each(this._filters, function (key, filter) {
        filter.setValue(null);
      });
      this.searchRecords();
    },
    /**
     * Получение записи по индексу
     * @param {string|number} index
     * @return {object|null}
     */
    getRecordByIndex: function getRecordByIndex(index) {
      if (['string', 'number'].indexOf(_typeof(index)) < 0 || index === '') {
        return null;
      }
      index = Number(index);
      if (index <= 0) {
        return null;
      }
      var record = null;
      $.each(this._records, function (key, recordItem) {
        if (recordItem.index === index) {
          record = {
            index: recordItem.index,
            data: $.extend(true, {}, recordItem.data),
            meta: recordItem.meta ? $.extend(true, {}, recordItem.meta) : null
          };
          return false;
        }
      });
      return record;
    },
    /**
     * Получение записи по id
     * @param {string} id
     * @return {object|null}
     */
    getRecordById: function getRecordById(id) {
      return this.getRecordByField(this._options.primaryKey, id);
    },
    /**
     * Получение записи по полю
     * @param {string}        field
     * @param {string|number} value
     * @return {object|null}
     */
    getRecordByField: function getRecordByField(field, value) {
      if (['string', 'number'].indexOf(_typeof(field)) < 0 || field === '') {
        return null;
      }
      var record = null;
      $.each(this._records, function (key, recordItem) {
        if (recordItem.data.hasOwnProperty(field) && recordItem.data[field] === value) {
          record = $.extend(true, {}, recordItem);
          return false;
        }
      });
      return record;
    },
    /**
     * Получение контрола по его id
     * @param {string} id
     * @return {object}
     */
    getControlById: function getControlById(id) {
      var result = null;
      $.each(this._controls, function (key, control) {
        if (control.hasOwnProperty('getId') && typeof control.getId === 'function' && control.getId() === id) {
          result = control;
          return false;
        }
      });
      return result;
    },
    /**
     * Получение контрола поиска по его id
     * @param {string} id
     * @return {object}
     */
    getSearchControlById: function getSearchControlById(id) {
      var result = null;
      $.each(this._search, function (key, search) {
        if (search.hasOwnProperty('getId') && typeof search.getId === 'function' && search.getId() === id) {
          result = search;
          return false;
        }
      });
      return result;
    },
    /**
     * Сортировка по полям
     * @param {Array} sorting
     */
    sortFields: function sortFields(sorting) {
      if (!Array.isArray(sorting)) {
        return;
      }
      var that = this;
      var columnsConverters = {};
      this._sort = [];
      $.each(sorting, function (key, sort) {
        if (!coreuiTableUtils.isObject(sort) || !sort.hasOwnProperty('field') || !sort.hasOwnProperty('order') || typeof sort.field !== 'string' || typeof sort.order !== 'string' || !sort.field || !sort.order) {
          return;
        }
        var columnSortable = false;
        $.each(that._columns, function (key, column) {
          var options = column.getOptions();
          if (options.hasOwnProperty('field') && options.hasOwnProperty('sortable') && typeof options.field === 'string' && options.field === sort.field && options.sortable) {
            columnSortable = true;
            if (column.hasOwnProperty('convertToString') && typeof column.convertToString === 'function') {
              columnsConverters[options.field] = column.convertToString;
            }
            return false;
          }
        });
        if (columnSortable) {
          that._sort.push({
            field: sort.field,
            order: sort.order
          });
        }
      });
      if (this._sort.length >= 0) {
        if (this._isRecordsRequest) {
          if (typeof this._options.recordsRequest === 'function') {
            this.loadByFunction(this._options.recordsRequest);
          } else {
            this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
          }
          coreuiTablePrivate.setColumnsSort(this, this._sort);
        } else {
          this._records = coreuiTablePrivate.sortRecordsByFields(this._records, this._sort, columnsConverters);
          this.refresh();
        }
      }
      coreuiTablePrivate._trigger(this, 'records_sort', [this]);
    },
    /**
     * Сортировка по умолчанию
     */
    sortDefault: function sortDefault() {
      this._sort = [];
      if (this._isRecordsRequest) {
        if (typeof this._options.recordsRequest === 'function') {
          this.loadByFunction(this._options.recordsRequest);
        } else {
          this.load(this._options.recordsRequest.url, this._options.recordsRequest.method);
        }
        coreuiTablePrivate.setColumnsSort(this);
      } else {
        this._records = coreuiTablePrivate.sortRecordsBySeq(this._records);
        this.refresh();
      }
      coreuiTablePrivate._trigger(this, 'records_sort', [this]);
    },
    /**
     * Удаление строки из таблицы по индексу
     * @param index
     */
    removeRecordByIndex: function removeRecordByIndex(index) {
      var recordKey = null;
      $.each(this._records, function (key, recordItem) {
        if (recordItem.index === index) {
          recordKey = key;
          return false;
        }
      });
      if (recordKey !== null && recordKey >= 0) {
        this._records.splice(recordKey, 1);
        var that = this;
        var tr = coreuiTableElements.getTrByIndex(this.getId(), index);
        if (tr.length >= 0) {
          tr.fadeOut('fast', function () {
            tr.remove();
            if (that._records.length === 0) {
              var tbody = coreuiTableElements.getTableTbody(that.getId());
              tbody.append(coreuiTableUtils.render(tpl['table/record/empty.html'], {
                columnsCount: that._countColumnsShow,
                lang: that.getLang()
              }));
            }
          });
        }
        this._recordsNumber--;
      }
    },
    /**
     * Добавление строки в таблицу после строки с индексом
     * @param {object} recordData
     * @param {number} index
     */
    addRecordAfterIndex: function addRecordAfterIndex(recordData, index) {
      var tr = coreuiTableElements.getTrByIndex(this.getId(), index);
      if (tr.length >= 0) {
        var record = coreuiTablePrivate.addRecord(this, recordData, index);
        if (record) {
          coreuiTableElements.getTrEmpty(this.getId()).remove();
          tr.after(coreuiTableRender.renderRecord(this, record));
          this._recordsNumber++;
        }
      }
    },
    /**
     * Добавление строки в таблицу перед строкой с индексом
     * @param {object} recordData
     * @param {number} index
     */
    addRecordBeforeIndex: function addRecordBeforeIndex(recordData, index) {
      var tr = coreuiTableElements.getTrByIndex(this.getId(), index);
      if (tr.length >= 0) {
        var record = coreuiTablePrivate.addRecordBefore(this, recordData, index);
        if (record) {
          coreuiTableElements.getTrEmpty(this.getId()).remove();
          tr.before(coreuiTableRender.renderRecord(this, record));
          this._recordsNumber++;
        }
      }
    },
    /**
     * Добавление строки в начало таблицы
     * @param {object} recordData
     */
    addRecordFirst: function addRecordFirst(recordData) {
      var tbody = coreuiTableElements.getTableTbody(this.getId());
      if (tbody.length >= 0) {
        var record = coreuiTablePrivate.addRecord(this, recordData, 0);
        if (record) {
          coreuiTableElements.getTrEmpty(this.getId()).remove();
          tbody.prepend(coreuiTableRender.renderRecord(this, record));
          this._recordsNumber++;
        }
      }
    },
    /**
     * Добавление строки в конец таблицы
     * @param {object} recordData
     */
    addRecordLast: function addRecordLast(recordData) {
      var tbody = coreuiTableElements.getTableTbody(this.getId());
      if (tbody.length >= 0) {
        var record = coreuiTablePrivate.addRecord(this, recordData);
        if (record) {
          coreuiTableElements.getTrEmpty(this.getId()).remove();
          tbody.append(coreuiTableRender.renderRecord(this, record));
          this._recordsNumber++;
        }
      }
    },
    /**
     * Показ указанных записей в таблице
     * @param {Array}  records
     * @param {number} total
     */
    setRecords: function setRecords(records, total) {
      if (!Array.isArray(records)) {
        return;
      }
      this._recordsTotal = coreuiTableUtils.isNumeric(total) ? parseInt(total) : records.length;
      coreuiTablePrivate.setRecords(this, records);
      if (records.length > 0) {
        this._recordsNumber = this._page === 1 ? 1 : (this._page - 1) * this._recordsPerPage + 1;
      }
      var recordsElements = coreuiTableRender.renderRecords(this, this._records);
      var tableBody = coreuiTableElements.getTableTbody(this.getId());
      tableBody.html('');
      $.each(recordsElements, function (key, recordElement) {
        tableBody.append(recordElement);
      });
      coreuiTablePrivate._trigger(this, 'records_show', [this]);
    },
    /**
     * Получение количества строк
     * @return {number}
     */
    getRecordsCount: function getRecordsCount() {
      var count = 0;
      if (this._isRecordsRequest) {
        count = this._recordsTotal;
      } else {
        this._records.map(function (record) {
          if (record.show) {
            count++;
          }
        });
      }
      return count;
    },
    /**
     * Раскрытие / скрытие дополнительных данных строки
     * @param {number}                                   recordIndex
     * @param {HTMLElement|jQuery|string|Array|function} content
     * @param {boolean}                                  isRebuild - true default
     */
    expandRecordContent: function expandRecordContent(recordIndex, content, isRebuild) {
      var recordElement = coreuiTableElements.getTrByIndex(this.getId(), recordIndex);
      var recordExpanded = coreuiTableElements.getExpandRow(recordElement);
      if (recordElement.hasClass('record-expanded')) {
        if (recordExpanded) {
          if (isRebuild === undefined || isRebuild) {
            coreuiTableElements.removeExpandRow(recordExpanded);
          } else {
            coreuiTableElements.hideExpandRow(recordExpanded);
          }
        }
        recordElement.removeClass('record-expanded');
        coreuiTablePrivate._trigger(this, 'record_expand_hide', [recordIndex]);
      } else {
        if (recordExpanded) {
          coreuiTableElements.showExpandRow(recordExpanded);
          recordElement.addClass('record-expanded');
          coreuiTablePrivate._trigger(this, 'record_expand_show', [recordIndex]);
        } else {
          var _recordIndex = recordElement.data('record-index');
          if (typeof content === 'function') {
            var callbackResult = content();
            if (callbackResult instanceof Promise) {
              var that = this;
              callbackResult.then(function (result) {
                coreuiTableElements.addExpandRow(that, recordElement, result);
                coreuiTablePrivate._trigger(that, 'record_expand_show', [_recordIndex]);
              })["catch"](function () {
                coreuiTableElements.addExpandRow(that, recordElement, '');
                coreuiTablePrivate._trigger(that, 'record_expand_show', [_recordIndex]);
              });
            } else {
              coreuiTableElements.addExpandRow(this, recordElement, callbackResult);
              coreuiTablePrivate._trigger(this, 'record_expand_show', [_recordIndex]);
            }
          } else {
            coreuiTableElements.addExpandRow(this, recordElement, content);
            coreuiTablePrivate._trigger(this, 'record_expand_show', [_recordIndex]);
          }
        }
      }
    },
    /**
     * Раскрытие / скрытие дополнительных данных строки
     * @param {number}  recordIndex
     * @param {string}  url
     * @param {boolean} isRebuild
     */
    expandRecordUrl: function expandRecordUrl(recordIndex, url, isRebuild) {
      var that = this;
      this.expandRecordContent(recordIndex, function () {
        that.lock();
        return new Promise(function (resolve, reject) {
          $.ajax({
            method: 'get',
            url: url,
            success: function success(response, textStatus, xhr) {
              var result = response;
              if (typeof response === 'string') {
                if (String(xhr.getResponseHeader('Content-Type')).indexOf('application/json') === 0) {
                  try {
                    result = JSON.parse(response);
                  } catch (e) {
                    console.warn(e);
                  }
                }
              }
              resolve(result);
            },
            error: function error(xhr, textStatus, errorThrown) {
              reject(xhr, textStatus, errorThrown);
            },
            complete: function complete(xhr, textStatus) {
              that.unlock();
            }
          });
        });
      }, isRebuild);
    }
  };

  var coreuiTable = {
    columns: {},
    controls: {},
    filters: {},
    search: {},
    lang: {},
    _instances: {},
    _settings: {
      lang: 'en'
    },
    /**
     * @param {object} options
     * @returns {object}
     */
    create: function create(options) {
      if (!options.hasOwnProperty('lang') || typeof options.lang !== 'string') {
        options.lang = this.getSetting('lang');
      }
      var langItems = this.lang.hasOwnProperty(options.lang) ? this.lang[options.lang] : {};
      options.langItems = options.hasOwnProperty('langItems') && coreuiTableUtils.isObject(options.langItems) ? $.extend(true, {}, langItems, options.langItems) : langItems;
      var instance = $.extend(true, {}, coreuiTableInstance);
      instance._init(this, options instanceof Object ? options : {});
      var tableId = instance.getId();
      this._instances[tableId] = instance;
      return instance;
    },
    /**
     * @param {string} id
     * @returns {object|null}
     */
    get: function get(id) {
      if (!this._instances.hasOwnProperty(id)) {
        return null;
      }
      if (!$('#coreui-table-' + id)[0]) {
        delete this._instances[id];
        return null;
      }
      return this._instances[id];
    },
    /**
     * Установка настроек
     * @param {object} settings
     */
    setSettings: function setSettings(settings) {
      this._settings = $.extend(true, {}, this._settings, settings);
    },
    /**
     * Получение значения настройки
     * @param {string} name
     */
    getSetting: function getSetting(name) {
      var value = null;
      if (this._settings.hasOwnProperty(name)) {
        value = this._settings[name];
      }
      return value;
    }
  };

  var langEn = {
    "emptyRecords": "No records",
    "loading": "Loading...",
    "total": "Total",
    "all": "All",
    "complete": "Complete",
    "search": "Search",
    "searchAction": "Search",
    "clear": "Clear"
  };

  var langRu = {
    "emptyRecords": "Нет записей",
    "loading": "Загрузка...",
    "total": "Всего",
    "all": "Все",
    "complete": "Применить",
    "search": "Поиск",
    "searchAction": "Искать",
    "clear": "Очистить"
  };

  var ControlLink = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'link',
      url: null,
      content: null,
      onClick: null,
      attr: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
        var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
        $('a', control).click(function (event) {
          if (typeof that._options.onClick === 'function') {
            return that._options.onClick(event, that._table);
          } else if (typeof that._options.onClick === 'string') {
            var func = new Function('event', 'table', 'control', that._options.onClick);
            func(event, that._table, that);
          }
        });
      }
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      if (_typeof(this._options.attr) === 'object') {
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/link.html'], {
        url: this._options.url,
        content: this._options.content,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var ControlButton = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'button',
      content: null,
      onClick: null,
      attr: {
        "class": 'btn btn-secondary'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
        var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
        $('button', control).click(function (event) {
          if (typeof that._options.onClick === 'function') {
            that._options.onClick(event, that._table, that);
          } else if (typeof that._options.onClick === 'string') {
            var func = new Function('event', 'table', 'control', that._options.onClick);
            func(event, that._table, that);
          }
        });
      }
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      if (coreuiTableUtils.isObject(this._options.attr)) {
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/button.html'], {
        content: this._options.content,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var ControlDropdown = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'dropdown',
      content: null,
      items: null,
      attr: {
        "class": 'btn btn-primary'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (Array.isArray(this._options.items)) {
        $.each(this._options.items, function (key, item) {
          if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
            item.id = coreuiTableUtils.hashCode();
          }
        });
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var options = this.getOptions();
      if (Array.isArray(options.items)) {
        $.each(options.items, function (key, item) {
          if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
            if (item.type === 'button') {
              if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0 && typeof item.content === 'string') {
                var control = coreuiTableElements.getControl(that._table.getId(), that.getId());
                $('button#btn-dropdown-' + item.id, control).click(function (event) {
                  if (typeof item.onClick === 'function') {
                    item.onClick(event, that._table, that);
                  } else if (typeof item.onClick === 'string') {
                    var func = new Function('event', 'table', 'control', item.onClick);
                    func(event, that._table, that);
                  }
                });
              }
            }
          }
        });
      }
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var options = this.getOptions();
      var items = [];
      var attributes = [];
      if (Array.isArray(options.items)) {
        $.each(options.items, function (key, item) {
          if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
            if (item.type === 'link') {
              if (item.hasOwnProperty('link') && item.hasOwnProperty('content') && typeof item.url === 'string' && typeof item.content === 'string') {
                items.push({
                  type: 'link',
                  url: item.url,
                  content: item.content
                });
              }
            } else if (item.type === 'button') {
              if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
                items.push({
                  type: 'button',
                  id: item.id,
                  content: item.content
                });
              }
            } else if (item.type === 'divider') {
              items.push({
                type: 'divider'
              });
            }
          }
        });
      }
      if (coreuiTableUtils.isObject(options.attr)) {
        if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
          options.attr["class"] += ' dropdown-toggle';
        }
        if (options.attr.hasOwnProperty('type')) {
          delete options.attr.type;
        }
        if (options.attr.hasOwnProperty('id')) {
          delete options.attr.id;
        }
        if (options.attr.hasOwnProperty('data-bs-toggle')) {
          delete options.attr['data-bs-toggle'];
        }
        $.each(options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/dropdown.html'], {
        content: options.content,
        position: options.hasOwnProperty('position') && typeof options.position === 'string' ? options.position : 'end',
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        items: items
      });
    }
  };

  var ControlButtonGroup = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'button_group',
      buttons: null
    },
    _link: {
      attr: {
        "class": 'btn btn-secondary'
      }
    },
    _button: {
      attr: {
        "class": 'btn btn-secondary'
      }
    },
    _dropdown: {
      attr: {
        "class": 'btn btn-secondary'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (Array.isArray(this._options.buttons)) {
        $.each(this._options.buttons, function (key, button) {
          if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
            button.id = coreuiTableUtils.hashCode();
            if (button.type === 'dropdown' && Array.isArray(button.items)) {
              $.each(button.items, function (key, item) {
                if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                  item.id = coreuiTableUtils.hashCode();
                }
              });
            }
          }
        });
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var options = this.getOptions();
      if (Array.isArray(options.buttons)) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        $.each(options.buttons, function (key, button) {
          if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
            if (button.type === 'button') {
              if (button.hasOwnProperty('content') && button.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(button.onClick)) >= 0 && typeof button.content === 'string') {
                $('button#btn-' + button.id, control).click(function (event) {
                  if (typeof button.onClick === 'function') {
                    button.onClick(event, that._table, that);
                  } else if (typeof button.onClick === 'string') {
                    var func = new Function('event', 'table', 'control', button.onClick);
                    func(event, that._table, that);
                  }
                });
              }
            } else if (button.type === 'dropdown' && Array.isArray(button.items)) {
              $.each(button.items, function (key, item) {
                if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                  if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0 && typeof item.content === 'string') {
                    $('button#btn-dropdown-' + item.id, control).click(function (event) {
                      if (typeof item.onClick === 'function') {
                        item.onClick(event, that._table, that);
                      } else if (typeof item.onClick === 'string') {
                        var func = new Function('event', 'table', 'control', item.onClick);
                        func(event, that._table, that);
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var options = this.getOptions();
      var buttons = [];
      var that = this;
      if (Array.isArray(options.buttons)) {
        $.each(options.buttons, function (key, button) {
          if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
            if (button.type === 'link') {
              if (button.hasOwnProperty('link') && button.hasOwnProperty('content') && typeof button.link === 'string' && typeof button.content === 'string') {
                var attributes = [];
                if (coreuiTableUtils.isObject(button.attr)) {
                  button.attr = {};
                }
                if (button.attr.hasOwnProperty('href')) {
                  delete button.attr.href;
                }
                if (!button.attr.hasOwnProperty('class')) {
                  button.attr["class"] = that._link.attr["class"];
                }
                $.each(button.attr, function (name, value) {
                  attributes.push(name + '="' + value + '"');
                });
                buttons.push({
                  type: 'link',
                  url: button.url,
                  content: button.content,
                  attr: attributes
                });
              }
            } else if (button.type === 'button') {
              if (button.hasOwnProperty('content') && button.hasOwnProperty('onClick') && typeof button.content === 'string' && ['string', 'function'].indexOf(_typeof(button.onClick)) >= 0) {
                var _attributes = [];
                if (coreuiTableUtils.isObject(button.attr)) {
                  button.attr = {};
                }
                if (button.attr.hasOwnProperty('type')) {
                  delete button.attr.type;
                }
                if (button.attr.hasOwnProperty('id')) {
                  delete button.attr.id;
                }
                if (!button.attr.hasOwnProperty('class')) {
                  button.attr["class"] = that._button.attr["class"];
                }
                $.each(button.attr, function (name, value) {
                  _attributes.push(name + '="' + value + '"');
                });
                buttons.push({
                  type: 'button',
                  id: button.id,
                  content: button.content,
                  attr: _attributes
                });
              }
            } else if (button.type === 'dropdown') {
              if (Array.isArray(button.items)) {
                var _attributes2 = [];
                var items = [];
                $.each(button.items, function (key, item) {
                  if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                    if (item.type === 'link') {
                      if (item.hasOwnProperty('link') && item.hasOwnProperty('content') && typeof item.url === 'string' && typeof item.content === 'string') {
                        items.push({
                          type: 'link',
                          url: item.url,
                          content: item.content
                        });
                      }
                    } else if (item.type === 'button') {
                      if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
                        items.push({
                          type: 'button',
                          id: item.id,
                          content: item.content
                        });
                      }
                    } else if (item.type === 'divider') {
                      items.push({
                        type: 'divider'
                      });
                    }
                  }
                });
                if (coreuiTableUtils.isObject(button.attr)) {
                  button.attr = {};
                }
                if (button.attr.hasOwnProperty('type')) {
                  delete button.attr.type;
                }
                if (button.attr.hasOwnProperty('id')) {
                  delete button.attr.id;
                }
                if (!button.attr.hasOwnProperty('class')) {
                  button.attr["class"] = that._dropdown.attr["class"];
                }
                if (button.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(button.attr["class"])) >= 0) {
                  button.attr["class"] += ' dropdown-toggle';
                }
                $.each(button.attr, function (name, value) {
                  _attributes2.push(name + '="' + value + '"');
                });
                buttons.push({
                  type: 'dropdown',
                  content: button.content,
                  position: button.hasOwnProperty('position') && typeof button.position === 'string' ? button.position : 'end',
                  attr: _attributes2,
                  items: items
                });
              }
            }
          }
        });
      }
      return coreuiTableUtils.render(tpl['controls/button_group.html'], {
        buttons: buttons
      });
    }
  };

  var ControlCustom = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'custom',
      content: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {},
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string|HTMLElement|jQuery}
     */
    render: function render() {
      if (typeof this._options.content === 'string') {
        return this._options.content;
      } else if (typeof this._options.content === 'function') {
        return this._options.content();
      }
    }
  };

  var ControlPageSize = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'page_size',
      attr: {
        "class": 'form-select'
      },
      list: [25, 50, 100, 1000]
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
      }
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (!Array.isArray(this._options.list)) {
        this._options.list = [];
      }
      if (this._options.list.indexOf(this._table._recordsPerPage) < 0) {
        this._options.list.unshift(this._table._recordsPerPage);
      }
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
      var selectPageSize = $('select', control);
      selectPageSize.change(function () {
        that._table._page = 1;
        that._table.setPageSize(Number(selectPageSize.val()));
        that._table.reload();
      });
      this._table.on('page_size_update', function () {
        selectPageSize.val(that._table._recordsPerPage);
      });
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      if (coreuiTableUtils.isObject(this._options.attr)) {
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/page-size.html'], {
        recordsPerPageList: this._options.list,
        recordsPerPage: this._table._recordsPerPage,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        lang: this._table.getLang()
      });
    }
  };

  var ControlPageJump = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'page_jump',
      attr: {
        "class": 'input-group'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
      }
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
      var input = $('input', control);
      var button = $('button', control);
      if (button[0]) {
        button.click(function () {
          that._table.goPage(input.val());
        });
        input.keyup(function (event) {
          if (event.key === 'Enter' || event.keyCode === 13) {
            that._table.goPage(input.val());
          }
        });
      }
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      if (coreuiTableUtils.isObject(this._options.attr)) {
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/page-jump.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var ControlPages = {
    _id: null,
    _table: null,
    _options: {
      show: {
        prev: true,
        next: true
      },
      count: 3,
      attr: {
        "class": 'pagination mb-0'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
      }
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
      this._initEvents();
      this._table.on('records_show', function () {
        control.html(that.render());
        that._initEvents();
      });
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      var showPrev = !!this._options.show.prev;
      var showNext = !!this._options.show.next;
      var showDividerStart = false;
      var showDividerEnd = false;
      var showPageFirst = false;
      var showPageLast = false;
      var pages = [];
      var pagesTotal = this._table._recordsTotal > 0 && this._table._recordsPerPage > 0 ? Math.ceil(this._table._recordsTotal / this._table._recordsPerPage) : 1;
      if (this._table._recordsTotal > 0 && this._options.count > 0 && coreuiTableUtils.isNumeric(this._options.count)) {
        var count = Math.min(this._options.count, pagesTotal);
        var countHalf = Math.max(0, Math.floor(count / 2));
        if (count % 2 === 0) {
          countHalf -= 1;
        }
        var start = this._table._page > 1 ? Math.max(1, this._table._page - countHalf) : this._table._page;
        if (start + count > pagesTotal) {
          start = pagesTotal - (count - 1);
        }
        for (var i = 0; i < count; i++) {
          pages.push(start + i);
        }
      } else {
        if (this._options.count > 0 && this._table._page > 1) {
          pages.push(this._table._page);
        }
      }
      if (pages.length > 0) {
        if (pages[0] >= 2) {
          showPageFirst = true;
        }
        if (pages[0] >= 3) {
          showDividerStart = true;
        }
        if (pages[pages.length - 1] + 1 < pagesTotal) {
          showDividerEnd = true;
        }
        if (pages[pages.length - 1] < pagesTotal) {
          showPageLast = true;
        }
      }
      if (coreuiTableUtils.isObject(this._options.attr)) {
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/pages.html'], {
        currentPage: this._table._page,
        isActivePrev: this._table._page > 1,
        isActiveNext: this._table._page < pagesTotal,
        pagesTotal: pagesTotal,
        showPrev: showPrev,
        showPageFirst: showPageFirst,
        showDividerStart: showDividerStart,
        pages: pages,
        showDividerEnd: showDividerEnd,
        showPageLast: showPageLast,
        showNext: showNext,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        lang: this._table.getLang()
      });
    },
    /**
     * Инициализация событий на элементах
     * @private
     */
    _initEvents: function _initEvents() {
      var that = this;
      var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
      var btnPrev = $('.coreui-table__page_prev', control);
      if (btnPrev[0]) {
        if (that._table._page <= 1) {
          btnPrev.addClass('disabled');
        }
        btnPrev.click(function () {
          if (that._table._page > 1) {
            that._table.prevPage();
          }
        });
      }
      var btnNext = $('.coreui-table__page_next', control);
      if (btnNext[0]) {
        btnNext.click(function () {
          that._table.nextPage();
        });
      }
      var pages = $('.coreui-table__page', control);
      if (pages[0]) {
        pages.click(function () {
          var page = Number($.trim($(this).text()));
          if (page > 0) {
            that._table.goPage(page);
          }
        });
      }
    }
  };

  var ControlTotal = {
    _id: null,
    _table: null,
    _options: {
      type: 'total',
      attr: {
        "class": 'px-1'
      }
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(this._options.attr, options.attr);
      }
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
      this._table.on('records_show', function () {
        control.html(that.render());
      });
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      if (coreuiTableUtils.isObject(this._options.attr)) {
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/total.html'], {
        recordsTotal: this._table._recordsTotal,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        lang: this._table.getLang()
      });
    }
  };

  var ControlSearch = {
    _id: null,
    _table: null,
    _options: {
      btn: {
        attr: {
          "class": 'btn btn-outline-secondary'
        },
        content: null
      },
      btnClear: {
        content: "<i class=\"bi bi-x text-danger\"></i>",
        attr: {
          "class": 'btn btn-outline-secondary'
        }
      },
      btnComplete: {
        attr: {
          "class": 'btn btn-primary'
        },
        content: null
      }
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = coreuiTableUtils.hashCode();
      if (!coreuiTableUtils.isObject(this._options.btn)) {
        this._options.btn = {};
      }
      if (!this._options.btn.hasOwnProperty('content') || typeof this._options.btn.content !== 'string') {
        this._options.btn.content = '<i class="bi bi-search"></i> ' + table.getLang().search;
      }
      if (!coreuiTableUtils.isObject(this._options.btnClear)) {
        this._options.btnClear = {};
      }
      if (!this._options.btnClear.hasOwnProperty('content') || typeof this._options.btnClear.content !== 'string') {
        this._options.btnClear.content = table.getLang().clear;
      }
      if (!coreuiTableUtils.isObject(this._options.btnComplete)) {
        this._options.btnComplete = {};
      }
      if (!this._options.btnComplete.hasOwnProperty('content') || typeof this._options.btnComplete.content !== 'string') {
        this._options.btnComplete.content = table.getLang().searchAction;
      }
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var control = coreuiTableElements.getControl(this._table.getId(), this.getId());
      var buttonToggle = $('button.btn-search-toggle', control);
      var buttonClear = $('button.btn-clear', control);
      buttonToggle.click(function () {
        var container = coreuiTableElements.getSearchContainer(that._table.getId());
        var columnsContainer = coreuiTableElements.getColumnsContainer(that._table.getId());
        if (columnsContainer[0]) {
          columnsContainer.hide();
        }
        if (container[0]) {
          container.fadeToggle('fast');
        } else {
          var controls = [];
          var controlsEvents = [];
          var btnCompleteAttr = [];
          var btnCompleteContent = '';
          var wrapper = coreuiTableElements.getWrapper(that._table.getId());
          var tableOptions = that._table.getOptions();
          var labelWidth = tableOptions.search.hasOwnProperty('labelWidth') && tableOptions.search.labelWidth ? tableOptions.search.labelWidth : 160;
          $.each(that._table._search, function (key, control) {
            var options = control.getOptions();
            if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
              controls.push({
                label: options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
                description: options.hasOwnProperty('description') && typeof options.description === 'string' ? options.description : '',
                suffix: options.hasOwnProperty('suffix') && typeof options.suffix === 'string' ? options.suffix : '',
                id: control.getId(),
                content: control.render()
              });
              if (control.hasOwnProperty('initEvents') && typeof control.initEvents === 'function') {
                controlsEvents.push({
                  event: control.initEvents,
                  control: control
                });
              }
            }
          });
          if (!coreuiTableUtils.isObject(that._options.btnComplete)) {
            that._options.btnComplete = {};
          }
          if (!coreuiTableUtils.isObject(that._options.btnComplete.attr)) {
            that._options.btnComplete.attr = {};
          }
          if (that._options.btnComplete.attr.hasOwnProperty('type')) {
            delete that._options.btnComplete.attr.type;
          }
          if (!that._options.btnComplete.attr.hasOwnProperty('class') || typeof that._options.btnComplete.attr["class"] !== 'string') {
            that._options.btnComplete.attr["class"] = 'btn-complete';
          } else {
            that._options.btnComplete.attr["class"] += ' btn-complete';
          }
          if (coreuiTableUtils.isObject(that._options.btnComplete.attr)) {
            $.each(that._options.btnComplete.attr, function (name, value) {
              btnCompleteAttr.push(name + '="' + value + '"');
            });
          }
          if (typeof that._options.btnComplete.content === 'string') {
            btnCompleteContent = that._options.btnComplete.content;
          }
          var content = coreuiTableUtils.render(tpl['controls/search-container.html'], {
            labelWidth: labelWidth + (typeof labelWidth === 'number' ? 'px' : ''),
            controls: controls,
            btnCompleteAttr: btnCompleteAttr.length > 0 ? ' ' + btnCompleteAttr.join(' ') : '',
            btnCompleteContent: btnCompleteContent
          });
          wrapper.before(content);
          if (controlsEvents.length > 0) {
            $.each(controlsEvents, function (key, controlsEvent) {
              controlsEvent.event.apply(controlsEvent.control);
            });
          }
          container = wrapper.parent().find('> .coreui-table__search');
          $('.btn-complete', container).click(function () {
            that._table.searchRecords();
            container.fadeOut('fast');
          });
        }
      });
      buttonClear.click(function () {
        that._table.clearSearch();
        var container = coreuiTableElements.getSearchContainer(that._table.getId());
        if (container[0]) {
          container.fadeOut('fast');
        }
      });
      this._table.on('search_change', function (searchData) {
        var buttonClear = $('button.btn-clear', control);
        if (searchData.length > 0) {
          if (!buttonClear[0]) {
            $(that._renderBtnClear()).insertAfter(buttonToggle);
            $('button.btn-clear', control).click(function () {
              that._table.clearSearch();
              var container = coreuiTableElements.getSearchContainer(that._table.getId());
              if (container[0]) {
                container.fadeOut('fast');
              }
            });
          }
        } else {
          buttonClear.remove();
          var container = coreuiTableElements.getSearchContainer(that._table.getId());
          if (container[0]) {
            container.fadeOut('fast');
          }
        }
      });
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var btnAttr = [];
      var btnContent = '';
      var btnClear = '';
      if (!coreuiTableUtils.isObject(this._options.btn)) {
        this._options.btn = {};
      }
      if (!coreuiTableUtils.isObject(this._options.btn.attr)) {
        this._options.btn.attr = {};
      }
      if (!this._options.btn.attr.hasOwnProperty('class') || typeof this._options.btn.attr["class"] !== 'string') {
        this._options.btn.attr["class"] = 'btn-search-toggle';
      } else {
        this._options.btn.attr["class"] += ' btn-search-toggle';
      }
      $.each(this._options.btn.attr, function (name, value) {
        btnAttr.push(name + '="' + value + '"');
      });
      if (typeof this._options.btn.content === 'string') {
        btnContent = this._options.btn.content;
      }
      if (this._table.getSearchData().length > 0) {
        btnClear = this._renderBtnClear();
      }
      return coreuiTableUtils.render(tpl['controls/search.html'], {
        btnContent: btnContent,
        btnAttr: btnAttr.length > 0 ? ' ' + btnAttr.join(' ') : '',
        btnClear: btnClear
      });
    },
    /**
     * Рендер кнопки отмены
     * @private
     */
    _renderBtnClear: function _renderBtnClear() {
      var attributes = [];
      var content = '';
      if (!coreuiTableUtils.isObject(this._options.btnClear)) {
        this._options.btnClear = {};
      }
      if (!coreuiTableUtils.isObject(this._options.btnClear.attr)) {
        this._options.btnClear.attr = {};
      }
      if (!this._options.btnClear.attr.hasOwnProperty('class') || typeof this._options.btnClear.attr["class"] !== 'string') {
        this._options.btnClear.attr["class"] = 'btn-clear';
      } else {
        this._options.btnClear.attr["class"] += ' btn-clear';
      }
      $.each(this._options.btnClear.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      if (typeof this._options.btnClear.content === 'string') {
        content = this._options.btnClear.content;
      }
      return coreuiTableUtils.render(tpl['controls/search-clear.html'], {
        content: content,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var ControlColumns = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'columns',
      btn: {
        content: '<i class="bi bi-layout-three-columns"></i>',
        attr: {
          "class": 'btn btn-outline-secondary'
        }
      },
      btnComplete: {
        content: null,
        attr: {
          "class": 'btn btn-primary'
        }
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (!coreuiTableUtils.isObject(this._options.btn)) {
        this._options.btn = {};
      }
      if (!coreuiTableUtils.isObject(this._options.btnComplete)) {
        this._options.btnComplete = {};
      }
      if (coreuiTableUtils.isObject(this._options.btnComplete) && typeof this._options.btnComplete.content !== 'string') {
        this._options.btnComplete.content = table.getLang().complete;
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {
      var that = this;
      var options = this.getOptions();
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var button = $('button', control);
      button.click(function () {
        var container = coreuiTableElements.getColumnsContainer(that._table.getId());
        var containerSearch = coreuiTableElements.getSearchContainer(that._table.getId());
        if (containerSearch[0]) {
          containerSearch.hide();
        }
        if (container[0]) {
          container.fadeToggle('fast');
        } else {
          var columns = [];
          var showAll = true;
          var btnCompleteAttr = [];
          var btnCompleteContent = '';
          var wrapper = coreuiTableElements.getWrapper(that._table.getId());
          $.each(that._table._columns, function (key, column) {
            var options = column.getOptions();
            if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
              var isShow = column.isShow();
              columns.push({
                field: options.field,
                label: options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
                show: isShow
              });
              if (!isShow) {
                showAll = false;
              }
            }
          });
          if (!coreuiTableUtils.isObject(options.btnComplete)) {
            options.btnComplete = {};
          }
          if (!coreuiTableUtils.isObject(options.btnComplete.attr)) {
            options.btnComplete.attr = {};
          }
          if (options.btnComplete.attr.hasOwnProperty('type')) {
            delete options.btnComplete.attr.type;
          }
          if (!options.btnComplete.attr.hasOwnProperty('class') || typeof options.btnComplete.attr["class"] !== 'string') {
            options.btnComplete.attr["class"] = 'btn-complete';
          } else {
            options.btnComplete.attr["class"] += ' btn-complete';
          }
          if (coreuiTableUtils.isObject(options.btnComplete.attr)) {
            $.each(options.btnComplete.attr, function (name, value) {
              btnCompleteAttr.push(name + '="' + value + '"');
            });
          }
          if (typeof options.btnComplete.content === 'string') {
            btnCompleteContent = options.btnComplete.content;
          }
          var content = coreuiTableUtils.render(tpl['controls/columns-container.html'], {
            showAll: showAll,
            columns: columns,
            btnCompleteAttr: btnCompleteAttr.length > 0 ? ' ' + btnCompleteAttr.join(' ') : '',
            btnCompleteContent: btnCompleteContent,
            lang: that._table.getLang()
          });
          wrapper.before(content);
          container = wrapper.parent().find('> .coreui-table__columns');
          $('.coreui-table__check_all input', container).change(function () {
            $('.coreui-table_check-column input', container).prop('checked', $(this).is(":checked"));
          });
          $('.btn-complete', container).click(function () {
            var columns = [];
            $('.coreui-table_check-column input:checked', container).each(function (key, input) {
              columns.push($(input).val());
            });
            that._table.setColumnsShow(columns);
            container.fadeOut('fast');
          });
        }
      });
    },
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      if (coreuiTableUtils.isObject(this._options.btn.attr)) {
        $.each(this._options.btn.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
      }
      return coreuiTableUtils.render(tpl['controls/columns.html'], {
        btnContent: this._options.btn.content,
        btnAttr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var ControlCaption = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'caption',
      title: null,
      description: null,
      value: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {},
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      return coreuiTableUtils.render(tpl['controls/caption.html'], {
        title: this._options.title,
        description: this._options.description,
        value: this._options.value
      });
    }
  };

  var ControlFilterClear = {
    _id: null,
    _table: null,
    _options: {
      id: null,
      type: 'filter_clear',
      content: null,
      attr: {
        "class": 'btn btn-secondary'
      }
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (!this._options.hasOwnProperty('content') || typeof this._options.content !== 'string') {
        this._options.content = '<i class="bi bi-x"></i> ' + table.getLang().clear;
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('button', control).click(function () {
        that._table.clearFilters();
      });
      this._table.on('filters_change', function (filterData) {
        if (filterData.length > 0) {
          $('button', control).show();
        } else {
          $('button', control).hide();
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      var options = this.getOptions();
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      var filterData = this._table.getFilterData();
      if (filterData.length === 0) {
        if (options.attr.hasOwnProperty('style') && typeof options.attr.style === 'string') {
          options.attr.style += ';display:none;';
        } else {
          options.attr.style = "display:none";
        }
      }
      var attr = [];
      $.each(options.attr, function (name, value) {
        attr.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['controls/filter_clear.html'], {
        attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
        content: options.content ? options.content : ''
      });
    }
  };

  var ControlDivider = {
    _id: null,
    _table: null,
    _options: {
      type: 'divider',
      width: 40,
      attr: {
        "class": 'd-inline-block',
        style: 'height:20px'
      }
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend({}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    },
    /**
     * Инициализация событий связанных с элементом управления
     */
    initEvents: function initEvents() {},
    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    render: function render() {
      var attributes = [];
      this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
        style: 'width:' + this._options.width + 'px'
      });
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['controls/divider.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var FilterText = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'text',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control"
      },
      btn: {
        attr: {
          "class": "btn btn-outline-secondary border-secondary-subtle"
        },
        content: '<i class="bi bi-search"></i>'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
        }
      });
      $('button', control).click(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      options.attr['name'] = typeof options.field === 'string' ? options.field : '';
      options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      if (!coreuiTableUtils.isObject(options.btn)) {
        options.btn = {};
      }
      if (!coreuiTableUtils.isObject(options.btn.attr)) {
        options.btn.attr = {};
      }
      if (options.btn.attr.hasOwnProperty('type')) {
        delete options.btn.attr.type;
      }
      var attr = [];
      var attrBtn = [];
      $.each(options.attr, function (name, value) {
        attr.push(name + '="' + value + '"');
      });
      $.each(options.btn.attr, function (name, value) {
        attrBtn.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['filters/text.html'], {
        attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
        label: label,
        btnAttr: attrBtn.length > 0 ? ' ' + attrBtn.join(' ') : '',
        btnContent: options.btn.content ? options.btn.content : ''
      });
    }
  };

  var FilterNumber = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'number',
      field: null,
      label: null,
      value: null,
      width: 90,
      attr: {
        "class": "form-control"
      },
      btn: {
        attr: {
          "class": "btn btn-outline-secondary border-secondary-subtle"
        },
        content: '<i class="bi bi-search"></i>'
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {object|null} value
     */
    setValue: function setValue(value) {
      if (value) {
        if (!coreuiTableUtils.isObject(value)) {
          return;
        }
        var numberStart = null;
        var numberEnd = null;
        if (value.hasOwnProperty('start') && (typeof value.start === 'string' || typeof value.start !== 'number') && value.start !== '') {
          numberStart = value.start;
        }
        if (value.hasOwnProperty('end') && (typeof value.end === 'string' || typeof value.end !== 'number') && value.end !== '') {
          numberEnd = value.end;
        }
        if (numberStart === null && numberEnd === null) {
          this._value = null;
        } else {
          this._value = {
            start: numberStart,
            end: numberEnd
          };
        }
      } else {
        this._value = null;
      }
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          var inputStart = $('input.number-start', control);
          var inputEnd = $('input.number-end', control);
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var inputStart = $('input.number-start', control);
      var inputEnd = $('input.number-end', control);
      if (inputStart[0] && inputEnd[0]) {
        var valueStart = inputStart.val();
        var valueEnd = inputEnd.val();
        if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
          return {
            start: valueStart !== '' ? valueStart : null,
            end: valueEnd !== '' ? valueEnd : null
          };
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input.number-start, input.number-end', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
        }
      });
      $('button', control).click(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      if (options.attr.hasOwnProperty('value')) {
        delete options.attr.value;
      }
      var field = typeof options.field === 'string' ? options.field : '';
      var startAttr = [];
      var endAttr = [];
      var attrBtn = [];
      $.each(options.attr, function (name, value) {
        if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
          return;
        }
        startAttr.push(name + '="' + value + '"');
        endAttr.push(name + '="' + value + '"');
      });
      if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
        startAttr.push('class="' + options.attr["class"] + ' number-start"');
        endAttr.push('class="' + options.attr["class"] + ' number-end"');
      } else {
        startAttr.push('class="number-start"');
        endAttr.push('class="number-end"');
      }
      if (field) {
        startAttr.push('name="' + field + '[start]"');
        endAttr.push('name="' + field + '[end]"');
      }
      startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
      endAttr.push('value="' + (this._value ? this._value.end : '') + '"');
      if (!coreuiTableUtils.isObject(options.btn)) {
        options.btn = {};
      }
      if (!coreuiTableUtils.isObject(options.btn.attr)) {
        options.btn.attr = {};
      }
      if (options.btn.attr.hasOwnProperty('type')) {
        delete options.btn.attr.type;
      }
      $.each(options.btn.attr, function (name, value) {
        attrBtn.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['filters/number.html'], {
        attrStart: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
        attrEnd: endAttr.length > 0 ? ' ' + endAttr.join(' ') : '',
        label: label,
        btnAttr: attrBtn.length > 0 ? ' ' + attrBtn.join(' ') : '',
        btnContent: options.btn.content ? options.btn.content : ''
      });
    }
  };

  var FilterDate = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'date',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string} value
     */
    setValue: function setValue(value) {
      if (typeof value !== 'string' && value !== null) {
        return;
      }
      if (value && (value.match(/^\d{4}\-\d{2}\-\d{2}$/) === null || isNaN(new Date(value)))) {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      options.attr['name'] = typeof options.field === 'string' ? options.field : '';
      options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      var attr = [];
      $.each(options.attr, function (name, value) {
        attr.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['filters/date.html'], {
        attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
        label: label
      });
    }
  };

  var FilterDatetime = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'datetime',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|null} value
     */
    setValue: function setValue(value) {
      if (typeof value !== 'string' && value !== null) {
        return;
      }
      if (value && (value.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null || isNaN(new Date(value)))) {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      options.attr['name'] = typeof options.field === 'string' ? options.field : '';
      options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      var attr = [];
      $.each(options.attr, function (name, value) {
        attr.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['filters/datetime.html'], {
        attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
        label: label
      });
    }
  };

  var FilterDateMonth = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'date_month',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|null} value
     */
    setValue: function setValue(value) {
      if (typeof value !== 'string' && value !== null) {
        return;
      }
      if (value && (value.match(/^\d{4}\-\d{2}$/) === null || isNaN(new Date(value)))) {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      options.attr['name'] = typeof options.field === 'string' ? options.field : '';
      options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      var attr = [];
      $.each(options.attr, function (name, value) {
        attr.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['filters/date_month.html'], {
        attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
        label: label
      });
    }
  };

  var FilterDateRange = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'date_range',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {object|null} value
     */
    setValue: function setValue(value) {
      if (value) {
        if (!coreuiTableUtils.isObject(value)) {
          return;
        }
        var dateStart = null;
        var dateEnd = null;
        if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.start))) {
          dateStart = value.start;
        }
        if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.end))) {
          dateEnd = value.end;
        }
        if (dateStart === null && dateEnd === null) {
          this._value = null;
        } else {
          this._value = {
            start: dateStart,
            end: dateEnd
          };
        }
      } else {
        this._value = null;
      }
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          var inputStart = $('input.date-start', control);
          var inputEnd = $('input.date-end', control);
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Object|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var inputStart = $('input.date-start', control);
      var inputEnd = $('input.date-end', control);
      if (inputStart[0] && inputEnd[0]) {
        var valueStart = inputStart.val();
        var valueEnd = inputEnd.val();
        if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
          return {
            start: valueStart !== '' ? valueStart : null,
            end: valueEnd !== '' ? valueEnd : null
          };
        }
      }
      return null;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      if (options.attr.hasOwnProperty('value')) {
        delete options.attr.value;
      }
      var field = typeof options.field === 'string' ? options.field : '';
      var startAttr = [];
      var startEnd = [];
      $.each(options.attr, function (name, value) {
        if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
          return;
        }
        startAttr.push(name + '="' + value + '"');
        startEnd.push(name + '="' + value + '"');
      });
      if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
        startAttr.push('class="' + options.attr["class"] + ' date-start"');
        startEnd.push('class="' + options.attr["class"] + ' date-end"');
      } else {
        startAttr.push('class="date-start"');
        startEnd.push('class="date-end"');
      }
      if (field) {
        startAttr.push('name="' + field + '[start]"');
        startEnd.push('name="' + field + '[end]"');
      }
      startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
      startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
      return coreuiTableUtils.render(tpl['filters/date_range.html'], {
        label: label,
        startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
        endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
      });
    }
  };

  var FilterDatetimeRange = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'datetime_range',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {object|null} value
     */
    setValue: function setValue(value) {
      if (value) {
        if (!coreuiTableUtils.isObject(value)) {
          return;
        }
        var dateStart = null;
        var dateEnd = null;
        if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.start))) {
          dateStart = value.start;
        }
        if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.end))) {
          dateEnd = value.end;
        }
        if (dateStart === null && dateEnd === null) {
          this._value = null;
        } else {
          this._value = {
            start: dateStart,
            end: dateEnd
          };
        }
      } else {
        this._value = null;
      }
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          var inputStart = $('input.date-start', control);
          var inputEnd = $('input.date-end', control);
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Object|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var inputStart = $('input.date-start', control);
      var inputEnd = $('input.date-end', control);
      if (inputStart[0] && inputEnd[0]) {
        var valueStart = inputStart.val();
        var valueEnd = inputEnd.val();
        if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
          return {
            start: valueStart !== '' ? valueStart : null,
            end: valueEnd !== '' ? valueEnd : null
          };
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      if (options.attr.hasOwnProperty('value')) {
        delete options.attr.value;
      }
      var field = typeof options.field === 'string' ? options.field : '';
      var startAttr = [];
      var startEnd = [];
      $.each(options.attr, function (name, value) {
        if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
          return;
        }
        startAttr.push(name + '="' + value + '"');
        startEnd.push(name + '="' + value + '"');
      });
      if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
        startAttr.push('class="' + options.attr["class"] + ' date-start"');
        startEnd.push('class="' + options.attr["class"] + ' date-end"');
      } else {
        startAttr.push('class="date-start"');
        startEnd.push('class="date-end"');
      }
      if (field) {
        startAttr.push('name="' + field + '[start]"');
        startEnd.push('name="' + field + '[end]"');
      }
      startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
      startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
      return coreuiTableUtils.render(tpl['filters/datetime_range.html'], {
        label: label,
        startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
        endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
      });
    }
  };

  var FilterCheckbox = {
    _id: null,
    _table: null,
    _value: null,
    _class: 'btn btn-outline-secondary',
    _render: false,
    _options: {
      id: null,
      type: 'checkbox',
      field: null,
      label: null,
      value: null,
      options: []
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Array|string|number|null} value
     */
    setValue: function setValue(value) {
      if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
        return;
      }
      if (_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          var items = [];
          $.each(value, function (key, item) {
            if (typeof value !== 'string' && typeof value !== 'number') {
              return;
            }
            items.push(item);
          });
          this._value = items;
        } else {
          this._value = null;
        }
      } else {
        this._value = [value];
      }
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input:checked', control).prop('checked', false);
          if (Array.isArray(this._value)) {
            $.each(this._value, function (key, value) {
              $('input[value="' + value + '"]', control).prop('checked', true);
            });
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Array|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      if (control[0]) {
        var inputs = $('input:checked', control);
        var items = [];
        $.each(inputs, function (key, input) {
          var value = $(input).attr('value');
          if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
            items.push(value);
          }
        });
        return items.length > 0 ? items : null;
      } else {
        return this._value;
      }
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var options = this.getOptions();
      var field = typeof options.field === 'string' ? options.field : '';
      var items = [];
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      $.each(options.options, function (key, option) {
        if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
          return;
        }
        var checked = Array.isArray(that._value) ? that._value.indexOf(option.value) >= 0 : false;
        var text = option.hasOwnProperty('text') ? option.text : option.value;
        items.push({
          text: text,
          value: option.value,
          "class": option.hasOwnProperty('class') && typeof option["class"] === 'string' ? option["class"] : that._class,
          checked: checked
        });
      });
      return coreuiTableUtils.render(tpl['filters/checkbox.html'], {
        label: label,
        items: items,
        field: field + this.getId(),
        lang: this._table.getLang()
      });
    }
  };

  var FilterRadio = {
    _id: null,
    _table: null,
    _value: null,
    _class: 'btn btn-outline-secondary',
    _render: false,
    _options: {
      id: null,
      type: 'radio',
      field: null,
      label: null,
      value: null,
      options: []
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).prop('checked', false);
          if (this._value !== null) {
            $('input[value="' + this._value + '"]', control).prop('checked', true);
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var input = $('input:checked', control);
      if (input[0]) {
        var value = input.val();
        return value === '' ? null : value;
      } else {
        return this._value;
      }
    },
    /**
     * Получение типа поискового алгоритма
     */
    getAlgorithm: function getAlgorithm() {
      return 'strict';
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var options = this.getOptions();
      var field = typeof options.field === 'string' ? options.field : '';
      var items = [];
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      $.each(options.options, function (key, option) {
        if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
          return;
        }
        var text = option.hasOwnProperty('text') ? option.text : option.value;
        items.push({
          text: text,
          value: option.value,
          "class": option.hasOwnProperty('class') && typeof option["class"] === 'string' ? option["class"] : that._class,
          checked: option.value == that._value
        });
      });
      return coreuiTableUtils.render(tpl['filters/radio.html'], {
        label: label,
        items: items,
        field: field + this.getId(),
        lang: this._table.getLang()
      });
    }
  };

  var FilterSelect = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'select',
      field: null,
      label: null,
      width: null,
      value: null,
      attr: {
        "class": 'form-select d-inline-block'
      },
      options: []
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Array|string|number|null} value
     */
    setValue: function setValue(value) {
      if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
        return;
      }
      if (_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          var items = [];
          $.each(value, function (key, item) {
            if (typeof value !== 'string' && typeof value !== 'number') {
              return;
            }
            items.push(item);
          });
          this._value = items;
        } else {
          this._value = null;
        }
      } else {
        this._value = [value];
      }
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          $('select option:selected', control).prop('selected', false);
          if (Array.isArray(this._value)) {
            $.each(this._value, function (key, value) {
              $('select option[value="' + value + '"]', control).prop('selected', true);
            });
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Array|string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      if (control[0]) {
        var isMultiple = !!$('select', control).attr('multiple');
        var options = $('select option:checked', control);
        var items = [];
        $.each(options, function (key, option) {
          var value = $(option).attr('value');
          if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
            items.push(value);
          }
        });
        return items.length > 0 ? isMultiple ? items : items[0] : null;
      } else {
        return this._value;
      }
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('select', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var options = this.getOptions();
      var selectOptions = [];
      var attributes = [];
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      if (!options.hasOwnProperty('attr') || !coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.field) {
        options.attr.name = this._options.field;
      }
      if (options.width) {
        options.attr = coreuiTableUtils.mergeAttr({
          style: 'width:' + options.width + 'px'
        }, options.attr);
      }
      if (options.hasOwnProperty('options') && _typeof(options.options) === 'object' && options.options !== null) {
        $.each(options.options, function (key, option) {
          if (typeof option === 'string' || typeof option === 'number') {
            selectOptions.push(that._buildOption({
              type: 'option',
              value: key,
              text: option
            }));
          } else if (coreuiTableUtils.isObject(option)) {
            var type = option.hasOwnProperty('type') && typeof option.type === 'string' ? option.type : 'option';
            if (type === 'group') {
              var renderAttr = [];
              var groupAttr = {};
              var groupOptions = [];
              if (option.hasOwnProperty('attr') && coreuiTableUtils.isObject(option.attr)) {
                groupAttr = option.attr;
              }
              if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(_typeof(option.label)) >= 0) {
                groupAttr.label = option.label;
              }
              $.each(groupAttr, function (name, value) {
                renderAttr.push(name + '="' + value + '"');
              });
              if (Array.isArray(option.options)) {
                $.each(option.options, function (key, groupOption) {
                  groupOptions.push(that._buildOption(groupOption));
                });
              }
              selectOptions.push({
                type: 'group',
                attr: renderAttr.length > 0 ? ' ' + renderAttr.join(' ') : '',
                options: groupOptions
              });
            } else {
              selectOptions.push(that._buildOption(option));
            }
          }
        });
      }
      $.each(options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['filters/select.html'], {
        label: label,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        options: selectOptions
      });
    },
    /**
     * Сборка опции
     * @param option
     * @return {object}
     * @private
     */
    _buildOption: function _buildOption(option) {
      var optionAttr = [];
      var optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0 ? option.text : '';
      $.each(option, function (name, value) {
        if (name !== 'text') {
          optionAttr.push(name + '="' + value + '"');
        }
      });
      if (Array.isArray(this._value)) {
        $.each(this._value, function (key, itemValue) {
          if (itemValue == option.value) {
            optionAttr.push('selected="selected"');
            return false;
          }
        });
      } else if (this._value == option.value) {
        optionAttr.push('selected="selected"');
      }
      return {
        type: 'option',
        text: optionText,
        attr: optionAttr.length > 0 ? ' ' + optionAttr.join(' ') : ''
      };
    }
  };

  var FilterSwitch = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'switch',
      field: null,
      label: null,
      value: null,
      valueY: 1
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getControl(this._table.getId(), this._id);
        if (control[0]) {
          var valueY = typeof this._options.valueY === 'string' || typeof this._options.valueY === 'number' ? this._options.valueY : '';
          if (this._value === null) {
            $('input', control).prop('checked', false);
          } else if (this._value === valueY) {
            $('input', control).prop('checked', true);
          } else {
            $('input', control).prop('checked', false);
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var input = $('input:checked', control);
      return input[0] ? input.val() : this._value;
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {
      var control = coreuiTableElements.getControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).change(function (e) {
        that._table.searchRecords();
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var valueY = typeof options.valueY === 'string' || typeof options.valueY === 'number' ? options.valueY : '';
      var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
      return coreuiTableUtils.render(tpl['filters/switch.html'], {
        id: this._id,
        valueY: valueY,
        field: typeof options.field === 'string' ? options.field : '',
        checked: this._value == valueY,
        label: label
      });
    }
  };

  var SearchText = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'text',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      if (!coreuiTableUtils.isObject(this._options.attr)) {
        this._options.attr = {};
      }
      if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
        if (this._options.attr.hasOwnProperty('style')) {
          this._options.attr['style'] += ';width:' + this._options.width + 'px';
        } else {
          this._options.attr['style'] = 'width:' + this._options.width + 'px';
        }
      }
      this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
      this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (this._options.attr.hasOwnProperty('type')) {
        delete this._options.attr.type;
      }
      var attributes = [];
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['search/text.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var SearchNumber = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'number',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Object} value
     */
    setValue: function setValue(value) {
      if (value) {
        if (!coreuiTableUtils.isObject(value)) {
          return;
        }
        var numberStart = null;
        var numberEnd = null;
        if (value.hasOwnProperty('start') && ['string', 'number'].indexOf(_typeof(value.start)) >= 0) {
          numberStart = value.start;
        }
        if (value.hasOwnProperty('end') && ['string', 'number'].indexOf(_typeof(value.end)) >= 0) {
          numberEnd = value.end;
        }
        if (numberStart === null && numberEnd === null) {
          this._value = null;
        } else {
          this._value = {
            start: numberStart,
            end: numberEnd
          };
        }
      } else {
        this._value = null;
      }
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          var inputStart = $('input.number-start', control);
          var inputEnd = $('input.number-end', control);
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var inputStart = $('input.number-start', control);
      var inputEnd = $('input.number-end', control);
      if (inputStart[0] && inputEnd[0]) {
        var valueStart = inputStart.val();
        var valueEnd = inputEnd.val();
        if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
          return {
            start: valueStart !== '' ? valueStart : null,
            end: valueEnd !== '' ? valueEnd : null
          };
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input.number-start, input.number-end', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      if (!coreuiTableUtils.isObject(this._options.attr)) {
        this._options.attr = {};
      }
      if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
        if (this._options.attr.hasOwnProperty('style')) {
          this._options.attr['style'] += ';width:' + this._options.width + 'px';
        } else {
          this._options.attr['style'] = 'width:' + this._options.width + 'px';
        }
      }
      if (this._options.attr.hasOwnProperty('type')) {
        delete this._options.attr.type;
      }
      if (this._options.attr.hasOwnProperty('value')) {
        delete this._options.attr.value;
      }
      var field = typeof this._options.field === 'string' ? this._options.field : '';
      var startAttr = [];
      var startEnd = [];
      $.each(this._options.attr, function (name, value) {
        if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
          return;
        }
        startAttr.push(name + '="' + value + '"');
        startEnd.push(name + '="' + value + '"');
      });
      if (this._options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(this._options.attr["class"])) >= 0) {
        startAttr.push('class="' + this._options.attr["class"] + ' number-start"');
        startEnd.push('class="' + this._options.attr["class"] + ' number-end"');
      } else {
        startAttr.push('class="number-start"');
        startEnd.push('class="number-end"');
      }
      if (field) {
        startAttr.push('name="' + field + '[start]"');
        startEnd.push('name="' + field + '[end]"');
      }
      startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
      startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
      return coreuiTableUtils.render(tpl['search/number.html'], {
        startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
        endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
      });
    }
  };

  var SearchDate = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'date',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string} value
     */
    setValue: function setValue(value) {
      if (typeof value !== 'string' && value !== null) {
        return;
      }
      if (value && (value.match(/^\d{4}\-\d{2}\-\d{2}$/) === null || isNaN(new Date(value)))) {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      if (!coreuiTableUtils.isObject(this._options.attr)) {
        this._options.attr = {};
      }
      if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
        if (this._options.attr.hasOwnProperty('style')) {
          this._options.attr['style'] += ';width:' + this._options.width + 'px';
        } else {
          this._options.attr['style'] = 'width:' + this._options.width + 'px';
        }
      }
      this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
      this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (this._options.attr.hasOwnProperty('type')) {
        delete this._options.attr.type;
      }
      var attributes = [];
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['search/date.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var SearchDateMonth = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'date_month',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|null} value
     */
    setValue: function setValue(value) {
      if (typeof value !== 'string' && value !== null) {
        return;
      }
      if (value && (value.match(/^\d{4}\-\d{2}$/) === null || isNaN(new Date(value)))) {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      if (!coreuiTableUtils.isObject(this._options.attr)) {
        this._options.attr = {};
      }
      if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
        if (this._options.attr.hasOwnProperty('style')) {
          this._options.attr['style'] += ';width:' + this._options.width + 'px';
        } else {
          this._options.attr['style'] = 'width:' + this._options.width + 'px';
        }
      }
      this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
      this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (this._options.attr.hasOwnProperty('type')) {
        delete this._options.attr.type;
      }
      var attributes = [];
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['search/date_month.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var SearchDatetime = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'datetime',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string} value
     */
    setValue: function setValue(value) {
      if (typeof value !== 'string' && value !== null) {
        return;
      }
      if (value && (value.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null || isNaN(new Date(value)))) {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).val(this._value === null ? '' : this._value);
        }
      }
    },
    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input', control);
      if (input[0]) {
        var value = input.val();
        if (typeof value === 'string' && value !== '') {
          return value;
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      if (!coreuiTableUtils.isObject(this._options.attr)) {
        this._options.attr = {};
      }
      if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
        if (this._options.attr.hasOwnProperty('style')) {
          this._options.attr['style'] += ';width:' + this._options.width + 'px';
        } else {
          this._options.attr['style'] = 'width:' + this._options.width + 'px';
        }
      }
      this._options.attr['name'] = typeof this._options.field === 'string' ? this._options.field : '';
      this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
      if (this._options.attr.hasOwnProperty('type')) {
        delete this._options.attr.type;
      }
      var attributes = [];
      $.each(this._options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['search/datetime.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var SearchDateRange = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'date_range',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Object} value
     */
    setValue: function setValue(value) {
      if (value) {
        if (!coreuiTableUtils.isObject(value)) {
          return;
        }
        var dateStart = null;
        var dateEnd = null;
        if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.start))) {
          dateStart = value.start;
        }
        if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2}$/) === null && isNaN(new Date(value.end))) {
          dateEnd = value.end;
        }
        if (dateStart === null && dateEnd === null) {
          this._value = null;
        } else {
          this._value = {
            start: dateStart,
            end: dateEnd
          };
        }
      } else {
        this._value = null;
      }
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          var inputStart = $('input.date-start', control);
          var inputEnd = $('input.date-end', control);
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Object|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var inputStart = $('input.date-start', control);
      var inputEnd = $('input.date-end', control);
      if (inputStart[0] && inputEnd[0]) {
        var valueStart = inputStart.val();
        var valueEnd = inputEnd.val();
        if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
          return {
            start: valueStart !== '' ? valueStart : null,
            end: valueEnd !== '' ? valueEnd : null
          };
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input.date-start, input.date-end', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      if (!coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(options.width)) {
        if (options.attr.hasOwnProperty('style')) {
          options.attr['style'] += ';width:' + options.width + 'px';
        } else {
          options.attr['style'] = 'width:' + options.width + 'px';
        }
      }
      if (options.attr.hasOwnProperty('type')) {
        delete options.attr.type;
      }
      if (options.attr.hasOwnProperty('value')) {
        delete options.attr.value;
      }
      var field = typeof options.field === 'string' ? options.field : '';
      var startAttr = [];
      var startEnd = [];
      $.each(options.attr, function (name, value) {
        if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
          return;
        }
        startAttr.push(name + '="' + value + '"');
        startEnd.push(name + '="' + value + '"');
      });
      if (options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(options.attr["class"])) >= 0) {
        startAttr.push('class="' + options.attr["class"] + ' date-start"');
        startEnd.push('class="' + options.attr["class"] + ' date-end"');
      } else {
        startAttr.push('class="date-start"');
        startEnd.push('class="date-end"');
      }
      if (field) {
        startAttr.push('name="' + field + '[start]"');
        startEnd.push('name="' + field + '[end]"');
      }
      startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
      startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
      return coreuiTableUtils.render(tpl['search/date_range.html'], {
        startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
        endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
      });
    }
  };

  var SearchDatetimeRange = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'datetime_range',
      field: null,
      label: null,
      value: null,
      width: 200,
      attr: {
        "class": "form-control d-inline-block"
      }
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Object} value
     */
    setValue: function setValue(value) {
      if (value) {
        if (!coreuiTableUtils.isObject(value)) {
          return;
        }
        var dateStart = null;
        var dateEnd = null;
        if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.start))) {
          dateStart = value.start;
        }
        if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/) === null && isNaN(new Date(value.end))) {
          dateEnd = value.end;
        }
        if (dateStart === null && dateEnd === null) {
          this._value = null;
        } else {
          this._value = {
            start: dateStart,
            end: dateEnd
          };
        }
      } else {
        this._value = null;
      }
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          var inputStart = $('input.date-start', control);
          var inputEnd = $('input.date-end', control);
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Object|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var inputStart = $('input.date-start', control);
      var inputEnd = $('input.date-end', control);
      if (inputStart[0] && inputEnd[0]) {
        var valueStart = inputStart.val();
        var valueEnd = inputEnd.val();
        if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
          return {
            start: valueStart !== '' ? valueStart : null,
            end: valueEnd !== '' ? valueEnd : null
          };
        }
      }
      return this._value;
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {
      var container = coreuiTableElements.getSearchContainer(this._table.getId());
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var that = this;
      $('input.date-start, input.date-end', control).keyup(function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          that._table.searchRecords();
          container.fadeOut('fast');
        }
      });
    },
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      if (!coreuiTableUtils.isObject(this._options.attr)) {
        this._options.attr = {};
      }
      if (this._options.hasOwnProperty('width') && coreuiTableUtils.isNumeric(this._options.width)) {
        if (this._options.attr.hasOwnProperty('style')) {
          this._options.attr['style'] += ';width:' + this._options.width + 'px';
        } else {
          this._options.attr['style'] = 'width:' + this._options.width + 'px';
        }
      }
      if (this._options.attr.hasOwnProperty('type')) {
        delete this._options.attr.type;
      }
      if (this._options.attr.hasOwnProperty('value')) {
        delete this._options.attr.value;
      }
      var field = typeof this._options.field === 'string' ? this._options.field : '';
      var startAttr = [];
      var startEnd = [];
      $.each(this._options.attr, function (name, value) {
        if (['name', 'value', 'class'].indexOf(name) >= 0 || ['string', 'number'].indexOf(_typeof(value)) < 0) {
          return;
        }
        startAttr.push(name + '="' + value + '"');
        startEnd.push(name + '="' + value + '"');
      });
      if (this._options.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(this._options.attr["class"])) >= 0) {
        startAttr.push('class="' + this._options.attr["class"] + ' date-start"');
        startEnd.push('class="' + this._options.attr["class"] + ' date-end"');
      } else {
        startAttr.push('class="date-start"');
        startEnd.push('class="date-end"');
      }
      if (field) {
        startAttr.push('name="' + field + '[start]"');
        startEnd.push('name="' + field + '[end]"');
      }
      startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
      startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
      return coreuiTableUtils.render(tpl['search/datetime_range.html'], {
        startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
        endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
      });
    }
  };

  var SearchCheckbox = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'checkbox',
      field: null,
      label: null,
      value: null,
      options: []
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Array|null} value
     */
    setValue: function setValue(value) {
      if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
        return;
      }
      if (_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          var items = [];
          $.each(value, function (key, item) {
            if (typeof item !== 'string' && typeof item !== 'number') {
              return;
            }
            items.push(item);
          });
          this._value = items;
        } else {
          this._value = null;
        }
      } else {
        this._value = [value];
      }
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input:checked', control).prop('checked', false);
          if (Array.isArray(this._value)) {
            $.each(this._value, function (key, value) {
              $('input[value="' + value + '"]', control).prop('checked', true);
            });
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Array|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      if (control[0]) {
        var inputs = $('input:checked', control);
        var items = [];
        $.each(inputs, function (key, input) {
          var value = $(input).attr('value');
          if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
            items.push(value);
          }
        });
        return items.length > 0 ? items : null;
      } else {
        return this._value;
      }
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {},
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var options = [];
      $.each(this._options.options, function (key, option) {
        if (['string', 'numeric'].indexOf(_typeof(option)) >= 0) {
          var checked = Array.isArray(that._value) ? that._value.indexOf(key) >= 0 : false;
          options.push({
            text: option,
            value: key,
            checked: checked
          });
        } else {
          if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
            return;
          }
          var _checked = Array.isArray(that._value) ? that._value.indexOf(option.value) >= 0 : false;
          var text = option.hasOwnProperty('text') ? option.text : option.value;
          options.push({
            text: text,
            value: option.value,
            checked: _checked
          });
        }
      });
      return coreuiTableUtils.render(tpl['search/checkbox.html'], {
        options: options,
        field: typeof this._options.field === 'string' ? this._options.field : ''
      });
    }
  };

  var SearchCheckboxBtn = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'checkboxBtn',
      field: null,
      label: null,
      optionsClass: 'btn btn-outline-secondary',
      value: null,
      options: []
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Array|null} value
     */
    setValue: function setValue(value) {
      if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
        return;
      }
      if (_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          var items = [];
          $.each(value, function (key, item) {
            if (typeof item !== 'string' && typeof item !== 'number') {
              return;
            }
            items.push(item);
          });
          this._value = items;
        } else {
          this._value = null;
        }
      } else {
        this._value = [value];
      }
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input:checked', control).prop('checked', false);
          if (Array.isArray(this._value)) {
            $.each(this._value, function (key, value) {
              $('input[value="' + value + '"]', control).prop('checked', true);
            });
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Array|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      if (control[0]) {
        var inputs = $('input:checked', control);
        var items = [];
        $.each(inputs, function (key, input) {
          var value = $(input).attr('value');
          if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
            items.push(value);
          }
        });
        return items.length > 0 ? items : null;
      } else {
        return this._value;
      }
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {},
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var options = [];
      $.each(this._options.options, function (key, option) {
        if (['string', 'numeric'].indexOf(_typeof(option)) >= 0) {
          var checked = Array.isArray(that._value) ? that._value.indexOf(key) >= 0 : false;
          options.push({
            text: option,
            value: key,
            checked: checked,
            optionsClass: that._options.optionsClass,
            hash: coreuiTableUtils.hashCode()
          });
        } else {
          if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
            return;
          }
          var _checked = Array.isArray(that._value) ? that._value.indexOf(option.value) >= 0 : false;
          var text = option.hasOwnProperty('text') ? option.text : option.value;
          options.push({
            text: text,
            value: option.value,
            checked: _checked,
            optionsClass: that._options.optionsClass,
            hash: coreuiTableUtils.hashCode()
          });
        }
      });
      return coreuiTableUtils.render(tpl['search/checkbox-btn.html'], {
        options: options,
        field: typeof this._options.field === 'string' ? this._options.field : ''
      });
    }
  };

  var SearchRadio = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'radio',
      field: null,
      label: null,
      value: null,
      options: []
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).prop('checked', false);
          if (this._value !== null) {
            $('input[value="' + this._value + '"]', control).prop('checked', true);
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input:checked', control);
      if (input[0]) {
        var value = input.val();
        return value === '' ? null : value;
      } else {
        return this._value;
      }
    },
    /**
     * Получение типа поискового алгоритма
     */
    getAlgorithm: function getAlgorithm() {
      return 'strict';
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {},
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var checkedAll = true;
      var options = [];
      $.each(this._options.options, function (key, option) {
        if (['string', 'numeric'].indexOf(_typeof(option)) >= 0) {
          var checked = key == that._value;
          if (checked) {
            checkedAll = false;
          }
          options.push({
            text: option,
            value: key,
            checked: checked
          });
        } else {
          if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
            return;
          }
          var _checked = option.value == that._value;
          var text = option.hasOwnProperty('text') ? option.text : option.value;
          if (_checked) {
            checkedAll = false;
          }
          options.push({
            text: text,
            value: option.value,
            checked: _checked
          });
        }
      });
      return coreuiTableUtils.render(tpl['search/radio.html'], {
        options: options,
        checkedAll: checkedAll,
        field: typeof this._options.field === 'string' ? this._options.field : '',
        lang: this._table.getLang()
      });
    }
  };

  var SearchRadioBtn = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'radioBtn',
      field: null,
      optionsClass: 'btn btn-outline-secondary',
      label: null,
      value: null,
      options: []
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('input', control).prop('checked', false);
          if (this._value !== null) {
            $('input[value="' + this._value + '"]', control).prop('checked', true);
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input:checked', control);
      if (input[0]) {
        var value = input.val();
        return value === '' ? null : value;
      } else {
        return this._value;
      }
    },
    /**
     * Получение типа поискового алгоритма
     */
    getAlgorithm: function getAlgorithm() {
      return 'strict';
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {},
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var checkedAll = true;
      var options = [];
      $.each(this._options.options, function (key, option) {
        if (['string', 'numeric'].indexOf(_typeof(option)) >= 0) {
          var checked = key == that._value;
          if (checked) {
            checkedAll = false;
          }
          options.push({
            text: option,
            value: key,
            checked: checked,
            optionsClass: that._options.optionsClass,
            hash: coreuiTableUtils.hashCode()
          });
        } else {
          if (!coreuiTableUtils.isObject(option) || !option.hasOwnProperty('value') || ['string', 'numeric'].indexOf(_typeof(option.value)) === -1) {
            return;
          }
          var _checked = option.value == that._value;
          var text = option.hasOwnProperty('text') ? option.text : option.value;
          if (_checked) {
            checkedAll = false;
          }
          options.push({
            text: text,
            value: option.value,
            checked: _checked,
            optionsClass: that._options.optionsClass,
            hash: coreuiTableUtils.hashCode()
          });
        }
      });
      return coreuiTableUtils.render(tpl['search/radio-btn.html'], {
        options: options,
        checkedAll: checkedAll,
        optionAllHash: coreuiTableUtils.hashCode(),
        optionOptionsClass: that._options.optionsClass,
        field: typeof this._options.field === 'string' ? this._options.field : '',
        lang: this._table.getLang()
      });
    }
  };

  var SearchSelect = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'select',
      field: null,
      label: null,
      width: null,
      value: null,
      attr: {
        "class": 'form-select d-inline-block'
      },
      options: []
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {Array} value
     */
    setValue: function setValue(value) {
      if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
        return;
      }
      if (_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          var items = [];
          $.each(value, function (key, item) {
            if (typeof value !== 'string' && typeof value !== 'number') {
              return;
            }
            items.push(item);
          });
          this._value = items;
        } else {
          this._value = null;
        }
      } else {
        this._value = [value];
      }
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          $('select option:selected', control).prop('selected', false);
          if (Array.isArray(this._value)) {
            $.each(this._value, function (key, value) {
              $('select option[value="' + value + '"]', control).prop('selected', true);
            });
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {Array|string|null}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      if (control[0]) {
        var isMultiple = !!$('select', control).attr('multiple');
        var options = $('select option:selected', control);
        var items = [];
        $.each(options, function (key, option) {
          var value = $(option).attr('value');
          if (['string', 'number'].indexOf(_typeof(value)) >= 0 && value !== '') {
            items.push(value);
          }
        });
        return items.length > 0 ? isMultiple ? items : items[0] : null;
      } else {
        return this._value;
      }
    },
    /**
     * Инициализация событий
     * @returns {object}
     */
    initEvents: function initEvents() {},
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var that = this;
      var options = this.getOptions();
      var selectOptions = [];
      var attributes = [];
      if (!options.hasOwnProperty('attr') || !coreuiTableUtils.isObject(options.attr)) {
        options.attr = {};
      }
      if (options.field) {
        options.attr.name = this._options.field;
      }
      if (options.width) {
        options.attr = coreuiTableUtils.mergeAttr({
          style: 'width:' + options.width + 'px'
        }, options.attr);
      }
      if (options.hasOwnProperty('options') && _typeof(options.options) === 'object' && options.options !== null) {
        $.each(options.options, function (key, option) {
          if (typeof option === 'string' || typeof option === 'number') {
            selectOptions.push(that._buildOption({
              type: 'option',
              value: key,
              text: option
            }));
          } else if (coreuiTableUtils.isObject(option)) {
            var type = option.hasOwnProperty('type') && typeof option.type === 'string' ? option.type : 'option';
            if (type === 'group') {
              var renderAttr = [];
              var groupAttr = {};
              var groupOptions = [];
              if (option.hasOwnProperty('attr') && coreuiTableUtils.isObject(option.attr)) {
                groupAttr = option.attr;
              }
              if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(_typeof(option.label)) >= 0) {
                groupAttr.label = option.label;
              }
              $.each(groupAttr, function (name, value) {
                renderAttr.push(name + '="' + value + '"');
              });
              if (Array.isArray(option.options)) {
                $.each(option.options, function (key, groupOption) {
                  groupOptions.push(that._buildOption(groupOption));
                });
              }
              selectOptions.push({
                type: 'group',
                attr: renderAttr.length > 0 ? ' ' + renderAttr.join(' ') : '',
                options: groupOptions
              });
            } else {
              selectOptions.push(that._buildOption(option));
            }
          }
        });
      }
      $.each(options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return coreuiTableUtils.render(tpl['search/select.html'], {
        field: options,
        value: this._value,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        options: selectOptions
      });
    },
    /**
     * Сборка опции
     * @param option
     * @return {object}
     * @private
     */
    _buildOption: function _buildOption(option) {
      var optionAttr = [];
      var optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0 ? option.text : '';
      $.each(option, function (name, value) {
        if (name !== 'text') {
          optionAttr.push(name + '="' + value + '"');
        }
      });
      if (Array.isArray(this._value)) {
        $.each(this._value, function (key, itemValue) {
          if (itemValue == option.value) {
            optionAttr.push('selected="selected"');
            return false;
          }
        });
      } else if (this._value == option.value) {
        optionAttr.push('selected="selected"');
      }
      return {
        type: 'option',
        text: optionText,
        attr: optionAttr.length > 0 ? ' ' + optionAttr.join(' ') : ''
      };
    }
  };

  var SearchSwitch = {
    _id: null,
    _table: null,
    _value: null,
    _render: false,
    _options: {
      id: null,
      type: 'switch',
      field: null,
      value: null,
      valueY: 1
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._options = $.extend(true, {}, this._options, options);
      this._table = table;
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
      if (this._options.value !== null) {
        this.setValue(this._options.value);
      }
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Получение id
     * @returns {string}
     */
    getId: function getId() {
      return this._id;
    },
    /**
     * Установка значения
     * @param {string|number|null} value
     */
    setValue: function setValue(value) {
      if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
        return;
      }
      this._value = value;
      if (this._render) {
        var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
        if (control[0]) {
          var valueY = typeof this._options.valueY === 'string' || typeof this._options.valueY === 'number' ? this._options.valueY : '';
          if (this._value === null) {
            $('input', control).prop('checked', false);
          } else if (this._value === valueY) {
            $('input', control).prop('checked', true);
          } else {
            $('input', control).prop('checked', false);
          }
        }
      }
    },
    /**
     * Получение значения
     * @returns {string}
     */
    getValue: function getValue() {
      var control = coreuiTableElements.getSearchControl(this._table.getId(), this._id);
      var input = $('input:checked', control);
      return input[0] ? input.val() : this._value;
    },
    /**
     * Инициализация событий
     */
    initEvents: function initEvents() {},
    /**
     * Формирование контента
     * @returns {string}
     */
    render: function render() {
      this._render = true;
      var options = this.getOptions();
      var valueY = typeof options.valueY === 'string' || typeof options.valueY === 'number' ? options.valueY : '';
      return coreuiTableUtils.render(tpl['search/switch.html'], {
        id: this._id,
        valueY: valueY,
        field: typeof options.field === 'string' ? options.field : '',
        checked: this._value == valueY
      });
    }
  };

  var ColumnsDate = {
    _table: null,
    _options: {
      type: 'date',
      field: null,
      label: null,
      show: true,
      width: null,
      format: 'DD.MM.YYYY',
      attr: {},
      attrHeader: {},
      render: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (typeof content !== 'string') {
        return '';
      }
      try {
        if (content !== '') {
          var date = new Date(content);
          content = this._options.format.replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4)).replace(/MM/g, this._strPadLeft(date.getMonth() + 1, 2)).replace(/M/g, date.getMonth() + 1).replace(/DD/g, this._strPadLeft(date.getDate(), 2)).replace(/D/g, date.getDate());
        }
      } catch (e) {
        content = '';
      }
      return content;
    },
    /**
     * Размерность строки
     * @param {string} str
     * @param {int}    count
     * @param {string} repeat
     * @returns {string}
     */
    _strPadLeft: function _strPadLeft(str, count, repeat) {
      str = String(str);
      if (str.length >= count) {
        return str;
      }
      repeat = repeat ? repeat : '0';
      return (repeat.repeat(count) + str).slice(-count);
    }
  };

  var ColumnsDatetime = {
    _table: null,
    _options: {
      type: 'datetime',
      field: null,
      label: null,
      show: true,
      width: null,
      format: 'DD.MM.YYYY hh:mm:ss',
      attr: {},
      attrHeader: {},
      render: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (typeof content !== 'string') {
        return '';
      }
      try {
        if (content !== '') {
          var date = new Date(content);
          content = this._options.format.replace(/YYYY/g, this._strPadLeft(date.getFullYear(), 4)).replace(/MM/g, this._strPadLeft(date.getMonth() + 1, 2)).replace(/M/g, date.getMonth() + 1).replace(/DD/g, this._strPadLeft(date.getDate(), 2)).replace(/D/g, date.getDate()).replace(/hh/g, this._strPadLeft(date.getHours(), 2)).replace(/mm/g, this._strPadLeft(date.getMinutes(), 2)).replace(/m/g, date.getMinutes()).replace(/ss/g, this._strPadLeft(date.getSeconds(), 2)).replace(/s/g, date.getSeconds());
        }
      } catch (e) {
        content = '';
      }
      return content;
    },
    /**
     * Размерность строки
     * @param {string} str
     * @param {int}    count
     * @param {string} repeat
     * @returns {string}
     */
    _strPadLeft: function _strPadLeft(str, count, repeat) {
      str = String(str);
      if (str.length >= count) {
        return str;
      }
      repeat = repeat ? repeat : '0';
      return (repeat.repeat(count) + str).slice(-count);
    }
  };

  var ColumnsHtml = {
    _table: null,
    _options: {
      type: 'html',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null,
      noWrap: null,
      noWrapToggle: null,
      attr: {},
      attrHeader: {},
      render: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
      var tableOptions = this._table.getOptions();
      if (this._options.noWrap || this._options.noWrap === null && tableOptions.noWrap) {
        if (!this._options.attr) {
          this._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        this._options.noWrap = true;
        if (this._options.noWrapToggle || this._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          this._options.noWrapToggle = true;
        }
      }
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function convertToString(columnValue) {
      if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
        return String(columnValue).replace(/<[^>]*>?/gm, '');
      } else {
        return '';
      }
    },
    /**
     * Формирование контента
     * @param {string|HTMLElement|jQuery} content
     * @param {object}                    record
     * @returns {string}
     */
    render: function render(content, record) {
      if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0 && !(content instanceof HTMLElement) && !(window.hasOwnProperty('jQuery') && content instanceof jQuery)) {
        return '';
      }
      if (this._options.noWrap) {
        content = $('<div></div>').append(content);
        if (this._options.noWrapToggle) {
          content = $(content).after('<i class="bi bi-caret-down-fill toggle"></i>');
        }
      }
      return content;
    }
  };

  var ColumnsNumber = {
    _table: null,
    _options: {
      type: 'number',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null,
      noWrap: null,
      noWrapToggle: null,
      attr: {},
      attrHeader: {},
      render: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
      var tableOptions = this._table.getOptions();
      if (this._options.noWrap || this._options.noWrap === null && tableOptions.noWrap) {
        if (!this._options.attr) {
          this._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        this._options.noWrap = true;
        if (this._options.noWrapToggle || this._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          this._options.noWrapToggle = true;
        }
      }
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
        return '';
      }
      content = String(content).replace(/,/g, '.').replace(/[^0-9\-\.]/g, '').replace(/[\s]{2,}/g, ' ');
      content = content.replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, '$1 ').replace(/\- /g, '-');
      if (this._options.noWrap) {
        content = '<div>' + content + '</div>';
        if (this._options.noWrapToggle) {
          content += '<i class="bi bi-caret-down-fill toggle"></i>';
        }
      }
      return content;
    }
  };

  var ColumnsMoney = {
    _table: null,
    _options: {
      type: 'money',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null,
      noWrap: null,
      noWrapToggle: null,
      currency: null,
      attr: {
        "class": 'text-end'
      },
      attrHeader: {
        "class": 'text-end'
      },
      render: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
      var tableOptions = this._table.getOptions();
      if (this._options.noWrap || this._options.noWrap === null && tableOptions.noWrap) {
        if (!this._options.attr) {
          this._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        this._options.noWrap = true;
        if (this._options.noWrapToggle || this._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          this._options.noWrapToggle = true;
        }
      }
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
        return '';
      }
      if (isNaN(content)) {
        content = content.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      } else {
        content = Number(content).toFixed(2).toString();
        content = content.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      }
      if (this._options.currency && ['string', 'number'].indexOf(_typeof(this._options.currency)) >= 0) {
        content += ' <small class="text-muted">' + this._options.currency + '</small>';
      }
      if (this._options.noWrap) {
        content = '<div>' + content + '</div>';
        if (this._options.noWrapToggle) {
          content += '<i class="bi bi-caret-down-fill toggle"></i>';
        }
      }
      return content;
    }
  };

  var ColumnsNumbers = {
    _table: null,
    _options: {
      type: 'numbers',
      label: '№',
      width: 20,
      attr: {
        "class": 'text-end'
      },
      attrHeader: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend(true, {}, this._options, options);
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return true;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      return this._table._recordsNumber;
    }
  };

  var ColumnsSelect = {
    _table: null,
    _options: {
      type: 'select',
      field: null,
      label: '',
      show: true,
      width: 35,
      attr: {
        "class": 'coreui-table__select_container text-center'
      },
      attrHeader: {
        "class": 'text-center'
      }
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      if (options.hasOwnProperty('attr')) {
        options.attr = CoreUI.table._mergeAttr(this._options.attr, options.attr);
      }
      if (options.hasOwnProperty('attrHeader')) {
        options.attrHeader = CoreUI.table._mergeAttr(this._options.attrHeader, options.attrHeader);
      }
      this._table = table;
      this._options = $.extend(true, {}, this._options, options);
      this._options.label = tpl['columns/select_label.html'];

      // Показ строк
      this._table.on('records_show', function () {
        var selects = coreuiTableElements.getRowsSelects(table.getId());
        var selectAll = coreuiTableElements.getRowsSelectAll(table.getId());

        // Отмена обработки нажатия в select колонках
        $(selects).click(function (event) {
          event.stopPropagation();
        });

        // Выбор всех строк
        selectAll.click(function (event) {
          if ($(this).is(':checked')) {
            table.selectAll();
          } else {
            table.unselectAll();
          }
        });
      });
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      var select = $(coreuiTableUtils.render(tpl['columns/select.html'], {
        index: record.index
      }));
      var that = this;

      // Выбор строки
      select.click(function (event) {
        var tr = coreuiTableElements.getTrByIndex(that._table.getId(), record.index);
        if (!tr) {
          return;
        }
        if ($(this).is(':checked')) {
          $(tr).addClass('table-primary');
          coreuiTablePrivate._trigger(that._table, 'record_select', [record]);
        } else {
          $(tr).removeClass('table-primary');
          coreuiTablePrivate._trigger(that._table, 'record_unselect', [record]);
        }
      });
      return select;
    }
  };

  var ColumnsSwitch = {
    _table: null,
    _options: {
      type: 'switch',
      label: '',
      field: '',
      show: true,
      disabled: false,
      width: 5,
      valueY: 1,
      valueN: 0,
      attr: {
        "class": 'coreui-table__switch_container'
      },
      attrHeader: {},
      onChange: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend(true, {}, this._options, options);

      // Показ строк
      this._table.on('records_show', function () {
        var containers = coreuiTableElements.getRowsSwitches(table.getId());

        // Отмена обработки нажатия в switch колонках
        containers.click(function (event) {
          event.stopPropagation();
        });
      });
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      var isChecked = record.data.hasOwnProperty(this._options.field) && record.data[this._options.field] === this._options.valueY;
      var formSwitch = $(coreuiTableUtils.render(tpl['columns/switch.html'], {
        index: record.index,
        field: this._options.field,
        disabled: this._options.disabled,
        checked: isChecked
      }));

      // События нажатия на переключатель
      var that = this;
      $('.coreui-table__switch', formSwitch).change(function (event) {
        var input = this;
        $.each(that._table._records, function (key, recordTable) {
          if (record.index === recordTable.index) {
            record.data[that._options.field] = input.checked ? that._options.valueY : that._options.valueN;
            return false;
          }
        });
        if (that._options.hasOwnProperty('onChange') && (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')) {
          if (typeof that._options.onChange === 'function') {
            that._options.onChange(record, input);
          } else {
            var func = new Function('record', 'input', 'id', that._options.onChange);
            func(record, input);
          }
          return false;
        }
      });
      return formSwitch;
    }
  };

  var ColumnsText = {
    _table: null,
    _options: {
      type: 'text',
      field: null,
      label: null,
      show: true,
      showLabel: true,
      width: null,
      minWidth: null,
      maxWidth: null,
      attr: null,
      noWrap: null,
      noWrapToggle: null,
      attrHeader: null,
      render: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
      var tableOptions = this._table.getOptions();
      if (this._options.noWrap || this._options.noWrap === null && tableOptions.noWrap) {
        if (!this._options.attr) {
          this._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        this._options.noWrap = true;
        if (this._options.noWrapToggle || this._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          this._options.noWrapToggle = true;
        }
      }
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
        return '';
      }
      content = String(content).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (this._options.noWrap) {
        content = '<div>' + content + '</div>';
        if (this._options.noWrapToggle) {
          content += '<i class="bi bi-caret-down-fill toggle"></i>';
        }
      }
      return content;
    }
  };

  var ColumnsButton = {
    _table: null,
    _options: {
      type: 'button',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {object} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (!coreuiTableUtils.isObject(content)) {
        return '';
      }
      if (!coreuiTableUtils.isObject(content.attr)) {
        content.attr = {};
      }
      if (!content.attr.hasOwnProperty('class')) {
        content.attr["class"] = 'btn btn-outline-secondary';
      }
      if (content.attr.hasOwnProperty('type')) {
        delete content.attr.type;
      }
      var attributes = [];
      $.each(content.attr, function (name, value) {
        if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
          attributes.push(name + '="' + value + '"');
        }
      });
      var btn = $(coreuiTableUtils.render(tpl['columns/button.html'], {
        content: content.content,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      }));
      if (content.hasOwnProperty('onClick')) {
        var that = this;
        if (typeof content.onClick === 'function') {
          btn.click(function (event) {
            event.cancelBubble = true;
            event.preventDefault();
            content.onClick(record, that._table);
          });
        } else if (typeof content.onClick === 'string') {
          var func = new Function('record', 'table', content.onClick);
          btn.click(function (event) {
            event.cancelBubble = true;
            event.preventDefault();
            func(record, that._table);
          });
        } else {
          btn.click(function (event) {
            event.cancelBubble = true;
            event.preventDefault();
          });
        }
      } else {
        btn.click(function (event) {
          event.cancelBubble = true;
          event.preventDefault();
        });
      }
      return btn;
    }
  };

  var ColumnsLink = {
    _table: null,
    _options: {
      type: 'link',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function convertToString(columnValue) {
      if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
        return String(columnValue);
      } else if (_typeof(columnValue) === 'object' && columnValue.hasOwnProperty('content') && typeof columnValue.content === 'string') {
        return columnValue.content;
      } else {
        return '';
      }
    },
    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render: function render(content, record) {
      if ((typeof content !== 'string' || !content) && (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('url') || typeof content.url !== 'string' || !content.url)) {
        return '';
      }
      var linkContent = '';
      var attr = {};
      if (typeof content === 'string') {
        attr.href = content;
        linkContent = content;
      } else {
        if (content.hasOwnProperty('attr') && coreuiTableUtils.isObject(content.attr)) {
          attr = content.attr;
        }
        if (attr.hasOwnProperty('href')) {
          delete attr.href;
        }
        attr.href = content.url;
        if (content.hasOwnProperty('content') && typeof content.content === 'string' && content.content) {
          linkContent = content.content;
        } else {
          linkContent = content.url;
        }
      }
      var attributes = [];
      $.each(attr, function (name, value) {
        if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
          attributes.push(name + '="' + value + '"');
        }
      });
      var link = $(coreuiTableUtils.render(tpl['columns/link.html'], {
        content: linkContent,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      }));
      link.click(function (event) {
        event.cancelBubble = true;
        event.preventDefault();
      });
      return link;
    }
  };

  var ColumnsMenu = {
    _table: null,
    _options: {
      type: 'menu',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render: function render(content, record) {
      if (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('items') || !Array.isArray(content.items) || content.items.length === 0) {
        return '';
      }
      var items = [];
      var attr = {};
      if (Array.isArray(content.items)) {
        $.each(content.items, function (key, item) {
          if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
            if (item.type === 'link') {
              if (item.hasOwnProperty('url') && item.hasOwnProperty('content') && typeof item.url === 'string' && typeof item.content === 'string') {
                var linkAttr = {};
                if (item.hasOwnProperty('attr') || coreuiTableUtils.isObject(item.attr)) {
                  linkAttr = item.attr;
                }
                if (linkAttr.hasOwnProperty('href')) {
                  delete linkAttr.href;
                }
                if (!linkAttr.hasOwnProperty('class') || typeof linkAttr["class"] !== 'string') {
                  linkAttr["class"] = 'dropdown-item';
                } else {
                  linkAttr["class"] += ' dropdown-item';
                }
                var linkAttributes = [];
                $.each(linkAttr, function (name, value) {
                  if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                    linkAttributes.push(name + '="' + value + '"');
                  }
                });
                items.push({
                  type: 'link',
                  url: item.url,
                  content: item.content,
                  attr: linkAttributes
                });
              }
            } else if (item.type === 'button') {
              if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
                var btnAttr = {};
                if (item.hasOwnProperty('attr') || coreuiTableUtils.isObject(item.attr)) {
                  btnAttr = item.attr;
                }
                if (btnAttr.hasOwnProperty('type')) {
                  delete btnAttr.type;
                }
                if (btnAttr.hasOwnProperty('id')) {
                  delete btnAttr['id'];
                }
                if (!btnAttr.hasOwnProperty('class') || typeof btnAttr["class"] !== 'string') {
                  btnAttr["class"] = 'dropdown-item';
                } else {
                  btnAttr["class"] += ' dropdown-item';
                }
                var btnAttributes = [];
                $.each(btnAttr, function (name, value) {
                  if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                    btnAttributes.push(name + '="' + value + '"');
                  }
                });
                items.push({
                  type: 'button',
                  id: coreuiTableUtils.hashCode(),
                  content: item.content,
                  onClick: item.onClick,
                  attr: btnAttributes.length > 0 ? ' ' + btnAttributes.join(' ') : ''
                });
              }
            } else if (item.type === 'divider') {
              items.push({
                type: 'divider'
              });
            } else if (item.type === 'header') {
              if (item.hasOwnProperty('content') && typeof item.content === 'string') {
                items.push({
                  type: 'header',
                  content: item.content
                });
              }
            }
          }
        });
      }
      if (content.hasOwnProperty('attr') || coreuiTableUtils.isObject(content.attr)) {
        attr = content.attr;
      }
      if (!attr.hasOwnProperty('class') || ['string', 'number'].indexOf(_typeof(attr["class"])) < 0) {
        attr["class"] = 'btn rounded-1';
      }
      if (attr.hasOwnProperty('type')) {
        delete attr.type;
      }
      if (attr.hasOwnProperty('data-bs-toggle')) {
        delete attr['data-bs-toggle'];
      }
      var attributes = [];
      $.each(attr, function (name, value) {
        if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
          attributes.push(name + '="' + value + '"');
        }
      });
      var menuContent = content.hasOwnProperty('content') && typeof content.content === 'string' && content.content ? content.content : '<i class="bi bi-three-dots-vertical"></i>';
      var position = content.hasOwnProperty('position') && typeof content.position === 'string' && content.position ? content.position : 'end';
      var menu = $(coreuiTableUtils.render(tpl['columns/menu.html'], {
        content: menuContent,
        position: position,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        items: items
      }));
      menu.click(function (event) {
        event.cancelBubble = true;
        event.preventDefault();
      });
      var dropdownMenu = null;
      $(menu).on('show.bs.dropdown', function (e) {
        dropdownMenu = $(menu).find('.dropdown-menu');
        $('body').append(dropdownMenu.detach());
        var eOffset = $(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + $(e.target).outerHeight(),
          'left': eOffset.left
        });
      });
      $(menu).on('hide.bs.dropdown', function (e) {
        $(menu).append(dropdownMenu.detach());
        dropdownMenu.hide();
      });
      if (Array.isArray(items)) {
        var that = this;
        $.each(items, function (key, item) {
          if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
            if (item.type === 'button') {
              if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0 && typeof item.content === 'string') {
                $('button#btn-dropdown-' + item.id, menu).click(function (event) {
                  if (typeof item.onClick === 'function') {
                    item.onClick(record, that._table, event);
                  } else if (typeof item.onClick === 'string') {
                    new Function('record', 'table', 'event', item.onClick)(record, that._table, event);
                  }
                });
              }
            }
          }
        });
      }
      return menu;
    }
  };

  var ColumnsBadge = {
    _table: null,
    _options: {
      type: 'badge',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend(true, {}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function convertToString(columnValue) {
      if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
        return String(columnValue);
      } else if (_typeof(columnValue) === 'object' && columnValue.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(columnValue.text)) >= 0) {
        return String(columnValue.text);
      } else {
        return '';
      }
    },
    /**
     * Формирование контента
     * @param {object|string|number} content
     * @param {object}               record
     * @returns {string}
     */
    render: function render(content, record) {
      if (['string', 'number'].indexOf(_typeof(content)) >= 0) {
        content = {
          type: 'secondary',
          text: content
        };
      } else if (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('type') || !content.hasOwnProperty('text') || typeof content.type !== 'string' || typeof content.text !== 'string' || !content.text) {
        return '';
      }
      if (content.type === '' || content.type === 'none') {
        return content.text;
      }
      return coreuiTableUtils.render(tpl['columns/badge.html'], {
        type: content.type,
        text: content.text
      });
    }
  };

  var ColumnsComponent = {
    _table: null,
    _options: {
      type: 'component',
      field: null,
      label: null,
      show: true,
      width: null,
      minWidth: null,
      maxWidth: null
    },
    /**
     * Инициализация
     * @param {CoreUI.table.instance} table
     * @param {object}                options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend({}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend({}, this._options);
    },
    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    render: function render(content, record) {
      if (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('component') || typeof content.component !== 'string' || !content.component) {
        return '';
      }
      return coreuiTableRender.renderComponents(this._table, content, 'records_show');
    }
  };

  var ColumnsProgress = {
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
      barHeight: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend(true, {}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    convertToString: function convertToString(columnValue) {
      if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
        return String(columnValue);
      } else if (_typeof(columnValue) === 'object' && columnValue.hasOwnProperty('percent') && ['string', 'number'].indexOf(_typeof(columnValue.percent)) >= 0) {
        return String(columnValue.percent);
      } else {
        return '';
      }
    },
    /**
     * Формирование контента
     * @param {object|string|number} content
     * @param {object}              record
     * @returns {string}
     */
    render: function render(content, record) {
      if (!coreuiTableUtils.isNumeric(content) && (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('percent') || !coreuiTableUtils.isNumeric(content.percent))) {
        return '';
      }
      var description = null;
      var percent = 0;
      var percentText = '';
      var color = typeof this._options.barColor === 'string' ? this._options.barColor : 'primary';
      var attr = this._options.attr;
      attr = coreuiTableUtils.mergeAttr(attr, {
        "class": 'progress'
      });
      if (this._options.barWidth) {
        var barWidth = coreuiTableUtils.isNumeric(this._options.barWidth) ? this._options.barWidth + 'px' : this._options.barWidth;
        attr = coreuiTableUtils.mergeAttr(attr, {
          style: 'width:' + barWidth
        });
      }
      if (this._options.barHeight) {
        var barHeight = coreuiTableUtils.isNumeric(this._options.barHeight) ? this._options.barHeight + 'px' : this._options.barHeight;
        attr = coreuiTableUtils.mergeAttr(attr, {
          style: 'height:' + barHeight
        });
      }
      if (coreuiTableUtils.isNumeric(content)) {
        if (content < 0) {
          percent = 0;
        } else if (content > 100) {
          percent = 100;
        } else {
          percent = content;
        }
        attr = coreuiTableUtils.mergeAttr(attr, {
          "class": 'mt-1'
        });
      } else {
        if (content.percent < 0) {
          percent = 0;
        } else if (content.percent > 100) {
          percent = 100;
        } else {
          percent = content.percent;
        }
        if (content.hasOwnProperty('color') && typeof content.color === 'string') {
          color = content.color;
        }
        if (content.hasOwnProperty('description') && typeof content.description === 'string' && content.description !== '') {
          description = content.description;
        } else {
          attr = coreuiTableUtils.mergeAttr(attr, {
            "class": 'mt-1'
          });
        }
      }
      if (this._options.showPercent) {
        percentText = percent + '%';
      }
      var attributes = [];
      $.each(attr, function (name, value) {
        if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
          attributes.push(name + '="' + value + '"');
        }
      });
      return coreuiTableUtils.render(tpl['columns/progress.html'], {
        description: description,
        percent: percent,
        percentText: percentText,
        color: color,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  var ColumnsImage = {
    _table: null,
    _options: {
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
      imgStyle: null
    },
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    init: function init(table, options) {
      this._table = table;
      this._options = $.extend(true, {}, this._options, options);
    },
    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    setShow: function setShow(isShow) {
      this._options.show = !!isShow;
    },
    /**
     * Видимости колонки
     */
    isShow: function isShow() {
      return !!this._options.show;
    },
    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function getOptions() {
      return $.extend(true, {}, this._options);
    },
    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    render: function render(content, record) {
      if (typeof content !== 'string' || content === '') {
        return '';
      }
      var attr = this._options.attr;
      attr.src = content;
      if (this._options.imgWidth) {
        var imgWidth = coreuiTableUtils.isNumeric(this._options.imgWidth) ? this._options.imgWidth + 'px' : this._options.imgWidth;
        attr = coreuiTableUtils.mergeAttr(attr, {
          style: 'width:' + imgWidth
        });
      }
      if (this._options.imgHeight) {
        var imgHeight = coreuiTableUtils.isNumeric(this._options.imgHeight) ? this._options.imgHeight + 'px' : this._options.imgHeight;
        attr = coreuiTableUtils.mergeAttr(attr, {
          style: 'height:' + imgHeight
        });
      }
      if (this._options.imgBorder) {
        attr = coreuiTableUtils.mergeAttr(attr, {
          "class": 'border border-secondary-subtle'
        });
      }
      if (this._options.imgStyle && typeof this._options.imgStyle === 'string') {
        switch (this._options.imgStyle) {
          case 'circle':
            attr = coreuiTableUtils.mergeAttr(attr, {
              "class": 'rounded-circle'
            });
            break;
          case 'thumb':
            attr = coreuiTableUtils.mergeAttr(attr, {
              "class": 'img-thumbnail'
            });
            break;
          case 'rounded':
            attr = coreuiTableUtils.mergeAttr(attr, {
              "class": 'rounded'
            });
            break;
        }
      }
      var attributes = [];
      $.each(attr, function (name, value) {
        if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
          attributes.push(name + '="' + value + '"');
        }
      });
      return coreuiTableUtils.render(tpl['columns/image.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    }
  };

  coreuiTable.lang.ru = langRu;
  coreuiTable.lang.en = langEn;
  coreuiTable.controls.link = ControlLink;
  coreuiTable.controls.button = ControlButton;
  coreuiTable.controls.dropdown = ControlDropdown;
  coreuiTable.controls.button_group = ControlButtonGroup;
  coreuiTable.controls.custom = ControlCustom;
  coreuiTable.controls.page_size = ControlPageSize;
  coreuiTable.controls.page_jump = ControlPageJump;
  coreuiTable.controls.pages = ControlPages;
  coreuiTable.controls.total = ControlTotal;
  coreuiTable.controls.search = ControlSearch;
  coreuiTable.controls.columns = ControlColumns;
  coreuiTable.controls.caption = ControlCaption;
  coreuiTable.controls.filter_clear = ControlFilterClear;
  coreuiTable.controls.divider = ControlDivider;
  coreuiTable.filters.text = FilterText;
  coreuiTable.filters.number = FilterNumber;
  coreuiTable.filters.date = FilterDate;
  coreuiTable.filters.datetime = FilterDatetime;
  coreuiTable.filters.date_month = FilterDateMonth;
  coreuiTable.filters.date_range = FilterDateRange;
  coreuiTable.filters.datetime_range = FilterDatetimeRange;
  coreuiTable.filters.checkbox = FilterCheckbox;
  coreuiTable.filters.radio = FilterRadio;
  coreuiTable.filters.select = FilterSelect;
  coreuiTable.filters["switch"] = FilterSwitch;
  coreuiTable.search.text = SearchText;
  coreuiTable.search.number = SearchNumber;
  coreuiTable.search.date = SearchDate;
  coreuiTable.search.date_month = SearchDateMonth;
  coreuiTable.search.datetime = SearchDatetime;
  coreuiTable.search.date_range = SearchDateRange;
  coreuiTable.search.datetime_range = SearchDatetimeRange;
  coreuiTable.search.checkbox = SearchCheckbox;
  coreuiTable.search.checkboxBtn = SearchCheckboxBtn;
  coreuiTable.search.radio = SearchRadio;
  coreuiTable.search.radioBtn = SearchRadioBtn;
  coreuiTable.search.select = SearchSelect;
  coreuiTable.search["switch"] = SearchSwitch;
  coreuiTable.columns.date = ColumnsDate;
  coreuiTable.columns.datetime = ColumnsDatetime;
  coreuiTable.columns.html = ColumnsHtml;
  coreuiTable.columns.number = ColumnsNumber;
  coreuiTable.columns.money = ColumnsMoney;
  coreuiTable.columns.numbers = ColumnsNumbers;
  coreuiTable.columns.select = ColumnsSelect;
  coreuiTable.columns["switch"] = ColumnsSwitch;
  coreuiTable.columns.text = ColumnsText;
  coreuiTable.columns.button = ColumnsButton;
  coreuiTable.columns.link = ColumnsLink;
  coreuiTable.columns.menu = ColumnsMenu;
  coreuiTable.columns.badge = ColumnsBadge;
  coreuiTable.columns.component = ColumnsComponent;
  coreuiTable.columns.progress = ColumnsProgress;
  coreuiTable.columns.image = ColumnsImage;

  return coreuiTable;

}));
