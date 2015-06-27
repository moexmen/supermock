//= require ./menu

Elements.Property.PropertyMenu = function() {
    Elements.Property.Menu.call(this);
}

Elements.Property.PropertyMenu.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.PropertyMenu.prototype.constructor = Elements.Property.PropertyMenu;

Elements.Property.PropertyMenu.prototype.show = function(target, elements) {
    this.hide_sub_menus();
    this.remove_all_items();

    // find common properties of elements
    var common_properties = [];
    $.each(elements[0].properties, function(idx, property) {
        var elements_with_property = $.grep(elements, function(element) {
            return element.has_property(property.constructor);
        });

        if(elements_with_property.length == elements.length) {
            common_properties.push(property);
        }
    });

    if(common_properties.length == 0) {
        this.add_item(new Elements.Property.NoPropertyMenuItem(this, elements)); 
    }
    else { // add common properties items
        $.each(common_properties, function(idx, property) {
            this.add_items(property.constructor.menu_items(this, elements));
        }.bind(this));
    }
    
    Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.PropertyMenu.prototype.render = function() {
    return $('#element_property_menu');
}