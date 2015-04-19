//= require ./item

Elements.Property.ClickItem = function() {
    Elements.Property.Item.call(this);
}

Elements.Property.ClickItem.prototype = Object.create(Elements.Property.Item.prototype);
Elements.Property.ClickItem.prototype.constructor = Elements.Property.ClickItem;

Elements.Property.ClickItem.singleton = function() {
    return this.instance = this.instance || new Elements.Property.ClickItem();
}

Elements.Property.ClickItem.prototype.select_callback = function(page) {
    this.parent_menu.hide();

    $.each(this.elements, function(idx, element) {
        element.properties.click_page = page;
    });
}

Elements.Property.ClickItem.prototype.hide_sub_menus = function() {
    Editor.element_page_menu.hide();
}

Elements.Property.ClickItem.prototype.click = function(e) {
    return false;
}

Elements.Property.ClickItem.prototype.hover = function(e) {
    this.parent_menu.hide_sub_menus();

    var selected_page = this.elements[0].properties.click_page;
    var callback = this.select_callback.bind(this);
    Editor.element_page_menu.show(this.html, selected_page, callback);

    return false;
}

Elements.Property.ClickItem.prototype.render = function(parent_menu, elements) {
    if(!this.html) {
        Elements.Property.Item.prototype.render.call(this, parent_menu, elements, '#element_menu_item_expandable_template');
        $(this.hitarea.children('span')[0]).text('On click go to');
    }

    return this.html;
}
