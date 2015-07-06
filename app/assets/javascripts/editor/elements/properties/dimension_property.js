//= require ./property

Elements.Property.Dimensions = function Dimensions(width, height, resizeable_directions) {
	this.width = width;
	this.height = height;
    this.resizeable_directions = resizeable_directions || this.all_directions();
}

Elements.Property.Dimensions.RESIZE_DIRECTIONS = {
    NORTH: '0',
    SOUTH: '1',
    EAST: '2',
    WEST: '3',
    NORTHEAST: "4",
    NORTHWEST: '5',
    SOUTHEAST: '6',
    SOUTHWEST: '7'
}

Elements.Property.Dimensions.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Dimensions.prototype.constructor = Elements.Property.Dimensions;

Elements.Property.Dimensions.menu_items = function(parent_menu, elements) {
	return [];
}

Elements.Property.Dimensions.prototype.set_size = function(width, height) {
    this.width = width;
    this.height = height;
}
Elements.Property.Dimensions.prototype.all_directions = function() {
    return $.map(Elements.Property.Dimensions.RESIZE_DIRECTIONS, function(value, key) { return value; });
}

