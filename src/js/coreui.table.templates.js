//HEAD 
window["CoreUI"]["table"]["tpl"] = {};

window["CoreUI"]["table"]["tpl"]["table-columns-footer.html"] = "<tr class=\"bg-white\">\n" +
    "  <% $.each(columns, function(key, column) { %>\n" +
    "  <td<%- column.attr%>><%- column.label %></td>\n" +
    "  <% }); %>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-columns.html"] = "<tr class=\"fw-medium bg-white\">\n" +
    "  <% $.each(columns, function(key, column) { %>\n" +
    "  <td<%- column.attr%>><%- column.label %></td>\n" +
    "  <% }); %>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-loader.html"] = "<div class=\"coreui-table-lock position-absolute w-100 top-0 bottom-0\">\n" +
    "    <div class=\"coreui-table-block bg-secondary-subtle position-absolute opacity-50 w-100 top-0 bottom-0\"></div>\n" +
    "    <div class=\"coreui-table-message position-relative d-flex align-content-center justify-content-start gap-2 mt-3 py-1 px-2 m-auto border border-secondary-subtle rounded-3 bg-body-secondary\">\n" +
    "        <div class=\"spinner-border text-secondary align-self-center\"></div>\n" +
    "        <span class=\"lh-lg\"><%= lang.loading %></span>\n" +
    "    </div>\n" +
    "</div>"; 

window["CoreUI"]["table"]["tpl"]["table-pages.html"] = "<tr class=\"bg-white\">\n" +
    "    <td colspan=\"<%= columnsCount %>\">\n" +
    "        <div class=\"d-flex justify-content-between\">\n" +
    "            <% if (table.show.pagesJump) { %>\n" +
    "            <div class=\"coreui-table__page_go_container float-start\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input type=\"number\" class=\"form-control form-control-sm\" min=\"1\">\n" +
    "                    <button class=\"coreui-table__page_go btn btn-sm btn-outline-secondary border-secondary-subtle\" type=\"button\">\n" +
    "                        <i class=\"bi bi-chevron-compact-right\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "\n" +
    "            <% if (table.show.pages) { %>\n" +
    "            <div class=\"coreui-table__pages_container text-center\">\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary coreui-table__page_prev\"<% if ( ! prevPage) { %> disabled=\"disabled\"<% } %>>\n" +
    "                    <i class=\"bi bi-chevron-compact-left\"></i>\n" +
    "                </button>\n" +
    "\n" +
    "                <small>\n" +
    "                    <span class=\"coreui-table__page_current\"><%= currentPage %></span>\n" +
    "                    <%= lang.of %>\n" +
    "                    <span class=\"coreui-table__pages_total\"><%= pagesTotal %></span>\n" +
    "                </small>\n" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary coreui-table__page_next\"<% if ( ! nextPage) { %> disabled=\"disabled\"<% } %>>\n" +
    "                    <i class=\"bi bi-chevron-compact-right\"></i>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "\n" +
    "            <% if (table.show.prePageList) { %>\n" +
    "            <div class=\"coreui-table__pages_list_container float-end\">\n" +
    "                <select class=\"form-select form-select-sm\">\n" +
    "                    <% $.each(recordsPerPageList, function(key, count) { %>\n" +
    "                    <option value=\"<%= count %>\"<% if (recordsPerPage == count) { %>selected=\"selected\"<% } %>>\n" +
    "                        <% if (count == '0') { %><%= lang.all %><% } else { %><%= count %><% } %>\n" +
    "                    </option>\n" +
    "                    <% }); %>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "        </div>\n" +
    "    </td>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-records-empty.html"] = "<tr>\n" +
    "    <td class=\"text-center\" colspan=\"<%= columnsCount %>\"><%= lang.emptyRecords %></td>\n" +
    "</tr>"; 

window["CoreUI"]["table"]["tpl"]["table-records.html"] = "<% $.each(records, function(key, record) { %>\n" +
    "    <tr<%- record.attr %> data-record-key=\"<%= key %>\">\n" +
    "        <% $.each(record.fields, function(key2, field) { %>\n" +
    "            <td<%- field.attr %>><%- field.content %></td>\n" +
    "        <% }); %>\n" +
    "    </tr>\n" +
    "<% }); %>"; 

window["CoreUI"]["table"]["tpl"]["table.html"] = "\n" +
    "<div id=\"coreui-table-<%= table.id %>\" class=\"coreui-table\"<%- render.attr %>\n" +
    "     <% if (widthSizes) { %>style=\"<%= widthSizes.join(';') %>\"<% } %>>\n" +
    "    <% if (render.controls.length > 0) { %>\n" +
    "        <div class=\"coreui-table__controls d-flex justify-content-start gap-2 flex-wrap mb-3 align-items-center\">\n" +
    "            <% $.each(render.controls, function(key, control) { %>\n" +
    "                <div id=\"coreui-table-control-<%= control.id %>\" class=\"coreui-table__control\">\n" +
    "                    <%- control.content %>\n" +
    "                </div>\n" +
    "            <% }); %>\n" +
    "        </div>\n" +
    "    <% } %>\n" +
    "\n" +
    "\n" +
    "    <div class=\"coreui-table__container bg-white position-relative rounded-1 border border-1\">\n" +
    "        <% if (table.show.total) { %>\n" +
    "        <div class=\"ps-2 lh-lg border-bottom\">\n" +
    "            <small><%= lang.total %>: <span class=\"coreui-table__count-total\"><%= recordsTotal %></span></small>\n" +
    "        </div>\n" +
    "        <% } %>\n" +
    "\n" +
    "        <div class=\"coreui-table__wrapper table-responsive overflow-x-auto\" <% if (heightSizes) { %>style=\"<%= heightSizes.join(';') %>\"<% } %>>\n" +
    "            <table class=\"table table-sm table-hover table-striped mb-0 <%= table.class %>\">\n" +
    "                <colgroup>\n" +
    "                    <% $.each(render.columnGroups, function(key, columnGroup) { %>\n" +
    "                    <col<% if (columnGroup.width) { %> style=\"width: <%= (columnGroup.width.toString() + columnGroup.unit) %>\"<% } %>>\n" +
    "                    <% }); %>\n" +
    "                </colgroup>\n" +
    "                <% if (table.show.columnHeaders) { %>\n" +
    "                <thead>\n" +
    "                    <%- render.columnsHeader %>\n" +
    "                    <%- render.columns %>\n" +
    "                </thead>\n" +
    "                <% } %>\n" +
    "                <tbody class=\"border-secondary-subtle\">\n" +
    "                    <%- render.records %>\n" +
    "                </tbody>\n" +
    "                <% if (render.footer != '' || render.pages != '') { %>\n" +
    "                <tfoot>\n" +
    "                    <%- render.footer %>\n" +
    "                    <%- render.pages %>\n" +
    "                </tfoot>\n" +
    "                <% } %>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"; 

window["CoreUI"]["table"]["tpl"]["controls/button.html"] = "<button type=\"button\"<%- render.attr %>>\n" +
    "<%- control.content %>\n" +
    "</button>"; 

window["CoreUI"]["table"]["tpl"]["controls/link.html"] = "<a href=\"<%- control.href %>\"<%- render.attr %>><%- control.content %></a>"; 
// END 