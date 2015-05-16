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
        this.hitarea
            .mouseenter(this.mouseenter.bind(this))
            .click(this.click.bind(this));

        var page_name = this.page === null ? '< No Where >' : this.page.name;
        this.hitarea.children('span:eq(0)').text(page_name);
        if(this.selected) {
            this.hitarea.children('span:eq(1)').removeClass('hidden');
        }
    }

    return this.html;
}
