
class HelperColumn {

    _type        = '';
    _field       = '';
    _label       = '';
    _description = '';
    _fixed       = null;
    _isSortable  = null;
    _isShow      = null;
    _isShowLabel = null;
    _width       = null;
    _minWidth    = null;
    _maxWidth    = null;
    _menuAlways  = null;
    _attrHeader  = null;
    _props       = null;
    _menu        = [];


    /**
     * @param {string} type
     */
    constructor(type) {

        this._type = type
    }


    /**
     * Установка названия поля
     * @param {string} field
     * @return {HelperColumn}
     */
    setField(field) {

        this._field = field;
        return this;
    }


    /**
     * Установка заголовка поля
     * @param {string} label
     * @return {HelperColumn}
     */
    setLabel(label) {

        this._label = label;
        return this;
    }


    /**
     * Установка описания для колонки
     * @param {string} description
     * @return {HelperColumn}
     */
    setDescription(description) {

        this._description = description;
        return this;
    }


    /**
     * Установка признака, что колонка будет зафиксирована слева
     * @return {HelperColumn}
     */
    setFixedLeft() {

        this._fixed = 'left';
        return this;
    }


    /**
     * Установка признака, что колонка будет зафиксирована справа
     * @return {HelperColumn}
     */
    setFixedRight() {

        this._fixed = 'right';
        return this;
    }


    /**
     * Установка признака будет ли сортироваться колонка
     * @param {boolean} isSort
     * @return {HelperColumn}
     */
    setSort(isSort) {

        this._isSortable = isSort;
        return this;
    }


    /**
     * Установка признака будет ли отображаться колонка
     * @param {boolean} isShow
     * @return {HelperColumn}
     */
    setShow(isShow) {

        this._isShow = isShow;
        return this;
    }


    /**
     * Установка признака будет ли отображаться название колонки
     * @param {boolean} isShowLabel
     * @return {HelperColumn}
     */
    setShowLabel(isShowLabel) {

        this._isShowLabel = isShowLabel;
        return this;
    }


    /**
     * Установка ширины колонки
     * @param {string} width
     * @return {HelperColumn}
     */
    setWidth(width) {

        this._width = width;
        return this;
    }


    /**
     * Установка максимальной ширины колонки
     * @param {string} width
     * @return {HelperColumn}
     */
    setWidthMax(width) {

        this._maxWidth = width;
        return this;
    }


    /**
     * Установка минимальной ширины колонки
     * @param {string} width
     * @return {HelperColumn}
     */
    setWidthMin(width) {

        this._minWidth = width;
        return this;
    }


    /**
     * Указывает, будет ли меню видно всегда
     * @param {boolean} isShow
     * @return {HelperColumn}
     */
    showMenuAlways(isShow) {

        this._menuAlways = isShow;
        return this;
    }


    /**
     * Добавление пункта меню для колонки
     * @param {string} text
     * @return {HelperColumn}
     */
    addMenuHeader(text) {

        this._menu.push({
            type: 'header',
            text: text,
        });
        return this;
    }


    /**
     * Добавление пункта меню для колонки
     * @param {string}   text
     * @param {function} onClick
     * @param {Object}   attr
     * @return {HelperColumn}
     */
    addMenuButton(text, onClick, attr) {

        this._menu.push({
            type: 'button',
            text: text,
            onClick: onClick,
            attr: attr,
        });
        return this;
    }


    /**
     * Добавление пункта меню для колонки
     * @param {string} text
     * @param {string} url
     * @param {Object} attr
     * @return {HelperColumn}
     */
    addMenuLink(text, url, attr) {

        this._menu.push({
            type: 'link',
            text: text,
            url: url,
            attr: attr,
        });
        return this;
    }


    /**
     * Добавление пункта меню для колонки
     * @param {string} text
     * @param {string} url
     * @param {Object} attr
     * @return {HelperColumn}
     */
    addMenuDivider(text, url, attr) {

        this._menu.push({
            type: 'divider'
        });
        return this;
    }


    /**
     * Очистка всех пунктов меню
     * @return {HelperColumn}
     */
    clearMenu() {

        this._menu = [];
        return this;
    }


    /**
     * @param {Object} attr
     * @return {HelperColumn}
     */
    setAttrHeader(attr) {

        this._attrHeader = $.extend(true, this._attrHeader || {}, attr);
        return this;
    }


    /**
     * Установка свойств
     * @param {Object} props
     */
    setProp(props) {

        this._props = $.extend(true, this._props || {}, props);
    }


    /**
     * Конвертирование в объект
     * @return {Object}
     */
    toObject() {

        let result = {
            type: this._type
        }

        if (this._field)       { result.field       = this._field; }
        if (this._label)       { result.label       = this._label; }
        if (this._description) { result.description = this._description; }

        if (this._width !== null)       { result.width       = this._width; }
        if (this._minWidth !== null)    { result.minWidth    = this._minWidth; }
        if (this._maxWidth !== null)    { result.maxWidth    = this._maxWidth; }
        if (this._isShow !== null)      { result.show        = this._isShow; }
        if (this._isShowLabel !== null) { result.showLabel   = this._isShowLabel; }
        if (this._isSortable !== null)  { result.sortable    = this._isSortable; }
        if (this._fixed !== null)       { result.fixed       = this._fixed; }
        if (this._attrHeader !== null)  { result.attrHeader  = this._attrHeader; }

        if (this._menu.length > 0) {
            result.menu = {};
            result.menu.items = this._menu;

            if (this._menuAlways)  {
                result.menu.showAlways  = this._menuAlways;
            }
        }

        if (this._props) {
            result = $.extend(true, this._props, result);
        }

        return result;
    }
}

export default HelperColumn;