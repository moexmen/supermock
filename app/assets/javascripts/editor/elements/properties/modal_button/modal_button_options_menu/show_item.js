//= require ../menu_item.js

Elements.Property.ButtonShowItem = function ButtonShowItem(parent_menu, show_callback) {
	Elements.Property.MenuItem.call(this, parent_menu, null);

	this.show_callback = show_callback;
}

Elements.Property.ButtonShowItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonShowItem.prototype.constructor = Elements.Property.ButtonShowItem;

Elements.Property.ButtonShowItem.prototype.click = function(e) {
    this.show_callback();
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonShowItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_page_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.children('span:eq(0)').text('Show');
	}

	return this.html;
}
