//= require ../property

Elements.Property.Border = function Border(border_to_adjust, value) {
	this.value = value;
	this.border_to_adjust = border_to_adjust;
    this.readjust_border();
}

Elements.Property.Border.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Border.prototype.constructor = Elements.Property.Border;

Elements.Property.Border.menu_items = function(parent_menu, elements) {
	return [
			new Elements.Property.Border.IncreaseMenuItem(parent_menu, elements),
			new Elements.Property.Border.DecreaseMenuItem(parent_menu, elements),
			];
}

Elements.Property.Border.prototype.readjust_border = function() {
    this.border_to_adjust.css('border-width', this.value);
}