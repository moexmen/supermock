//= require ../property

Elements.Property.Delete = function Delete() {
}

Elements.Property.Delete.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Delete.prototype.constructor = Elements.Property.Delete;

Elements.Property.Delete.menu_items = function(parent_menu, elements) {
    return [new Elements.Property.Delete.MenuItem(parent_menu, elements)];
}
