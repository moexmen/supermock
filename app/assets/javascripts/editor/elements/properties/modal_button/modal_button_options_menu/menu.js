//= require ../../shared/menu

Elements.Property.ButtonEditOptions = function() {
	Elements.Property.Menu.call(this);
}

Elements.Property.ButtonEditOptions.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.ButtonEditOptions.prototype.constructor = Elements.Property.ButtonEditOptions;

Elements.Property.ButtonEditOptions.prototype.add_edit_text = function(elements) {
	this.add_item(new Elements.Property.ButtonEditItem(this, elements));
}

Elements.Property.ButtonEditOptions.prototype.add_show = function(elements) {
	this.add_item(new Elements.Property.ButtonShowItem(this, elements));
}

Elements.Property.ButtonEditOptions.prototype.add_hide = function(elements) {
	this.add_item(new Elements.Property.ButtonHideItem(this, elements));
}

Elements.Property.ButtonEditOptions.prototype.add_button_native_click_page_property = function(elements) {
	this.add_items(Elements.Property.ClickPage.menu_items(this, elements)); 
}

Elements.Property.ButtonEditOptions.prototype.show = function(target, elements) {
	this.remove_all_items();

	this.add_show(elements);
	this.add_hide(elements);
	this.add_edit_text(elements);
	this.add_button_native_click_page_property(elements);

	Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.ButtonEditOptions.prototype.render = function() {
	return $('#element_modal_button_menu');
}