//= require ../menu.js

Elements.Property.PageMenu = function(project) {
    Elements.Property.Menu.call(this);
    this.project = project;
}

Elements.Property.PageMenu.prototype = Object.create(Elements.Property.Menu.prototype);
Elements.Property.PageMenu.prototype.constructor = Elements.Property.PageMenu;

Elements.Property.PageMenu.prototype.add_no_where_item = function() {
    var selected = this.selected_page_id === null;
    var item = new Elements.Property.PageItem(this, null, selected, this.select_callback);
    this.add_item(item);
}

Elements.Property.PageMenu.prototype.recursive_add_items = function(pages) {
    $.each(pages, function(idx, page) {
        var selected = this.selected_page_id === page.id;
        var item = new Elements.Property.PageItem(this, page, selected, this.select_callback);
        this.add_item(item);

        this.recursive_add_items(page.child_pages);
    }.bind(this));
}

Elements.Property.PageMenu.prototype.show = function(target, selected_page_id, select_callback) {
    this.selected_page_id = selected_page_id;
    this.select_callback = select_callback;

    this.remove_all_items();
    this.add_no_where_item();
    this.recursive_add_items(this.project.pages);

    Elements.Property.Menu.prototype.show.call(this, target);
}

Elements.Property.PageMenu.prototype.render = function() {
    return $('#element_page_menu');
}