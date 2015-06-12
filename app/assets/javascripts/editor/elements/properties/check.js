//= require ./property
//= require ./shared/menu_item

Elements.Property.Check = function Check(click_obj, value) {
    this.value = value;
}

Elements.Property.Check.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Check.prototype.constructor = Elements.Property.Check;

Elements.Property.Check.menu_items = function(parent_menu, elements) {
    return [
        new Elements.Property.Check.MenuItem(parent_menu, elements),
    ];
}

Elements.Property.Check.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.Check.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.Check.MenuItem.prototype.constructor = Elements.Property.Check.MenuItem;

Elements.Property.Check.MenuItem.prototype.hide_sub_menus = function() {
    Editor.element_page_menu.hide();
}

Elements.Property.Check.MenuItem.prototype.click = function() {
    var checkbox = this.elements[0].html.children('input:eq(0)')
    checkbox.prop('checked', !checkbox.prop('checked'));
    this.parent_menu.hide();
    return false;
}

Elements.Property.Check.MenuItem.prototype.select_callback = function(page) {
    this.parent_menu.hide();
    var value = page ? page.id : null;

    $.each(this.elements, function(idx, element) {
        element.find_property(Elements.Property.Check).value = value;
    });
}

Elements.Property.Check.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        console.log(this.html);

        this.hitarea = this.html.children('a:eq(0)');
        this.hitarea.text('Check/Uncheck');
        this.hitarea.click(this.click.bind(this));
    }

    return this.html;
}
