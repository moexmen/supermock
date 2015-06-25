//= require ../property

Elements.Property.MenuItem = function(parent_menu, elements) {
    this.parent_menu = parent_menu;
    this.elements = elements;
    this.html = null;
}

Elements.Property.MenuItem.prototype.destroy = function() {
    this.unrender();
    this.html = null;
    this.hitarea = null;
}

Elements.Property.MenuItem.prototype.mouseenter = function() {
    this.parent_menu.hide_sub_menus();
    return false;
}

Elements.Property.MenuItem.prototype.hide_sub_menus = function() {
}

Elements.Property.MenuItem.prototype.click = function() {
    this.parent_menu.hide();
    return false;
}

Elements.Property.MenuItem.prototype.visible = function() {
    return this.render().is(':visible');
}

Elements.Property.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.html.addClass('disabled');

        this.hitarea = this.html.children('a:eq(0)');
        this.hitarea.text('No properties');
    }

    return this.html;
}

Elements.Property.MenuItem.prototype.unrender = function() {
    if(this.html != null) {
        this.render().remove();
    }
}