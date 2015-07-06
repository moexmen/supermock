//= require ../menu_item.js

Elements.Property.ButtonEditItem = function ButtonEditItem(parent_menu, elements) {
	Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.ButtonEditItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ButtonEditItem.prototype.constructor = Elements.Property.ButtonEditItem;

Elements.Property.ButtonEditItem.prototype.click = function(e) {
    var new_text = prompt("Please enter new name for button", this.elements[0].text);

    this.elements[0].text = new_text;
    this.elements[0].btn.text(new_text);

    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ButtonEditItem.prototype.render = function() {
	if(!this.html) {
		this.html = Util.clone_template('#element_menu_item_template');

		this.hitarea = this.html.children('a');
		this.hitarea
			.mouseenter(this.mouseenter.bind(this))
			.click(this.click.bind(this))
			.text('Edit text');
	}

	return this.html;
}
