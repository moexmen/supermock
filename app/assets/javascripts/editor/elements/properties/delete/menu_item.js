//= require ../shared/menu_item
//= require ./property

Elements.Property.Delete.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.Delete.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.Delete.MenuItem.prototype.constructor = Elements.Property.Delete.MenuItem;

Elements.Property.Delete.MenuItem.prototype.click = function() {
    this.parent_menu.hide();
    Editor.remove_selected_elements();
    return false;
}

Elements.Property.Delete.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.hitarea = this.html.children('a:eq(0)')
            .text('Delete')
            .click(this.click.bind(this))
            .mouseenter(this.mouseenter.bind(this));
    }

    return this.html;
}
