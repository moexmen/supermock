//= require ./item

Elements.Property.PageItem = function PageItem(page, selected, select_callback) {
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
    this.parent_menu = parent_menu;

    if(!this.html) {
        this.html = Util.clone_template('#element_menu_page_item_template');
        this.hitarea = this.html.children('a');

        $(this.hitarea.children('span')[0]).text(!this.page ? '< No Where >' : this.page.name);
        if(this.selected) $(this.hitarea.children('span')[1]).removeClass('hidden');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}
