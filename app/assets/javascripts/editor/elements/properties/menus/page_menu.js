//= require ./menu

Elements.Property.PageMenu = function(project) {
    Elements.Property.Menu.call(this);
    this.project = project;
}

Elements.Property.PageMenu.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.PageMenu.prototype.constructor = Elements.Property.PageMenu;

Elements.Property.PageMenu.prototype.add_no_page_item = function() {
    var item = new Elements.Property.PageItem(null, !this.selected_page_id, this.select_callback);
    this.add_item(item, item.render(this));
}

Elements.Property.PageMenu.prototype.recursive_init_items = function(pages) {
    $.each(pages, function(idx, page) {
        var item = new Elements.Property.PageItem(page, this.selected_page_id == page.id, this.select_callback);
        this.add_item(item, item.render(this));

        this.recursive_init_items(page.child_pages);
    }.bind(this));
}

Elements.Property.PageMenu.prototype.show = function(target, selected_page_id, select_callback) {
    this.selected_page_id = selected_page_id;
    this.select_callback = select_callback;

    this.empty_items();
    this.add_no_page_item();
    this.recursive_init_items(this.project.pages);

    Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.PageMenu.prototype.render = function() {
    return $('#element_page_menu');
}