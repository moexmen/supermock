//= require ../../shared/menu

Elements.Property.ButtonEditOptions = function() {
	Elements.Property.Menu.call(this);
}

Elements.Property.ButtonEditOptions.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.ButtonEditOptions.prototype.constructor = Elements.Property.ButtonEditOptions;

Elements.Property.ButtonEditOptions.prototype.add_edit_text = function(callback) {
	this.add_item(new Elements.Property.ButtonEditItem(this, callback));
}

Elements.Property.ButtonEditOptions.prototype.add_show = function(callback) {
	this.add_item(new Elements.Property.ButtonShowItem(this, callback));
}

Elements.Property.ButtonEditOptions.prototype.add_hide = function(callback) {
	this.add_item(new Elements.Property.ButtonHideItem(this, callback));
}

Elements.Property.ButtonEditOptions.prototype.add_button_native_click_page_property = function(elements) {
	this.add_items(Elements.Property.ClickPage.menu_items(this, elements)); 
}

Elements.Property.ButtonEditOptions.prototype.show = function(target, show_callback, hide_callback, edit_text_callback, elements) {
	this.remove_all_items();

	console.log(this.elements);
	//need to decide which property to show. Based on the value?
	if(true) {
		this.add_show(show_callback);
	}
	else {
		this.add_hide(hide_callback);
	}
	this.add_edit_text(edit_text_callback);
	this.add_button_native_click_page_property(elements);

	Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.ButtonEditOptions.prototype.render = function() {
	return $('#element_modal_button_menu');
}

