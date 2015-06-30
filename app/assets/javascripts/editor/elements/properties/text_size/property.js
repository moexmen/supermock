//= require ../property

Elements.Property.TextSize = function TextSize(text_to_adjust, value) {
	this.value = value;
	this.text_to_adjust = text_to_adjust;
}

Elements.Property.TextSize.prototype = Object.create(Elements.Property.prototype);
Elements.Property.TextSize.prototype.constructor = Elements.Property.TextSize;

Elements.Property.TextSize.menu_items = function(parent_menu, elements) {
	return [
			new Elements.Property.TextSize.MenuItem(parent_menu, elements, "Increase text size"),
			new Elements.Property.TextSize.MenuItem(parent_menu, elements, "Decrease text size"),
			];
}

Elements.Property.TextSize.prototype.readjust_text_size = function() {
    this.text_to_adjust.css('font-size', this.value);
}