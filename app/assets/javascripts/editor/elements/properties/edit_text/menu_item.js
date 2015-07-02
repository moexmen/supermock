//= require ../shared/menu_item
//= require ./property

Elements.Property.EditText.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.EditText.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.EditText.MenuItem.prototype.constructor = Elements.Property.EditText.MenuItem;

Elements.Property.EditText.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');

        this.hitarea = this.html.children('a:eq(0)');
        this.hitarea.text('Edit ' + this.elements[0].find_property(Elements.Property.EditText).item);
        this.hitarea
            .mouseenter(this.mouseenter.bind(this))
            .click(this.click.bind(this));
    }

    return this.html;
}

Elements.Property.EditText.MenuItem.prototype.click = function() {
    this.elements[0].find_property(Elements.Property.EditText).edit_text();
    this.parent_menu.hide();
    return false;
}
