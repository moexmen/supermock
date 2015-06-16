//= require ../property

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
