var PageList = PageList || {};

PageList.init = function(project) {
    this.project = project;
    this.curr_item = null;
    this.root_item = new PageList.RootItem(project);

    PageList.recursive_init(PageList.project.pages, PageList.root_item);
    PageList.init_buttons();
}

PageList.recursive_init = function(pages, parent_item) {
    $.each(pages, function(idx, page) {
        var item = PageList.add_item(page, parent_item);
        PageList.recursive_init(page.child_pages, item);
    });
}

PageList.init_buttons = function() {
    PageList.new_page_btn().click(function() { PageList.add_item(null, PageList.root_item); });
}

PageList.curr_page = function() {
    return PageList.curr_item.page;
}

PageList.set_curr_page_with_id = function(page_id) {
    var item = PageList.find_item_by_page_id(page_id);
    PageList.select_item(item);
}

PageList.select_first_item = function() {
    PageList.select_item(PageList.root_item.first_child_item());
}

PageList.select_item = function(item) {
    if(PageList.curr_item != null) {
        PageList.curr_item.unselect();
    }

    PageList.curr_item = item;
    PageList.curr_item.select();

    Editor.render_curr_page();
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

        if(PageList.curr_item == item) {
            PageList.curr_item = null;
            PageList.select_first_item();
        }
    }
}

PageList.find_item_by_page_id = function(page_id) {
    var recursive_find_item = function(item, page_id) {
        var matched_item = null;

        if(item != PageList.root_item && item.page.id === page_id) {
            matched_item = item;
        }
        else {
            $.each(item.child_items, function(idx, child_item) {
                matched_item = recursive_find_item(child_item, page_id);
                if(matched_item != null) {
                    return false
                }
            });
        }

        return matched_item;
    }

    return recursive_find_item(PageList.root_item, page_id);
}

PageList.top_level_items = function() {
    return PageList.root_item.child_items;
}

PageList.new_page_btn = function() {
    return $('#new_page_btn');
}