//= require ./page_menu.js
//= require ./page_item.js

Elements.Property.PageMenu.CreateModalItem = function CreateModalItem(parent_menu, select_callback) {
    Elements.Property.MenuItem.call(this, parent_menu, null);

    this.select_callback = select_callback;
}

Elements.Property.PageMenu.CreateModalItem.prototype = Object.create(Elements.Property.PageItem.prototype);
Elements.Property.PageMenu.CreateModalItem.prototype.constructor = Elements.Property.PageMenu.CreateModalItem;

Elements.Property.PageMenu.CreateModalItem.prototype.click = function(e) {
    var page = Elements.Element.create_default(Elements.Page);
    page.name = 'Modal';

    Editor.add_child_page(page);

    this.select_callback(page);
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.PageMenu.CreateModalItem.prototype.render = function() {
    if(!this.html) {
        this.html = Util.clone_template('#element_menu_page_item_template');

        this.hitarea = this.html.children('a');
        this.hitarea
            .mouseenter(this.mouseenter.bind(this))
            .click(this.click.bind(this));

        this.hitarea.children('span:eq(0)').text('< Create Modal >');
    }

    return this.html;
}
