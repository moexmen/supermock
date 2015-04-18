//= require ./context_menu

Elements.PageMenu = function(project) {
    Elements.ContextMenu.call(this);
    this.project = project;
}

Elements.PageMenu.prototype = Object.create(Elements.ContextMenu.prototype);
Elements.PageMenu.prototype.constructor = Elements.PageMenu;

Elements.PageMenu.prototype.recursive_init_items = function(pages) {
    $.each(pages, function(idx, page) {
        var item = new Elements.ContextMenu.Item(page.name, function() { this.page_callback(page); }.bind(this), null);
        this.list().append(item.render());

        this.recursive_init_items(page.child_pages);
    }.bind(this));
}

Elements.PageMenu.prototype.show = function(target, click_callback) {
    this.page_callback = click_callback;

    this.detach_list_items();
    this.recursive_init_items(this.project.pages);

    Elements.ContextMenu.prototype.show.call(this, target);
}

Elements.PageMenu.prototype.render = function() {
    return $('#element_page_menu');
}