var PageList = {};

PageList.init = function(project) {
    this.project = project;
    this.curr_item = null;

    this.recursive_init(PageList.project.pages, null);
    this.init_buttons();
}

PageList.recursive_init = function(pages, parent_item) {
    $.each(pages, function(idx, page) {
        var item = PageList.add_item(page, parent_item);
        PageList.recursive_init(page.child_pages, item);
    });
}

PageList.init_buttons = function() {
    $('#new_page_btn').click(function() { PageList.add_item(null, null); });
}

PageList.select_first_item = function() {
    var first_item = $('#page_list').children('ul').children('li').first();
    PageList.select_item(first_item);
}

PageList.select_item = function(item) {
    if(this.curr_item != null) this.curr_item.children('div').removeClass('page_list_item_selected');
    this.curr_item = item;
    this.curr_item.children('div').addClass('page_list_item_selected');

    $('#canvas').empty();
    item.data('page').render();
}

PageList.add_item = function(page, parent_item) {
    // Create page if not given
    if(page === null) {
        page = Elements.Element.create_default(Elements.Page);

        if(parent_item === null) {
            this.project.add_page(page);
            page.name = 'Page ' + PageList.project.pages.length;
        }
        else {
            var parent_page = parent_item.data('page');
            parent_page.add_child_page(page);
            page.name = parent_page.name + ' > ' + parent_page.child_pages.length;
        }
    }


    // Create item
    var page_item = Util.clone_template('#page_list_item_template');
    page_item.data('page', page)
        .children('div')
        .text(page.name)
        .click(page_item, function(e) { PageList.select_item(e.data); });
    PageList.init_item_context_menu(page_item);


    // Add item to root or parent item
    if(parent_item === null) {
        $('#page_list').children('ul').append(page_item);
    }
    else {
        parent_item.children('ul').append(page_item);
    }

    return page_item;
}

PageList.delete_item = function(item) {
    var page = item.data('page');

    if(page.is_top_level_page()) {
        if(PageList.project.pages.length === 1) return;
        else this.project.remove_page(page);
    }
    else {
        page.parent_page.remove_child_page(page);
    }

    item.remove();

    if(this.curr_item.is(item)) {
        PageList.select_first_item();
    }
}

PageList.init_item_context_menu = function(item) {
    item.children('div').contextmenu({
        target: '#page_list_item_context_menu',
        before: function(e, context) {
            var delete_menu_item = $('#page_list_item_context_menu ul li:nth-child(2)').removeClass('disabled');
            var page_item = $(context).parent();
            var page = page_item.data('page');

            if(page.is_top_level_page() && PageList.project.pages.length === 1)  {
                delete_menu_item.addClass('disabled');
            }

            return true;
        },
        onItem: function(context, e) {
            var page_item = $(context).parent();
            var menu_item = $(e.target).text();

            if(menu_item === 'New Child Page') PageList.add_item(null, page_item);
            else if(menu_item === 'Delete') PageList.delete_item(page_item);
        }
    })
}