//= require ./property

Elements.Property.Position = function Position(x, y, movable) {
    this.x = x;
    this.y = y;
    this.movable = movable;
}

Elements.Property.Position.prototype = Object.create(Elements.Property.prototype);
Elements.Property.Position.prototype.constructor = Elements.Property.Position;

Elements.Property.Position.menu_items = function(parent_menu, elements) {
    return [];
}

Elements.Property.Position.prototype.set_position = function(x, y) {
    this.x = x;
    this.y = y;
}