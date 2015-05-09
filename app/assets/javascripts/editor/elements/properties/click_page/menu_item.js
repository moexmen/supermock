//= require ../shared/menu_item
//= require ./property

Elements.Property.ClickPage.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.ClickPage.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ClickPage.MenuItem.prototype.constructor = Elements.Property.ClickPage.MenuItem;

Elements.Property.ClickPage.MenuItem.prototype.hide_sub_menus = function() {
    Editor.element_page_menu.hide();
}

Elements.Property.ClickPage.MenuItem.prototype.click = function() {
    return false;
}

Elements.Property.ClickPage.MenuItem.prototype.hover = function() {
    this.parent_menu.hide_sub_menus();

    // select page only if all elements have the same selected page
    var selected_page_id = this.elements[0].find_property(Elements.Property.ClickPage).value;
    $.each(this.elements, function(idx, element) {
        if(selected_page_id != element.find_property(Elements.Property.ClickPage).value) {
            selected_page_id = 'no common page';
            return false;
        }
    });

    Editor.element_page_menu.show(this.render(), selected_page_id, this.select_callback.bind(this));

    return false;
}

Elements.Property.ClickPage.MenuItem.prototype.select_callback = function(page) {
    this.parent_menu.hide();

    $.each(this.elements, function(idx, element) {
        element.find_property(Elements.Property.ClickPage).value = page ? page.id : null;
    });
}

Elements.Property.ClickPage.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_expandable_template');
        this.hitarea = this.html.children('a');
        this.hitarea.children('span:nth-child(1)').text('On click go to');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}
