
import Table from "./js/table";

import langEn from "./js/lang/en";
import langRu from "./js/lang/ru";

import ControlLink        from "./js/controls/link";
import ControlButton      from "./js/controls/button";
import ControlDropdown    from "./js/controls/dropdown";
import ControlButtonGroup from "./js/controls/button_group";
import ControlCustom      from "./js/controls/custom";
import ControlPageSize    from "./js/controls/page_size";
import ControlPageJump    from "./js/controls/page_jump";
import ControlPages       from "./js/controls/pages";
import ControlTotal       from "./js/controls/total";
import ControlSearch      from "./js/controls/search";
import ControlColumns     from "./js/controls/columns";
import ControlCaption     from "./js/controls/caption";
import ControlFilterClear from "./js/controls/filter_clear";
import ControlDivider     from "./js/controls/divider";

import FilterText           from "./js/filters/text";
import FilterNumber         from "./js/filters/number";
import FilterDate           from "./js/filters/date";
import FilterDatetime       from "./js/filters/datetime";
import FilterDateMonth      from "./js/filters/date_month";
import FilterDateRange      from "./js/filters/date_range";
import FilterDatetimeRange  from "./js/filters/datetime_range";
import FilterCheckbox       from "./js/filters/checkbox";
import FilterRadio          from "./js/filters/radio";
import FilterSelect         from "./js/filters/select";
import FilterSwitch         from "./js/filters/switch";

import SearchText          from "./js/search/text";
import SearchNumber        from "./js/search/number";
import SearchDate          from "./js/search/date";
import SearchDateMonth     from "./js/search/date_month";
import SearchDatetime      from "./js/search/datetime";
import SearchDateRange     from "./js/search/date_range";
import SearchDatetimeRange from "./js/search/datetime_range";
import SearchCheckbox      from "./js/search/checkbox";
import SearchCheckboxBtn   from "./js/search/checkboxBtn";
import SearchRadio         from "./js/search/radio";
import SearchRadioBtn      from "./js/search/radioBtn";
import SearchSelect        from "./js/search/select";
import SearchSwitch        from "./js/search/switch";

import ColumnsDate       from "./js/columns/date";
import ColumnsDatetime   from "./js/columns/datetime";
import ColumnsDateHuman  from "./js/columns/date_human";
import ColumnsHtml       from "./js/columns/html";
import ColumnsNumber     from "./js/columns/number";
import ColumnsMoney      from "./js/columns/money";
import ColumnsNumbers    from "./js/columns/numbers";
import ColumnsSelect     from "./js/columns/select";
import ColumnsSwitch     from "./js/columns/switch";
import ColumnsText       from "./js/columns/text";
import ColumnsButton     from "./js/columns/button";
import ColumnsLink       from "./js/columns/link";
import ColumnsMenu       from "./js/columns/menu";
import ColumnsBadge      from "./js/columns/badge";
import ColumnsComponent  from "./js/columns/component";
import ColumnsProgress   from "./js/columns/progress";
import ColumnsImage      from "./js/columns/image";


Table.lang.ru = langRu;
Table.lang.en = langEn;

Table.controls.link        = ControlLink;
Table.controls.button      = ControlButton;
Table.controls.dropdown    = ControlDropdown;
Table.controls.buttonGroup = ControlButtonGroup;
Table.controls.custom      = ControlCustom;
Table.controls.pageSize    = ControlPageSize;
Table.controls.pageJump    = ControlPageJump;
Table.controls.pages       = ControlPages;
Table.controls.total       = ControlTotal;
Table.controls.search      = ControlSearch;
Table.controls.columns     = ControlColumns;
Table.controls.caption     = ControlCaption;
Table.controls.filterClear = ControlFilterClear;
Table.controls.divider     = ControlDivider;

Table.filters.text          = FilterText;
Table.filters.number        = FilterNumber;
Table.filters.date          = FilterDate;
Table.filters.datetime      = FilterDatetime;
Table.filters.dateMonth     = FilterDateMonth;
Table.filters.dateRange     = FilterDateRange;
Table.filters.datetimeRange = FilterDatetimeRange;
Table.filters.checkbox      = FilterCheckbox;
Table.filters.radio         = FilterRadio;
Table.filters.select        = FilterSelect;
Table.filters.switch        = FilterSwitch;

Table.search.text          = SearchText;
Table.search.number        = SearchNumber;
Table.search.date          = SearchDate;
Table.search.dateMonth     = SearchDateMonth;
Table.search.datetime      = SearchDatetime;
Table.search.dateRange     = SearchDateRange;
Table.search.datetimeRange = SearchDatetimeRange;
Table.search.checkbox      = SearchCheckbox;
Table.search.checkboxBtn   = SearchCheckboxBtn;
Table.search.radio         = SearchRadio;
Table.search.radioBtn      = SearchRadioBtn;
Table.search.select        = SearchSelect;
Table.search.switch        = SearchSwitch;

Table.columns.date      = ColumnsDate;
Table.columns.datetime  = ColumnsDatetime;
Table.columns.dateHuman = ColumnsDateHuman;
Table.columns.html      = ColumnsHtml;
Table.columns.number    = ColumnsNumber;
Table.columns.money     = ColumnsMoney;
Table.columns.numbers   = ColumnsNumbers;
Table.columns.select    = ColumnsSelect;
Table.columns.switch    = ColumnsSwitch;
Table.columns.text      = ColumnsText;
Table.columns.button    = ColumnsButton;
Table.columns.link      = ColumnsLink;
Table.columns.menu      = ColumnsMenu;
Table.columns.badge     = ColumnsBadge;
Table.columns.component = ColumnsComponent;
Table.columns.progress  = ColumnsProgress;
Table.columns.image     = ColumnsImage;


export default Table;