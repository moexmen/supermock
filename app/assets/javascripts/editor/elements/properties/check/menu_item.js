//= require ../shared/menu_item
//= require ./property

Elements.Property.Check.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.Check.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.Check.MenuItem.prototype.constructor = Elements.Property.Check.MenuItem;

Elements.Property.Check.MenuItem.prototype.hide_sub_menus = function() {
    Editor.element_page_menu.hide();
}

Elements.Property.Check.MenuItem.prototype.click = function() {
    var checked = this.elements[0].find_property(Elements.Property.Check).value;

    $.each(this.elements, function(idx, element) {
        var checkbox = element.html.children('input:eq(0)');
        checkbox.prop('checked', !checked);

        element.find_property(Elements.Property.Check).value = !checked;
    });


    this.parent_menu.hide();
    return false;
}

Elements.Property.Check.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.hitarea = this.html.children('a:eq(0)');

        var checked = this.elements[0].find_property(Elements.Property.Check).value;
        var text = checked ? "Uncheck" : "Check";
        this.hitarea.text(text);

        this.hitarea.click(this.click.bind(this));
    }

    return this.html;
}
