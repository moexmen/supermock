//= require ../menu_item.js

Elements.Property.ButtonEditItem = function ButtonEditItem(parent_menu, edit_text_callback) {
	Elements.Property.MenuItem.call(this, parent_menu, null);

	this.edit_text_callback = edit_text_callback;
}

Elements.Property.ButtonEditItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonEditItem.prototype.constructor = Elements.Property.ButtonEditItem;

Elements.Property.ButtonEditItem.prototype.click = function(e) {
    this.edit_text_callback(); 
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonEditItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_page_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.children('span:eq(0)').text('Edit text');
	}

	return this.html;
}
