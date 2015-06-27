//= require ../menu_item.js

Elements.Property.ButtonEditItem = function ButtonEditItem(parent_menu, text, select_callback) {
	Elements.Property.MenuItem.call(this, parent_menu, null);

	this.text = text;
	this.select_callback = select_callback;
}

Elements.Property.ButtonEditItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonEditItem.prototype.constructor = Elements.Property.ButtonEditItem;

Elements.Property.ButtonEditItem.prototype.click = function(e) {
    this.select_callback(true); //some useful argument in here
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonEditItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_page_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.children('span:eq(0)').text(this.text);
	}

	return this.html;
}
