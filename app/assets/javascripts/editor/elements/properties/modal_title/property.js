//= require ../property

Elements.Property.ModalTitle = function ModalTitle() {
}

Elements.Property.ModalTitle.prototype = Object.create(Elements.Property.prototype);
Elements.Property.ModalTitle.prototype.constructor = Elements.Property.ModalTitle;

Elements.Property.ModalTitle.menu_items = function(parent_menu, elements) {
    return [ new Elements.Property.ModalTitle.MenuItem(parent_menu, elements)]; 
}