var Editor = {};

Editor.init = function() {
    Editor.load_project();
    Editor.init_buttons();
}

Editor.load_project = function() {
    var project_model = $('#data').data('project');
    this.project = new Elements.Project(project_model);

    Editor.recursive_init_page_list(this.project.pages, null);
    Editor.select_first_page_list_item();
}

Editor.init_buttons = function() {
    $('#new_page_btn').click(function() { Editor.add_page_list_item(null, null); });
}

Editor.recursive_init_page_list = function(pages, parent_item) {
    $.each(pages, function(idx, page) {
        item = Editor.add_page_list_item(page, parent_item);
        Editor.recursive_init_page_list(page.child_pages, item);
    });
}

Editor.select_first_page_list_item = function() {
    var first_item = $('#page_list').children('ul').children('li').first();
    Editor.select_page_list_item(first_item);
}

Editor.select_page_list_item = function(item) {
    if(this.curr_page_list_item != null) this.curr_page_list_item.children('div').removeClass('page_list_item_selected');
    this.curr_page_list_item = item;
    this.curr_page_list_item.children('div').addClass('page_list_item_selected');

    $('#canvas').empty();
    item.data('page').render();
}

Editor.add_page_list_item = function(page, parent_item) {
    // Create page if not given
    if(page === null) {
        page = new Elements.Page('', [], null, []);

        if(parent_item === null) {
            Editor.project.add_page(page);
            page.name = 'Page ' + Editor.project.pages.length;
        }
        else {
            var parent_page = parent_item.data('page');
            parent_page.add_child_page(page);
            page.name = parent_page.name + ' > ' + parent_page.child_pages.length;
        }
    }


    // Create item
    var page_item = Editor.clone_template('#page_list_item_template');
    page_item.data('page', page)
        .children('div')
            .text(page.name)
            .click(page_item, function(e) { Editor.select_page_list_item(e.data); });
    Editor.init_page_list_item_context_menu(page_item);


    // Add item to root or parent item
    if(parent_item === null) {
        $('#page_list').children('ul').append(page_item);
    }
    else {
        parent_item.children('ul').append(page_item);
    }

    return page_item;
}

Editor.delete_page_list_item = function(item) {
    var page = item.data('page');

    if(page.is_top_level_page()) {
        if(Editor.project.pages.length === 1) return;
        else Editor.project.remove_page(page);
    }
    else {
        page.parent_page.remove_child_page(page);
    }

    item.remove();

    if(this.curr_page_list_item.is(item)) {
        Editor.select_first_page_list_item();
    }
}

Editor.init_page_list_item_context_menu = function(item) {
    item.children('div').contextmenu({
        target: '#page_list_item_context_menu',
        before: function(e, context) {
            var delete_menu_item = $('#page_list_item_context_menu ul li:nth-child(2)').removeClass('disabled');
            var page_item = $(context).parent();
            var page = page_item.data('page');

            if(page.is_top_level_page() && Editor.project.pages.length === 1)  {
                delete_menu_item.addClass('disabled');
            }

            return true;
        },
        onItem: function(context, e) {
            var page_item = $(context).parent();
            var menu_item = $(e.target).text();

            if(menu_item === 'New Child Page') Editor.add_page_list_item(null, page_item);
            else if(menu_item === 'Delete') Editor.delete_page_list_item(page_item);
        }
    })
}

Editor.clone_template = function(id) {
    return $(id).clone().attr('id',null).removeClass('hidden');
}