//= require ../property

Elements.Property.Menu.Divider = function() {
    this.html = null;
}

Elements.Property.Menu.Divider.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.Menu.Divider.prototype.constructor = Elements.Property.Menu.Divider;

Elements.Property.Menu.Divider.prototype.destroy = function() {
    this.unrender();
    this.html = null;
}

Elements.Property.Menu.Divider.prototype.hide_sub_menus = function() {
}

Elements.Property.Menu.Divider.prototype.render = function() {
    if(!this.html) {
        this.html = Util.clone_template('#element_menu_divider_template');
    }

    return this.html;
}

Elements.Property.Menu.Divider.prototype.unrender = function() {
    if(this.html != null) {
        this.render().remove();
    }
}