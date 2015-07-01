//= require ./property

Elements.Property.Dimensions = function Dimensions(width, height, resizeable_directions) {
	this.width = width;
	this.height = height;
	this.resizeable_directions = resizeable_directions;
}

Elements.Property.Dimensions.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Dimensions.prototype.constructor = Elements.Property.Dimensions;

Elements.Property.Dimensions.menu_items = function(parent_menu, elements) {
	return [];
}

Elements.Property.Dimensions.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
}