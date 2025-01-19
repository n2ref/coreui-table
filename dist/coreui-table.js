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
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var tpl = Object.create(null);
  tpl['columns/badge.html'] = '<span class="badge text-bg-<%= type %>"><%= text %></span>';
  tpl['columns/button.html'] = '<button type="button"<%- attr %>><%- content %></button>';
  tpl['columns/image.html'] = '<img <%- attr %>/>';
  tpl['columns/link.html'] = '<a <%- attr %>><%- content %></a>';
  tpl['columns/menu.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>> <%- content %> </button> <ul class="dropdown-menu dropdown-menu-<%= position %>"> <% $.each(items, function(key, item) { %> <% if (item.type === \'link\') { %> <li><a href="<%= item.url %>"<%- item.attr %>><%- item.content %></a></li> <% } else if (item.type === \'button\') { %> <li> <button type="button" id="btn-dropdown-<%= item.id %>"<%- item.attr %>> <%- item.content %> </button> </li> <% } else if (item.type === \'divider\') { %> <li><hr class="dropdown-divider"></li> <% } else if (item.type === \'header\') { %> <li><h6 class="dropdown-header"><%- item.content %></h6></li> <% } %> <% }) %> </ul> </div>';
  tpl['columns/progress.html'] = '<% if (description !== null) { %> <small class="text-body-secondary"><%= description %></small> <% } %> <div class="d-inline-flex align-items-center"> <div <%- attr %>> <div class="progress-bar bg-<%= color %>" style="width:<%= percent %>%;"></div> </div> <span><%= percentText %></span> </div>';
  tpl['columns/select_label.html'] = '<input class="coreui-table__select-all form-check-input" type="checkbox" value="">';
  tpl['columns/select.html'] = '<input class="coreui-table__select form-check-input" type="checkbox" value="<%= index %>">';
  tpl['columns/switch.html'] = '<div class="form-switch"> <input class="form-check-input coreui-table__switch" type="checkbox" data-field="<%= field %>" value="<%= index %>"<% if (checked) { %> checked<% } %><% if (disabled) { %> disabled<% } %>> </div>';
  tpl['container.html'] = ' <div id="coreui-table-<%= id %>" class="coreui-table<%= classes %>"<% if (widthSizes) { %> style="<%= widthSizes.join(\';\') %>"<% } %>> <div class="coreui-table__container position-relative"> <div class="coreui-table__wrapper<%= classesWrapper %>" <% if (heightSizes) { %>style="<%= heightSizes.join(\';\') %>"<% } %>></div> </div> </div>';
  tpl['controls/button_group.html'] = '<div class="btn-group" role="group"></div>';
  tpl['controls/button_group/button.html'] = '<button type="button" <%- attr %>><%= content %></button>';
  tpl['controls/button_group/dropdown.html'] = '<div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>><%- content %></button> <ul class="dropdown-menu dropdown-menu-<%= position %>"></ul> </div>';
  tpl['controls/button_group/dropdown/button.html'] = '<li> <button type="button" class="dropdown-item"><%- content %></button> </li>';
  tpl['controls/button_group/dropdown/divider.html'] = '<li><hr class="dropdown-divider"></li>';
  tpl['controls/button_group/dropdown/link.html'] = '<li><a class="dropdown-item" href="<%= url %>"><%- content %></a></li>';
  tpl['controls/button_group/link.html'] = '<a href="<%= url %>"<%- attr %>><%= content %></a>';
  tpl['controls/button.html'] = '<button type="button"<%- attr %>><%- content %></button>';
  tpl['controls/caption.html'] = '<div class="d-flex flex-column me-3"> <small class="text-body-secondary fw-medium"> <%= title %> <% if (description) { %> <i class="bi bi-question-circle coreui-table__cursor_help" title="<%= description %>"></i> <% } %> </small> <b class="text-nowrap"><%= value %></b> </div>';
  tpl['controls/columns.html'] = '<button type="button"<%- btnAttr %>><%-btnContent%></button>';
  tpl['controls/columns/list.html'] = ' <div class="coreui-table__columns px-3 pt-3 pb-4"> <div class="mb-3"> <div class="form-check coreui-table__check_all"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" <% if (showAll === true) { %>checked<% } %>> <%= lang.all %> </label> </div> <% columns.map(function(column) { %> <div class="form-check coreui-table_check-column"> <label class="form-check-label"> <input class="form-check-input" type="checkbox" value="<%= column.field %>" <% if (column.show === true) { %>checked<% } %>> <%= column.label %> </label> </div> <% }); %> </div> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div>';
  tpl['controls/divider.html'] = '<div <%- attr %>><%= text %></div>';
  tpl['controls/dropdown.html'] = ' <div class="btn-group" role="group"> <button type="button" data-bs-toggle="dropdown"<%- attr %>><%- content %></button> <ul class="dropdown-menu dropdown-menu-<%= position %>"></ul> </div>';
  tpl['controls/dropdown/button.html'] = '<li> <button type="button" class="dropdown-item"><%- content %></button> </li>';
  tpl['controls/dropdown/divider.html'] = '<li><hr class="dropdown-divider"></li>';
  tpl['controls/dropdown/link.html'] = '<li><a class="dropdown-item" href="<%= url %>"><%- content %></a></li>';
  tpl['controls/filter_clear.html'] = '<button type="button" <%- attr %>><%- content %></button>';
  tpl['controls/link.html'] = '<a href="<%- url %>"<%- attr %>><%- content %></a>';
  tpl['controls/page-jump.html'] = ' <div class="coreui-table__page_jump_container"> <div <%- attr %>> <input type="number" class="form-control border-secondary-subtle" min="1"> <button class="btn btn-outline-secondary border-secondary-subtle" type="button"> <i class="bi bi-chevron-compact-right"></i> </button> </div> </div>';
  tpl['controls/page-size.html'] = ' <select <%- attr %>> <% recordsPerPageList.map(function(count) { %> <option value="<%= count %>"<% if (recordsPerPage == count) { %>selected<% } %>> <% if (count == \'0\') { %><%= lang.all %><% } else { %><%= count %><% } %> </option> <% }); %> </select>';
  tpl['controls/pages.html'] = ' <nav> <ul <%- attr %>> <% if (showPrev) { %> <li class="page-item coreui-table__page_prev <% if ( ! isActivePrev) { %> disabled<% } %>"> <button type="button" class="page-link"> <i class="bi bi-chevron-left"></i> </button> </li> <% } %> <% if (showPageFirst) { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> 1 </button> </li> <% } %> <% if (showDividerStart) { %> <li class="page-item disabled"> <span class="page-link px-1">...</span> </li> <% } %> <% pages.map(function(page) { %> <% if (page == currentPage) { %> <li class="page-item active"> <span class="page-link"><%= page %></span> </li> <% } else { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> <%= page %> </button> </li> <% } %> <% }); %> <% if (showDividerEnd) { %> <li class="page-item disabled"> <span class="page-link px-1">...</span> </li> <% } %> <% if (showPageLast) { %> <li class="page-item"> <button type="button" class="page-link coreui-table__page"> <%= pagesTotal %> </button> </li> <% } %> <% if (showNext) { %> <li class="page-item coreui-table__page_next<% if ( ! isActiveNext) { %> disabled<% } %>"> <button type="button" class="page-link"> <i class="bi bi-chevron-right"></i> </button> </li> <% } %> </ul> </nav>';
  tpl['controls/search.html'] = '<div class="btn-group"> <button type="button"<%- btnAttr %>><%- btnContent %></button> <%- btnClear %> </div> ';
  tpl['controls/search/clear.html'] = '<button type="button" <%- attr %>><%- content %></button> ';
  tpl['controls/search/container.html'] = ' <div class="coreui-table__search px-3 pt-3 pb-4"> <div class="mb-3 coreui-table__search_controls"></div> <div class="d-flex flex-sm-wrap flex-md-nowrap"> <div class="d-none d-md-block" style="width:<%= labelWidth %>;min-width:<%= labelWidth %>"></div> <div class="d-flex justify-content-start flex-wrap gap-2"> <button type="button" <%- btnCompleteAttr %>> <%- btnCompleteContent %> </button> </div> </div> </div>';
  tpl['controls/search/control.html'] = '<div class="mb-2 d-flex flex-column flex-md-row "> <label class="col-form-label fw-medium text-start text-md-end pe-2" style="min-width:<%= labelWidth %>;width:<%= labelWidth %>"> <%= label %> <% if (descriptionLabel) { %> <div class="text-muted fw-normal"> <small><%= descriptionLabel %></small> </div> <% } %> </label> <div class="flex-fill coreui-table__search-control_content"> <% if (suffix) { %><%- suffix %><% } %> <% if (description) { %> <div class="text-muted fw-normal"> <small><%= description %></small> </div> <% } %> </div> </div>';
  tpl['controls/total.html'] = '<div <%- attr %>> <small><%= lang.total %>: <span class="coreui-table__count-total"><%= recordsTotal %></span></small> </div>';
  tpl['filters/checkbox.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="checkbox" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>';
  tpl['filters/date_month.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="month" <%- attr %>> </div>';
  tpl['filters/date_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>> </div>';
  tpl['filters/date.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="date" <%- attr %>> </div>';
  tpl['filters/datetime_range.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>> </div>';
  tpl['filters/datetime.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="datetime-local" <%- attr %>> </div>';
  tpl['filters/number.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="number" <%- attrStart %>> <input type="number" <%- attrEnd %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>';
  tpl['filters/radio.html'] = ' <div class="btn-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <% $.each(items, function(key, item) { %> <input type="radio" class="btn-check" autocomplete="off" id="<%= (field + key) %>" name="<%= field %>" value="<%= item.value %>" <%= item.checked ? \' checked\' : \'\' %>> <label class="<%= item.class %>" for="<%= (field + key) %>"><%= item.text %></label> <% }); %> </div>';
  tpl['filters/select.html'] = '<div class="input-group flex-nowrap"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>><%= option.text %></option> <% } %> <% }); %> </select> </div>';
  tpl['filters/switch.html'] = '<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> <% if (label != \'\') { %> <label class="form-check-label" for="<%= (field + id) %>"><%= label %></label> <% } %> </div>';
  tpl['filters/text.html'] = ' <div class="input-group"> <% if (label) { %> <span class="input-group-text"><%= label %></span> <% } %> <input type="text" <%- attr %>> <button type="button" <%- btnAttr %>> <%- btnContent %> </button> </div>';
  tpl['search/checkbox-btn.html'] = ' <div class="pt-2"> <div class="btn-group"> <% options.map(function(option) { %> <input class="btn-check" type="checkbox" value="<%- option.value %>" id="<%= option.hash %>" autocomplete="off" <%= option.checked ? \' checked\' : \'\' %>> <label class="<%= option.optionsClass %>" for="<%= option.hash %>"><%= option.text %></label> <% }); %> </div> </div>';
  tpl['search/checkbox.html'] = ' <div class="pt-2"> <% options.map(function(option) { %> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="checkbox" value="<%- option.value %>" <%= option.checked ? \' checked\' : \'\' %>> <%= option.text %> </label> </div> <% }); %> </div>';
  tpl['search/date_month.html'] = ' <input type="month" <%- attr %>>';
  tpl['search/date_range.html'] = '<div> <input type="date" <%- startAttr %>> <input type="date" <%- endAttr %>> </div>';
  tpl['search/date.html'] = ' <input type="date" <%- attr %>>';
  tpl['search/datetime_range.html'] = '<div> <input type="datetime-local" <%- startAttr %>> <input type="datetime-local" <%- endAttr %>> </div>';
  tpl['search/datetime.html'] = ' <input type="datetime-local" <%- attr %>>';
  tpl['search/number.html'] = ' <input type="number" <%- startAttr %>> <input type="number" <%- endAttr %>>';
  tpl['search/radio-btn.html'] = '<div class="pt-2"> <div class="btn-group"> <input class="btn-check coreui-table__all" type="radio" name="<%= field %>" value="" id="<%= optionAllHash %>" autocomplete="off" <%= checkedAll ? \' checked\' : \'\' %>> <label class="<%= optionOptionsClass %>" for="<%= optionAllHash %>"><%= lang.all %></label> <% options.map(function(option) { %> <input class="btn-check" type="radio" name="<%= field %>" value="<%- option.value %>" id="<%= option.hash %>" autocomplete="off" <%= option.checked ? \' checked="checked"\' : \'\' %>"> <label class="<%= option.optionsClass %>" for="<%= option.hash %>"><%= option.text %></label> <% }); %> </div> </div>';
  tpl['search/radio.html'] = '<div class="pt-2"> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input coreui-table__all" type="radio" name="<%= field %>" value=""<%= checkedAll ? \' checked\' : \'\' %>> <%= lang.all %> </label> </div> <% options.map(function(option) { %> <div class="form-check"> <label class="form-check-label coreui-table_pointer"> <input class="form-check-input" type="radio" name="<%= field %>" value="<%- option.value %>" <%= option.checked ? \' checked="checked"\' : \'\' %>> <%= option.text %> </label> </div> <% }); %> </div>';
  tpl['search/select.html'] = ' <select <%- attr %>> <option>--</option> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>><%= option.text %></option> <% } %> <% }); %> </select>';
  tpl['search/switch.html'] = '<div class="form-check form-switch pt-2"> <input class="form-check-input" type="checkbox" id="<%= (field + id) %>" name="<%= field %>" value="<%= valueY %>" <%= checked ? \' checked\' : \'\' %>> </div>';
  tpl['search/text.html'] = '<input type="text" <%- attr %>>';
  tpl['table.html'] = ' <table class="table <%= classes %> mb-0"> <colgroup> <% $.each(colGroups, function(key, columnGroup) { %> <col<% if (columnGroup.style) { %> style="<%= columnGroup.style %>"<% } %>/> <% }); %> </colgroup> <% if (showHeaders) { %> <thead<% if (theadAttr) { %> <%- theadAttr %>"<% } %>> <%- columnsHeader %> </thead> <% } %> <tbody></tbody> <% if (columnsFooter != \'\') { %> <tfoot> <%- columnsFooter %> </tfoot> <% } %> </table>';
  tpl['table/columns/footer.html'] = '<tr> <% $.each(columns, function(key, column) { %> <td<%- column.attr%>><%- column.content %></td> <% }); %> </tr>';
  tpl['table/columns/header.html'] = '<tr class="fw-medium bg-body"> <% columns.map(function(column) { %> <td<%- column.attr%>> <span class="coreui-table__column-border"></span> <span class="coreui-table__column-label"><%- column.content %></span> </td> <% }); %> </tr>';
  tpl['table/columns/menu/button.html'] = '<li><button <%- attr%>><%- text %></button></li>';
  tpl['table/columns/menu/divider.html'] = '<li><hr class="dropdown-divider"></li>';
  tpl['table/columns/menu/header.html'] = '<li><h6 class="dropdown-header"><%- text %></h6></li>';
  tpl['table/columns/menu/link.html'] = '<li><a <%- attr%>><%- text %></a></li>';
  tpl['table/columns/td.html'] = '<td<%- attr%>> <span class="coreui-table__column-border"></span> <span class="coreui-table__column-label"><%- label %></span> <% if (description) { %> <small class="coreui-table__column-description bi bi-question-circle text-body-secondary" title="<%= description %>" data-bs-toggle="tooltip" data-bs-placement="bottom"></small> <% } %> <% if (sortable === \'asc\') { %> <i class="coreui-table__column-sort bi bi-sort-down-alt"></i> <% } else if (sortable === \'desc\') { %> <i class="coreui-table__column-sort bi bi-sort-down"></i> <% } %> <% if (issetMenu) { %> <div class="dropdown d-inline fw-normal coreui-table__column-menu"> <span class="dropdown-toggle <%= menuShowAlways %>" data-bs-toggle="dropdown"> <i class="bi bi-three-dots-vertical"></i> </span> <ul class="dropdown-menu dropdown-menu-<%= menuPosition %>"></ul> </div> <% } %> </td>';
  tpl['table/columns/tr.html'] = '<tr class="fw-medium bg-body"></tr>';
  tpl['table/control.html'] = '<div id="coreui-table-control-<%= id %>" class="coreui-table__control"></div>';
  tpl['table/controls/footer-out.html'] = ' <div class="coreui-table__footer d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-2 align-items-center"></div> <% } %> </div>';
  tpl['table/controls/footer.html'] = ' <div class="coreui-table__footer ps-1 pe-1 d-flex justify-content-between border-top border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-1 mt-1 align-items-center"></div> <% } %> </div>';
  tpl['table/controls/header-out.html'] = ' <div class="coreui-table__header d-flex justify-content-between"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill mb-2 mt-1 align-items-center"></div> <% } %> </div>';
  tpl['table/controls/header.html'] = ' <div class="coreui-table__header ps-1 pe-1 d-flex justify-content-between border-bottom border-secondary-subtle"> <% if (controlsLeft.length) { %> <div class="coreui-table__controls coreui-table__controls_left d-flex justify-content-start gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> <% if (controlsCenter.length) { %> <div class="coreui-table__controls coreui-table__controls_center d-flex justify-content-center gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> <% if (controlsRight.length) { %> <div class="coreui-table__controls coreui-table__controls_right d-flex justify-content-end gap-2 flex-wrap flex-fill my-1 align-items-center"></div> <% } %> </div>';
  tpl['table/loader.html'] = '<div class="coreui-table-lock position-absolute w-100 top-0 bottom-0"> <div class="coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0"></div> <div class="coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary"> <div class="spinner-border text-secondary align-self-center"></div> <span class="lh-lg"><%= lang.loading %></span> </div> </div>';
  tpl['table/record.html'] = '<tr<%- attr %> data-record-index="<%= index %>"> <% fields.map(function(field) { %> <td<%- field.attr %>></td> <% }); %> </tr>';
  tpl['table/record/empty.html'] = '<tr class="coreui-table__record-empty"> <td class="text-center" colspan="<%= columnsCount %>"><%= lang.emptyRecords %></td> </tr>';
  tpl['table/record/expand.html'] = '<tr class="coreui-table__record-expanded" style="display: none"> <td colspan="<%= colspan %>"></td> </tr>';
  tpl['table/record/group.html'] = '<tr<%- attr %>> <td colspan="<%= colspan %>" class="border-end"></td> </tr>';

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
    },
    /**
     * Размерность строки
     * @param {string} str
     * @param {int}    count
     * @param {string} repeat
     * @returns {string}
     */
    strPadLeft: function strPadLeft(str, count, repeat) {
      str = String(str);
      if (str.length >= count) {
        return str;
      }
      repeat = repeat ? repeat : '0';
      return (repeat.repeat(count) + str).slice(-count);
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
        options.columnsHeader.map(function (headerRow) {
          if (Array.isArray(headerRow)) {
            var cells = [];
            headerRow.map(function (headerColumn) {
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
        if (group) {
          var groupValue = null;
          var groupIndex = 0;
          var recordsGroups = {};
          records.map(function (record) {
            if (record.show) {
              if (record.data.hasOwnProperty(group.field) && ['string', 'number'].indexOf(_typeof(record.data[group.field])) >= 0 && groupValue != record.data[group.field]) {
                groupValue = record.data[group.field];
                groupIndex++;
              }
              if (!recordsGroups.hasOwnProperty(groupIndex)) {
                recordsGroups[groupIndex] = {
                  isGroup: groupIndex > 0,
                  records: []
                };
              }
              recordsGroups[groupIndex].records.push(record);
            }
          });
          $.each(recordsGroups, function (key, recordsGroup) {
            var renderRecordsGroup = [];
            recordsGroup.records.map(function (record) {
              renderRecordsGroup.push(that.renderRecord(table, record));
              table._recordsNumber++;
            });
            if (recordsGroup.isGroup) {
              renderRecords.push(that.renderGroup(table, group, recordsGroup.records[0], renderRecordsGroup));
            }
            renderRecordsGroup.map(function (record) {
              renderRecords.push(record);
            });
          });
        } else {
          records.map(function (record) {
            if (record.show) {
              renderRecords.push(that.renderRecord(table, record));
              table._recordsNumber++;
            }
          });
        }
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
      table._columns.map(function (column) {
        if (!column.isShow()) {
          return;
        }
        var fieldContent = that.renderField(table, column, record);
        if (fieldContent) {
          fields.push(fieldContent);
        }
      });
      if (typeof options.onClickUrl === 'string' && options.onClickUrl || options.onClick) {
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
      fields.map(function (field, key) {
        $(recordElement[0].querySelector(':scope > td:nth-child(' + (key + 1) + ')')).append(field.content);
      });
      return recordElement;
    },
    /**
     * Сборка ячейки таблицы
     * @param {coreuiTableInstance} table
     * @param {Column}              column
     * @param {object}              record
     * @returns {{ attr: (string), content: (string) }}
     * @private
     */
    renderField: function renderField(table, column, record) {
      var columnOptions = column.getOptions();
      var columnField = column.getField();
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
      if (typeof column.getActions === 'function') {
        var actions = column.getActions(content, columnField, record);
        if (coreuiTableUtils.isObject(actions)) {
          record.fields[columnField] = actions;
        }
      }
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
     * @param {coreuiTableInstance} table
     * @param {object}              group
     * @param {object}              record
     * @param {Array}               renderRecords
     * @returns {{ attr: (string), fields: (object) }}}
     * @private
     */
    renderGroup: function renderGroup(table, group, record, renderRecords) {
      var attr = group.hasOwnProperty('attr') && coreuiTableUtils.isObject(group.attr) ? group.attr : {};
      if (attr.hasOwnProperty('class') && typeof attr["class"] === 'string') {
        attr["class"] += ' coreui-table__record-group';
      } else {
        attr["class"] = 'coreui-table__record-group';
      }
      var attributes = [];
      $.each(attr, function (name, value) {
        if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
          attributes.push(name + '="' + value + '"');
        }
      });
      var isCollapsing = group.hasOwnProperty('isCollapsing') ? !!group.isCollapsing : false;
      var groupElement = $(coreuiTableUtils.render(tpl['table/record/group.html'], {
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        colspan: table._countColumnsShow,
        isCollapsing: isCollapsing
      }));
      var td = groupElement.find(' > td');
      var content = record.data[group.field];
      if (group.hasOwnProperty('render')) {
        var renderContent = null;
        if (typeof group.render === 'function') {
          renderContent = group.render(record);
        } else if (typeof group.render === 'string') {
          renderContent = new Function('record', group.render)(record);
        }
        if (renderContent) {
          content = renderContent;
        }
      }
      if (isCollapsing) {
        var collapsed = $('<i class="bi bi-chevron-down coreui-table_pointer me-1"></i>');
        collapsed.click(function () {
          if ($(this).hasClass('bi-chevron-down')) {
            $(this).removeClass('bi-chevron-down').addClass('bi-chevron-right');
            renderRecords.map(function (renderRecord) {
              $(renderRecord).fadeOut(100);
            });
          } else {
            $(this).removeClass('bi-chevron-right').addClass('bi-chevron-down');
            renderRecords.map(function (renderRecord) {
              $(renderRecord).fadeIn(100);
            });
          }
        });
        td.append(collapsed);
      }
      td.append(content);
      return groupElement;
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
     * @param {coreuiTable}         tableWrapper
     * @param {coreuiTableInstance} table
     * @param {Array}               columns
     * @private
     */
    initColumns: function initColumns(tableWrapper, table, columns) {
      var options = table.getOptions();
      var columnsStorage = options.saveState && options.id ? coreuiTablePrivate.getStorageField(table.getId(), 'columns') : null;
      columns.map(function (column) {
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
        var columnInstance = new coreuiTable.columns[column.type](table, column);
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
        var controlInstance = new coreuiTable.search[control.type](table, control);
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
      rows.map(function (row) {
        var type = 'in';
        var controlsLeft = [];
        var controlsCenter = [];
        var controlsRight = [];
        if (typeof row.type === 'string' && ['in', 'out'].indexOf(row.type.toLowerCase()) >= 0) {
          type = row.type.toLowerCase();
        }
        if (row.hasOwnProperty('left') && Array.isArray(row.left)) {
          row.left.map(function (control) {
            var instance = that.initControl(tableWrapper, table, control);
            if (coreuiTableUtils.isObject(instance)) {
              controlsLeft.push(instance);
            }
          });
        }
        if (row.hasOwnProperty('center') && Array.isArray(row.center)) {
          row.center.map(function (control) {
            var instance = that.initControl(tableWrapper, table, control);
            if (coreuiTableUtils.isObject(instance)) {
              controlsCenter.push(instance);
            }
          });
        }
        if (row.hasOwnProperty('right') && Array.isArray(row.right)) {
          row.right.map(function (control) {
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
          instance = new coreuiTable.controls[control.type](table, control);
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
            instance = new coreuiTable.filters[filterName](table, control);
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
      var searchData = table.getSearchData(true);
      var filterData = table.getFilterData(true);
      var columnsOptions = {};
      table._columns.map(function (column) {
        if (typeof column.convertToString === 'function' && typeof column.getField === 'function') {
          var field = column.getField();
          if (field) {
            columnsOptions[field] = {};
            columnsOptions[field].convertToString = column.convertToString;
          }
        }
      });
      table._records.map(function (record) {
        var isShow = true;
        if (searchData.length > 0) {
          isShow = coreuiTablePrivate.isFilteredRecord(searchData, record.data, columnsOptions);
        }
        if (isShow && filterData.length > 0) {
          isShow = coreuiTablePrivate.isFilteredRecord(filterData, record.data, columnsOptions);
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
          fields: {},
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
     * @param {object} columnsOptions
     * @return {boolean}
     * @private
     */
    isFilteredRecord: function isFilteredRecord(filters, recordData, columnsOptions) {
      var isShow = true;
      $.each(filters, function (key, filter) {
        var fieldValue = null;
        if (recordData.hasOwnProperty(filter.field) && recordData[filter.field]) {
          if (columnsOptions && columnsOptions.hasOwnProperty(filter.field) && typeof columnsOptions[filter.field].convertToString === 'function') {
            fieldValue = columnsOptions[filter.field].convertToString(recordData[filter.field]);
          } else if (typeof recordData[filter.field] === 'string') {
            fieldValue = recordData[filter.field];
          } else if (typeof recordData[filter.field] === 'number') {
            fieldValue = String(recordData[filter.field]);
          }
        }
        if (fieldValue !== null) {
          if (!filter.filter(fieldValue, filter.value)) {
            isShow = false;
            return false;
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
      if (this._options.saveState && this._options.id) {
        this._recordsPerPage = coreuiTablePrivate.getStorageField(this._id, 'page_size');
      } else if (this._options.recordsPerPage > 0) {
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
      var table = this;

      // Показ строк
      this.on('records_show', function () {
        // Переход по ссылке
        if (typeof table._options.onClickUrl === 'string' && table._options.onClickUrl) {
          coreuiTableElements.getTrRecords(table.getId()).click(function () {
            var recordKey = $(this).data('record-index');
            var record = table.getRecordByIndex(recordKey);
            if (!record) {
              return;
            }
            var url = table._options.onClickUrl;
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
        if (['function', 'string'].indexOf(_typeof(table._options.onClick))) {
          coreuiTableElements.getTrRecords(table.getId()).click(function (event) {
            var recordKey = $(this).data('record-index');
            var record = table.getRecordByIndex(recordKey);
            if (!record) {
              return;
            }
            if (typeof table._options.onClick === 'function') {
              table._options.onClick(record, table, event);
            } else if (typeof table._options.onClick === 'string') {
              var func = new Function('record', 'table', 'event', table._options.onClick);
              func(record, table, event);
            }
          });
        }

        // Раскрытие строки
        coreuiTableElements.getNoWrapToggles(table.getId()).click(function (event) {
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
        coreuiTableElements.fixedColsLeft(table.getId());
        coreuiTableElements.fixedColsRight(table.getId());
      });

      // Показ таблицы
      this.on('table_show', function () {
        var sortableColumns = coreuiTableElements.getTableSortable(table.getId());
        if (sortableColumns[0]) {
          sortableColumns.click(function (event) {
            var field = $(this).data('field');
            if (field) {
              var sorting = [];
              var currentOrder = null;
              $.each(table._sort, function (key, sortField) {
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
                table.sortDefault();
              } else {
                table.sortFields(sorting);
              }
            }
          });
        }
        if (window.hasOwnProperty('bootstrap') && bootstrap.hasOwnProperty('Tooltip')) {
          $('.coreui-table__column-description', coreuiTableElements.getTableThead(table.getId())).each(function () {
            new bootstrap.Tooltip(this);
          });
        }
      });

      // События смены состояния
      if (this._options.saveState && this._options.id) {
        this.on('records_sort', function () {
          coreuiTablePrivate.setStorageField(table.getId(), 'sort', table._sort);
        });
        this.on('search_change', function () {
          coreuiTablePrivate.setStorageField(table.getId(), 'search', table.getSearchData());
        });
        this.on('filters_change', function () {
          coreuiTablePrivate.setStorageField(table.getId(), 'filters', table.getFilterData());
        });
        this.on('page_size_update', function () {
          coreuiTablePrivate.setStorageField(table.getId(), 'page_size', table._recordsPerPage);
        });
        this.on('columns_change', function () {
          var columns = [];
          table._columns.map(function (column) {
            var columnOptions = column.getOptions();
            columns.push({
              field: columnOptions.field,
              isShow: column.isShow()
            });
          });
          coreuiTablePrivate.setStorageField(table.getId(), 'columns', columns);
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
        this._controlsPositions.header.map(function (header) {
          var controlsLeft = [];
          var controlsCenter = [];
          var controlsRight = [];
          if (Array.isArray(header.left) && header.left.length > 0) {
            header.left.map(function (control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsLeft.push(controlRender);
              }
            });
          }
          if (Array.isArray(header.center) && header.center.length > 0) {
            header.center.map(function (control) {
              var controlRender = coreuiTableRender.renderControl(that, control);
              if (controlRender) {
                controlsCenter.push(controlRender);
              }
            });
          }
          if (Array.isArray(header.right) && header.right.length > 0) {
            header.right.map(function (control) {
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
        this._controlsPositions.footer.map(function (footer) {
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
      if (options.hasOwnProperty('theme') && typeof options.theme === 'string' && options.theme) {
        classes.push('coreui-theme-' + options.theme);
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
        classesRoot: classesWrapper.length > 0 ? ' ' + classesWrapper.join(' ') : '',
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
        filterData.map(function (filter) {
          searchData.push(filter);
        });
      }
      if (searchData.length > 0) {
        var paramSearch = coreuiTableUtils.isObject(this._options.requestParams) && this._options.requestParams.hasOwnProperty('search') && typeof this._options.requestParams.search === 'string' ? this._options.requestParams.search : 'search';
        params[paramSearch] = {};
        searchData.map(function (searchItem) {
          params[paramSearch][searchItem.field] = searchItem.value;
        });
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
        params[paramSearch] = {};
        searchData.map(function (searchItem) {
          params[paramSearch][searchItem.field] = searchItem.value;
        });
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
     * @deprecated
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
     * @deprecated getRecordsData
     */
    getData: function getData() {
      return this.getRecordsData();
    },
    /**
     * Получение данных из существующих записей
     * @return {Array}
     */
    getRecordsData: function getRecordsData() {
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
      var table = this;
      this._countColumnsShow = 0;
      this._columns.map(function (column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string') {
          var isShow = columns.indexOf(options.field) >= 0;
          if (column.isShow() !== isShow) {
            column.setShow(isShow);
            isChange = true;
          }
        }
        if (column.isShow()) {
          table._countColumnsShow++;
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
      var table = this;
      this._countColumnsShow = 0;
      this._columns.map(function (column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string' && columns.indexOf(options.field) >= 0 && !column.isShow()) {
          column.setShow(true);
          isChange = true;
        }
        if (column.isShow()) {
          table._countColumnsShow++;
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
      var table = this;
      this._countColumnsShow = 0;
      this._columns.map(function (column) {
        var options = column.getOptions();
        if (options.hasOwnProperty('field') && typeof options.field === 'string' && columns.indexOf(options.field) >= 0 && column.isShow()) {
          column.setShow(false);
          isChange = true;
        }
        if (column.isShow()) {
          table._countColumnsShow++;
        }
      });
      if (isChange) {
        coreuiTablePrivate._trigger(this, 'columns_change');
        this.refresh();
      }
    },
    /**
     * Получение поисковых данных
     * @property {boolean} extOptions
     * @return {*[]}
     */
    getSearchData: function getSearchData(extOptions) {
      var searchData = [];
      this._search.map(function (control) {
        var field = control.getField();
        if (field) {
          var value = control.getValue();
          if (value !== null) {
            var search = {
              field: field,
              value: value
            };
            if (extOptions) {
              search.filter = typeof control.filter === 'function' ? control.filter : null;
              search.type = control._options.type;
            }
            searchData.push(search);
          }
        }
      });
      return searchData;
    },
    /**
     * Получение данных из фильтров
     * @property {boolean} extOptions
     * @return {*[]}
     */
    getFilterData: function getFilterData(extOptions) {
      var filterData = [];
      this._filters.map(function (control) {
        var field = control.getField();
        if (field) {
          var value = control.getValue();
          if (value !== null) {
            var filter = {
              field: field,
              value: value
            };
            if (extOptions) {
              filter.filter = typeof control.filter === 'function' ? control.filter : null;
            }
            filterData.push(filter);
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
      this._page = 1;
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
     * Получение записи по полю и его значению
     * @param {string}        field
     * @param {string|number} value
     * @return {object|null}
     */
    getRecordByField: function getRecordByField(field, value) {
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
            if (typeof column.convertToString === 'function') {
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
      this._page = 1;
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
     * Установка записей для таблицы
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
    "clear": "Clear",
    "monthNames": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    "monthNamesShort": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    "dayNames": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    "dayNamesMin": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };

  var langRu = {
    "emptyRecords": "Нет записей",
    "loading": "Загрузка...",
    "total": "Всего",
    "all": "Все",
    "complete": "Применить",
    "search": "Поиск",
    "searchAction": "Искать",
    "clear": "Очистить",
    "monthNames": ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    "monthNamesShort": ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    "dayNames": ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    "dayNamesMin": ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  };

  var Control = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    function Control(table, options) {
      _classCallCheck(this, Control);
      _defineProperty(this, "_id", null);
      _defineProperty(this, "_table", null);
      _defineProperty(this, "_options", {
        type: '',
        id: ''
      });
      this._table = table;
      this._options = $.extend(true, this._options, options);
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    }

    /**
     * Получение ID элемента управления
     * @returns {string}
     */
    return _createClass(Control, [{
      key: "getId",
      value: function getId() {
        return this._id;
      }

      /**
       * Получение параметров
       * @returns {object}
       */
    }, {
      key: "getOptions",
      value: function getOptions() {
        return $.extend(true, {}, this._options);
      }

      /**
       * Формирование контента для размещения на странице
       * @returns {*}
       */
    }, {
      key: "render",
      value: function render() {
        return '';
      }
    }]);
  }();

  function _callSuper$S(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlLink = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlLink(table, options) {
      _classCallCheck(this, ControlLink);
      options = $.extend(true, {
        id: null,
        type: 'link',
        url: null,
        content: null,
        onClick: null,
        attr: null
      }, options);
      return _callSuper$S(this, ControlLink, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlLink, _Control);
    return _createClass(ControlLink, [{
      key: "render",
      value: function render() {
        var that = this;
        var attributes = [];
        if (_typeof(this._options.attr) === 'object') {
          $.each(this._options.attr, function (name, value) {
            if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
              attributes.push(name + '="' + value + '"');
            }
          });
        }
        var link = $(coreuiTableUtils.render(tpl['controls/link.html'], {
          url: this._options.url,
          content: this._options.content,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
          link.click(function (event) {
            if (typeof that._options.onClick === 'function') {
              return that._options.onClick(event, that._table);
            } else if (typeof that._options.onClick === 'string') {
              var func = new Function('event', 'table', 'control', that._options.onClick);
              func(event, that._table, that);
            }
          });
        }
        return link;
      }
    }]);
  }(Control);

  function _callSuper$R(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlButton = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlButton(table, options) {
      _classCallCheck(this, ControlButton);
      options = $.extend(true, {
        id: null,
        type: 'button',
        content: null,
        onClick: null,
        attr: {
          "class": 'btn btn-secondary'
        }
      }, options);
      return _callSuper$R(this, ControlButton, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlButton, _Control);
    return _createClass(ControlButton, [{
      key: "render",
      value: function render() {
        var attributes = [];
        if (coreuiTableUtils.isObject(this._options.attr)) {
          $.each(this._options.attr, function (name, value) {
            if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
              attributes.push(name + '="' + value + '"');
            }
          });
        }
        var btn = $(coreuiTableUtils.render(tpl['controls/button.html'], {
          content: this._options.content,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        if (typeof this._options.onClick === 'function' || typeof this._options.onClick === 'string') {
          var that = this;
          btn.click(function (event) {
            if (typeof that._options.onClick === 'function') {
              that._options.onClick(event, that._table, that);
            } else if (typeof that._options.onClick === 'string') {
              var func = new Function('event', 'table', 'control', that._options.onClick);
              func(event, that._table, that);
            }
          });
        }
        return btn;
      }
    }]);
  }(Control);

  function _callSuper$Q(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlDropdown = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlDropdown(table, options) {
      _classCallCheck(this, ControlDropdown);
      options = $.extend(true, {
        id: null,
        type: 'dropdown',
        content: null,
        items: null,
        attr: {
          "class": 'btn btn-secondary'
        }
      }, options);
      return _callSuper$Q(this, ControlDropdown, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    _inherits(ControlDropdown, _Control);
    return _createClass(ControlDropdown, [{
      key: "render",
      value: function render() {
        var options = this.getOptions();
        var table = this._table;
        var that = this;
        var items = [];
        var attributes = [];
        if (Array.isArray(options.items)) {
          options.items.map(function (item) {
            if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
              if (item.type === 'link') {
                if (item.hasOwnProperty('url') && item.hasOwnProperty('content') && typeof item.url === 'string' && typeof item.content === 'string') {
                  var link = coreuiTableUtils.render(tpl['controls/dropdown/link.html'], {
                    url: item.url,
                    content: item.content
                  });
                  items.push(link);
                }
              } else if (item.type === 'button') {
                if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
                  var button = $(coreuiTableUtils.render(tpl['controls/dropdown/button.html'], {
                    url: item.url,
                    content: item.content
                  }));
                  button.click(function (event) {
                    if (typeof item.onClick === 'function') {
                      item.onClick(event, table, that);
                    } else if (typeof item.onClick === 'string') {
                      var func = new Function('event', 'table', 'control', item.onClick);
                      func(event, table, that);
                    }
                  });
                  items.push(button);
                }
              } else if (item.type === 'divider') {
                items.push(tpl['controls/dropdown/divider.html']);
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
        var dropdown = $(coreuiTableUtils.render(tpl['controls/dropdown.html'], {
          content: options.content,
          position: options.hasOwnProperty('position') && typeof options.position === 'string' ? options.position : 'end',
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        if (items.length > 0) {
          var menu = dropdown.find('.dropdown-menu');
          items.map(function (item) {
            menu.append(item);
          });
        }
        return dropdown;
      }
    }]);
  }(Control);

  function _callSuper$P(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlButtonGroup = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlButtonGroup(table, options) {
      var _this2;
      _classCallCheck(this, ControlButtonGroup);
      options = $.extend(true, {
        id: null,
        type: 'button_group',
        buttons: null
      }, options);
      _this2 = _callSuper$P(this, ControlButtonGroup, [table, options]);
      _defineProperty(_this2, "_link", {
        attr: {
          "class": 'btn btn-secondary'
        }
      });
      _defineProperty(_this2, "_button", {
        attr: {
          "class": 'btn btn-secondary'
        }
      });
      _defineProperty(_this2, "_dropdown", {
        attr: {
          "class": 'btn btn-secondary'
        }
      });
      return _this2;
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    _inherits(ControlButtonGroup, _Control);
    return _createClass(ControlButtonGroup, [{
      key: "render",
      value: function render() {
        var options = this.getOptions();
        var buttons = [];
        var that = this;
        if (Array.isArray(options.buttons)) {
          /**
           * Создание ссылки
           * @param {Object} link
           */
          var makeLink = function makeLink(link) {
            var result = null;
            if (link.hasOwnProperty('url') && link.hasOwnProperty('content') && typeof link.url === 'string' && typeof link.content === 'string') {
              var attributes = [];
              if (!coreuiTableUtils.isObject(link.attr)) {
                link.attr = {};
              }
              if (link.attr.hasOwnProperty('href')) {
                delete link.attr.href;
              }
              if (!link.attr.hasOwnProperty('class')) {
                link.attr["class"] = that._link.attr["class"];
              }
              $.each(link.attr, function (name, value) {
                if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                  attributes.push(name + '="' + value + '"');
                }
              });
              result = coreuiTableUtils.render(tpl['controls/button_group/link.html'], {
                url: link.url,
                attr: attributes,
                content: link.content
              });
            }
            return result;
          };
          /**
           * Создание кнопки
           * @param {Object} button
           */
          var makeButton = function makeButton(button) {
            var result = null;
            if (button.hasOwnProperty('content') && button.hasOwnProperty('onClick') && typeof button.content === 'string' && ['string', 'function'].indexOf(_typeof(button.onClick)) >= 0) {
              var attributes = [];
              if (!coreuiTableUtils.isObject(button.attr)) {
                button.attr = {};
              }
              if (button.attr.hasOwnProperty('type')) {
                delete button.attr.type;
              }
              if (!button.attr.hasOwnProperty('class')) {
                button.attr["class"] = that._button.attr["class"];
              }
              $.each(button.attr, function (name, value) {
                if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                  attributes.push(name + '="' + value + '"');
                }
              });
              result = $(coreuiTableUtils.render(tpl['controls/button_group/button.html'], {
                content: button.content,
                attr: attributes
              }));
              if (button.hasOwnProperty('content') && button.hasOwnProperty('onClick') && ['string', 'function'].indexOf(_typeof(button.onClick)) >= 0 && typeof button.content === 'string') {
                result.click(function (event) {
                  if (typeof button.onClick === 'function') {
                    button.onClick(event, that._table, that);
                  } else if (typeof button.onClick === 'string') {
                    var func = new Function('event', 'table', 'control', button.onClick);
                    func(event, that._table, that);
                  }
                });
              }
            }
            return result;
          };
          /**
           * Создание выпадающего меню
           * @param {Object} button
           */
          var makeDropdown = function makeDropdown(button) {
            var result = null;
            if (Array.isArray(button.items)) {
              var attributes = [];
              var items = [];
              button.items.map(function (item) {
                if (coreuiTableUtils.isObject(item) && typeof item.type === 'string') {
                  if (item.type === 'link') {
                    if (item.hasOwnProperty('url') && item.hasOwnProperty('content') && typeof item.url === 'string' && typeof item.content === 'string' && item.url) {
                      items.push(coreuiTableUtils.render(tpl['controls/button_group/dropdown/link.html'], {
                        url: item.url,
                        content: item.content
                      }));
                    }
                  } else if (item.type === 'button') {
                    if (item.hasOwnProperty('content') && item.hasOwnProperty('onClick') && typeof item.content === 'string' && ['string', 'function'].indexOf(_typeof(item.onClick)) >= 0) {
                      var btn = $(coreuiTableUtils.render(tpl['controls/button_group/dropdown/button.html'], {
                        content: item.content
                      }));
                      btn.click(function (event) {
                        if (typeof item.onClick === 'function') {
                          item.onClick(event, that._table, that);
                        } else if (typeof item.onClick === 'string') {
                          var func = new Function('event', 'table', 'control', item.onClick);
                          func(event, that._table, that);
                        }
                      });
                      items.push(btn);
                    }
                  } else if (item.type === 'divider') {
                    items.push(tpl['controls/button_group/dropdown/divider.html']);
                  }
                }
              });
              if (!coreuiTableUtils.isObject(button.attr)) {
                button.attr = {};
              }
              if (button.attr.hasOwnProperty('type')) {
                delete button.attr.type;
              }
              if (!button.attr.hasOwnProperty('class')) {
                button.attr["class"] = that._dropdown.attr["class"];
              }
              if (button.attr.hasOwnProperty('class') && ['string', 'number'].indexOf(_typeof(button.attr["class"])) >= 0) {
                button.attr["class"] += ' dropdown-toggle';
              }
              $.each(button.attr, function (name, value) {
                if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                  attributes.push(name + '="' + value + '"');
                }
              });
              result = $(coreuiTableUtils.render(tpl['controls/button_group/link.html'], {
                attr: attributes,
                position: button.hasOwnProperty('position') && typeof button.position === 'string' ? button.position : 'end',
                content: button.content
              }));
              if (items.length > 0) {
                var menu = result.find('.dropdown-menu');
                items.map(function (item) {
                  menu.append(item);
                });
              }
            }
            return result;
          };
          options.buttons.map(function (key, button) {
            if (coreuiTableUtils.isObject(button) && typeof button.type === 'string') {
              if (button.type === 'link') {
                var linkElement = makeLink(button);
                if (linkElement) {
                  buttons.push(linkElement);
                }
              } else if (button.type === 'button') {
                var buttonElement = makeButton(button);
                if (buttonElement) {
                  buttons.push(buttonElement);
                }
              } else if (button.type === 'dropdown') {
                var dropdownElement = makeDropdown(button);
                if (dropdownElement) {
                  buttons.push(dropdownElement);
                }
              }
            }
          });
        }
        var btnGroup = $(tpl['controls/button_group.html']);
        buttons.map(function (button) {
          btnGroup.append(button);
        });
        return btnGroup;
      }
    }]);
  }(Control);

  function _callSuper$O(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlCustom = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlCustom(table, options) {
      _classCallCheck(this, ControlCustom);
      options = $.extend(true, {
        id: null,
        type: 'custom',
        content: null
      }, options);
      return _callSuper$O(this, ControlCustom, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {string|HTMLElement|jQuery}
     */
    _inherits(ControlCustom, _Control);
    return _createClass(ControlCustom, [{
      key: "render",
      value: function render() {
        if (typeof this._options.content === 'string') {
          return this._options.content;
        } else if (typeof this._options.content === 'function') {
          return this._options.content();
        }
      }
    }]);
  }(Control);

  function _callSuper$N(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlPageSize = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlPageSize(table, options) {
      var _this2;
      _classCallCheck(this, ControlPageSize);
      var optionsOriginal = {
        id: null,
        type: 'page_size',
        attr: {
          "class": 'form-select'
        },
        list: [25, 50, 100, 1000]
      };
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(optionsOriginal.attr, options.attr);
      }
      options = $.extend(true, optionsOriginal, options);
      _this2 = _callSuper$N(this, ControlPageSize, [table, options]);
      if (!Array.isArray(_this2._options.list)) {
        _this2._options.list = [];
      }
      if (_this2._options.list.indexOf(_this2._table._recordsPerPage) < 0) {
        _this2._options.list.unshift(_this2._table._recordsPerPage);
      }
      return _this2;
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlPageSize, _Control);
    return _createClass(ControlPageSize, [{
      key: "render",
      value: function render() {
        var attributes = [];
        var table = this._table;
        if (coreuiTableUtils.isObject(this._options.attr)) {
          $.each(this._options.attr, function (name, value) {
            if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
              attributes.push(name + '="' + value + '"');
            }
          });
        }
        var control = $(coreuiTableUtils.render(tpl['controls/page-size.html'], {
          recordsPerPageList: this._options.list,
          recordsPerPage: table._recordsPerPage,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          lang: table.getLang()
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
    }]);
  }(Control);

  function _callSuper$M(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlPageJump = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlPageJump(table, options) {
      _classCallCheck(this, ControlPageJump);
      var optionsOriginal = {
        id: null,
        type: 'page_jump',
        attr: {
          "class": 'input-group'
        }
      };
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(optionsOriginal.attr, options.attr);
      }
      options = $.extend(true, optionsOriginal, options);
      return _callSuper$M(this, ControlPageJump, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlPageJump, _Control);
    return _createClass(ControlPageJump, [{
      key: "render",
      value: function render() {
        var attributes = [];
        var table = this._table;
        if (coreuiTableUtils.isObject(this._options.attr)) {
          $.each(this._options.attr, function (name, value) {
            if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
              attributes.push(name + '="' + value + '"');
            }
          });
        }
        var control = $(coreuiTableUtils.render(tpl['controls/page-jump.html'], {
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        var input = $('input', control);
        var button = $('button', control);
        button.click(function () {
          table.goPage(input.val());
        });
        input.keyup(function (event) {
          if (event.key === 'Enter' || event.keyCode === 13) {
            table.goPage(input.val());
          }
        });
        return control;
      }
    }]);
  }(Control);

  var controlPages = {
    /**
     * Формирование контрола
     * @param {coreuiTableInstance} table
     * @param {object}              options
     * @return {jQuery}
     */
    render: function render(table, options) {
      var attributes = [];
      var showPrev = !!options.show.prev;
      var showNext = !!options.show.next;
      var showDividerStart = false;
      var showDividerEnd = false;
      var showPageFirst = false;
      var showPageLast = false;
      var pages = [];
      var pagesTotal = table._recordsTotal > 0 && table._recordsPerPage > 0 ? Math.ceil(table._recordsTotal / table._recordsPerPage) : 1;
      if (coreuiTableUtils.isObject(options.attr)) {
        $.each(options.attr, function (name, value) {
          if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
            attributes.push(name + '="' + value + '"');
          }
        });
      }
      if (table._recordsTotal > 0 && options.count > 0 && coreuiTableUtils.isNumeric(options.count)) {
        var count = Math.min(options.count, pagesTotal);
        var countHalf = Math.max(0, Math.floor(count / 2));
        if (count % 2 === 0) {
          countHalf -= 1;
        }
        var start = table._page > 1 ? Math.max(1, table._page - countHalf) : table._page;
        if (start + count > pagesTotal) {
          start = pagesTotal - (count - 1);
        }
        for (var i = 0; i < count; i++) {
          pages.push(start + i);
        }
      } else {
        if (options.count > 0 && table._page > 1) {
          pages.push(table._page);
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
      var control = $(coreuiTableUtils.render(tpl['controls/pages.html'], {
        currentPage: table._page,
        isActivePrev: table._page > 1,
        isActiveNext: table._page < pagesTotal,
        pagesTotal: pagesTotal,
        showPrev: showPrev,
        showPageFirst: showPageFirst,
        showDividerStart: showDividerStart,
        pages: pages,
        showDividerEnd: showDividerEnd,
        showPageLast: showPageLast,
        showNext: showNext,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
        lang: table.getLang()
      }));
      var btnPrev = control.find('.coreui-table__page_prev');
      if (btnPrev[0]) {
        if (table._page <= 1) {
          btnPrev.addClass('disabled');
        } else {
          btnPrev.click(function () {
            if (table._page > 1) {
              table.prevPage();
            }
          });
        }
      }
      var btnNext = control.find('.coreui-table__page_next');
      if (btnNext[0]) {
        btnNext.click(function () {
          table.nextPage();
        });
      }
      var btnPages = control.find('.coreui-table__page');
      if (btnPages[0]) {
        btnPages.click(function () {
          var page = Number($.trim($(this).text()));
          if (page > 0) {
            table.goPage(page);
          }
        });
      }
      return control;
    }
  };

  function _callSuper$L(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlPages = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlPages(table, options) {
      var _this2;
      _classCallCheck(this, ControlPages);
      var optionsOriginal = {
        show: {
          prev: true,
          next: true
        },
        count: 3,
        attr: {
          "class": 'pagination mb-0'
        }
      };
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(optionsOriginal.attr, options.attr);
      }
      options = $.extend(true, optionsOriginal, options);
      _this2 = _callSuper$L(this, ControlPages, [table, options]);
      _defineProperty(_this2, "_control", null);
      return _this2;
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlPages, _Control);
    return _createClass(ControlPages, [{
      key: "render",
      value: function render() {
        var table = this._table;
        var options = this._options;
        var control = controlPages.render(table, options);
        table.on('records_show', function () {
          var controlUpdate = controlPages.render(table, options);
          control.replaceWith(controlUpdate);
          control = controlUpdate;
        });
        this._control = control;
        return control;
      }
    }]);
  }(Control);

  function _callSuper$K(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlTotal = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlTotal(table, options) {
      _classCallCheck(this, ControlTotal);
      var optionsOriginal = {
        type: 'total',
        attr: {
          "class": 'px-1'
        }
      };
      if (options.hasOwnProperty('attr') && coreuiTableUtils.isObject(options.attr)) {
        options.attr = coreuiTableUtils.mergeAttr(optionsOriginal.attr, options.attr);
      }
      options = $.extend(true, optionsOriginal, options);
      return _callSuper$K(this, ControlTotal, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    _inherits(ControlTotal, _Control);
    return _createClass(ControlTotal, [{
      key: "render",
      value: function render() {
        var attributes = [];
        var table = this._table;
        if (coreuiTableUtils.isObject(this._options.attr)) {
          $.each(this._options.attr, function (name, value) {
            if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
              attributes.push(name + '="' + value + '"');
            }
          });
        }
        var control = $(coreuiTableUtils.render(tpl['controls/total.html'], {
          recordsTotal: table._recordsTotal,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          lang: table.getLang()
        }));
        table.on('records_show', function () {
          control.find('.coreui-table__count-total').text(table._recordsTotal);
        });
        return control;
      }
    }]);
  }(Control);

  function _callSuper$J(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlSearch = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlSearch(table, options) {
      var _this2;
      _classCallCheck(this, ControlSearch);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$J(this, ControlSearch, [table, options]);
      if (!coreuiTableUtils.isObject(_this2._options.btn)) {
        _this2._options.btn = {};
      }
      if (!_this2._options.btn.hasOwnProperty('content') || typeof _this2._options.btn.content !== 'string') {
        _this2._options.btn.content = '<i class="bi bi-search"></i> ' + table.getLang().search;
      }
      if (!coreuiTableUtils.isObject(_this2._options.btnClear)) {
        _this2._options.btnClear = {};
      }
      if (!_this2._options.btnClear.hasOwnProperty('content') || typeof _this2._options.btnClear.content !== 'string') {
        _this2._options.btnClear.content = table.getLang().clear;
      }
      if (!coreuiTableUtils.isObject(_this2._options.btnComplete)) {
        _this2._options.btnComplete = {};
      }
      if (!_this2._options.btnComplete.hasOwnProperty('content') || typeof _this2._options.btnComplete.content !== 'string') {
        _this2._options.btnComplete.content = table.getLang().searchAction;
      }
      return _this2;
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlSearch, _Control);
    return _createClass(ControlSearch, [{
      key: "render",
      value: function render() {
        var btnAttr = [];
        var btnContent = '';
        var btnClear = '';
        var that = this;
        var table = this._table;
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
        var control = $(coreuiTableUtils.render(tpl['controls/search.html'], {
          btnContent: btnContent,
          btnAttr: btnAttr.length > 0 ? ' ' + btnAttr.join(' ') : '',
          btnClear: btnClear
        }));
        var buttonToggle = control.find('.btn-search-toggle');
        var buttonClear = control.find('.btn-clear');
        buttonToggle.click(function () {
          var container = coreuiTableElements.getSearchContainer(table.getId());
          var columnsContainer = coreuiTableElements.getColumnsContainer(table.getId());
          if (columnsContainer[0]) {
            columnsContainer.hide();
          }
          if (container[0]) {
            container.fadeToggle('fast');
          } else {
            var controls = [];
            var btnCompleteAttr = [];
            var btnCompleteContent = '';
            var tableOptions = table.getOptions();
            var labelWidth = tableOptions.search.hasOwnProperty('labelWidth') && tableOptions.search.labelWidth ? tableOptions.search.labelWidth : 160;
            table._search.map(function (searchControl) {
              var options = searchControl.getOptions();
              if (options.hasOwnProperty('field') && typeof options.field === 'string' && options.field) {
                var descriptionLabel = options.hasOwnProperty('descriptionLabel') && options.descriptionLabel ? options.descriptionLabel : null;
                var controlContainer = $(coreuiTableUtils.render(tpl['controls/search/control.html'], {
                  labelWidth: labelWidth + (typeof labelWidth === 'number' ? 'px' : ''),
                  descriptionLabel: descriptionLabel,
                  label: options.hasOwnProperty('label') && typeof options.label === 'string' ? options.label : '',
                  description: options.hasOwnProperty('description') && typeof options.description === 'string' ? options.description : '',
                  suffix: options.hasOwnProperty('suffix') && typeof options.suffix === 'string' ? options.suffix : ''
                }));
                controlContainer.find('.coreui-table__search-control_content').prepend(searchControl.render());
                controls.push(controlContainer);
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
                if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                  btnCompleteAttr.push(name + '="' + value + '"');
                }
              });
            }
            if (typeof that._options.btnComplete.content === 'string') {
              btnCompleteContent = that._options.btnComplete.content;
            }
            var searchContainer = $(coreuiTableUtils.render(tpl['controls/search/container.html'], {
              labelWidth: labelWidth + (typeof labelWidth === 'number' ? 'px' : ''),
              btnCompleteAttr: btnCompleteAttr.length > 0 ? ' ' + btnCompleteAttr.join(' ') : '',
              btnCompleteContent: btnCompleteContent
            }));
            $('.btn-complete', searchContainer).click(function () {
              table.searchRecords();
              var container = coreuiTableElements.getSearchContainer(table.getId());
              if (container[0]) {
                container.fadeOut(200);
              }
            });
            if (controls.length > 0) {
              var searchControls = searchContainer.find('.coreui-table__search_controls');
              controls.map(function (control) {
                searchControls.append(control);
              });
            }
            var wrapper = coreuiTableElements.getWrapper(table.getId());
            wrapper.before(searchContainer);
          }
        });
        buttonClear.click(function () {
          table.clearSearch();
          var container = coreuiTableElements.getSearchContainer(table.getId());
          if (container[0]) {
            container.fadeOut('fast');
          }
          buttonClear.remove();
        });
        table.on('search_change', function (searchData) {
          var buttonClear = $('button.btn-clear', control);
          if (searchData.length > 0) {
            if (!buttonClear[0]) {
              var _btnClear = $(that._renderBtnClear());
              _btnClear.click(function () {
                table.clearSearch();
                var container = coreuiTableElements.getSearchContainer(table.getId());
                if (container[0]) {
                  container.fadeOut('fast');
                }
                _btnClear.remove();
              });
              _btnClear.insertAfter(buttonToggle);
            }
          } else {
            buttonClear.remove();
            var container = coreuiTableElements.getSearchContainer(table.getId());
            if (container[0]) {
              container.fadeOut('fast');
            }
          }
        });
        return control;
      }

      /**
       * Рендер кнопки отмены
       * @private
       */
    }, {
      key: "_renderBtnClear",
      value: function _renderBtnClear() {
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
        return coreuiTableUtils.render(tpl['controls/search/clear.html'], {
          content: content,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        });
      }
    }]);
  }(Control);

  function _callSuper$I(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlColumns = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlColumns(table, options) {
      var _this2;
      _classCallCheck(this, ControlColumns);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$I(this, ControlColumns, [table, options]);
      if (!coreuiTableUtils.isObject(_this2._options.btn)) {
        _this2._options.btn = {};
      }
      if (!coreuiTableUtils.isObject(_this2._options.btnComplete)) {
        _this2._options.btnComplete = {};
      }
      if (coreuiTableUtils.isObject(_this2._options.btnComplete) && typeof _this2._options.btnComplete.content !== 'string') {
        _this2._options.btnComplete.content = table.getLang().complete;
      }
      return _this2;
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {jQuery}
     */
    _inherits(ControlColumns, _Control);
    return _createClass(ControlColumns, [{
      key: "render",
      value: function render() {
        var that = this;
        var table = this._table;
        var attributes = [];
        if (coreuiTableUtils.isObject(this._options.btn.attr)) {
          $.each(this._options.btn.attr, function (name, value) {
            if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
              attributes.push(name + '="' + value + '"');
            }
          });
        }
        var btn = $(coreuiTableUtils.render(tpl['controls/columns.html'], {
          btnContent: this._options.btn.content,
          btnAttr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        btn.click(function () {
          var container = coreuiTableElements.getColumnsContainer(table.getId());
          var containerSearch = coreuiTableElements.getSearchContainer(table.getId());
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
            var wrapper = coreuiTableElements.getWrapper(table.getId());
            table._columns.map(function (column) {
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
            var options = that.getOptions();
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
                if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
                  btnCompleteAttr.push(name + '="' + value + '"');
                }
              });
            }
            if (typeof options.btnComplete.content === 'string') {
              btnCompleteContent = options.btnComplete.content;
            }
            var containerList = $(coreuiTableUtils.render(tpl['controls/columns/list.html'], {
              showAll: showAll,
              columns: columns,
              btnCompleteAttr: btnCompleteAttr.length > 0 ? ' ' + btnCompleteAttr.join(' ') : '',
              btnCompleteContent: btnCompleteContent,
              lang: table.getLang()
            }));
            $('.coreui-table__check_all input', containerList).change(function () {
              $('.coreui-table_check-column input', containerList).prop('checked', $(this).is(":checked"));
            });
            $('.btn-complete', containerList).click(function () {
              var columns = [];
              $('.coreui-table_check-column input:checked', containerList).each(function (key, input) {
                columns.push($(input).val());
              });
              table.setColumnsShow(columns);
              containerList.fadeOut('fast');
            });
            wrapper.before(containerList);
          }
        });
        return btn;
      }
    }]);
  }(Control);

  function _callSuper$H(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlCaption = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlCaption(table, options) {
      _classCallCheck(this, ControlCaption);
      options = $.extend(true, {
        id: null,
        type: 'caption',
        title: null,
        description: null,
        value: null
      }, options);
      return _callSuper$H(this, ControlCaption, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    _inherits(ControlCaption, _Control);
    return _createClass(ControlCaption, [{
      key: "render",
      value: function render() {
        return coreuiTableUtils.render(tpl['controls/caption.html'], {
          title: this._options.title,
          description: this._options.description,
          value: this._options.value
        });
      }
    }]);
  }(Control);

  function _callSuper$G(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlFilterClear = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlFilterClear(table, options) {
      var _this2;
      _classCallCheck(this, ControlFilterClear);
      options = $.extend(true, {
        id: null,
        type: 'filter_clear',
        content: null,
        attr: {
          "class": 'btn btn-secondary'
        }
      }, options);
      _this2 = _callSuper$G(this, ControlFilterClear, [table, options]);
      if (!_this2._options.hasOwnProperty('content') || typeof _this2._options.content !== 'string') {
        _this2._options.content = '<i class="bi bi-x"></i> ' + table.getLang().clear;
      }
      return _this2;
    }

    /**
     * Формирование контента
     * @returns {string}
     */
    _inherits(ControlFilterClear, _Control);
    return _createClass(ControlFilterClear, [{
      key: "render",
      value: function render() {
        var options = this.getOptions();
        var table = this._table;
        if (!coreuiTableUtils.isObject(options.attr)) {
          options.attr = {};
        }
        if (options.attr.hasOwnProperty('type')) {
          delete options.attr.type;
        }
        var filterData = table.getFilterData();
        if (filterData.length === 0) {
          if (options.attr.hasOwnProperty('style') && typeof options.attr.style === 'string') {
            options.attr.style += ';display:none;';
          } else {
            options.attr.style = "display:none";
          }
        }
        var attr = [];
        $.each(options.attr, function (name, value) {
          if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
            attr.push(name + '="' + value + '"');
          }
        });
        var button = $(coreuiTableUtils.render(tpl['controls/filter_clear.html'], {
          attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
          content: options.content ? options.content : ''
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
    }]);
  }(Control);

  function _callSuper$F(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ControlDivider = /*#__PURE__*/function (_Control) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ControlDivider(table, options) {
      _classCallCheck(this, ControlDivider);
      options = $.extend(true, {
        type: 'divider',
        width: 40,
        text: '',
        attr: {
          "class": 'd-inline-block text-body-tertiary text-center',
          style: 'height:20px'
        }
      }, options);
      return _callSuper$F(this, ControlDivider, [table, options]);
    }

    /**
     * Формирование контента для размещения на странице
     * @returns {string}
     */
    _inherits(ControlDivider, _Control);
    return _createClass(ControlDivider, [{
      key: "render",
      value: function render() {
        var attributes = [];
        this._options.attr = coreuiTableUtils.mergeAttr(this._options.attr, {
          style: 'width:' + this._options.width + 'px'
        });
        $.each(this._options.attr, function (name, value) {
          if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
            attributes.push(name + '="' + value + '"');
          }
        });
        return coreuiTableUtils.render(tpl['controls/divider.html'], {
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          text: typeof this._options.text === 'string' && this._options.text !== '' ? this._options.text : ''
        });
      }
    }]);
  }(Control);

  var Filter = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    function Filter(table, options) {
      _classCallCheck(this, Filter);
      _defineProperty(this, "_id", null);
      _defineProperty(this, "_table", null);
      _defineProperty(this, "_value", null);
      _defineProperty(this, "_control", null);
      _defineProperty(this, "_options", {
        id: '',
        type: '',
        field: null
      });
      this._table = table;
      this._options = $.extend(true, this._options, options);
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    }

    /**
     * Получение параметров
     * @returns {object}
     */
    return _createClass(Filter, [{
      key: "getOptions",
      value: function getOptions() {
        return $.extend(true, {}, this._options);
      }

      /**
       * Получение id
       * @returns {string}
       */
    }, {
      key: "getId",
      value: function getId() {
        return this._id;
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {string} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase().indexOf(searchValue.toString().toLowerCase()) >= 0;
      }

      /**
       * Установка значения
       * @param {string} value
       */
    }, {
      key: "setValue",
      value: function setValue(value) {}

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {}

      /**
       * Получение название поля
       * @returns {string|null}
       */
    }, {
      key: "getField",
      value: function getField() {
        return this._options.field;
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {}
    }]);
  }();

  function _callSuper$E(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterText = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterText(table, options) {
      var _this2;
      _classCallCheck(this, FilterText);
      options = $.extend(true, {
        id: null,
        type: 'text',
        field: null,
        label: null,
        value: null,
        width: 200,
        autoSearch: null,
        attr: {
          "class": "form-control"
        },
        btn: {
          attr: {
            "class": "btn btn-outline-secondary border-secondary-subtle"
          },
          content: '<i class="bi bi-search"></i>'
        }
      }, options);
      _this2 = _callSuper$E(this, FilterText, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|number|null} value
     */
    _inherits(FilterText, _Filter);
    return _createClass(FilterText, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = $('input', this._control).val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        var table = this._table;
        $.each(options.attr, function (name, value) {
          attr.push(name + '="' + value + '"');
        });
        $.each(options.btn.attr, function (name, value) {
          attrBtn.push(name + '="' + value + '"');
        });
        this._control = $(coreuiTableUtils.render(tpl['filters/text.html'], {
          attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
          label: label,
          btnAttr: attrBtn.length > 0 ? ' ' + attrBtn.join(' ') : '',
          btnContent: options.btn.content ? options.btn.content : ''
        }));
        $('input', this._control).keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
          } else if (typeof options.autoSearch === 'boolean' && options.autoSearch) {
            table.searchRecords();
          }
        });
        $('button', this._control).click(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$D(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterNumber = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterNumber(table, options) {
      var _this2;
      _classCallCheck(this, FilterNumber);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$D(this, FilterNumber, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {object|null} value
     */
    _inherits(FilterNumber, _Filter);
    return _createClass(FilterNumber, [{
      key: "setValue",
      value: function setValue(value) {
        if (value) {
          if (!coreuiTableUtils.isObject(value)) {
            return;
          }
          var numberStart = null;
          var numberEnd = null;
          if (value.hasOwnProperty('start') && (typeof value.start === 'string' || typeof value.start !== 'number') && value.start !== '' && !isNaN(Number(value.start))) {
            numberStart = value.start;
          }
          if (value.hasOwnProperty('end') && (typeof value.end === 'string' || typeof value.end !== 'number') && value.end !== '' && !isNaN(Number(value.end))) {
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
        if (this._control) {
          var inputStart = this._control.parent().find('input.number-start');
          var inputEnd = this._control.parent().find('input.number-end');
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }

      /**
       * Получение значения
       * @returns {string}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputStart = this._control.parent().find('input.number-start');
          var inputEnd = this._control.parent().find('input.number-end');
          if (inputStart[0] && inputEnd[0]) {
            var valueStart = inputStart.val();
            var valueEnd = inputEnd.val();
            if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
              return {
                start: valueStart !== '' && !isNaN(Number(valueStart)) ? Number(valueStart) : null,
                end: valueEnd !== '' && !isNaN(Number(valueEnd)) ? Number(valueEnd) : null
              };
            }
          }
          return null;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !coreuiTableUtils.isObject(searchValue) || ['string', 'number'].indexOf(_typeof(searchValue.start)) < 0 && ['string', 'number'].indexOf(_typeof(searchValue.end)) < 0) {
          return false;
        }
        var issetStart = ['string', 'number'].indexOf(_typeof(searchValue.start)) >= 0;
        var issetEnd = ['string', 'number'].indexOf(_typeof(searchValue.end)) >= 0;
        if (issetStart && issetEnd) {
          return fieldValue >= searchValue.start && fieldValue <= searchValue.end;
        } else if (issetStart) {
          return fieldValue >= searchValue.start;
        } else {
          return fieldValue <= searchValue.end;
        }
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        var table = this._table;
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
        this._control = $(coreuiTableUtils.render(tpl['filters/number.html'], {
          attrStart: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
          attrEnd: endAttr.length > 0 ? ' ' + endAttr.join(' ') : '',
          label: label,
          btnAttr: attrBtn.length > 0 ? ' ' + attrBtn.join(' ') : '',
          btnContent: options.btn.content ? options.btn.content : ''
        }));
        $('input.number-start, input.number-end', this._control).keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
          }
        });
        $('button', this._control).click(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$C(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterDate = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterDate(table, options) {
      var _this2;
      _classCallCheck(this, FilterDate);
      options = $.extend(true, {
        id: null,
        type: 'date',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control"
        }
      }, options);
      _this2 = _callSuper$C(this, FilterDate, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string} value
     */
    _inherits(FilterDate, _Filter);
    return _createClass(FilterDate, [{
      key: "setValue",
      value: function setValue(value) {
        if (typeof value !== 'string' && value !== null) {
          return;
        }
        if (value && (value.match(/^\d{4}\-\d{2}\-\d{2}$/) === null || isNaN(new Date(value)))) {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = $('input', this._control).val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().indexOf(searchValue.toString()) === 0;
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (options.attr.hasOwnProperty('type')) {
          delete options.attr.type;
        }
        var attr = [];
        var table = this._table;
        $.each(options.attr, function (name, value) {
          attr.push(name + '="' + value + '"');
        });
        this._control = $(coreuiTableUtils.render(tpl['filters/date.html'], {
          attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
          label: label
        }));
        $('input', this._control).change(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$B(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterDatetime = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterDatetime(table, options) {
      var _this2;
      _classCallCheck(this, FilterDatetime);
      options = $.extend(true, {
        id: null,
        type: 'datetime',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control"
        }
      }, options);
      _this2 = _callSuper$B(this, FilterDatetime, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|null} value
     */
    _inherits(FilterDatetime, _Filter);
    return _createClass(FilterDatetime, [{
      key: "setValue",
      value: function setValue(value) {
        if (typeof value !== 'string' && value !== null) {
          return;
        }
        if (value && (value.match(/^\d{4}\-\d{2}\-\d{2}(T| )\d{2}:\d{2}(:\d{2}|)$/) === null || isNaN(new Date(value)))) {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = $('input', this._control).val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString() === searchValue.toString();
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (options.attr.hasOwnProperty('type')) {
          delete options.attr.type;
        }
        var attr = [];
        var table = this._table;
        $.each(options.attr, function (name, value) {
          attr.push(name + '="' + value + '"');
        });
        this._control = $(coreuiTableUtils.render(tpl['filters/datetime.html'], {
          attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
          label: label
        }));
        $('input', this._control).change(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$A(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterDateMonth = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterDateMonth(table, options) {
      var _this2;
      _classCallCheck(this, FilterDateMonth);
      options = $.extend(true, {
        id: null,
        type: 'date_month',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control"
        }
      }, options);
      _this2 = _callSuper$A(this, FilterDateMonth, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|null} value
     */
    _inherits(FilterDateMonth, _Filter);
    return _createClass(FilterDateMonth, [{
      key: "setValue",
      value: function setValue(value) {
        if (typeof value !== 'string' && value !== null) {
          return;
        }
        if (value && (value.match(/^\d{4}\-\d{2}$/) === null || isNaN(new Date(value)))) {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = $('input', this._control).val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {string} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase().indexOf(searchValue.toString().toLowerCase()) === 0;
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (options.attr.hasOwnProperty('type')) {
          delete options.attr.type;
        }
        var attr = [];
        var table = this._table;
        $.each(options.attr, function (name, value) {
          attr.push(name + '="' + value + '"');
        });
        this._control = $(coreuiTableUtils.render(tpl['filters/date_month.html'], {
          attr: attr.length > 0 ? ' ' + attr.join(' ') : '',
          label: label
        }));
        $('input', this._control).change(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$z(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterDateRange = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterDateRange(table, options) {
      var _this2;
      _classCallCheck(this, FilterDateRange);
      options = $.extend(true, {
        id: null,
        type: 'date_range',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$z(this, FilterDateRange, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {object|null} value
     */
    _inherits(FilterDateRange, _Filter);
    return _createClass(FilterDateRange, [{
      key: "setValue",
      value: function setValue(value) {
        if (value) {
          if (!coreuiTableUtils.isObject(value)) {
            return;
          }
          var dateStart = null;
          var dateEnd = null;
          if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2}$/) !== null && !isNaN(new Date(value.start))) {
            dateStart = value.start;
          }
          if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2}$/) !== null && !isNaN(new Date(value.end))) {
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
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }

      /**
       * Получение значения
       * @returns {Object|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
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
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !coreuiTableUtils.isObject(searchValue) || typeof searchValue.start !== 'string' && typeof searchValue.end !== 'string') {
          return false;
        }
        var issetStart = ['string', 'number'].indexOf(_typeof(searchValue.start)) >= 0;
        var issetEnd = ['string', 'number'].indexOf(_typeof(searchValue.end)) >= 0;
        if (issetStart && issetEnd) {
          return fieldValue >= searchValue.start && fieldValue <= searchValue.end;
        } else if (issetStart) {
          return fieldValue >= searchValue.start;
        } else {
          return fieldValue <= searchValue.end;
        }
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        var table = this._table;
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
        var control = $(coreuiTableUtils.render(tpl['filters/date_range.html'], {
          label: label,
          startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
          endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
        }));
        $('input', control).change(function (e) {
          table.searchRecords();
        });
        $('input.date-start', control).change(function () {
          var dateEnd = $('input.date-end', control).attr('min', $(this).val());
          if ("showPicker" in HTMLInputElement.prototype) {
            $(dateEnd)[0].showPicker();
          }
        });
        $('input.date-end', control).change(function () {
          $('input.date-start', control).attr('max', $(this).val());
        });
        this._control = control;
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$y(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterDatetimeRange = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterDatetimeRange(table, options) {
      var _this2;
      _classCallCheck(this, FilterDatetimeRange);
      options = $.extend(true, {
        id: null,
        type: 'datetime_range',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$y(this, FilterDatetimeRange, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {object|null} value
     */
    _inherits(FilterDatetimeRange, _Filter);
    return _createClass(FilterDatetimeRange, [{
      key: "setValue",
      value: function setValue(value) {
        if (value) {
          if (!coreuiTableUtils.isObject(value)) {
            return;
          }
          var dateStart = null;
          var dateEnd = null;
          if (value.hasOwnProperty('start') && typeof value.start === 'string' && value.start.match(/^\d{4}\-\d{2}\-\d{2}(T| )\d{2}:\d{2}(:\d{2}|)$/) !== null && !isNaN(new Date(value.start))) {
            dateStart = value.start;
          }
          if (value.hasOwnProperty('end') && typeof value.end === 'string' && value.end.match(/^\d{4}\-\d{2}\-\d{2}(T| )\d{2}:\d{2}(:\d{2}|)$/) !== null && !isNaN(new Date(value.end))) {
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
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }

      /**
       * Получение значения
       * @returns {Object|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
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
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !coreuiTableUtils.isObject(searchValue) || typeof searchValue.start !== 'string' && typeof searchValue.end !== 'string') {
          return false;
        }
        var issetStart = ['string', 'number'].indexOf(_typeof(searchValue.start)) >= 0;
        var issetEnd = ['string', 'number'].indexOf(_typeof(searchValue.end)) >= 0;
        if (issetStart && issetEnd) {
          return fieldValue >= searchValue.start && fieldValue <= searchValue.end;
        } else if (issetStart) {
          return fieldValue >= searchValue.start;
        } else {
          return fieldValue <= searchValue.end;
        }
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        var table = this._table;
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
        var control = $(coreuiTableUtils.render(tpl['filters/datetime_range.html'], {
          label: label,
          startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
          endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
        }));
        $('input', control).change(function (e) {
          table.searchRecords();
        });
        $('input.date-start', control).change(function () {
          var dateEnd = $('input.date-end', control).attr('min', $(this).val());
          if ("showPicker" in HTMLInputElement.prototype) {
            $(dateEnd)[0].showPicker();
          }
        });
        $('input.date-end', control).change(function () {
          $('input.date-start', control).attr('max', $(this).val());
        });
        this._control = control;
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$x(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterCheckbox = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterCheckbox(table, options) {
      var _this2;
      _classCallCheck(this, FilterCheckbox);
      options = $.extend(true, {
        id: null,
        type: 'checkbox',
        field: null,
        label: null,
        value: null,
        options: []
      }, options);
      _this2 = _callSuper$x(this, FilterCheckbox, [table, options]);
      _defineProperty(_this2, "_class", 'btn btn-outline-secondary');
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Array|string|number|null} value
     */
    _inherits(FilterCheckbox, _Filter);
    return _createClass(FilterCheckbox, [{
      key: "setValue",
      value: function setValue(value) {
        if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
          return;
        }
        if (_typeof(value) === 'object') {
          if (Array.isArray(value)) {
            var items = [];
            value.map(function (item) {
              if (['string', 'number'].indexOf(_typeof(item)) >= 0) {
                items.push(item);
              }
            });
            this._value = items;
          } else {
            this._value = null;
          }
        } else {
          this._value = [value];
        }
        if (this._control) {
          $('input:checked', this._control).prop('checked', false);
          if (Array.isArray(this._value)) {
            var control = this._control;
            this._value.map(function (value) {
              $('input[value="' + value + '"]', control).prop('checked', true);
            });
          }
        }
      }

      /**
       * Получение значения
       * @returns {Array|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputs = $('input:checked', this._control);
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
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {Array}  searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !Array.isArray(searchValue)) {
          return false;
        }
        return searchValue.indexOf(fieldValue) >= 0;
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._control = $(coreuiTableUtils.render(tpl['filters/checkbox.html'], {
          label: label,
          items: items,
          field: field + this.getId(),
          lang: this._table.getLang()
        }));
        $('input', this._control).change(function (e) {
          that._table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$w(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterRadio = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterRadio(table, options) {
      var _this2;
      _classCallCheck(this, FilterRadio);
      options = $.extend(true, {
        id: null,
        type: 'radio',
        field: null,
        label: null,
        value: null,
        options: []
      }, options);
      _this2 = _callSuper$w(this, FilterRadio, [table, options]);
      _defineProperty(_this2, "_class", 'btn btn-outline-secondary');
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|number|null} value
     */
    _inherits(FilterRadio, _Filter);
    return _createClass(FilterRadio, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).prop('checked', false);
          if (this._value !== null) {
            $('input[value="' + this._value + '"]', this._control).prop('checked', true);
          }
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var input = $('input:checked', this._control);
          if (input && input[0]) {
            var value = input.val();
            return value === '' ? null : value;
          }
          return null;
        } else {
          return this._value;
        }
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
        var that = this;
        var table = this._table;
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
        this._control = $(coreuiTableUtils.render(tpl['filters/radio.html'], {
          label: label,
          items: items,
          field: field + this.getId(),
          lang: this._table.getLang()
        }));
        $('input', this._control).change(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  function _callSuper$v(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterSelect = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterSelect(table, options) {
      var _this2;
      _classCallCheck(this, FilterSelect);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$v(this, FilterSelect, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Array|string|number|null} value
     */
    _inherits(FilterSelect, _Filter);
    return _createClass(FilterSelect, [{
      key: "setValue",
      value: function setValue(value) {
        if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
          return;
        }
        if (_typeof(value) === 'object') {
          if (Array.isArray(value)) {
            var items = [];
            value.map(function (item) {
              if (['string', 'number'].indexOf(_typeof(item)) >= 0) {
                items.push(item);
              }
            });
            this._value = items;
          } else {
            this._value = null;
          }
        } else {
          this._value = [value];
        }
        if (this._control) {
          $('select option:selected', this._control).prop('selected', false);
          if (Array.isArray(this._value)) {
            var control = this._control;
            this._value.map(function (value) {
              $('select option[value="' + value + '"]', control).prop('selected', true);
            });
          }
        }
      }

      /**
       * Получение значения
       * @returns {Array|string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var isMultiple = !!$('select', this._control).attr('multiple');
          var options = $('select option:checked', this._control);
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
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0 && !Array.isArray(searchValue)) {
          return false;
        }
        if (Array.isArray(searchValue)) {
          return searchValue.indexOf(fieldValue) >= 0;
        } else {
          return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
        }
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
        var that = this;
        var options = this.getOptions();
        var selectOptions = [];
        var attributes = [];
        var table = this._table;
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
        this._control = $(coreuiTableUtils.render(tpl['filters/select.html'], {
          label: label,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          options: selectOptions
        }));
        $('select', this._control).change(function (e) {
          table.searchRecords();
        });
        return this._control;
      }

      /**
       * Сборка опции
       * @param option
       * @return {object}
       * @private
       */
    }, {
      key: "_buildOption",
      value: function _buildOption(option) {
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
    }]);
  }(Filter);

  function _callSuper$u(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var FilterSwitch = /*#__PURE__*/function (_Filter) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function FilterSwitch(table, options) {
      var _this2;
      _classCallCheck(this, FilterSwitch);
      options = $.extend(true, {
        id: null,
        type: 'switch',
        field: null,
        label: null,
        value: null,
        valueY: 1
      }, options);
      _this2 = _callSuper$u(this, FilterSwitch, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Фильтрация данных
     * @returns {string}              fieldValue
     * @returns {Array|string|number} searchValue
     * @returns {boolean}
     */
    _inherits(FilterSwitch, _Filter);
    return _createClass(FilterSwitch, [{
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString() === searchValue.toString();
      }

      /**
       * Установка значения
       * @param {string|number|null} value
       */
    }, {
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          var valueY = typeof this._options.valueY === 'string' || typeof this._options.valueY === 'number' ? this._options.valueY : '';
          if (this._value === null) {
            $('input', this._control).prop('checked', false);
          } else if (this._value === valueY) {
            $('input', this._control).prop('checked', true);
          } else {
            $('input', this._control).prop('checked', false);
          }
        }
      }

      /**
       * Получение значения
       * @returns {string}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = $('input:checked', this._control).val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
        var table = this._table;
        var options = this.getOptions();
        var valueY = typeof options.valueY === 'string' || typeof options.valueY === 'number' ? options.valueY : '';
        var label = typeof options.label === 'string' || typeof options.label === 'number' ? options.label : '';
        this._control = $(coreuiTableUtils.render(tpl['filters/switch.html'], {
          id: this._id,
          valueY: valueY,
          field: typeof options.field === 'string' ? options.field : '',
          checked: this._value == valueY,
          label: label
        }));
        $('input', this._control).change(function (e) {
          table.searchRecords();
        });
        return this._control;
      }
    }]);
  }(Filter);

  var Search = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param {object} table
     * @param {object} options
     */
    function Search(table, options) {
      _classCallCheck(this, Search);
      _defineProperty(this, "_id", null);
      _defineProperty(this, "_table", null);
      _defineProperty(this, "_value", null);
      _defineProperty(this, "_control", null);
      _defineProperty(this, "_options", {
        id: '',
        type: '',
        field: null,
        label: null
      });
      this._table = table;
      this._options = $.extend(true, this._options, options);
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : coreuiTableUtils.hashCode();
    }

    /**
     * Получение параметров
     * @returns {object}
     */
    return _createClass(Search, [{
      key: "getOptions",
      value: function getOptions() {
        return $.extend(true, {}, this._options);
      }

      /**
       * Получение id
       * @returns {string}
       */
    }, {
      key: "getId",
      value: function getId() {
        return this._id;
      }

      /**
       * Установка значения
       * @param {string} value
       */
    }, {
      key: "setValue",
      value: function setValue(value) {}

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {}

      /**
       * Получение название поля
       * @returns {string|null}
       */
    }, {
      key: "getField",
      value: function getField() {
        return this._options.field;
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {string} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase().indexOf(searchValue.toString().toLowerCase()) >= 0;
      }

      /**
       * Формирование контента
       * @returns {jQuery|string}
       */
    }, {
      key: "render",
      value: function render() {}
    }]);
  }();

  function _callSuper$t(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchText = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchText(table, options) {
      var _this2;
      _classCallCheck(this, SearchText);
      options = $.extend(true, {
        id: null,
        type: 'text',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$t(this, SearchText, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string} value
     */
    _inherits(SearchText, _Search);
    return _createClass(SearchText, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          this._control.val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = this._control.val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (this._options.attr.hasOwnProperty('type')) {
          delete this._options.attr.type;
        }
        var attributes = [];
        var table = this._table;
        $.each(this._options.attr, function (name, value) {
          if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
            attributes.push(name + '="' + value + '"');
          }
        });
        this._control = $(coreuiTableUtils.render(tpl['search/text.html'], {
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        $('input', this._control).keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
            var container = coreuiTableElements.getSearchContainer(table.getId());
            container.fadeOut('fast');
          }
        });
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$s(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchNumber = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchNumber(table, options) {
      var _this2;
      _classCallCheck(this, SearchNumber);
      options = $.extend(true, {
        id: null,
        type: 'number',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$s(this, SearchNumber, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Object} value
     */
    _inherits(SearchNumber, _Search);
    return _createClass(SearchNumber, [{
      key: "setValue",
      value: function setValue(value) {
        if (value) {
          if (!coreuiTableUtils.isObject(value)) {
            return;
          }
          var numberStart = null;
          var numberEnd = null;
          if (value.hasOwnProperty('start') && ['string', 'number'].indexOf(_typeof(value.start)) >= 0 && !isNaN(Number(value.start))) {
            numberStart = Number(value.start);
          }
          if (value.hasOwnProperty('end') && ['string', 'number'].indexOf(_typeof(value.end)) >= 0 && !isNaN(Number(value.end))) {
            numberEnd = Number(value.end);
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
        if (this._control) {
          var inputStart = this._control.parent().find('input.number-start');
          var inputEnd = this._control.parent().find('input.number-end');
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputStart = this._control.parent().find('input.number-start');
          var inputEnd = this._control.parent().find('input.number-end');
          if (inputStart[0] && inputEnd[0]) {
            var valueStart = inputStart.val();
            var valueEnd = inputEnd.val();
            if (typeof valueStart === 'string' && valueStart !== '' || typeof valueEnd === 'string' && valueEnd !== '') {
              return {
                start: valueStart !== '' && !isNaN(Number(valueStart)) ? Number(valueStart) : null,
                end: valueEnd !== '' && !isNaN(Number(valueEnd)) ? Number(valueEnd) : null
              };
            }
          }
          return null;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !coreuiTableUtils.isObject(searchValue) || ['string', 'number'].indexOf(_typeof(searchValue.start)) < 0 && ['string', 'number'].indexOf(_typeof(searchValue.end)) < 0) {
          return false;
        }
        var issetStart = ['string', 'number'].indexOf(_typeof(searchValue.start)) >= 0;
        var issetEnd = ['string', 'number'].indexOf(_typeof(searchValue.end)) >= 0;
        if (issetStart && issetEnd) {
          return fieldValue >= searchValue.start && fieldValue <= searchValue.end;
        } else if (issetStart) {
          return fieldValue >= searchValue.start;
        } else {
          return fieldValue <= searchValue.end;
        }
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        var table = this._table;
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
        this._control = $(coreuiTableUtils.render(tpl['search/number.html'], {
          startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
          endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
        }));
        $('input.number-start, input.number-end', this._control).keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
            var container = coreuiTableElements.getSearchContainer(table.getId());
            container.fadeOut('fast');
          }
        });
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$r(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchDate = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchDate(table, options) {
      var _this2;
      _classCallCheck(this, SearchDate);
      options = $.extend(true, {
        id: null,
        type: 'date',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$r(this, SearchDate, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string} value
     */
    _inherits(SearchDate, _Search);
    return _createClass(SearchDate, [{
      key: "setValue",
      value: function setValue(value) {
        if (typeof value !== 'string' && value !== null) {
          return;
        }
        if (value && (value.match(/^\d{4}\-\d{2}\-\d{2}$/) === null || isNaN(new Date(value)))) {
          return;
        }
        this._value = value;
        if (this._control) {
          this._control.val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = this._control.val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().indexOf(searchValue.toString()) === 0;
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (this._options.attr.hasOwnProperty('type')) {
          delete this._options.attr.type;
        }
        var attributes = [];
        var table = this._table;
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
        this._control = $(coreuiTableUtils.render(tpl['search/date.html'], {
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        this._control.keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
            var container = coreuiTableElements.getSearchContainer(table.getId());
            container.fadeOut('fast');
          }
        });
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$q(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchDateMonth = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchDateMonth(table, options) {
      var _this2;
      _classCallCheck(this, SearchDateMonth);
      options = $.extend(true, {
        id: null,
        type: 'date_month',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$q(this, SearchDateMonth, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|null} value
     */
    _inherits(SearchDateMonth, _Search);
    return _createClass(SearchDateMonth, [{
      key: "setValue",
      value: function setValue(value) {
        if (typeof value !== 'string' && value !== null) {
          return;
        }
        if (value && (value.match(/^\d{4}\-\d{2}$/) === null || isNaN(new Date(value)))) {
          return;
        }
        this._value = value;
        if (this._control) {
          this._control.val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = this._control.val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {string} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase().indexOf(searchValue.toString().toLowerCase()) === 0;
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (this._options.attr.hasOwnProperty('type')) {
          delete this._options.attr.type;
        }
        var attributes = [];
        var table = this._table;
        $.each(this._options.attr, function (name, value) {
          attributes.push(name + '="' + value + '"');
        });
        this._control = $(coreuiTableUtils.render(tpl['search/date_month.html'], {
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        this._control.keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
            var container = coreuiTableElements.getSearchContainer(table.getId());
            container.fadeOut('fast');
          }
        });
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$p(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchDatetime = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchDatetime(table, options) {
      var _this2;
      _classCallCheck(this, SearchDatetime);
      options = $.extend(true, {
        id: null,
        type: 'datetime',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$p(this, SearchDatetime, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string} value
     */
    _inherits(SearchDatetime, _Search);
    return _createClass(SearchDatetime, [{
      key: "setValue",
      value: function setValue(value) {
        if (typeof value !== 'string' && value !== null) {
          return;
        }
        if (value && (value.match(/^\d{4}\-\d{2}\-\d{2}(T| )\d{2}:\d{2}(:\d{2}|)$/) === null || isNaN(new Date(value)))) {
          return;
        }
        this._value = value;
        if (this._control) {
          this._control.val(this._value === null ? '' : this._value);
        }
      }

      /**
       * Получение значения
       * @returns {string}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = this._control.val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString() === searchValue.toString();
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._options.attr['value'] = typeof this._value === 'string' || typeof this._value === 'number' ? this._value : '';
        if (this._options.attr.hasOwnProperty('type')) {
          delete this._options.attr.type;
        }
        var attributes = [];
        var table = this._table;
        $.each(this._options.attr, function (name, value) {
          if (['string', 'number'].indexOf(_typeof(value)) >= 0) {
            attributes.push(name + '="' + value + '"');
          }
        });
        this._control = $(coreuiTableUtils.render(tpl['search/datetime.html'], {
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
        }));
        this._control.keyup(function (e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
            table.searchRecords();
            var container = coreuiTableElements.getSearchContainer(table.getId());
            container.fadeOut('fast');
          }
        });
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$o(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchDateRange = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchDateRange(table, options) {
      var _this2;
      _classCallCheck(this, SearchDateRange);
      options = $.extend(true, {
        id: null,
        type: 'date_range',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$o(this, SearchDateRange, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Object} value
     */
    _inherits(SearchDateRange, _Search);
    return _createClass(SearchDateRange, [{
      key: "setValue",
      value: function setValue(value) {
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
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }

      /**
       * Получение значения
       * @returns {Object|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
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
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {Object} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !coreuiTableUtils.isObject(searchValue) || typeof searchValue.start !== 'string' && typeof searchValue.end !== 'string') {
          return false;
        }
        var issetStart = ['string', 'number'].indexOf(_typeof(searchValue.start)) >= 0;
        var issetEnd = ['string', 'number'].indexOf(_typeof(searchValue.end)) >= 0;
        if (issetStart && issetEnd) {
          return fieldValue >= searchValue.start && fieldValue <= searchValue.end;
        } else if (issetStart) {
          return fieldValue >= searchValue.start;
        } else {
          return fieldValue <= searchValue.end;
        }
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
        startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
        var control = $(coreuiTableUtils.render(tpl['search/date_range.html'], {
          startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
          endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
        }));
        $('input.date-start', control).change(function () {
          var dateEnd = $('input.date-end', control).attr('min', $(this).val());
          if ("showPicker" in HTMLInputElement.prototype) {
            $(dateEnd)[0].showPicker();
          }
        });
        $('input.date-end', control).change(function () {
          $('input.date-start', control).attr('max', $(this).val());
        });
        this._control = control;
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$n(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchDatetimeRange = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchDatetimeRange(table, options) {
      var _this2;
      _classCallCheck(this, SearchDatetimeRange);
      options = $.extend(true, {
        id: null,
        type: 'datetime_range',
        field: null,
        label: null,
        value: null,
        width: 200,
        attr: {
          "class": "form-control d-inline-block"
        }
      }, options);
      _this2 = _callSuper$n(this, SearchDatetimeRange, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Object} value
     */
    _inherits(SearchDatetimeRange, _Search);
    return _createClass(SearchDatetimeRange, [{
      key: "setValue",
      value: function setValue(value) {
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
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
          if (this._value === null) {
            inputStart.val('');
            inputEnd.val('');
          } else if (coreuiTableUtils.isObject(this._value)) {
            inputStart.val(_typeof(this._value.start) !== null ? this._value.start : '');
            inputEnd.val(_typeof(this._value.end) !== null ? this._value.end : '');
          }
        }
      }

      /**
       * Получение значения
       * @returns {Object|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputStart = this._control.parent().find('input.date-start');
          var inputEnd = this._control.parent().find('input.date-end');
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
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !coreuiTableUtils.isObject(searchValue) || typeof searchValue.start !== 'string' && typeof searchValue.end !== 'string') {
          return false;
        }
        var issetStart = ['string', 'number'].indexOf(_typeof(searchValue.start)) >= 0;
        var issetEnd = ['string', 'number'].indexOf(_typeof(searchValue.end)) >= 0;
        if (issetStart && issetEnd) {
          return fieldValue >= searchValue.start && fieldValue <= searchValue.end;
        } else if (issetStart) {
          return fieldValue >= searchValue.start;
        } else {
          return fieldValue <= searchValue.end;
        }
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        var startAttr = [];
        var startEnd = [];
        this._table;
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
        startAttr.push('value="' + (this._value ? this._value.start : '') + '"');
        startEnd.push('value="' + (this._value ? this._value.end : '') + '"');
        var control = $(coreuiTableUtils.render(tpl['search/datetime_range.html'], {
          startAttr: startAttr.length > 0 ? ' ' + startAttr.join(' ') : '',
          endAttr: startEnd.length > 0 ? ' ' + startEnd.join(' ') : ''
        }));
        $('input.date-start', control).change(function () {
          var dateEnd = $('input.date-end', control).attr('min', $(this).val());
          if ("showPicker" in HTMLInputElement.prototype) {
            $(dateEnd)[0].showPicker();
          }
        });
        $('input.date-end', control).change(function () {
          $('input.date-start', control).attr('max', $(this).val());
        });
        this._control = control;
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$m(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchCheckbox = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchCheckbox(table, options) {
      var _this2;
      _classCallCheck(this, SearchCheckbox);
      options = $.extend(true, {
        id: null,
        type: 'checkbox',
        field: null,
        label: null,
        value: null,
        options: []
      }, options);
      _this2 = _callSuper$m(this, SearchCheckbox, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Array|null} value
     */
    _inherits(SearchCheckbox, _Search);
    return _createClass(SearchCheckbox, [{
      key: "setValue",
      value: function setValue(value) {
        if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
          return;
        }
        if (_typeof(value) === 'object') {
          if (Array.isArray(value)) {
            var items = [];
            value.map(function (item) {
              if (['string', 'number'].indexOf(_typeof(item)) >= 0) {
                items.push(item);
              }
            });
            this._value = items;
          } else {
            this._value = null;
          }
        } else {
          this._value = [value];
        }
        if (this._control) {
          $('input:checked', this._control).prop('checked', false);
          if (Array.isArray(this._value)) {
            $.each(this._value, function (key, value) {
              $('input[value="' + value + '"]', this._control).prop('checked', true);
            });
          }
        }
      }

      /**
       * Получение значения
       * @returns {Array|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputs = $('input:checked', this._control);
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
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {Array}  searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !Array.isArray(searchValue)) {
          return false;
        }
        return searchValue.indexOf(fieldValue) >= 0;
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._control = $(coreuiTableUtils.render(tpl['search/checkbox.html'], {
          options: options
        }));
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$l(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchCheckboxBtn = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchCheckboxBtn(table, options) {
      var _this2;
      _classCallCheck(this, SearchCheckboxBtn);
      options = $.extend(true, {
        id: null,
        type: 'checkboxBtn',
        field: null,
        label: null,
        optionsClass: 'btn btn-outline-secondary',
        value: null,
        options: []
      }, options);
      _this2 = _callSuper$l(this, SearchCheckboxBtn, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {Array|null} value
     */
    _inherits(SearchCheckboxBtn, _Search);
    return _createClass(SearchCheckboxBtn, [{
      key: "setValue",
      value: function setValue(value) {
        if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
          return;
        }
        if (_typeof(value) === 'object') {
          if (Array.isArray(value)) {
            var items = [];
            value.map(function (item) {
              if (['string', 'number'].indexOf(_typeof(item)) >= 0) {
                items.push(item);
              }
            });
            this._value = items;
          } else {
            this._value = null;
          }
        } else {
          this._value = [value];
        }
        if (this._control) {
          $('input:checked', this._control).prop('checked', false);
          if (Array.isArray(this._value)) {
            this._value.map(function (value) {
              $('input[value="' + value + '"]', this._control).prop('checked', true);
            });
          }
        }
      }

      /**
       * Получение значения
       * @returns {Array|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var inputs = $('input:checked', this._control);
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
      }

      /**
       * Фильтрация данных
       * @returns {string} fieldValue
       * @returns {Array}  searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || !Array.isArray(searchValue)) {
          return false;
        }
        return searchValue.indexOf(fieldValue) >= 0;
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._control = $(coreuiTableUtils.render(tpl['search/checkbox-btn.html'], {
          options: options
        }));
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$k(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchRadio = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchRadio(table, options) {
      var _this2;
      _classCallCheck(this, SearchRadio);
      options = $.extend(true, {
        id: null,
        type: 'radio',
        field: null,
        label: null,
        value: null,
        options: []
      }, options);
      _this2 = _callSuper$k(this, SearchRadio, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string} value
     */
    _inherits(SearchRadio, _Search);
    return _createClass(SearchRadio, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).prop('checked', false);
          if (this._value !== null) {
            $('input[value="' + this._value + '"]', this._control).prop('checked', true);
          } else {
            $('input.coreui-table__all', this._control).prop('checked', true);
          }
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var input = $('input:checked', this._control);
          if (input && input[0]) {
            var value = input.val();
            return value === '' ? null : value;
          } else {
            return null;
          }
        } else {
          return this._value;
        }
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
      }

      /**
       * Формирование контента
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._control = $(coreuiTableUtils.render(tpl['search/radio.html'], {
          options: options,
          checkedAll: checkedAll,
          field: coreuiTableUtils.hashCode(),
          lang: this._table.getLang()
        }));
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$j(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchRadioBtn = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchRadioBtn(table, options) {
      var _this2;
      _classCallCheck(this, SearchRadioBtn);
      options = $.extend(true, {
        id: null,
        type: 'radioBtn',
        field: null,
        optionsClass: 'btn btn-outline-secondary',
        label: null,
        value: null,
        options: []
      }, options);
      _this2 = _callSuper$j(this, SearchRadioBtn, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|number} value
     */
    _inherits(SearchRadioBtn, _Search);
    return _createClass(SearchRadioBtn, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          $('input', this._control).prop('checked', false);
          if (this._value !== null) {
            $('input[value="' + this._value + '"]', this._control).prop('checked', true);
          } else {
            $('input.coreui-table__all', this._control).prop('checked', true);
          }
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var input = $('input:checked', this._control);
          if (input && input[0]) {
            var value = input.val();
            return value === '' ? null : value;
          } else {
            return null;
          }
        } else {
          return this._value;
        }
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._control = $(coreuiTableUtils.render(tpl['search/radio-btn.html'], {
          options: options,
          checkedAll: checkedAll,
          optionAllHash: coreuiTableUtils.hashCode(),
          optionOptionsClass: that._options.optionsClass,
          field: coreuiTableUtils.hashCode(),
          lang: this._table.getLang()
        }));
        return this._control;
      }
    }]);
  }(Search);

  function _callSuper$i(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchSelect = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchSelect(table, options) {
      var _this2;
      _classCallCheck(this, SearchSelect);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$i(this, SearchSelect, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|number|Array} value
     */
    _inherits(SearchSelect, _Search);
    return _createClass(SearchSelect, [{
      key: "setValue",
      value: function setValue(value) {
        if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
          return;
        }
        if (_typeof(value) === 'object') {
          if (Array.isArray(value)) {
            var items = [];
            value.map(function (item) {
              if (['string', 'number'].indexOf(_typeof(item)) >= 0) {
                items.push(item);
              }
            });
            this._value = items;
          } else {
            this._value = null;
          }
        } else {
          this._value = [value];
        }
        if (this._control) {
          $('option:selected', this._control).prop('selected', false);
          if (Array.isArray(this._value)) {
            this._value.map(function (value) {
              $('option[value="' + value + '"]', this._control).prop('selected', true);
            });
          }
        }
      }

      /**
       * Получение значения
       * @returns {Array|string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var isMultiple = !!this._control.attr('multiple');
          var options = $('option:selected', this._control);
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
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0 && !Array.isArray(searchValue)) {
          return false;
        }
        if (Array.isArray(searchValue)) {
          return searchValue.indexOf(fieldValue) >= 0;
        } else {
          return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
        }
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
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
        this._control = $(coreuiTableUtils.render(tpl['search/select.html'], {
          field: options,
          value: this._value,
          attr: attributes.length > 0 ? ' ' + attributes.join(' ') : '',
          options: selectOptions
        }));
        return this._control;
      }

      /**
       * Сборка опции
       * @param option
       * @return {object}
       * @private
       */
    }, {
      key: "_buildOption",
      value: function _buildOption(option) {
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
    }]);
  }(Search);

  function _callSuper$h(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var SearchSwitch = /*#__PURE__*/function (_Search) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function SearchSwitch(table, options) {
      var _this2;
      _classCallCheck(this, SearchSwitch);
      options = $.extend(true, {
        id: null,
        type: 'switch',
        field: null,
        value: null,
        valueY: 1
      }, options);
      _this2 = _callSuper$h(this, SearchSwitch, [table, options]);
      if (_this2._options.value !== null) {
        _this2.setValue(_this2._options.value);
      }
      return _this2;
    }

    /**
     * Установка значения
     * @param {string|number|null} value
     */
    _inherits(SearchSwitch, _Search);
    return _createClass(SearchSwitch, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
          return;
        }
        this._value = value;
        if (this._control) {
          var valueY = typeof this._options.valueY === 'string' || typeof this._options.valueY === 'number' ? this._options.valueY : '';
          if (this._value === null) {
            $('input', this._control).prop('checked', false);
          } else if (this._value === valueY) {
            $('input', this._control).prop('checked', true);
          } else {
            $('input', this._control).prop('checked', false);
          }
        }
      }

      /**
       * Получение значения
       * @returns {string|null}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._control) {
          var value = $('input:checked', this._control).val();
          return typeof value !== 'string' || value === '' ? null : value;
        }
        return this._value;
      }

      /**
       * Фильтрация данных
       * @returns {string}              fieldValue
       * @returns {Array|string|number} searchValue
       * @returns {boolean}
       */
    }, {
      key: "filter",
      value: function filter(fieldValue, searchValue) {
        if (['string', 'number'].indexOf(_typeof(fieldValue)) < 0 || ['string', 'number'].indexOf(_typeof(searchValue)) < 0) {
          return false;
        }
        return fieldValue.toString().toLowerCase() === searchValue.toString().toLowerCase();
      }

      /**
       * Формирование контента
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render() {
        var options = this.getOptions();
        var valueY = typeof options.valueY === 'string' || typeof options.valueY === 'number' ? options.valueY : '';
        this._control = $(coreuiTableUtils.render(tpl['search/switch.html'], {
          id: this._id,
          valueY: valueY,
          field: typeof options.field === 'string' ? options.field : '',
          checked: this._value == valueY
        }));
        return this._control;
      }
    }]);
  }(Search);

  var Column = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function Column(table, options) {
      _classCallCheck(this, Column);
      _defineProperty(this, "_table", null);
      _defineProperty(this, "_options", {
        type: '',
        field: null,
        label: null,
        show: true,
        showLabel: true,
        width: null,
        minWidth: null,
        maxWidth: null,
        attr: null,
        attrHeader: null,
        render: null
      });
      this._table = table;
      this._options = $.extend(true, this._options, options);
    }

    /**
     * Установка видимости колонки
     * @param {boolean} isShow
     */
    return _createClass(Column, [{
      key: "setShow",
      value: function setShow(isShow) {
        this._options.show = !!isShow;
      }

      /**
       * Видимости колонки
       */
    }, {
      key: "isShow",
      value: function isShow() {
        return !!this._options.show;
      }

      /**
       * Получение параметров
       * @returns {object}
       */
    }, {
      key: "getOptions",
      value: function getOptions() {
        return $.extend({}, this._options);
      }

      /**
       * Получение имени поля
       * @returns {string|null}
       */
    }, {
      key: "getField",
      value: function getField() {
        return typeof this._options.field === 'string' ? this._options.field : null;
      }

      /**
       * Формирование контента
       * @param {*}      content
       * @param {object} record
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render(content, record) {}
    }]);
  }();

  function _callSuper$g(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsDate = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsDate(table, options) {
      _classCallCheck(this, ColumnsDate);
      options = $.extend(true, {
        type: 'date',
        field: null,
        label: null,
        show: true,
        width: null,
        format: 'DD.MM.YYYY',
        attr: {},
        attrHeader: {},
        render: null
      }, options);
      return _callSuper$g(this, ColumnsDate, [table, options]);
    }

    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsDate, _Column);
    return _createClass(ColumnsDate, [{
      key: "render",
      value: function render(content, record) {
        if (typeof content !== 'string') {
          return '';
        }
        try {
          if (content !== '') {
            var lang = this._table.getLang();
            var date = new Date(content);
            content = this._options.format.replace(/YYYY/g, coreuiTableUtils.strPadLeft(date.getFullYear(), 4)).replace(/MMMM/g, lang.monthNames[date.getMonth() + 1]).replace(/MMM/g, lang.monthNamesShort[date.getMonth() + 1]).replace(/MM/g, coreuiTableUtils.strPadLeft(date.getMonth() + 1, 2)).replace(/M/g, date.getMonth() + 1).replace(/DD/g, coreuiTableUtils.strPadLeft(date.getDate(), 2)).replace(/D/g, date.getDate()).replace(/dddd/g, lang.dayNames[date.getMonth() + 1]).replace(/ddd/g, lang.dayNamesMin[date.getMonth() + 1]);
          }
        } catch (e) {
          content = '';
        }
        return content;
      }
    }]);
  }(Column);

  function _callSuper$f(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsDatetime = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsDatetime(table, options) {
      _classCallCheck(this, ColumnsDatetime);
      options = $.extend(true, {
        type: 'datetime',
        field: null,
        label: null,
        show: true,
        width: null,
        format: 'DD.MM.YYYY hh:mm:ss',
        attr: {},
        attrHeader: {},
        render: null
      }, options);
      return _callSuper$f(this, ColumnsDatetime, [table, options]);
    }

    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsDatetime, _Column);
    return _createClass(ColumnsDatetime, [{
      key: "render",
      value: function render(content, record) {
        if (typeof content !== 'string') {
          return '';
        }
        try {
          if (content !== '') {
            var lang = this._table.getLang();
            var date = new Date(content);
            content = this._options.format.replace(/YYYY/g, coreuiTableUtils.strPadLeft(date.getFullYear(), 4)).replace(/MMMM/g, lang.monthNames[date.getMonth() + 1]).replace(/MMM/g, lang.monthNamesShort[date.getMonth() + 1]).replace(/MM/g, coreuiTableUtils.strPadLeft(date.getMonth() + 1, 2)).replace(/M/g, date.getMonth() + 1).replace(/DD/g, coreuiTableUtils.strPadLeft(date.getDate(), 2)).replace(/D/g, date.getDate()).replace(/dddd/g, lang.dayNames[date.getMonth() + 1]).replace(/ddd/g, lang.dayNamesMin[date.getMonth() + 1]).replace(/hh/g, coreuiTableUtils.strPadLeft(date.getHours(), 2)).replace(/mm/g, coreuiTableUtils.strPadLeft(date.getMinutes(), 2)).replace(/m/g, date.getMinutes()).replace(/ss/g, coreuiTableUtils.strPadLeft(date.getSeconds(), 2)).replace(/s/g, date.getSeconds());
          }
        } catch (e) {
          content = '';
        }
        return content;
      }
    }]);
  }(Column);

  var hookCallback;
  function hooks() {
    return hookCallback.apply(null, arguments);
  }

  // This is done to register the method called with moment()
  // without creating circular dependencies.
  function setHookCallback(callback) {
    hookCallback = callback;
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;
      for (k in obj) {
        if (hasOwnProp(obj, k)) {
          return false;
        }
      }
      return true;
    }
  }

  function isUndefined(input) {
    return input === void 0;
  }

  function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
    var res = [],
      i,
      arrLen = arr.length;
    for (i = 0; i < arrLen; ++i) {
      res.push(fn(arr[i], i));
    }
    return res;
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }
    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }
    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }
    return a;
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidEra: null,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      era: null,
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    };
  }
  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }
    return m._pf;
  }

  var some;
  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function (fun) {
      var t = Object(this),
        len = t.length >>> 0,
        i;
      for (i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }
      return false;
    };
  }

  function isValid$2(m) {
    var flags = null,
      parsedParts = false,
      isNowValid = m._d && !isNaN(m._d.getTime());
    if (isNowValid) {
      flags = getParsingFlags(m);
      parsedParts = some.call(flags.parsedDateParts, function (i) {
        return i != null;
      });
      isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }
    }
    if (Object.isFrozen == null || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
    return m._isValid;
  }
  function createInvalid$1(flags) {
    var m = createUTC(NaN);
    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }
    return m;
  }

  // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.
  var momentProperties = hooks.momentProperties = [],
    updateInProgress = false;
  function copyConfig(to, from) {
    var i,
      prop,
      val,
      momentPropertiesLen = momentProperties.length;
    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
      to._i = from._i;
    }
    if (!isUndefined(from._f)) {
      to._f = from._f;
    }
    if (!isUndefined(from._l)) {
      to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }
    if (momentPropertiesLen > 0) {
      for (i = 0; i < momentPropertiesLen; i++) {
        prop = momentProperties[i];
        val = from[prop];
        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }
    return to;
  }

  // Moment prototype object
  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
      this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }
  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }
  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }
      if (firstTime) {
        var args = [],
          arg,
          i,
          key,
          argLen = arguments.length;
        for (i = 0; i < argLen; i++) {
          arg = '';
          if (typeof arguments[i] === 'object') {
            arg += '\n[' + i + '] ';
            for (key in arguments[0]) {
              if (hasOwnProp(arguments[0], key)) {
                arg += key + ': ' + arguments[0][key] + ', ';
              }
            }
            arg = arg.slice(0, -2); // Remove trailing comma and space
          } else {
            arg = arguments[i];
          }
          args.push(arg);
        }
        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
        firstTime = false;
      }
      return fn.apply(this, arguments);
    }, fn);
  }
  var deprecations = {};
  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }
  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return typeof Function !== 'undefined' && input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set$1(config) {
    var prop, i;
    for (i in config) {
      if (hasOwnProp(config, i)) {
        prop = config[i];
        if (isFunction(prop)) {
          this[i] = prop;
        } else {
          this['_' + i] = prop;
        }
      }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  }
  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
      prop;
    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }
    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
      }
    }
    return res;
  }

  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }

  var keys;
  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function (obj) {
      var i,
        res = [];
      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }
      return res;
    };
  }

  var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  };
  function calendar$1(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
      zerosToFill = targetLength - absNumber.length,
      sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    formatFunctions = {},
    formatTokenFunctions = {};

  // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }
  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
      func = function () {
        return this[callback]();
      };
    }
    if (token) {
      formatTokenFunctions[token] = func;
    }
    if (padded) {
      formatTokenFunctions[padded[0]] = function () {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }
    if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }
  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
  }
  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
      i,
      length;
    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }
    return function (mom) {
      var output = '',
        i;
      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }
      return output;
    };
  }

  // format date using native date object
  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }
    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }
  function expandFormat(format, locale) {
    var i = 5;
    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }
    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }
    return format;
  }

  var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  };
  function longDateFormat(key) {
    var format = this._longDateFormat[key],
      formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format || !formatUpper) {
      return format;
    }
    this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function (tok) {
      if (tok === 'MMMM' || tok === 'MM' || tok === 'DD' || tok === 'dddd') {
        return tok.slice(1);
      }
      return tok;
    }).join('');
    return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';
  function invalidDate() {
    return this._invalidDate;
  }

  var defaultOrdinal = '%d',
    defaultDayOfMonthOrdinalParse = /\d{1,2}/;
  function ordinal(number) {
    return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  };
  function relativeTime$1(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }
  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {
    D: 'date',
    dates: 'date',
    date: 'date',
    d: 'day',
    days: 'day',
    day: 'day',
    e: 'weekday',
    weekdays: 'weekday',
    weekday: 'weekday',
    E: 'isoWeekday',
    isoweekdays: 'isoWeekday',
    isoweekday: 'isoWeekday',
    DDD: 'dayOfYear',
    dayofyears: 'dayOfYear',
    dayofyear: 'dayOfYear',
    h: 'hour',
    hours: 'hour',
    hour: 'hour',
    ms: 'millisecond',
    milliseconds: 'millisecond',
    millisecond: 'millisecond',
    m: 'minute',
    minutes: 'minute',
    minute: 'minute',
    M: 'month',
    months: 'month',
    month: 'month',
    Q: 'quarter',
    quarters: 'quarter',
    quarter: 'quarter',
    s: 'second',
    seconds: 'second',
    second: 'second',
    gg: 'weekYear',
    weekyears: 'weekYear',
    weekyear: 'weekYear',
    GG: 'isoWeekYear',
    isoweekyears: 'isoWeekYear',
    isoweekyear: 'isoWeekYear',
    w: 'week',
    weeks: 'week',
    week: 'week',
    W: 'isoWeek',
    isoweeks: 'isoWeek',
    isoweek: 'isoWeek',
    y: 'year',
    years: 'year',
    year: 'year'
  };
  function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }
  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
      normalizedProp,
      prop;
    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);
        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }
    return normalizedInput;
  }

  var priorities = {
    date: 9,
    day: 11,
    weekday: 11,
    isoWeekday: 11,
    dayOfYear: 4,
    hour: 13,
    millisecond: 16,
    minute: 14,
    month: 8,
    quarter: 7,
    second: 15,
    weekYear: 1,
    isoWeekYear: 1,
    week: 5,
    isoWeek: 5,
    year: 1
  };
  function getPrioritizedUnits(unitsObj) {
    var units = [],
      u;
    for (u in unitsObj) {
      if (hasOwnProp(unitsObj, u)) {
        units.push({
          unit: u,
          priority: priorities[u]
        });
      }
    }
    units.sort(function (a, b) {
      return a.priority - b.priority;
    });
    return units;
  }

  var match1 = /\d/,
    //       0 - 9
    match2 = /\d\d/,
    //      00 - 99
    match3 = /\d{3}/,
    //     000 - 999
    match4 = /\d{4}/,
    //    0000 - 9999
    match6 = /[+-]?\d{6}/,
    // -999999 - 999999
    match1to2 = /\d\d?/,
    //       0 - 99
    match3to4 = /\d\d\d\d?/,
    //     999 - 9999
    match5to6 = /\d\d\d\d\d\d?/,
    //   99999 - 999999
    match1to3 = /\d{1,3}/,
    //       0 - 999
    match1to4 = /\d{1,4}/,
    //       0 - 9999
    match1to6 = /[+-]?\d{1,6}/,
    // -999999 - 999999
    matchUnsigned = /\d+/,
    //       0 - inf
    matchSigned = /[+-]?\d+/,
    //    -inf - inf
    matchOffset = /Z|[+-]\d\d:?\d\d/gi,
    // +00:00 -00:00 +0000 -0000 or Z
    matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
    // +00 -00 +00:00 -00:00 +0000 -0000 or Z
    matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
    // 123456789 123456789.123
    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
    match1to2NoLeadingZero = /^[1-9]\d?/,
    //         1-99
    match1to2HasZero = /^([1-9]\d|\d)/,
    //           0-99
    regexes;
  regexes = {};
  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }
  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }
    return regexes[token](config._strict, config._locale);
  }

  // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
  function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));
  }
  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function absFloor(number) {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
      value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }
    return value;
  }

  var tokens = {};
  function addParseToken(token, callback) {
    var i,
      func = callback,
      tokenLen;
    if (typeof token === 'string') {
      token = [token];
    }
    if (isNumber(callback)) {
      func = function (input, array) {
        array[callback] = toInt(input);
      };
    }
    tokenLen = token.length;
    for (i = 0; i < tokenLen; i++) {
      tokens[token[i]] = func;
    }
  }
  function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }
  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  var YEAR = 0,
    MONTH = 1,
    DATE = 2,
    HOUR = 3,
    MINUTE = 4,
    SECOND = 5,
    MILLISECOND = 6,
    WEEK = 7,
    WEEKDAY = 8;

  // FORMATTING

  addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? zeroFill(y, 4) : '+' + y;
  });
  addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

  // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);
  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
  });

  // HELPERS

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  // HOOKS

  hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  };

  // MOMENTS

  var getSetYear = makeGetSet('FullYear', true);
  function getIsLeapYear() {
    return isLeapYear(this.year());
  }

  function makeGetSet(unit, keepTime) {
    return function (value) {
      if (value != null) {
        set(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get$2(this, unit);
      }
    };
  }
  function get$2(mom, unit) {
    if (!mom.isValid()) {
      return NaN;
    }
    var d = mom._d,
      isUTC = mom._isUTC;
    switch (unit) {
      case 'Milliseconds':
        return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
      case 'Seconds':
        return isUTC ? d.getUTCSeconds() : d.getSeconds();
      case 'Minutes':
        return isUTC ? d.getUTCMinutes() : d.getMinutes();
      case 'Hours':
        return isUTC ? d.getUTCHours() : d.getHours();
      case 'Date':
        return isUTC ? d.getUTCDate() : d.getDate();
      case 'Day':
        return isUTC ? d.getUTCDay() : d.getDay();
      case 'Month':
        return isUTC ? d.getUTCMonth() : d.getMonth();
      case 'FullYear':
        return isUTC ? d.getUTCFullYear() : d.getFullYear();
      default:
        return NaN;
      // Just in case
    }
  }
  function set(mom, unit, value) {
    var d, isUTC, year, month, date;
    if (!mom.isValid() || isNaN(value)) {
      return;
    }
    d = mom._d;
    isUTC = mom._isUTC;
    switch (unit) {
      case 'Milliseconds':
        return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
      case 'Seconds':
        return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
      case 'Minutes':
        return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
      case 'Hours':
        return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
      case 'Date':
        return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
      // case 'Day': // Not real
      //    return void (isUTC ? d.setUTCDay(value) : d.setDay(value));
      // case 'Month': // Not used because we need to pass two variables
      //     return void (isUTC ? d.setUTCMonth(value) : d.setMonth(value));
      case 'FullYear':
        break;
      // See below ...
      default:
        return;
      // Just in case
    }
    year = value;
    month = mom.month();
    date = mom.date();
    date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
    void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
  }

  // MOMENTS

  function stringGet(units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units]();
    }
    return this;
  }
  function stringSet(units, value) {
    if (typeof units === 'object') {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units),
        i,
        prioritizedLen = prioritized.length;
      for (i = 0; i < prioritizedLen; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units](value);
      }
    }
    return this;
  }

  function mod$1(n, x) {
    return (n % x + x) % x;
  }

  var indexOf;
  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (o) {
      // I know
      var i;
      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }
      return -1;
    };
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }
    var modMonth = mod$1(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  }

  // FORMATTING

  addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
  });

  // PARSING

  addRegexToken('M', match1to2, match1to2NoLeadingZero);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  });

  // LOCALES

  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    defaultMonthsShortRegex = matchWord,
    defaultMonthsRegex = matchWord;
  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }
  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }
  function handleStrictParse$1(monthName, format, strict) {
    var i,
      ii,
      mom,
      llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;
    if (this._monthsParseExact) {
      return handleStrictParse$1.call(this, monthName, format, strict);
    }
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
      }
      if (!strict && !this._monthsParse[i]) {
        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      }
      // test the regex
      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  }

  // MOMENTS

  function setMonth(mom, value) {
    if (!mom.isValid()) {
      // No op
      return mom;
    }
    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value);
        // TODO: Another silent failure?
        if (!isNumber(value)) {
          return mom;
        }
      }
    }
    var month = value,
      date = mom.date();
    date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
    void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
    return mom;
  }
  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get$2(this, 'Month');
    }
  }
  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }
  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsShortRegex')) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }
      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }
  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this._monthsRegex = defaultMonthsRegex;
      }
      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }
  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }
    var shortPieces = [],
      longPieces = [],
      mixedPieces = [],
      i,
      mom,
      shortP,
      longP;
    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      shortP = regexEscape(this.monthsShort(mom, ''));
      longP = regexEscape(this.months(mom, ''));
      shortPieces.push(shortP);
      longPieces.push(longP);
      mixedPieces.push(longP);
      mixedPieces.push(shortP);
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  }

  function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date;
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      date = new Date(y + 400, m, d, h, M, s, ms);
      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }
    return date;
  }
  function createUTCDate(y) {
    var date, args;
    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      args = Array.prototype.slice.call(arguments);
      // preserve leap years using a full 400 year cycle, then reset
      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));
      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }
    return date;
  }

  // start-of-first-week - start-of-year
  function firstWeekOffset(year, dow, doy) {
    var
      // first-week day -- which january is always in the first week (4 for iso, 1 for other)
      fwd = 7 + dow - doy,
      // first-week day local weekday -- which local weekday is fwd
      fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  }

  // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
      weekOffset = firstWeekOffset(year, dow, doy),
      dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
      resYear,
      resDayOfYear;
    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }
    return {
      year: resYear,
      dayOfYear: resDayOfYear
    };
  }
  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
      week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
      resWeek,
      resYear;
    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }
    return {
      week: resWeek,
      year: resYear
    };
  }
  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
      weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  }

  // FORMATTING

  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

  // PARSING

  addRegexToken('w', match1to2, match1to2NoLeadingZero);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2, match1to2NoLeadingZero);
  addRegexToken('WW', match1to2, match2);
  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  });

  // HELPERS

  // LOCALES

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }
  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 6th is the first week of the year.
  };
  function localeFirstDayOfWeek() {
    return this._week.dow;
  }
  function localeFirstDayOfYear() {
    return this._week.doy;
  }

  // MOMENTS

  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
  }
  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
  }

  // FORMATTING

  addFormatToken('d', 0, 'do', 'day');
  addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday');

  // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
  });

  // HELPERS

  function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
      return input;
    }
    if (!isNaN(input)) {
      return parseInt(input, 10);
    }
    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
      return input;
    }
    return null;
  }
  function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
      return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
  }

  // LOCALES
  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }
  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    defaultWeekdaysRegex = matchWord,
    defaultWeekdaysShortRegex = matchWord,
    defaultWeekdaysMinRegex = matchWord;
  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }
  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }
  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }
  function handleStrictParse(weekdayName, format, strict) {
    var i,
      ii,
      mom,
      llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];
      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;
    if (this._weekdaysParseExact) {
      return handleStrictParse.call(this, weekdayName, format, strict);
    }
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }
    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already

      mom = createUTC([2000, 1]).day(i);
      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
      }
      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      }
      // test the regex
      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  }

  // MOMENTS

  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var day = get$2(this, 'Day');
    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, 'd');
    } else {
      return day;
    }
  }
  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
  }
  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }
  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }
      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }
  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }
      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }
  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }
      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }
  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }
    var minPieces = [],
      shortPieces = [],
      longPieces = [],
      mixedPieces = [],
      i,
      mom,
      minp,
      shortp,
      longp;
    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);
      minp = regexEscape(this.weekdaysMin(mom, ''));
      shortp = regexEscape(this.weekdaysShort(mom, ''));
      longp = regexEscape(this.weekdays(mom, ''));
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  }

  // FORMATTING

  function hFormat() {
    return this.hours() % 12 || 12;
  }
  function kFormat() {
    return this.hours() || 24;
  }
  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);
  addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }
  meridiem('a', true);
  meridiem('A', false);

  // PARSING

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }
  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2, match1to2HasZero);
  addRegexToken('h', match1to2, match1to2NoLeadingZero);
  addRegexToken('k', match1to2, match1to2NoLeadingZero);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);
  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);
  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4,
      pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4,
      pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  });

  // LOCALES

  function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
  }
  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    getSetHour = makeGetSet('Hours', true);
  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    } else {
      return isLower ? 'am' : 'AM';
    }
  }

  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  };

  // internal storage for locale config files
  var locales = {},
    localeFamilies = {},
    globalLocale;
  function commonPrefix(arr1, arr2) {
    var i,
      minl = Math.min(arr1.length, arr2.length);
    for (i = 0; i < minl; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return i;
      }
    }
    return minl;
  }
  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  }

  // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
  function chooseLocale(names) {
    var i = 0,
      j,
      next,
      locale,
      split;
    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;
      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));
        if (locale) {
          return locale;
        }
        if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
          //the next array item is better than a shallower substring of this one
          break;
        }
        j--;
      }
      i++;
    }
    return globalLocale;
  }
  function isLocaleNameSane(name) {
    // Prevent names that look like filesystem paths, i.e contain '/' or '\'
    // Ensure name is available and function returns boolean
    return !!(name && name.match('^[^/\\\\]*$'));
  }
  function loadLocale(name) {
    var oldLocale = null,
      aliasedRequire;
    // TODO: Find a better way to register and load all the locales in Node
    if (locales[name] === undefined && typeof module !== 'undefined' && module && module.exports && isLocaleNameSane(name)) {
      try {
        oldLocale = globalLocale._abbr;
        aliasedRequire = require;
        aliasedRequire('./locale/' + name);
        getSetGlobalLocale(oldLocale);
      } catch (e) {
        // mark as not found to avoid repeating expensive file require call causing high CPU
        // when trying to find en-US, en_US, en-us for every format call
        locales[name] = null; // null means not found
      }
    }
    return locales[name];
  }

  // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.
  function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }
      if (data) {
        // moment.duration._locale = moment._locale = data;
        globalLocale = data;
      } else {
        if (typeof console !== 'undefined' && console.warn) {
          //warn user if arguments are passed but the locale could not be set
          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
      }
    }
    return globalLocale._abbr;
  }
  function defineLocale(name, config) {
    if (config !== null) {
      var locale,
        parentConfig = baseConfig;
      config.abbr = name;
      if (locales[name] != null) {
        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          locale = loadLocale(config.parentLocale);
          if (locale != null) {
            parentConfig = locale._config;
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = [];
            }
            localeFamilies[config.parentLocale].push({
              name: name,
              config: config
            });
            return null;
          }
        }
      }
      locales[name] = new Locale(mergeConfigs(parentConfig, config));
      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
          defineLocale(x.name, x.config);
        });
      }

      // backwards compat for now: also set the locale
      // make sure we set the locale AFTER all child locales have been
      // created, so we won't end up with the child locale set.
      getSetGlobalLocale(name);
      return locales[name];
    } else {
      // useful for testing
      delete locales[name];
      return null;
    }
  }
  function updateLocale(name, config) {
    if (config != null) {
      var locale,
        tmpLocale,
        parentConfig = baseConfig;
      if (locales[name] != null && locales[name].parentLocale != null) {
        // Update existing child locale in-place to avoid memory-leaks
        locales[name].set(mergeConfigs(locales[name]._config, config));
      } else {
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
          parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        if (tmpLocale == null) {
          // updateLocale is called for creating a new locale
          // Set abbr so it will have a name (getters return
          // undefined otherwise).
          config.abbr = name;
        }
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
      }

      // backwards compat for now: also set the locale
      getSetGlobalLocale(name);
    } else {
      // pass null for config to unupdate, useful for tests
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
          if (name === getSetGlobalLocale()) {
            getSetGlobalLocale(name);
          }
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }
    return locales[name];
  }

  // returns locale data
  function getLocale(key) {
    var locale;
    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }
    if (!key) {
      return globalLocale;
    }
    if (!isArray(key)) {
      //short-circuit everything else
      locale = loadLocale(key);
      if (locale) {
        return locale;
      }
      key = [key];
    }
    return chooseLocale(key);
  }
  function listLocales() {
    return keys(locales);
  }

  function checkOverflow(m) {
    var overflow,
      a = m._a;
    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }
      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }
      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }
      getParsingFlags(m).overflow = overflow;
    }
    return m;
  }

  // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
    isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/], ['YYYYMM', /\d{6}/, false], ['YYYY', /\d{4}/, false]],
    // iso time formats and regexes
    isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]],
    aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
    obsOffsets = {
      UT: 0,
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };

  // date from iso format
  function configFromISO(config) {
    var i,
      l,
      string = config._i,
      match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
      allowTime,
      dateFormat,
      timeFormat,
      tzFormat,
      isoDatesLen = isoDates.length,
      isoTimesLen = isoTimes.length;
    if (match) {
      getParsingFlags(config).iso = true;
      for (i = 0, l = isoDatesLen; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }
      if (dateFormat == null) {
        config._isValid = false;
        return;
      }
      if (match[3]) {
        for (i = 0, l = isoTimesLen; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            // match[2] should be 'T' or space
            timeFormat = (match[2] || ' ') + isoTimes[i][0];
            break;
          }
        }
        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }
      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }
      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = 'Z';
        } else {
          config._isValid = false;
          return;
        }
      }
      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  }
  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];
    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }
    return result;
  }
  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
      return 2000 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }
    return year;
  }
  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^()]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
        weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }
    return true;
  }
  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      // the only allowed military tz is Z
      return 0;
    } else {
      var hm = parseInt(numOffset, 10),
        m = hm % 100,
        h = (hm - m) / 100;
      return h * 60 + m;
    }
  }

  // date and time from ref 2822 format
  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i)),
      parsedArray;
    if (match) {
      parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }
      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  }

  // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);
    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }
    configFromISO(config);
    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }
    configFromRFC2822(config);
    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }
    if (config._strict) {
      config._isValid = false;
    } else {
      // Final attempt, use Input Fallback
      hooks.createFromInputFallback(config);
    }
  }
  hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  });

  // Pick the first defined of two or three arguments.
  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }
    if (b != null) {
      return b;
    }
    return c;
  }

  function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  }

  // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]
  function configFromArray(config) {
    var i,
      date,
      input = [],
      currentDate,
      expectedWeekday,
      yearToUse;
    if (config._d) {
      return;
    }
    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }
      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }
    if (config._nextDay) {
      config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }
  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4;

      // TODO: We need to take the current isoWeekYear, but that depends on
      // how we interpret now (local, utc, fixed offset). So create
      // a now version of current config (take local/utc/offset flags, and
      // create now).
      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);
      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

      // Default to current week.
      week = defaults(w.w, curWeek.week);
      if (w.d != null) {
        // weekday -- low day numbers are considered next week
        weekday = w.d;
        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        // local weekday -- counting starts from beginning of week
        weekday = w.e + dow;
        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        // default to beginning of week
        weekday = dow;
      }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  }

  // constant that refers to the ISO standard
  hooks.ISO_8601 = function () {};

  // constant that refers to the RFC 2822 form
  hooks.RFC_2822 = function () {};

  // date from string and format string
  function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }
    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
      i,
      parsedInput,
      tokens,
      token,
      skipped,
      stringLength = string.length,
      totalParsedInputLength = 0,
      era,
      tokenLen;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
    tokenLen = tokens.length;
    for (i = 0; i < tokenLen; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));
        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      }
      // don't parse if it's not a known token
      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }
        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }
    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    // handle era
    era = getParsingFlags(config).era;
    if (era !== null) {
      config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
    }
    configFromArray(config);
    checkOverflow(config);
  }
  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;
    if (meridiem == null) {
      // nothing to do
      return hour;
    }
    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      // Fallback
      isPm = locale.isPM(meridiem);
      if (isPm && hour < 12) {
        hour += 12;
      }
      if (!isPm && hour === 12) {
        hour = 0;
      }
      return hour;
    } else {
      // this is not supposed to happen
      return hour;
    }
  }

  // date from string and array of format strings
  function configFromStringAndArray(config) {
    var tempConfig,
      bestMoment,
      scoreToBeat,
      i,
      currentScore,
      validFormatFound,
      bestFormatIsValid = false,
      configfLen = config._f.length;
    if (configfLen === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }
    for (i = 0; i < configfLen; i++) {
      currentScore = 0;
      validFormatFound = false;
      tempConfig = copyConfig({}, config);
      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }
      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);
      if (isValid$2(tempConfig)) {
        validFormatFound = true;
      }

      // if there is any input that was not parsed add a penalty for that format
      currentScore += getParsingFlags(tempConfig).charsLeftOver;

      //or tokens
      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;
      if (!bestFormatIsValid) {
        if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
          if (validFormatFound) {
            bestFormatIsValid = true;
          }
        }
      } else {
        if (currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
        }
      }
    }
    extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
    if (config._d) {
      return;
    }
    var i = normalizeObjectUnits(config._i),
      dayOrDate = i.day === undefined ? i.date : i.day;
    config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function (obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
      // Adding is smart enough around DST
      res.add(1, 'd');
      res._nextDay = undefined;
    }
    return res;
  }
  function prepareConfig(config) {
    var input = config._i,
      format = config._f;
    config._locale = config._locale || getLocale(config._l);
    if (input === null || format === undefined && input === '') {
      return createInvalid$1({
        nullInput: true
      });
    }
    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }
    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }
    if (!isValid$2(config)) {
      config._d = null;
    }
    return config;
  }
  function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function (obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (isObject(input)) {
      configFromObject(config);
    } else if (isNumber(input)) {
      // from milliseconds
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }
  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};
    if (format === true || format === false) {
      strict = format;
      format = undefined;
    }
    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }
    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
      } else {
        return createInvalid$1();
      }
    }),
    prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
      } else {
        return createInvalid$1();
      }
    });

  // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.
  function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }
    if (!moments.length) {
      return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }
    return res;
  }

  // TODO: Use [].sort instead?
  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  }
  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  }

  var now = function () {
    return Date.now ? Date.now() : +new Date();
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
  function isDurationValid(m) {
    var key,
      unitHasDecimal = false,
      i,
      orderLen = ordering.length;
    for (key in m) {
      if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }
    for (i = 0; i < orderLen; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false; // only allow non-integers for smallest unit
        }
        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }
    return true;
  }
  function isValid$1() {
    return this._isValid;
  }
  function createInvalid() {
    return createDuration(NaN);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
      years = normalizedInput.year || 0,
      quarters = normalizedInput.quarter || 0,
      months = normalizedInput.month || 0,
      weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
      days = normalizedInput.day || 0,
      hours = normalizedInput.hour || 0,
      minutes = normalizedInput.minute || 0,
      seconds = normalizedInput.second || 0,
      milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds + seconds * 1e3 +
    // 1000
    minutes * 6e4 +
    // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days + weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();
    this._bubble();
  }
  function isDuration(obj) {
    return obj instanceof Duration;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  }

  // compare two arrays, return the number of differences
  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
      lengthDiff = Math.abs(array1.length - array2.length),
      diffs = 0,
      i;
    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }
    return diffs + lengthDiff;
  }

  // FORMATTING

  function offset(token, separator) {
    addFormatToken(token, 0, 0, function () {
      var offset = this.utcOffset(),
        sign = '+';
      if (offset < 0) {
        offset = -offset;
        sign = '-';
      }
      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }
  offset('Z', ':');
  offset('ZZ', '');

  // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  });

  // HELPERS

  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']
  var chunkOffset = /([\+\-]|\d\d)/gi;
  function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher),
      chunk,
      parts,
      minutes;
    if (matches === null) {
      return null;
    }
    chunk = matches[matches.length - 1] || [];
    parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  }

  // Return a moment from input, that is local/utc/zone equivalent to model.
  function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
      // Use low-level api, because this fn is low-level api.
      res._d.setTime(res._d.valueOf() + diff);
      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }
  function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset());
  }

  // HOOKS

  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.
  hooks.updateOffset = function () {};

  // MOMENTS

  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.
  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
      localAdjust;
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      if (typeof input === 'string') {
        input = offsetFromString(matchShortOffset, input);
        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }
      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }
      this._offset = input;
      this._isUTC = true;
      if (localAdjust != null) {
        this.add(localAdjust, 'm');
      }
      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract$1(this, createDuration(input - offset, 'm'), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }
      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }
  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== 'string') {
        input = -input;
      }
      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }
  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }
  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;
      if (keepLocalTime) {
        this.subtract(getDateOffset(this), 'm');
      }
    }
    return this;
  }
  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
      var tZone = offsetFromString(matchOffset, this._i);
      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }
    return this;
  }
  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }
  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }
  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }
    var c = {},
      other;
    copyConfig(c, this);
    c = prepareConfig(c);
    if (c._a) {
      other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }
    return this._isDSTShifted;
  }
  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }
  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }
  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  }

  // ASP.NET json date format regex
  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function createDuration(input, key) {
    var duration = input,
      // matching against regexp is expensive, do it on demand
      match = null,
      sign,
      ret,
      diffRes;
    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (isNumber(input) || !isNaN(+input)) {
      duration = {};
      if (key) {
        duration[key] = +input;
      } else {
        duration.milliseconds = +input;
      }
    } else if (match = aspNetRegex.exec(input)) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
      };
    } else if (match = isoRegex.exec(input)) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      };
    } else if (duration == null) {
      // checks for null or undefined
      duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }
    ret = new Duration(duration);
    if (isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }
    if (isDuration(input) && hasOwnProp(input, '_isValid')) {
      ret._isValid = input._isValid;
    }
    return ret;
  }
  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid;
  function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
  }
  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }
    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
  }
  function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0
      };
    }
    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }
    return res;
  }

  // TODO: remove 'name' arg after deprecation is removed
  function createAdder(direction, name) {
    return function (val, period) {
      var dur, tmp;
      //invert the arguments, but complain about it
      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
        tmp = val;
        val = period;
        period = tmp;
      }
      dur = createDuration(val, period);
      addSubtract$1(this, dur, direction);
      return this;
    };
  }
  function addSubtract$1(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
      days = absRound(duration._days),
      months = absRound(duration._months);
    if (!mom.isValid()) {
      // No op
      return;
    }
    updateOffset = updateOffset == null ? true : updateOffset;
    if (months) {
      setMonth(mom, get$2(mom, 'Month') + months * isAdding);
    }
    if (days) {
      set(mom, 'Date', get$2(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }
  var add$1 = createAdder(1, 'add'),
    subtract$1 = createAdder(-1, 'subtract');

  function isString(input) {
    return typeof input === 'string' || input instanceof String;
  }

  // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
  function isMomentInput(input) {
    return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
  }
  function isMomentInputObject(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
      propertyTest = false,
      properties = ['years', 'year', 'y', 'months', 'month', 'M', 'days', 'day', 'd', 'dates', 'date', 'D', 'hours', 'hour', 'h', 'minutes', 'minute', 'm', 'seconds', 'second', 's', 'milliseconds', 'millisecond', 'ms'],
      i,
      property,
      propertyLen = properties.length;
    for (i = 0; i < propertyLen; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }
    return objectTest && propertyTest;
  }
  function isNumberOrStringArray(input) {
    var arrayTest = isArray(input),
      dataTypeTest = false;
    if (arrayTest) {
      dataTypeTest = input.filter(function (item) {
        return !isNumber(item) && isString(input);
      }).length === 0;
    }
    return arrayTest && dataTypeTest;
  }

  function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
      propertyTest = false,
      properties = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
      i,
      property;
    for (i = 0; i < properties.length; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }
    return objectTest && propertyTest;
  }

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  }
  function calendar(time, formats) {
    // Support for single parameter, formats only overload to the calendar function
    if (arguments.length === 1) {
      if (!arguments[0]) {
        time = undefined;
        formats = undefined;
      } else if (isMomentInput(arguments[0])) {
        time = arguments[0];
        formats = undefined;
      } else if (isCalendarSpec(arguments[0])) {
        formats = arguments[0];
        time = undefined;
      }
    }
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
      sod = cloneWithOffset(now, this).startOf('day'),
      format = hooks.calendarFormat(this, sod) || 'sameElse',
      output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone$1() {
    return new Moment(this);
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || 'millisecond';
    if (units === 'millisecond') {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }
  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || 'millisecond';
    if (units === 'millisecond') {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }
  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
      localTo = isMoment(to) ? to : createLocal(to);
    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }
  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
      inputMs;
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units) || 'millisecond';
    if (units === 'millisecond') {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }
  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }
  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;
    if (!this.isValid()) {
      return NaN;
    }
    that = cloneWithOffset(input, this);
    if (!that.isValid()) {
      return NaN;
    }
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);
    switch (units) {
      case 'year':
        output = monthDiff(this, that) / 12;
        break;
      case 'month':
        output = monthDiff(this, that);
        break;
      case 'quarter':
        output = monthDiff(this, that) / 3;
        break;
      case 'second':
        output = (this - that) / 1e3;
        break;
      // 1000
      case 'minute':
        output = (this - that) / 6e4;
        break;
      // 1000 * 60
      case 'hour':
        output = (this - that) / 36e5;
        break;
      // 1000 * 60 * 60
      case 'day':
        output = (this - that - zoneDelta) / 864e5;
        break;
      // 1000 * 60 * 60 * 24, negate dst
      case 'week':
        output = (this - that - zoneDelta) / 6048e5;
        break;
      // 1000 * 60 * 60 * 24 * 7, negate dst
      default:
        output = this - that;
    }
    return asFloat ? output : absFloor(output);
  }
  function monthDiff(a, b) {
    if (a.date() < b.date()) {
      // end-of-month calculations work correct when the start month has more
      // days than the end month.
      return -monthDiff(b, a);
    }
    // difference in months
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
      // b is in (anchor - 1 month, anchor + 1 month)
      anchor = a.clone().add(wholeMonthDiff, 'months'),
      anchor2,
      adjust;
    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
      // linear across the month
      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
      // linear across the month
      adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
  function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }
  function toISOString$1(keepOffset) {
    if (!this.isValid()) {
      return null;
    }
    var utc = keepOffset !== true,
      m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
      }
    }
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }

  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */
  function inspect() {
    if (!this.isValid()) {
      return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment',
      zone = '',
      prefix,
      year,
      datetime,
      suffix;
    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
      zone = 'Z';
    }
    prefix = '[' + func + '("]';
    year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    datetime = '-MM-DD[T]HH:mm:ss.SSS';
    suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }
  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  }

  // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.
  function locale(key) {
    var newLocaleData;
    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);
      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }
      return this;
    }
  }
  var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });
  function localeData() {
    return this._locale;
  }

  var MS_PER_SECOND = 1000,
    MS_PER_MINUTE = 60 * MS_PER_SECOND,
    MS_PER_HOUR = 60 * MS_PER_MINUTE,
    MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

  // actual modulo - handles negative numbers (for dates before 1970):
  function mod(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }
  function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return new Date(y, m, d).valueOf();
    }
  }
  function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }
  function startOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }
    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch (units) {
      case 'year':
        time = startOfDate(this.year(), 0, 1);
        break;
      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;
      case 'month':
        time = startOfDate(this.year(), this.month(), 1);
        break;
      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;
      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date());
        break;
      case 'hour':
        time = this._d.valueOf();
        time -= mod(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;
      case 'minute':
        time = this._d.valueOf();
        time -= mod(time, MS_PER_MINUTE);
        break;
      case 'second':
        time = this._d.valueOf();
        time -= mod(time, MS_PER_SECOND);
        break;
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
  }
  function endOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }
    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
    switch (units) {
      case 'year':
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;
      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
      case 'month':
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;
      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;
      case 'hour':
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;
      case 'minute':
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod(time, MS_PER_MINUTE) - 1;
        break;
      case 'second':
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod(time, MS_PER_SECOND) - 1;
        break;
    }
    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
  }

  function valueOf$1() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }
  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }
  function toDate() {
    return new Date(this.valueOf());
  }
  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }
  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    };
  }
  function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function isValid() {
    return isValid$2(this);
  }
  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }
  function invalidAt() {
    return getParsingFlags(this).overflow;
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }

  addFormatToken('N', 0, 0, 'eraAbbr');
  addFormatToken('NN', 0, 0, 'eraAbbr');
  addFormatToken('NNN', 0, 0, 'eraAbbr');
  addFormatToken('NNNN', 0, 0, 'eraName');
  addFormatToken('NNNNN', 0, 0, 'eraNarrow');
  addFormatToken('y', ['y', 1], 'yo', 'eraYear');
  addFormatToken('y', ['yy', 2], 0, 'eraYear');
  addFormatToken('y', ['yyy', 3], 0, 'eraYear');
  addFormatToken('y', ['yyyy', 4], 0, 'eraYear');
  addRegexToken('N', matchEraAbbr);
  addRegexToken('NN', matchEraAbbr);
  addRegexToken('NNN', matchEraAbbr);
  addRegexToken('NNNN', matchEraName);
  addRegexToken('NNNNN', matchEraNarrow);
  addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (input, array, config, token) {
    var era = config._locale.erasParse(input, token, config._strict);
    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  });
  addRegexToken('y', matchUnsigned);
  addRegexToken('yy', matchUnsigned);
  addRegexToken('yyy', matchUnsigned);
  addRegexToken('yyyy', matchUnsigned);
  addRegexToken('yo', matchEraYearOrdinal);
  addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
  addParseToken(['yo'], function (input, array, config, token) {
    var match;
    if (config._locale._eraYearOrdinalRegex) {
      match = input.match(config._locale._eraYearOrdinalRegex);
    }
    if (config._locale.eraYearOrdinalParse) {
      array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
    } else {
      array[YEAR] = parseInt(input, 10);
    }
  });
  function localeEras(m, format) {
    var i,
      l,
      date,
      eras = this._eras || getLocale('en')._eras;
    for (i = 0, l = eras.length; i < l; ++i) {
      switch (typeof eras[i].since) {
        case 'string':
          // truncate time
          date = hooks(eras[i].since).startOf('day');
          eras[i].since = date.valueOf();
          break;
      }
      switch (typeof eras[i].until) {
        case 'undefined':
          eras[i].until = +Infinity;
          break;
        case 'string':
          // truncate time
          date = hooks(eras[i].until).startOf('day').valueOf();
          eras[i].until = date.valueOf();
          break;
      }
    }
    return eras;
  }
  function localeErasParse(eraName, format, strict) {
    var i,
      l,
      eras = this.eras(),
      name,
      abbr,
      narrow;
    eraName = eraName.toUpperCase();
    for (i = 0, l = eras.length; i < l; ++i) {
      name = eras[i].name.toUpperCase();
      abbr = eras[i].abbr.toUpperCase();
      narrow = eras[i].narrow.toUpperCase();
      if (strict) {
        switch (format) {
          case 'N':
          case 'NN':
          case 'NNN':
            if (abbr === eraName) {
              return eras[i];
            }
            break;
          case 'NNNN':
            if (name === eraName) {
              return eras[i];
            }
            break;
          case 'NNNNN':
            if (narrow === eraName) {
              return eras[i];
            }
            break;
        }
      } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
        return eras[i];
      }
    }
  }
  function localeErasConvertYear(era, year) {
    var dir = era.since <= era.until ? +1 : -1;
    if (year === undefined) {
      return hooks(era.since).year();
    } else {
      return hooks(era.since).year() + (year - era.offset) * dir;
    }
  }
  function getEraName() {
    var i,
      l,
      val,
      eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();
      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].name;
      }
      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].name;
      }
    }
    return '';
  }
  function getEraNarrow() {
    var i,
      l,
      val,
      eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();
      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].narrow;
      }
      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].narrow;
      }
    }
    return '';
  }
  function getEraAbbr() {
    var i,
      l,
      val,
      eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();
      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].abbr;
      }
      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].abbr;
      }
    }
    return '';
  }
  function getEraYear() {
    var i,
      l,
      dir,
      val,
      eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      dir = eras[i].since <= eras[i].until ? +1 : -1;

      // truncate time
      val = this.clone().startOf('day').valueOf();
      if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
        return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
      }
    }
    return this.year();
  }
  function erasNameRegex(isStrict) {
    if (!hasOwnProp(this, '_erasNameRegex')) {
      computeErasParse.call(this);
    }
    return isStrict ? this._erasNameRegex : this._erasRegex;
  }
  function erasAbbrRegex(isStrict) {
    if (!hasOwnProp(this, '_erasAbbrRegex')) {
      computeErasParse.call(this);
    }
    return isStrict ? this._erasAbbrRegex : this._erasRegex;
  }
  function erasNarrowRegex(isStrict) {
    if (!hasOwnProp(this, '_erasNarrowRegex')) {
      computeErasParse.call(this);
    }
    return isStrict ? this._erasNarrowRegex : this._erasRegex;
  }
  function matchEraAbbr(isStrict, locale) {
    return locale.erasAbbrRegex(isStrict);
  }
  function matchEraName(isStrict, locale) {
    return locale.erasNameRegex(isStrict);
  }
  function matchEraNarrow(isStrict, locale) {
    return locale.erasNarrowRegex(isStrict);
  }
  function matchEraYearOrdinal(isStrict, locale) {
    return locale._eraYearOrdinalRegex || matchUnsigned;
  }
  function computeErasParse() {
    var abbrPieces = [],
      namePieces = [],
      narrowPieces = [],
      mixedPieces = [],
      i,
      l,
      erasName,
      erasAbbr,
      erasNarrow,
      eras = this.eras();
    for (i = 0, l = eras.length; i < l; ++i) {
      erasName = regexEscape(eras[i].name);
      erasAbbr = regexEscape(eras[i].abbr);
      erasNarrow = regexEscape(eras[i].narrow);
      namePieces.push(erasName);
      abbrPieces.push(erasAbbr);
      narrowPieces.push(erasNarrow);
      mixedPieces.push(erasName);
      mixedPieces.push(erasAbbr);
      mixedPieces.push(erasNarrow);
    }
    this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
    this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
    this._erasNarrowRegex = new RegExp('^(' + narrowPieces.join('|') + ')', 'i');
  }

  // FORMATTING

  addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });
  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }
  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear');

  // ALIASES

  // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);
  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  });

  // MOMENTS

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday() + this.localeData()._week.dow, this.localeData()._week.dow, this.localeData()._week.doy);
  }
  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }
  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }
  function getISOWeeksInISOWeekYear() {
    return weeksInYear(this.isoWeekYear(), 1, 4);
  }
  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }
  function getWeeksInWeekYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
  }
  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);
      if (week > weeksTarget) {
        week = weeksTarget;
      }
      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }
  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
      date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  }

  // FORMATTING

  addFormatToken('Q', 0, 'Qo', 'quarter');

  // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  });

  // MOMENTS

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  }

  // FORMATTING

  addFormatToken('D', ['DD', 2], 'Do', 'date');

  // PARSING

  addRegexToken('D', match1to2, match1to2NoLeadingZero);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  });

  // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true);

  // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

  // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
  });

  // HELPERS

  // MOMENTS

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  }

  // FORMATTING

  addFormatToken('m', ['mm', 2], 0, 'minute');

  // PARSING

  addRegexToken('m', match1to2, match1to2HasZero);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE);

  // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false);

  // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second');

  // PARSING

  addRegexToken('s', match1to2, match1to2HasZero);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND);

  // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false);

  // FORMATTING

  addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
  });

  // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);
  var token, getSetMillisecond;
  for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
  }
  function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }
  for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
  }
  getSetMillisecond = makeGetSet('Milliseconds', false);

  // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName');

  // MOMENTS

  function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
  }
  function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto$2 = Moment.prototype;
  proto$2.add = add$1;
  proto$2.calendar = calendar;
  proto$2.clone = clone$1;
  proto$2.diff = diff;
  proto$2.endOf = endOf;
  proto$2.format = format;
  proto$2.from = from;
  proto$2.fromNow = fromNow;
  proto$2.to = to;
  proto$2.toNow = toNow;
  proto$2.get = stringGet;
  proto$2.invalidAt = invalidAt;
  proto$2.isAfter = isAfter;
  proto$2.isBefore = isBefore;
  proto$2.isBetween = isBetween;
  proto$2.isSame = isSame;
  proto$2.isSameOrAfter = isSameOrAfter;
  proto$2.isSameOrBefore = isSameOrBefore;
  proto$2.isValid = isValid;
  proto$2.lang = lang;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.max = prototypeMax;
  proto$2.min = prototypeMin;
  proto$2.parsingFlags = parsingFlags;
  proto$2.set = stringSet;
  proto$2.startOf = startOf;
  proto$2.subtract = subtract$1;
  proto$2.toArray = toArray;
  proto$2.toObject = toObject;
  proto$2.toDate = toDate;
  proto$2.toISOString = toISOString$1;
  proto$2.inspect = inspect;
  if (typeof Symbol !== 'undefined' && Symbol.for != null) {
    proto$2[Symbol.for('nodejs.util.inspect.custom')] = function () {
      return 'Moment<' + this.format() + '>';
    };
  }
  proto$2.toJSON = toJSON;
  proto$2.toString = toString;
  proto$2.unix = unix;
  proto$2.valueOf = valueOf$1;
  proto$2.creationData = creationData;
  proto$2.eraName = getEraName;
  proto$2.eraNarrow = getEraNarrow;
  proto$2.eraAbbr = getEraAbbr;
  proto$2.eraYear = getEraYear;
  proto$2.year = getSetYear;
  proto$2.isLeapYear = getIsLeapYear;
  proto$2.weekYear = getSetWeekYear;
  proto$2.isoWeekYear = getSetISOWeekYear;
  proto$2.quarter = proto$2.quarters = getSetQuarter;
  proto$2.month = getSetMonth;
  proto$2.daysInMonth = getDaysInMonth;
  proto$2.week = proto$2.weeks = getSetWeek;
  proto$2.isoWeek = proto$2.isoWeeks = getSetISOWeek;
  proto$2.weeksInYear = getWeeksInYear;
  proto$2.weeksInWeekYear = getWeeksInWeekYear;
  proto$2.isoWeeksInYear = getISOWeeksInYear;
  proto$2.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  proto$2.date = getSetDayOfMonth;
  proto$2.day = proto$2.days = getSetDayOfWeek;
  proto$2.weekday = getSetLocaleDayOfWeek;
  proto$2.isoWeekday = getSetISODayOfWeek;
  proto$2.dayOfYear = getSetDayOfYear;
  proto$2.hour = proto$2.hours = getSetHour;
  proto$2.minute = proto$2.minutes = getSetMinute;
  proto$2.second = proto$2.seconds = getSetSecond;
  proto$2.millisecond = proto$2.milliseconds = getSetMillisecond;
  proto$2.utcOffset = getSetOffset;
  proto$2.utc = setOffsetToUTC;
  proto$2.local = setOffsetToLocal;
  proto$2.parseZone = setOffsetToParsedOffset;
  proto$2.hasAlignedHourOffset = hasAlignedHourOffset;
  proto$2.isDST = isDaylightSavingTime;
  proto$2.isLocal = isLocal;
  proto$2.isUtcOffset = isUtcOffset;
  proto$2.isUtc = isUtc;
  proto$2.isUTC = isUtc;
  proto$2.zoneAbbr = getZoneAbbr;
  proto$2.zoneName = getZoneName;
  proto$2.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto$2.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto$2.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto$2.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto$2.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1000);
  }
  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
    return string;
  }

  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar$1;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime$1;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set$1;
  proto$1.eras = localeEras;
  proto$1.erasParse = localeErasParse;
  proto$1.erasConvertYear = localeErasConvertYear;
  proto$1.erasAbbrRegex = erasAbbrRegex;
  proto$1.erasNameRegex = erasNameRegex;
  proto$1.erasNarrowRegex = erasNarrowRegex;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale(),
      utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }
  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }
    format = format || '';
    if (index != null) {
      return get$1(format, index, field, 'month');
    }
    var i,
      out = [];
    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, 'month');
    }
    return out;
  }

  // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)
  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || '';
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || '';
    }
    var locale = getLocale(),
      shift = localeSorted ? locale._week.dow : 0,
      i,
      out = [];
    if (index != null) {
      return get$1(format, (index + shift) % 7, field, 'day');
    }
    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
  }
  function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
  }
  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
  }
  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }
  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }
  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
    eras: [{
      since: '0001-01-01',
      until: +Infinity,
      offset: 1,
      name: 'Anno Domini',
      narrow: 'AD',
      abbr: 'AD'
    }, {
      since: '0000-12-31',
      until: -Infinity,
      offset: 1,
      name: 'Before Christ',
      narrow: 'BC',
      abbr: 'BC'
    }],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (number) {
      var b = number % 10,
        output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  });

  // Side effect imports
  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

  var mathAbs = Math.abs;
  function abs$1() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }

  function addSubtract(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  }

  // supports only 2.0-style add(1, 's') or add(duration)
  function add(input, value) {
    return addSubtract(this, input, value, 1);
  }

  // supports only 2.0-style subtract(1, 's') or subtract(duration)
  function subtract(input, value) {
    return addSubtract(this, input, value, -1);
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds,
      days = this._days,
      months = this._months,
      data = this._data,
      seconds,
      minutes,
      hours,
      years,
      monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }
  function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
  }
  function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }
    var days,
      months,
      milliseconds = this._milliseconds;
    units = normalizeUnits(units);
    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);
      switch (units) {
        case 'month':
          return months;
        case 'quarter':
          return months / 3;
        case 'year':
          return months / 12;
      }
    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this._days + Math.round(monthsToDays(this._months));
      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5;
        case 'day':
          return days + milliseconds / 864e5;
        case 'hour':
          return days * 24 + milliseconds / 36e5;
        case 'minute':
          return days * 1440 + milliseconds / 6e4;
        case 'second':
          return days * 86400 + milliseconds / 1000;
        // Math.floor prevents floating point math errors here
        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds;
        default:
          throw new Error('Unknown unit ' + units);
      }
    }
  }
  function makeAs(alias) {
    return function () {
      return this.as(alias);
    };
  }
  var asMilliseconds = makeAs('ms'),
    asSeconds = makeAs('s'),
    asMinutes = makeAs('m'),
    asHours = makeAs('h'),
    asDays = makeAs('d'),
    asWeeks = makeAs('w'),
    asMonths = makeAs('M'),
    asQuarters = makeAs('Q'),
    asYears = makeAs('y'),
    valueOf = asMilliseconds;

  function clone() {
    return createDuration(this);
  }

  function get(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
  }
  function makeGetter(name) {
    return function () {
      return this.isValid() ? this._data[name] : NaN;
    };
  }
  var milliseconds = makeGetter('milliseconds'),
    seconds = makeGetter('seconds'),
    minutes = makeGetter('minutes'),
    hours = makeGetter('hours'),
    days = makeGetter('days'),
    months = makeGetter('months'),
    years = makeGetter('years');
  function weeks() {
    return absFloor(this.days() / 7);
  }

  var round = Math.round,
    thresholds = {
      ss: 44,
      // a few seconds to seconds
      s: 45,
      // seconds to minute
      m: 45,
      // minutes to hour
      h: 22,
      // hours to day
      d: 26,
      // days to month/week
      w: null,
      // weeks to month
      M: 11 // months to year
    };

  // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }
  function relativeTime(posNegDuration, withoutSuffix, thresholds, locale) {
    var duration = createDuration(posNegDuration).abs(),
      seconds = round(duration.as('s')),
      minutes = round(duration.as('m')),
      hours = round(duration.as('h')),
      days = round(duration.as('d')),
      months = round(duration.as('M')),
      weeks = round(duration.as('w')),
      years = round(duration.as('y')),
      a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days];
    if (thresholds.w != null) {
      a = a || weeks <= 1 && ['w'] || weeks < thresholds.w && ['ww', weeks];
    }
    a = a || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  }

  // This function allows you to set the rounding function for relative time strings
  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }
    if (typeof roundingFunction === 'function') {
      round = roundingFunction;
      return true;
    }
    return false;
  }

  // This function allows you to set a threshold for relative time strings
  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }
    if (limit === undefined) {
      return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
      thresholds.ss = limit - 1;
    }
    return true;
  }
  function humanize(argWithSuffix, argThresholds) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var withSuffix = false,
      th = thresholds,
      locale,
      output;
    if (typeof argWithSuffix === 'object') {
      argThresholds = argWithSuffix;
      argWithSuffix = false;
    }
    if (typeof argWithSuffix === 'boolean') {
      withSuffix = argWithSuffix;
    }
    if (typeof argThresholds === 'object') {
      th = Object.assign({}, thresholds, argThresholds);
      if (argThresholds.s != null && argThresholds.ss == null) {
        th.ss = argThresholds.s - 1;
      }
    }
    locale = this.localeData();
    output = relativeTime(this, !withSuffix, th, locale);
    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }
    return locale.postformat(output);
  }

  var abs = Math.abs;
  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }
  function toISOString() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var seconds = abs(this._milliseconds) / 1000,
      days = abs(this._days),
      months = abs(this._months),
      minutes,
      hours,
      years,
      s,
      total = this.asSeconds(),
      totalSign,
      ymSign,
      daysSign,
      hmsSign;
    if (!total) {
      // this is the same as C#'s (Noda) and python (isodate)...
      // but not other JS (goog.date)
      return 'P0D';
    }

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    totalSign = total < 0 ? '-' : '';
    ymSign = sign(this._months) !== sign(total) ? '-' : '';
    daysSign = sign(this._days) !== sign(total) ? '-' : '';
    hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
    return totalSign + 'P' + (years ? ymSign + years + 'Y' : '') + (months ? ymSign + months + 'M' : '') + (days ? daysSign + days + 'D' : '') + (hours || minutes || seconds ? 'T' : '') + (hours ? hmsSign + hours + 'H' : '') + (minutes ? hmsSign + minutes + 'M' : '') + (seconds ? hmsSign + s + 'S' : '');
  }

  var proto = Duration.prototype;
  proto.isValid = isValid$1;
  proto.abs = abs$1;
  proto.add = add;
  proto.subtract = subtract;
  proto.as = as;
  proto.asMilliseconds = asMilliseconds;
  proto.asSeconds = asSeconds;
  proto.asMinutes = asMinutes;
  proto.asHours = asHours;
  proto.asDays = asDays;
  proto.asWeeks = asWeeks;
  proto.asMonths = asMonths;
  proto.asQuarters = asQuarters;
  proto.asYears = asYears;
  proto.valueOf = valueOf;
  proto._bubble = bubble;
  proto.clone = clone;
  proto.get = get;
  proto.milliseconds = milliseconds;
  proto.seconds = seconds;
  proto.minutes = minutes;
  proto.hours = hours;
  proto.days = days;
  proto.weeks = weeks;
  proto.months = months;
  proto.years = years;
  proto.humanize = humanize;
  proto.toISOString = toISOString;
  proto.toString = toISOString;
  proto.toJSON = toISOString;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString);
  proto.lang = lang;

  // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf');

  // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input) * 1000);
  });
  addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
  });

  //! moment.js
  hooks.version = '2.30.1';
  setHookCallback(createLocal);
  hooks.fn = proto$2;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid$1;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto$2;

  // currently HTML5 input type only supports 24-hour formats
  hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',
    // <input type="date" />
    TIME: 'HH:mm',
    // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',
    // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',
    // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',
    // <input type="week" />
    MONTH: 'YYYY-MM' // <input type="month" />
  };

  //! moment.js locale configuration
  function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }
  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      ss: withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
      mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
      hh: 'час_часа_часов',
      dd: 'день_дня_дней',
      ww: 'неделя_недели_недель',
      MM: 'месяц_месяца_месяцев',
      yy: 'год_года_лет'
    };
    if (key === 'm') {
      return withoutSuffix ? 'минута' : 'минуту';
    } else {
      return number + ' ' + plural(format[key], +number);
    }
  }
  var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

  // http://new.gramota.ru/spravka/rules/139-prop : § 103
  // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
  // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
  hooks.defineLocale('ru', {
    months: {
      format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
      standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
    },
    monthsShort: {
      // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку?
      format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
      standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
    },
    weekdays: {
      standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
      format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
      isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/
    },
    weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
    // Выражение, которое соответствует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY г.',
      LLL: 'D MMMM YYYY г., H:mm',
      LLLL: 'dddd, D MMMM YYYY г., H:mm'
    },
    calendar: {
      sameDay: '[Сегодня, в] LT',
      nextDay: '[Завтра, в] LT',
      lastDay: '[Вчера, в] LT',
      nextWeek: function (now) {
        if (now.week() !== this.week()) {
          switch (this.day()) {
            case 0:
              return '[В следующее] dddd, [в] LT';
            case 1:
            case 2:
            case 4:
              return '[В следующий] dddd, [в] LT';
            case 3:
            case 5:
            case 6:
              return '[В следующую] dddd, [в] LT';
          }
        } else {
          if (this.day() === 2) {
            return '[Во] dddd, [в] LT';
          } else {
            return '[В] dddd, [в] LT';
          }
        }
      },
      lastWeek: function (now) {
        if (now.week() !== this.week()) {
          switch (this.day()) {
            case 0:
              return '[В прошлое] dddd, [в] LT';
            case 1:
            case 2:
            case 4:
              return '[В прошлый] dddd, [в] LT';
            case 3:
            case 5:
            case 6:
              return '[В прошлую] dddd, [в] LT';
          }
        } else {
          if (this.day() === 2) {
            return '[Во] dddd, [в] LT';
          } else {
            return '[В] dddd, [в] LT';
          }
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'через %s',
      past: '%s назад',
      s: 'несколько секунд',
      ss: relativeTimeWithPlural,
      m: relativeTimeWithPlural,
      mm: relativeTimeWithPlural,
      h: 'час',
      hh: relativeTimeWithPlural,
      d: 'день',
      dd: relativeTimeWithPlural,
      w: 'неделя',
      ww: relativeTimeWithPlural,
      M: 'месяц',
      MM: relativeTimeWithPlural,
      y: 'год',
      yy: relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM: function (input) {
      return /^(дня|вечера)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ночи';
      } else if (hour < 12) {
        return 'утра';
      } else if (hour < 17) {
        return 'дня';
      } else {
        return 'вечера';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'M':
        case 'd':
        case 'DDD':
          return number + '-й';
        case 'D':
          return number + '-го';
        case 'w':
        case 'W':
          return number + '-я';
        default:
          return number;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
  });

  function _callSuper$e(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsDateHuman = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsDateHuman(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsDateHuman);
      options = $.extend(true, {
        type: 'dateHuman',
        field: null,
        label: null,
        show: true,
        width: null,
        attr: {},
        attrHeader: {},
        render: null
      }, options);
      _this2 = _callSuper$e(this, ColumnsDateHuman, [table, options]);
      _defineProperty(_this2, "_lang", null);
      _this2._lang = table.getOptions().lang;
      return _this2;
    }

    /**
     * Формирование контента
     * @param {string|number|Date} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsDateHuman, _Column);
    return _createClass(ColumnsDateHuman, [{
      key: "render",
      value: function render(content, record) {
        if (['string', 'number'].indexOf(_typeof(content)) < 0 || !content instanceof Date) {
          return '';
        }
        try {
          if (content !== '') {
            var dateContent = content instanceof Date ? content : new Date(content);
            var dateFormat = hooks(dateContent).format('MM.DD.yyyy HH:mm:ss');
            content = hooks(dateContent).locale(this._lang).fromNow();
            content = '<span title="' + dateFormat + '">' + content + '</span>';
          }
        } catch (e) {
          console.warn(e);
        }
        return content;
      }
    }]);
  }(Column);

  function _callSuper$d(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsHtml = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsHtml(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsHtml);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$d(this, ColumnsHtml, [table, options]);
      var tableOptions = _this2._table.getOptions();
      if (_this2._options.noWrap || _this2._options.noWrap === null && tableOptions.noWrap) {
        if (!_this2._options.attr) {
          _this2._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          _this2._options.attr = coreuiTableUtils.mergeAttr(_this2._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        _this2._options.noWrap = true;
        if (_this2._options.noWrapToggle || _this2._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          _this2._options.noWrapToggle = true;
        }
      }
      return _this2;
    }

    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    _inherits(ColumnsHtml, _Column);
    return _createClass(ColumnsHtml, [{
      key: "convertToString",
      value: function convertToString(columnValue) {
        if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
          return String(columnValue).replace(/<[^>]*>?/gm, '');
        } else {
          return '';
        }
      }

      /**
       * Формирование контента
       * @param {string|HTMLElement|jQuery} content
       * @param {object}                    record
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  function _callSuper$c(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsNumber = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsNumber(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsNumber);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$c(this, ColumnsNumber, [table, options]);
      var tableOptions = _this2._table.getOptions();
      if (_this2._options.noWrap || _this2._options.noWrap === null && tableOptions.noWrap) {
        if (!_this2._options.attr) {
          _this2._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          _this2._options.attr = coreuiTableUtils.mergeAttr(_this2._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        _this2._options.noWrap = true;
        if (_this2._options.noWrapToggle || _this2._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          _this2._options.noWrapToggle = true;
        }
      }
      return _this2;
    }

    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsNumber, _Column);
    return _createClass(ColumnsNumber, [{
      key: "render",
      value: function render(content, record) {
        if (['string', 'bigint', 'symbol', 'number'].indexOf(_typeof(content)) < 0) {
          return '';
        }
        content = String(content).replace(/,/g, '.').replace(/[^0-9\-\.]/g, '').replace(/[\s]{2,}/g, ' ').replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, '$1 ').replace(/\- /g, '-');
        if (this._options.noWrap) {
          content = '<div>' + content + '</div>';
          if (this._options.noWrapToggle) {
            content += '<i class="bi bi-caret-down-fill toggle"></i>';
          }
        }
        return content;
      }
    }]);
  }(Column);

  function _callSuper$b(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsMoney = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsMoney(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsMoney);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$b(this, ColumnsMoney, [table, options]);
      var tableOptions = _this2._table.getOptions();
      if (_this2._options.noWrap || _this2._options.noWrap === null && tableOptions.noWrap) {
        if (!_this2._options.attr) {
          _this2._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          _this2._options.attr = coreuiTableUtils.mergeAttr(_this2._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        _this2._options.noWrap = true;
        if (_this2._options.noWrapToggle || _this2._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          _this2._options.noWrapToggle = true;
        }
      }
      return _this2;
    }

    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    _inherits(ColumnsMoney, _Column);
    return _createClass(ColumnsMoney, [{
      key: "convertToString",
      value: function convertToString(columnValue) {
        var content = '';
        if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
          if (isNaN(content)) {
            content = content.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
          } else {
            content = Number(content).toFixed(2).toString();
            content = content.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
          }
        }
        return content;
      }

      /**
       * Формирование контента
       * @param {string} content
       * @param {object} record
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  function _callSuper$a(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsNumbers = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsNumbers(table, options) {
      _classCallCheck(this, ColumnsNumbers);
      options = $.extend(true, {
        type: 'numbers',
        label: '№',
        width: 20,
        attr: {
          "class": 'text-end'
        },
        attrHeader: null
      }, options);
      return _callSuper$a(this, ColumnsNumbers, [table, options]);
    }

    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsNumbers, _Column);
    return _createClass(ColumnsNumbers, [{
      key: "render",
      value: function render(content, record) {
        return this._table._recordsNumber;
      }
    }]);
  }(Column);

  function _callSuper$9(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsSelect = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsSelect(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsSelect);
      var originalOptions = {
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
      };
      if (options.hasOwnProperty('attr')) {
        options.attr = coreuiTableUtils.mergeAttr(originalOptions.attr, options.attr);
      }
      if (options.hasOwnProperty('attrHeader')) {
        options.attrHeader = coreuiTableUtils.mergeAttr(originalOptions.attrHeader, options.attrHeader);
      }
      options = $.extend(true, originalOptions, options);
      _this2 = _callSuper$9(this, ColumnsSelect, [table, options]);
      _this2._options.label = tpl['columns/select_label.html'];

      // Показ строк
      table.on('records_show', function () {
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
      return _this2;
    }

    /**
     * Получение списка методов которые можно совершать с ячейкой строки
     * @param {jQuery} content
     * @param {string} field
     * @param {object} record
     */
    _inherits(ColumnsSelect, _Column);
    return _createClass(ColumnsSelect, [{
      key: "getActions",
      value: function getActions(content, field, record) {
        return {
          setActive: function setActive() {
            if (content) {
              $(content).prop('checked', true).trigger('click');
            }
          },
          setInactive: function setInactive() {
            if (content) {
              $(content).prop('checked', false).trigger('click');
            }
          }
        };
      }

      /**
       * Формирование контента
       * @param {string} content
       * @param {object} record
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render(content, record) {
        var select = $(coreuiTableUtils.render(tpl['columns/select.html'], {
          index: record.index
        }));
        var that = this;

        // Выбор строки
        select.click(function () {
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
    }]);
  }(Column);

  function _callSuper$8(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsSwitch = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsSwitch(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsSwitch);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$8(this, ColumnsSwitch, [table, options]);

      // Показ строк
      table.on('records_show', function () {
        var containers = coreuiTableElements.getRowsSwitches(table.getId());

        // Отмена обработки нажатия в switch колонках
        containers.click(function (event) {
          event.stopPropagation();
        });
      });
      return _this2;
    }

    /**
     * Получение списка методов которые можно совершать с ячейкой строки
     * @param {jQuery} content
     * @param {string} field
     * @param {object} record
     */
    _inherits(ColumnsSwitch, _Column);
    return _createClass(ColumnsSwitch, [{
      key: "getActions",
      value: function getActions(content, field, record) {
        return {
          /**
           * Активация переключателя
           */
          setActive: function setActive() {
            if (content) {
              $('.coreui-table__switch', content).prop('checked', true).trigger('change');
            }
          },
          /**
           * Деактивация переключателя
           */
          setInactive: function setInactive() {
            if (content) {
              $('.coreui-table__switch', content).prop('checked', false).trigger('change');
            }
          }
        };
      }

      /**
       * Формирование контента
       * @param {string} content
       * @param {object} record
       * @returns {jQuery}
       */
    }, {
      key: "render",
      value: function render(content, record) {
        var isChecked = content === this._options.valueY;
        var formSwitch = $(coreuiTableUtils.render(tpl['columns/switch.html'], {
          index: record.index,
          field: this._options.field,
          disabled: this._options.disabled,
          checked: isChecked
        }));

        // События нажатия на переключатель
        var that = this;
        var table = this._table;
        $('.coreui-table__switch', formSwitch).change(function (event) {
          var input = this;
          table._records.map(function (recordTable) {
            if (record.index === recordTable.index) {
              recordTable.data[that._options.field] = input.checked ? that._options.valueY : that._options.valueN;
              return false;
            }
          });
          if (that._options.hasOwnProperty('onChange') && (typeof that._options.onChange === 'function' || typeof that._options.onChange === 'string')) {
            if (typeof that._options.onChange === 'function') {
              that._options.onChange(record, input);
            } else {
              var func = new Function('record', 'input', that._options.onChange);
              func(record, input);
            }
            return false;
          }
        });
        return formSwitch;
      }
    }]);
  }(Column);

  function _callSuper$7(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsText = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsText(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsText);
      options = $.extend(true, {
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
      }, options);
      _this2 = _callSuper$7(this, ColumnsText, [table, options]);
      var tableOptions = _this2._table.getOptions();
      if (_this2._options.noWrap || _this2._options.noWrap === null && tableOptions.noWrap) {
        if (!_this2._options.attr) {
          _this2._options.attr = {
            "class": 'coreui_table__no-wrap'
          };
        } else {
          _this2._options.attr = coreuiTableUtils.mergeAttr(_this2._options.attr, {
            "class": 'coreui_table__no-wrap'
          });
        }
        _this2._options.noWrap = true;
        if (_this2._options.noWrapToggle || _this2._options.noWrapToggle === null && tableOptions.noWrapToggle) {
          _this2._options.noWrapToggle = true;
        }
      }
      return _this2;
    }

    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsText, _Column);
    return _createClass(ColumnsText, [{
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  function _callSuper$6(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsButton = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsButton(table, options) {
      _classCallCheck(this, ColumnsButton);
      options = $.extend(true, {
        type: 'button',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null
      }, options);
      return _callSuper$6(this, ColumnsButton, [table, options]);
    }

    /**
     * Формирование контента
     * @param {object} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsButton, _Column);
    return _createClass(ColumnsButton, [{
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  function _callSuper$5(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsLink = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsLink(table, options) {
      _classCallCheck(this, ColumnsLink);
      options = $.extend(true, {
        type: 'link',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null
      }, options);
      return _callSuper$5(this, ColumnsLink, [table, options]);
    }

    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    _inherits(ColumnsLink, _Column);
    return _createClass(ColumnsLink, [{
      key: "convertToString",
      value: function convertToString(columnValue) {
        if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
          return String(columnValue);
        } else if (_typeof(columnValue) === 'object' && columnValue.hasOwnProperty('content') && typeof columnValue.content === 'string') {
          return columnValue.content;
        } else {
          return '';
        }
      }

      /**
       * Формирование контента
       * @param {object|string} content
       * @param {object}        record
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  function _callSuper$4(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsMenu = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsMenu(table, options) {
      _classCallCheck(this, ColumnsMenu);
      options = $.extend(true, {
        type: 'menu',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null
      }, options);
      return _callSuper$4(this, ColumnsMenu, [table, options]);
    }

    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    _inherits(ColumnsMenu, _Column);
    return _createClass(ColumnsMenu, [{
      key: "render",
      value: function render(content, record) {
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
        if (content.hasOwnProperty('attr') && coreuiTableUtils.isObject(content.attr)) {
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
    }]);
  }(Column);

  function _callSuper$3(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsBadge = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsBadge(table, options) {
      _classCallCheck(this, ColumnsBadge);
      options = $.extend(true, {
        type: 'badge',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null
      }, options);
      return _callSuper$3(this, ColumnsBadge, [table, options]);
    }

    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    _inherits(ColumnsBadge, _Column);
    return _createClass(ColumnsBadge, [{
      key: "convertToString",
      value: function convertToString(columnValue) {
        if (typeof columnValue === 'string') {
          return columnValue;
        } else if (typeof columnValue === 'number') {
          return String(columnValue);
        } else if (_typeof(columnValue) === 'object' && columnValue.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(columnValue.text)) >= 0) {
          return String(columnValue.text);
        } else {
          return '';
        }
      }

      /**
       * Формирование контента
       * @param {object|string|number} content
       * @param {object}               record
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  function _callSuper$2(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsComponent = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsComponent(table, options) {
      _classCallCheck(this, ColumnsComponent);
      options = $.extend(true, {
        type: 'component',
        field: null,
        label: null,
        show: true,
        width: null,
        minWidth: null,
        maxWidth: null
      }, options);
      return _callSuper$2(this, ColumnsComponent, [table, options]);
    }

    /**
     * Формирование контента
     * @param {object|string} content
     * @param {object}        record
     * @returns {string}
     */
    _inherits(ColumnsComponent, _Column);
    return _createClass(ColumnsComponent, [{
      key: "render",
      value: function render(content, record) {
        if (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('component') || typeof content.component !== 'string' || !content.component) {
          return '';
        }
        return coreuiTableRender.renderComponents(this._table, content, 'records_show');
      }
    }]);
  }(Column);

  function _callSuper$1(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsProgress = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsProgress(table, options) {
      _classCallCheck(this, ColumnsProgress);
      options = $.extend(true, {
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
      }, options);
      return _callSuper$1(this, ColumnsProgress, [table, options]);
    }

    /**
     * Конвертирование значения колонки в текст
     * @param {*} columnValue
     * @returns {string}
     */
    _inherits(ColumnsProgress, _Column);
    return _createClass(ColumnsProgress, [{
      key: "convertToString",
      value: function convertToString(columnValue) {
        if (['string', 'number'].indexOf(_typeof(columnValue)) >= 0) {
          return String(columnValue);
        } else if (_typeof(columnValue) === 'object' && columnValue.hasOwnProperty('percent') && ['string', 'number'].indexOf(_typeof(columnValue.percent)) >= 0) {
          return String(columnValue.percent);
        } else {
          return '';
        }
      }

      /**
       * Формирование контента
       * @param {object|string|number} content
       * @param {object}              record
       * @returns {string}
       */
    }, {
      key: "render",
      value: function render(content, record) {
        if (!coreuiTableUtils.isNumeric(content) && (!coreuiTableUtils.isObject(content) || !content.hasOwnProperty('percent') || !coreuiTableUtils.isNumeric(content.percent))) {
          return '';
        }
        var description = null;
        var percent = 0;
        var percentText = '';
        var color = typeof this._options.barColor === 'string' ? this._options.barColor : 'primary';
        var attr = this._options.attr;
        attr = coreuiTableUtils.mergeAttr(attr, {
          "class": 'progress me-1'
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
    }]);
  }(Column);

  function _callSuper(_this, derived, args) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      } catch (e) {
        return false;
      }
    }
    derived = _getPrototypeOf(derived);
    return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
  }
  var ColumnsImage = /*#__PURE__*/function (_Column) {
    /**
     * Инициализация
     * @param {coreuiTableInstance} table
     * @param {Object}              options
     */
    function ColumnsImage(table, options) {
      var _this2;
      _classCallCheck(this, ColumnsImage);
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
        imgStyle: null
      }, options);
      _this2 = _callSuper(this, ColumnsImage, [table, options]);
      _this2._table = table;
      _this2._options = $.extend(true, {}, _this2._options, options);
      return _this2;
    }

    /**
     * Формирование контента
     * @param {string} content
     * @param {object} record
     * @returns {string}
     */
    _inherits(ColumnsImage, _Column);
    return _createClass(ColumnsImage, [{
      key: "render",
      value: function render(content, record) {
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
    }]);
  }(Column);

  coreuiTable.lang.ru = langRu;
  coreuiTable.lang.en = langEn;
  coreuiTable.controls.link = ControlLink;
  coreuiTable.controls.button = ControlButton;
  coreuiTable.controls.dropdown = ControlDropdown;
  coreuiTable.controls.buttonGroup = ControlButtonGroup;
  coreuiTable.controls.custom = ControlCustom;
  coreuiTable.controls.pageSize = ControlPageSize;
  coreuiTable.controls.pageJump = ControlPageJump;
  coreuiTable.controls.pages = ControlPages;
  coreuiTable.controls.total = ControlTotal;
  coreuiTable.controls.search = ControlSearch;
  coreuiTable.controls.columns = ControlColumns;
  coreuiTable.controls.caption = ControlCaption;
  coreuiTable.controls.filterClear = ControlFilterClear;
  coreuiTable.controls.divider = ControlDivider;
  coreuiTable.filters.text = FilterText;
  coreuiTable.filters.number = FilterNumber;
  coreuiTable.filters.date = FilterDate;
  coreuiTable.filters.datetime = FilterDatetime;
  coreuiTable.filters.dateMonth = FilterDateMonth;
  coreuiTable.filters.dateRange = FilterDateRange;
  coreuiTable.filters.datetimeRange = FilterDatetimeRange;
  coreuiTable.filters.checkbox = FilterCheckbox;
  coreuiTable.filters.radio = FilterRadio;
  coreuiTable.filters.select = FilterSelect;
  coreuiTable.filters["switch"] = FilterSwitch;
  coreuiTable.search.text = SearchText;
  coreuiTable.search.number = SearchNumber;
  coreuiTable.search.date = SearchDate;
  coreuiTable.search.dateMonth = SearchDateMonth;
  coreuiTable.search.datetime = SearchDatetime;
  coreuiTable.search.dateRange = SearchDateRange;
  coreuiTable.search.datetimeRange = SearchDatetimeRange;
  coreuiTable.search.checkbox = SearchCheckbox;
  coreuiTable.search.checkboxBtn = SearchCheckboxBtn;
  coreuiTable.search.radio = SearchRadio;
  coreuiTable.search.radioBtn = SearchRadioBtn;
  coreuiTable.search.select = SearchSelect;
  coreuiTable.search["switch"] = SearchSwitch;
  coreuiTable.columns.date = ColumnsDate;
  coreuiTable.columns.datetime = ColumnsDatetime;
  coreuiTable.columns.dateHuman = ColumnsDateHuman;
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
