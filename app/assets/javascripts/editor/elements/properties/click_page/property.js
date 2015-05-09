//= require ../property

Elements.Property.ClickPage = function ClickPage(click_obj, value) {
    this.value = value;

    click_obj.click(function() {
       if(this.value != null) {
           Editor.render_page_with_id(this.value);
           Editor.view_mode();
       }
    }.bind(this));
}

Elements.Property.ClickPage.prototype = Object.create(Elements.Property.prototype);
Elements.Property.ClickPage.prototype.constructor = Elements.Property.ClickPage;

Elements.Property.ClickPage.menu_items = function(parent_menu, elements) {
    return [
        new Elements.Property.ClickPage.MenuItem(parent_menu, elements),
        new Elements.Property.ClickPage.MenuItem.CreateModal(parent_menu, elements)
    ];
}

