var PageList = {};

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

PageList.select_first_item = function() {
    PageList.select_item(PageList.root_item.first_child_item());
}

PageList.select_item = function(item) {
    if(PageList.curr_item != null) PageList.curr_item.unselect();
    PageList.curr_item = item;
    PageList.curr_item.select();

    Editor.render_page(PageList.curr_item.page);
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

/* Root Item */
PageList.RootItem = function(project) {
    this.project = project;
    this.child_items = [];
    this.html = $('#page_list').children('ul');
}

PageList.RootItem.prototype.first_child_item = function() {
    return this.child_items[0];
}

PageList.RootItem.prototype.add_child_item = function(child_item) {
    this.project.add_page(child_item.page);
    this.child_items.push(child_item);

    this.html.append(child_item.render());
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
    return this.html;
}

/* Item */

PageList.Item = function(page, parent_item) {
    this.page = page;
    this.child_items = [];
    this.parent_item = parent_item;
    this.html = null;
}

PageList.Item.prototype.destroy = function() {
    this.page = null;
    this.child_items = null;
    this.parent_item = null;
    if(this.html != null) {
        this.html.remove();
        this.html = null;
    }
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

    this.html.children('ul').append(child_item.render());
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
    this.html.children('div').addClass('page_list_item_selected');
}

PageList.Item.prototype.unselect = function() {
    this.html.children('div').removeClass('page_list_item_selected');
}

PageList.Item.prototype.generate_next_child_page_name = function() {
    return this.page.name + ' > ' + (this.page.child_pages.length + 1);
}

PageList.Item.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#page_list_item_template')
        this.html
            .data('page_item', this)
            .children('div')
                .text(this.page.name)
                .click(function(e) { PageList.select_item(this); }.bind(this));

        PageList.ContextMenu.add_to(this);
    }

    return this.html;
}

PageList.Item.prototype.context_menu_trigger_area = function() {
    return this.render().children('div');
}

/* Context Menu */

PageList.ContextMenu = {};

PageList.ContextMenu.add_to = function(page_item) {
    page_item.context_menu_trigger_area().contextmenu({
        target: '#page_list_item_context_menu',
        before: function(e, context) {
            var page_item = $(context).parent().data('page_item');
            PageList.ContextMenu.allow_delete(page_item.can_delete());

            return true;
        },
        onItem: function(context, e) {
            var menu_item = $(e.target).text();
            var page_item = $(context).parent().data('page_item');

            if(menu_item === 'New Child Page') PageList.add_item(null, page_item);
            else if(menu_item === 'Delete') PageList.delete_item(page_item);
        }
    })
}

PageList.ContextMenu.render = function() {
    return $('#page_list_item_context_menu');
}

PageList.ContextMenu.allow_delete = function(allow) {
    if(allow) this.delete_menu_item().removeClass('disabled');
    else this.delete_menu_item().addClass('disabled');
}

PageList.ContextMenu.visible = function() {
    return this.render().hasClass('open');
}

PageList.ContextMenu.show = function(page_item) {
    page_item.context_menu_trigger_area().contextmenu().trigger('contextmenu');
}

PageList.ContextMenu.new_child_page_menu_item = function() {
    return $(this.render().find('li')[0]);
}

PageList.ContextMenu.delete_menu_item = function() {
    return $(this.render().find('li')[1]);
}