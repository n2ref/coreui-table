
import Controller from "./js/controller";

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

import ColumnDate      from "./js/columns/date";
import ColumnDatetime  from "./js/columns/datetime";
import ColumnDateHuman from "./js/columns/date_human";
import ColumnHtml      from "./js/columns/html";
import ColumnNumber    from "./js/columns/number";
import ColumnMoney     from "./js/columns/money";
import ColumnNumbers   from "./js/columns/numbers";
import ColumnSelect    from "./js/columns/select";
import ColumnSwitch    from "./js/columns/switch";
import ColumnText      from "./js/columns/text";
import ColumnButton    from "./js/columns/button";
import ColumnLink      from "./js/columns/link";
import ColumnMenu      from "./js/columns/menu";
import ColumnBadge     from "./js/columns/badge";
import ColumnComponent from "./js/columns/component";
import ColumnProgress  from "./js/columns/progress";
import ColumnImage     from "./js/columns/image";


Controller.lang.ru = langRu;
Controller.lang.en = langEn;

Controller.controls.link        = ControlLink;
Controller.controls.button      = ControlButton;
Controller.controls.dropdown    = ControlDropdown;
Controller.controls.buttonGroup = ControlButtonGroup;
Controller.controls.custom      = ControlCustom;
Controller.controls.pageSize    = ControlPageSize;
Controller.controls.pageJump    = ControlPageJump;
Controller.controls.pages       = ControlPages;
Controller.controls.total       = ControlTotal;
Controller.controls.search      = ControlSearch;
Controller.controls.columns     = ControlColumns;
Controller.controls.caption     = ControlCaption;
Controller.controls.filterClear = ControlFilterClear;
Controller.controls.divider     = ControlDivider;

Controller.filters.text          = FilterText;
Controller.filters.number        = FilterNumber;
Controller.filters.date          = FilterDate;
Controller.filters.datetime      = FilterDatetime;
Controller.filters.dateMonth     = FilterDateMonth;
Controller.filters.dateRange     = FilterDateRange;
Controller.filters.datetimeRange = FilterDatetimeRange;
Controller.filters.checkbox      = FilterCheckbox;
Controller.filters.radio         = FilterRadio;
Controller.filters.select        = FilterSelect;
Controller.filters.switch        = FilterSwitch;

Controller.search.text          = SearchText;
Controller.search.number        = SearchNumber;
Controller.search.date          = SearchDate;
Controller.search.dateMonth     = SearchDateMonth;
Controller.search.datetime      = SearchDatetime;
Controller.search.dateRange     = SearchDateRange;
Controller.search.datetimeRange = SearchDatetimeRange;
Controller.search.checkbox      = SearchCheckbox;
Controller.search.checkboxBtn   = SearchCheckboxBtn;
Controller.search.radio         = SearchRadio;
Controller.search.radioBtn      = SearchRadioBtn;
Controller.search.select        = SearchSelect;
Controller.search.switch        = SearchSwitch;

Controller.columns.date      = ColumnDate;
Controller.columns.datetime  = ColumnDatetime;
Controller.columns.dateHuman = ColumnDateHuman;
Controller.columns.html      = ColumnHtml;
Controller.columns.number    = ColumnNumber;
Controller.columns.money     = ColumnMoney;
Controller.columns.numbers   = ColumnNumbers;
Controller.columns.select    = ColumnSelect;
Controller.columns.switch    = ColumnSwitch;
Controller.columns.text      = ColumnText;
Controller.columns.button    = ColumnButton;
Controller.columns.link      = ColumnLink;
Controller.columns.menu      = ColumnMenu;
Controller.columns.badge     = ColumnBadge;
Controller.columns.component = ColumnComponent;
Controller.columns.progress  = ColumnProgress;
Controller.columns.image     = ColumnImage;


export default Controller;