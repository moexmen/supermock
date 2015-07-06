//= require ../property

Elements.Property.Border = function Border(target, value) {
	this.target = target;
    this.value = value;
}

Elements.Property.Border.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Border.prototype.constructor = Elements.Property.Border;

Elements.Property.Border.menu_items = function(parent_menu, elements) {
	return [
			new Elements.Property.Border.MenuItem(parent_menu, elements, "Increase border size", 1.25),
			new Elements.Property.Border.MenuItem(parent_menu, elements, "Decrease border size", 0.8),
			];
}

