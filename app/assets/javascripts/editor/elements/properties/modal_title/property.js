//= require ../property

Elements.Property.ModalTitle = function ModalTitle(modal_title_html) {
	this.value = "Modal Title";
	this.modal_title_html = modal_title_html;
	this.set_modal_title(this.value);
}

Elements.Property.ModalTitle.prototype = Object.create(Elements.Property.prototype);
Elements.Property.ModalTitle.prototype.constructor = Elements.Property.ModalTitle;

Elements.Property.ModalTitle.menu_items = function(parent_menu, elements) {
	return [ new Elements.Property.ModalTitle.MenuItem(parent_menu, elements)]; 
}

Elements.Property.ModalTitle.prototype.set_modal_title = function(new_title) {
	this.value = new_title;
	this.modal_title_html.text(this.value);
}

Elements.Property.ModalTitle.prototype.get_modal_title = function() {
	return this.modal_title_html.text();
}