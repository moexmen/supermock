//= require ./menu

Elements.Property.PropertyMenu = function() {
    Elements.Property.Menu.call(this);
}

Elements.Property.PropertyMenu.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.PropertyMenu.prototype.constructor = Elements.Property.PropertyMenu;

Elements.Property.PropertyMenu.prototype.show = function(target, elements) {
    this.detach_list_items();

    // TODO show only union of properties
    $.each(elements[0].property_items, function(idx, property_item) {
        this.add_item(property_item, property_item.render(this, elements));
    }.bind(this));

    Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.PropertyMenu.prototype.render = function() {
    return $('#element_property_menu');
}