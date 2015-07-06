//= require ../menu_item.js

Elements.Property.ButtonHideItem = function ButtonHideItem(parent_menu, elements) {
	Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.ButtonHideItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonHideItem.prototype.constructor = Elements.Property.ButtonHideItem;

Elements.Property.ButtonHideItem.prototype.click = function(e) {
	this.elements[0].btn.css('display', 'none');
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonHideItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.text('Hide');
	}

	return this.html;
}

