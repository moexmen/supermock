var PageList = PageList || {};

PageList.RootItem = function(project) {
    this.project = project;
    this.child_items = [];
}

PageList.RootItem.prototype.first_child_item = function() {
    return this.child_items[0];
}

PageList.RootItem.prototype.add_child_item = function(child_item) {
    this.project.add_page(child_item.page);
    this.child_items.push(child_item);

    this.render().append(child_item.render());
}

PageList.RootItem.prototype.can_remove_child_item = function() {
    return this.child_items.length > 1;
}

PageList.RootItem.prototype.remove_child_item = function(child_item) {
    if(this.can_remove_child_item()) {
        this.project.remove_page(child_item.page);
        this.child_items.remove(child_item);
        child_item.parent_item = null;
    }
}

PageList.RootItem.prototype.generate_next_child_page_name = function() {
    return 'Page ' + (this.project.pages.length + 1);
}

PageList.RootItem.prototype.render = function() {
    return $('#page_list').children('ul');
}