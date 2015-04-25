//= require ../menu_item.js

Elements.Property.PageItem = function PageItem(parent_menu, page, selected, select_callback) {
    Elements.Property.MenuItem.call(this, parent_menu, null);

    this.page = page;
    this.selected = selected;
    this.select_callback = select_callback;
}

Elements.Property.PageItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.PageItem.prototype.constructor = Elements.Property.PageItem;

Elements.Property.PageItem.prototype.click = function(e) {
    this.select_callback(this.page);
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.PageItem.prototype.render = function() {
    if(!this.html) {
        this.html = Util.clone_template('#element_menu_page_item_template');
        this.hitarea = this.html.children('a');

        $(this.hitarea.children('span')[0]).text(this.page === null ? '< No Where >' : this.page.name);
        if(this.selected) $(this.hitarea.children('span')[1]).removeClass('hidden');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}
