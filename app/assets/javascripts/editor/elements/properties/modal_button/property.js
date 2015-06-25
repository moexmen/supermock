//= require ../property

Elements.Property.ModalButton = function ModalButton(btn_1, btn_2, btn_3) {
    this.btn_1 = btn_1;
    this.btn_2 = btn_2;
    this.btn_3 = btn_3;

    btn_1.btn.click(function() {
    	var value = btn_1.find_property(Elements.Property.ClickPage).value;
    	if(value != null) {
    		Editor.set_curr_page_with_id(value);
    	}
    }.bind(this));

    btn_2.btn.click(function() {
    	var value = btn_2.find_property(Elements.Property.ClickPage).value;
    	if(value != null) {
    		Editor.set_curr_page_with_id(value);
    	}
    }.bind(this));
    
    btn_3.btn.click(function() {
    	var value = btn_3.find_property(Elements.Property.ClickPage).value;
    	if(value != null) {
    		Editor.set_curr_page_with_id(value);
    	}
    }.bind(this));
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