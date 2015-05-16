var PageList = PageList || {};

PageList.Item = function(page, parent_item) {
    this.page = page;
    this.child_items = [];
    this.parent_item = parent_item;
    this.html = null;
}

PageList.Item.prototype.destroy = function() {
    this.page.destroy();
    this.page = null;

    this.child_items = null;
    this.parent_item = null;

    this.unrender();
    this.html = null;
}

PageList.Item.prototype.can_delete = function() {
    return this.parent_item.can_remove_child_item();
}

PageList.Item.prototype.delete = function() {
    if(this.can_remove_child_item()) {
        this.parent_item.remove_child_item(this);
        this.destroy();
    }
}

PageList.Item.prototype.add_child_item = function(child_item) {
    this.page.add_child_page(child_item.page);
    this.child_items.push(child_item);

    this.html.children('ul:eq(0)').append(child_item.render());
}

PageList.Item.prototype.can_remove_child_item = function() {
    return true;
}

PageList.Item.prototype.remove_child_item = function(child_item) {
    if(this.can_remove_child_item()) {
        this.page.remove_child_page(child_item.page);
        this.child_items.remove(child_item);
        child_item.parent_item = null;
    }
}

PageList.Item.prototype.select = function() {
    this.html.children('div:eq(0)').addClass('page_list_item_selected');
}

PageList.Item.prototype.unselect = function() {
    this.html.children('div:eq(0)').removeClass('page_list_item_selected');
}

PageList.Item.prototype.generate_next_child_page_name = function() {
    return this.page.name + ' > ' + (this.page.child_pages.length + 1);
}

PageList.Item.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#page_list_item_template');
        this.html.data('page_item', this);

        this.html.children('div:eq(0)')
            .text(this.page.name)
            .click(function() { PageList.select_item(this); }.bind(this));

        PageList.Menu.enable_menu_for(this);
    }

    return this.html;
}

PageList.Item.prototype.unrender = function() {
    if(this.html != null) {
        this.render().remove();
    }
}

PageList.Item.prototype.render_hitarea = function() {
    return this.render().children('div:eq(0)');
}