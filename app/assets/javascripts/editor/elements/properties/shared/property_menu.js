//= require ./menu

Elements.Property.PropertyMenu = function() {
    Elements.Property.Menu.call(this);
}

Elements.Property.PropertyMenu.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.PropertyMenu.prototype.constructor = Elements.Property.PropertyMenu;

Elements.Property.PropertyMenu.prototype.show = function(target, elements) {
    this.hide_sub_menus();
    this.remove_items();

    // find common properties of elements
    var common_properties = elements[0].properties;
    $.each(elements, function(idx, element) {
        common_properties = common_properties.filter(function(property) {
            return element.properties.filter(function(other_property) {
                return property.constructor == other_property.constructor;
            });
        });
    });

    // add common properties items
    $.each(common_properties, function(idx, property) {
        this.add_items(property.constructor.menu_items(this, elements));
    }.bind(this));

    Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.PropertyMenu.prototype.render = function() {
    return $('#element_property_menu');
}