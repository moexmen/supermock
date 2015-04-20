//= require ./menu

Elements.Property.PropertyMenu = function() {
    Elements.Property.Menu.call(this);
}

Elements.Property.PropertyMenu.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.PropertyMenu.prototype.constructor = Elements.Property.PropertyMenu;

Elements.Property.PropertyMenu.prototype.show = function(target, elements) {
    this.detach_items();

    // find intersection of menu items of elements
    var intersected_items = [];
    $.each(elements, function(idx, element) {
        if(idx === 0) {
            intersected_items = element.property_menu_items;
        }
        else {
            intersected_items = intersected_items.filter(function(item) { return element.property_menu_items.indexOf(item) != -1; });
        }
    }.bind(this));

    $.each(intersected_items, function(idx, item) {
        this.add_item(item, item.render(this, elements));
    }.bind(this));

    Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.PropertyMenu.prototype.render = function() {
    return $('#element_property_menu');
}