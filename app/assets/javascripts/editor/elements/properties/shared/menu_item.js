//= require ../property

Elements.Property.MenuItem = function(parent_menu, elements) {
    this.parent_menu = parent_menu;
    this.elements = elements;
    this.html = null;
}

Elements.Property.MenuItem.prototype.hide_sub_menus = function() {
}

Elements.Property.MenuItem.prototype.click = function() {
    this.parent_menu.hide();
    return false;
}

Elements.Property.MenuItem.prototype.hover = function() {
    this.parent_menu.hide_sub_menus();
    return false;
}

Elements.Property.MenuItem.prototype.visible = function() {
    return this.render().is(':visible');
}