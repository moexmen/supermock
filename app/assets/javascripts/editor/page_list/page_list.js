var PageList = PageList || {};

PageList.init = function(project) {
    this.project = project;
    this.curr_item = null;
    this.root_item = new PageList.RootItem(project);

    this.recursive_init(PageList.project.pages, PageList.root_item);
    this.init_buttons();
}

PageList.recursive_init = function(pages, parent_item) {
    $.each(pages, function(idx, page) {
        var item = PageList.add_item(page, parent_item);
        PageList.recursive_init(page.child_pages, item);
    });
}

PageList.init_buttons = function() {
    this.new_page_btn().click(function() { PageList.add_item(null, PageList.root_item); });
}

PageList.new_page_btn = function() {
    return $('#new_page_btn');
}

PageList.curr_page = function() {
    return this.curr_item.page;
}

PageList.select_first_item = function() {
    PageList.select_item(PageList.root_item.first_child_item());
}

PageList.select_item = function(item) {
    if(PageList.curr_item != null) PageList.curr_item.unselect();
    PageList.curr_item = item;
    PageList.curr_item.select();

    Editor.render_page();
}

PageList.add_item = function(page, parent_item) {
    // Create page if not given
    if(page === null) {
        page = Elements.Element.create_default(Elements.Page);
        page.name = parent_item.generate_next_child_page_name();
    }

    // Create item
    var item = new PageList.Item(page, parent_item);
    parent_item.add_child_item(item);

    return item;
}

PageList.delete_item = function(item) {
    if(item.can_delete()) {
        item.delete();

        if(this.curr_item == item) {
            this.curr_item = null;
            PageList.select_first_item();
        }
    }
}