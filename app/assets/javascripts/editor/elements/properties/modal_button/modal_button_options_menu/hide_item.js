//= require ../menu_item.js

Elements.Property.ButtonHideItem = function ButtonHideItem(parent_menu, hide_callback) {
	Elements.Property.MenuItem.call(this, parent_menu, null);

	this.hide_callback = hide_callback;
}

Elements.Property.ButtonHideItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonHideItem.prototype.constructor = Elements.Property.ButtonHideItem;

Elements.Property.ButtonHideItem.prototype.click = function(e) {
    this.hide_callback();
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonHideItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_page_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.children('span:eq(0)').text('Hide');
	}

	return this.html;
}

