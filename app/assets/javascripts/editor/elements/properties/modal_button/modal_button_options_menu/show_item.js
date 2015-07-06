//= require ../menu_item.js

Elements.Property.ButtonShowItem = function ButtonShowItem(parent_menu, elements) {
	Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.ButtonShowItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonShowItem.prototype.constructor = Elements.Property.ButtonShowItem;

Elements.Property.ButtonShowItem.prototype.click = function(e) {
	this.elements[0].btn.css('display', 'inline-block');
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonShowItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.text('Show');
	}

	return this.html;
}
