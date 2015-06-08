//= require ./page_menu.js
//= require ./page_item.js

Elements.Property.PageMenu.CreateModalItem = function CreateModalItem(parent_menu) {
    Elements.Property.MenuItem.call(this, parent_menu, null);
}

Elements.Property.PageMenu.CreateModalItem.prototype = Object.create(Elements.Property.PageItem.prototype);
Elements.Property.PageMenu.CreateModalItem.prototype.constructor = Elements.Property.PageMenu.CreateModalItem;

Elements.Property.PageMenu.CreateModalItem.prototype.click = function(e) {
    this.select_callback(this.page);
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.PageMenu.CreateModalItem.prototype.render = function() {
    if(!this.html) {
        this.html = Util.clone_template('#element_menu_page_item_template');

        this.hitarea = this.html.children('a');
        this.hitarea.click(this.click.bind(this));
        this.hitarea.children('span:eq(0)').text('< Create Popup Modal >');
    }

    return this.html;
}
