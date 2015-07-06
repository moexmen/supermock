//= require ../property

Elements.Property.TextSize = function TextSize(target, value) {
	this.value = value;
	this.target = target;
}

Elements.Property.TextSize.prototype = Object.create(Elements.Property.prototype);
Elements.Property.TextSize.prototype.constructor = Elements.Property.TextSize;

Elements.Property.TextSize.menu_items = function(parent_menu, elements) {
	return [
			new Elements.Property.TextSize.MenuItem(parent_menu, elements, "Increase text size", 1.1),
			new Elements.Property.TextSize.MenuItem(parent_menu, elements, "Decrease text size", 0.9),
			];
}
