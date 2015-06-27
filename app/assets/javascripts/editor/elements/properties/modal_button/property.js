//= require ../property

Elements.Property.ModalButton = function ModalButton(btn_1, btn_2, btn_3) {
    this.btn_1 = btn_1;
    this.btn_2 = btn_2;
    this.btn_3 = btn_3;
}

Elements.Property.ModalButton.prototype = Object.create(Elements.Property.prototype);
Elements.Property.ModalButton.prototype.constructor = Elements.Property.ModalButton;

Elements.Property.ModalButton.menu_items = function(parent_menu, elements) {
	var modal = elements[0];

    return [ 
    		new Elements.Property.ModalButton.MenuItem(parent_menu, [modal.btn_1]),
    		new Elements.Property.ModalButton.MenuItem(parent_menu, [modal.btn_2]),
    		new Elements.Property.ModalButton.MenuItem(parent_menu, [modal.btn_3])
    		]; 
}