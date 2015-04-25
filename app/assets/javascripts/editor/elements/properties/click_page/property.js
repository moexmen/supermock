//= require ../property

Elements.Property.ClickPage = function ClickPage(value) {
    this.value = value;
}

Elements.Property.ClickPage.prototype = Object.create(Elements.Property.prototype);
Elements.Property.ClickPage.prototype.constructor = Elements.Property.ClickPage;

Elements.Property.ClickPage.menu_items = function(parent_menu, elements) {
    return [
        new Elements.Property.ClickPage.MenuItem(parent_menu, elements),
        new Elements.Property.ClickPage.MenuItem.CreateModal(parent_menu, elements)
    ];
}

