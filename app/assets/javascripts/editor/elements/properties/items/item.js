var Elements = Elements || {};
Elements.Property = Elements.Property || {};

Elements.Property.Item = function() {
    this.html = null;
}

Elements.Property.Item.prototype.hide_sub_menus = function() {
}

Elements.Property.Item.prototype.click = function(e) {
    this.parent_menu.hide();
    return false;
}

Elements.Property.Item.prototype.hover = function(e) {
    this.parent_menu.hide_sub_menus();
    return false;
}