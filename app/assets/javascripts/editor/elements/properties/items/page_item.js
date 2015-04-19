//= require ./item

Elements.Property.PageItem = function(page, selected, select_callback) {
    Elements.Property.Item.call(this);

    this.page = page;
    this.selected = selected;
    this.select_callback = select_callback;
}

Elements.Property.PageItem.prototype = Object.create(Elements.Property.Item.prototype);
Elements.Property.PageItem.prototype.constructor = Elements.Property.PageItem;

Elements.Property.PageItem.prototype.click = function(e) {
    this.select_callback(this.page);
    return Elements.Property.Item.prototype.click.call(this, e);
}

Elements.Property.PageItem.prototype.render = function(parent_menu) {
    if(!this.html) {
        Elements.Property.Item.prototype.render.call(this, parent_menu, null, '#element_menu_page_item_template');
        $(this.hitarea.children('span')[0]).text(this.page.name);
        if(this.selected) $(this.hitarea.children('span')[1]).removeClass('hidden');
    }

    return this.html;
}
