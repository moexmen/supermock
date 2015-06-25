//= require ./shared/menu_item
//= require ./property

Elements.Property.NoPropertyMenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.NoPropertyMenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.NoPropertyMenuItem.prototype.constructor = Elements.Property.NoPropertyMenuItem;

Elements.Property.NoPropertyMenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.html.addClass('disabled');

        this.hitarea = this.html.children('a:eq(0)');
        this.hitarea.text('No properties');
    }

    return this.html;
}