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

Elements.Property.Item.prototype.render = function(parent_menu, elements, template) {
    this.parent_menu = parent_menu;
    this.elements = elements;

    if(!this.html) {
        this.html = Util.clone_template(template);
        this.hitarea = this.html.children('a');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}