
import coreuiTable from "./coreui.table";

import langEn from "./lang/en";
import langRu from "./lang/ru";

import ControlLink        from "./controls/link";
import ControlButton      from "./controls/button";
import ControlDropdown    from "./controls/dropdown";
import ControlButtonGroup from "./controls/button_group";
import ControlCustom      from "./controls/custom";
import ControlPageSize    from "./controls/page_size";
import ControlPageJump    from "./controls/page_jump";
import ControlPages       from "./controls/pages";
import ControlTotal       from "./controls/total";
import ControlSearch      from "./controls/search";
import ControlColumns     from "./controls/columns";
import ControlCaption     from "./controls/caption";
import ControlFilterClear from "./controls/filter_clear";
import ControlDivider     from "./controls/divider";

import FilterText           from "./filters/text";
import FilterNumber         from "./filters/number";
import FilterDate           from "./filters/date";
import FilterDatetime       from "./filters/datetime";
import FilterDateMonth      from "./filters/date_month";
import FilterDateRange      from "./filters/date_range";
import FilterDatetimeRange  from "./filters/datetime_range";
import FilterCheckbox       from "./filters/checkbox";
import FilterRadio          from "./filters/radio";
import FilterSelect         from "./filters/select";
import FilterSwitch         from "./filters/switch";

import SearchText          from "./search/text";
import SearchNumber        from "./search/number";
import SearchDate          from "./search/date";
import SearchDateMonth     from "./search/date_month";
import SearchDatetime      from "./search/datetime";
import SearchDateRange     from "./search/date_range";
import SearchDatetimeRange from "./search/datetime_range";
import SearchCheckbox      from "./search/checkbox";
import SearchCheckboxBtn   from "./search/checkboxBtn";
import SearchRadio         from "./search/radio";
import SearchRadioBtn      from "./search/radioBtn";
import SearchSelect        from "./search/select";
import SearchSwitch        from "./search/switch";

import ColumnsDate       from "./columns/date";
import ColumnsDatetime   from "./columns/datetime";
import ColumnsDateHuman  from "./columns/date_human";
import ColumnsHtml       from "./columns/html";
import ColumnsNumber     from "./columns/number";
import ColumnsMoney      from "./columns/money";
import ColumnsNumbers    from "./columns/numbers";
import ColumnsSelect     from "./columns/select";
import ColumnsSwitch     from "./columns/switch";
import ColumnsText       from "./columns/text";
import ColumnsButton     from "./columns/button";
import ColumnsLink       from "./columns/link";
import ColumnsMenu       from "./columns/menu";
import ColumnsBadge      from "./columns/badge";
import ColumnsComponent  from "./columns/component";
import ColumnsProgress   from "./columns/progress";
import ColumnsImage      from "./columns/image";


coreuiTable.lang.ru = langRu;
coreuiTable.lang.en = langEn;

coreuiTable.controls.link        = ControlLink;
coreuiTable.controls.button      = ControlButton;
coreuiTable.controls.dropdown    = ControlDropdown;
coreuiTable.controls.buttonGroup = ControlButtonGroup;
coreuiTable.controls.custom      = ControlCustom;
coreuiTable.controls.pageSize    = ControlPageSize;
coreuiTable.controls.pageJump    = ControlPageJump;
coreuiTable.controls.pages       = ControlPages;
coreuiTable.controls.total       = ControlTotal;
coreuiTable.controls.search      = ControlSearch;
coreuiTable.controls.columns     = ControlColumns;
coreuiTable.controls.caption     = ControlCaption;
coreuiTable.controls.filterClear = ControlFilterClear;
coreuiTable.controls.divider     = ControlDivider;

coreuiTable.filters.text          = FilterText;
coreuiTable.filters.number        = FilterNumber;
coreuiTable.filters.date          = FilterDate;
coreuiTable.filters.datetime      = FilterDatetime;
coreuiTable.filters.dateMonth     = FilterDateMonth;
coreuiTable.filters.dateRange     = FilterDateRange;
coreuiTable.filters.datetimeRange = FilterDatetimeRange;
coreuiTable.filters.checkbox      = FilterCheckbox;
coreuiTable.filters.radio         = FilterRadio;
coreuiTable.filters.select        = FilterSelect;
coreuiTable.filters.switch        = FilterSwitch;

coreuiTable.search.text          = SearchText;
coreuiTable.search.number        = SearchNumber;
coreuiTable.search.date          = SearchDate;
coreuiTable.search.dateMonth     = SearchDateMonth;
coreuiTable.search.datetime      = SearchDatetime;
coreuiTable.search.dateRange     = SearchDateRange;
coreuiTable.search.datetimeRange = SearchDatetimeRange;
coreuiTable.search.checkbox      = SearchCheckbox;
coreuiTable.search.checkboxBtn   = SearchCheckboxBtn;
coreuiTable.search.radio         = SearchRadio;
coreuiTable.search.radioBtn      = SearchRadioBtn;
coreuiTable.search.select        = SearchSelect;
coreuiTable.search.switch        = SearchSwitch;

coreuiTable.columns.date      = ColumnsDate;
coreuiTable.columns.datetime  = ColumnsDatetime;
coreuiTable.columns.dateHuman = ColumnsDateHuman;
coreuiTable.columns.html      = ColumnsHtml;
coreuiTable.columns.number    = ColumnsNumber;
coreuiTable.columns.money     = ColumnsMoney;
coreuiTable.columns.numbers   = ColumnsNumbers;
coreuiTable.columns.select    = ColumnsSelect;
coreuiTable.columns.switch    = ColumnsSwitch;
coreuiTable.columns.text      = ColumnsText;
coreuiTable.columns.button    = ColumnsButton;
coreuiTable.columns.link      = ColumnsLink;
coreuiTable.columns.menu      = ColumnsMenu;
coreuiTable.columns.badge     = ColumnsBadge;
coreuiTable.columns.component = ColumnsComponent;
coreuiTable.columns.progress  = ColumnsProgress;
coreuiTable.columns.image     = ColumnsImage;


export default coreuiTable;