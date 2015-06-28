//= require ../property

Elements.Property.ModalButtons = function ModalButtons(btn_1, btn_2, btn_3) {
    this.btn_1 = btn_1;
    this.btn_2 = btn_2;
    this.btn_3 = btn_3;
}

Elements.Property.ModalButtons.prototype = Object.create(Elements.Property.prototype);
Elements.Property.ModalButtons.prototype.constructor = Elements.Property.ModalButtons;

Elements.Property.ModalButtons.menu_items = function(parent_menu, elements) {
	var modal = elements[0];

    return [ 
    		new Elements.Property.ModalButtons.MenuItem(parent_menu, [modal.btn_1]),
    		new Elements.Property.ModalButtons.MenuItem(parent_menu, [modal.btn_2]),
    		new Elements.Property.ModalButtons.MenuItem(parent_menu, [modal.btn_3])
    		]; 
}