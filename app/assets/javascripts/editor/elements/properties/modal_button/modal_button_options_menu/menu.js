//= require ../../shared/menu

Elements.Property.ButtonEditOptions = function() {
	Elements.Property.Menu.call(this);
}

Elements.Property.ButtonEditOptions.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.ButtonEditOptions.prototype.constructor = Elements.Property.ButtonEditOptions;

Elements.Property.ButtonEditOptions.prototype.add_edit_text = function(callback) {
	this.add_item(new Elements.Property.ButtonEditItem(this, "Edit Text", callback));
}

Elements.Property.ButtonEditOptions.prototype.add_show_hide = function(callback, text) {
	this.add_item(new Elements.Property.ButtonEditItem(this, text, callback));
}

Elements.Property.ButtonEditOptions.prototype.add_button_native_click_page_property = function(elements) {
	this.add_items(Elements.Property.ClickPage.menu_items(this, elements)); 
}

Elements.Property.ButtonEditOptions.prototype.show = function(target, show_hide_callback, edit_text_callback, elements) {
	this.remove_all_items();

	this.add_show_hide(show_hide_callback, elements[0].show_or_hide());
	this.add_edit_text(edit_text_callback);
	this.add_button_native_click_page_property(elements);

	Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.ButtonEditOptions.prototype.render = function() {
	return $('#element_modal_button_menu');
}

