var Editor = {};

Editor.init = function() {
    Editor.load_project();
    Editor.init_buttons();
}

Editor.load_project = function() {
    this.project = new UiElements.Project();

    var raw_project = $('#editor').data('project');
    $.each($.parseJSON(raw_project.pages), function(idx, page) {
        var page = new UiElements.Page($.parseJSON(page).name);
        Editor.add_page_list_item(page);
    });

    Editor.select_first_page_list_item();
}

Editor.init_buttons = function() {
    $('#new_page_btn').click(function() {
        var page = new UiElements.Page('Page ' + Editor.project.pages.length);
        Editor.add_page_list_item(page);
    });
}

Editor.add_page_list_item = function(page) {
    Editor.project.add_page(page);

    var page_item = this.clone_template('#page_list_item_template');
    page_item.data('page', page).find('div').text(page.name);
    page_item.click(page_item, function(e) { Editor.select_page_list_item(e.data); });
    page_item.contextmenu({
        target: '#page_list_item_context_menu',
        before: function(e, context) {
            var delete_item = $('#page_list_item_context_menu ul li:nth-child(2)');
            if(Editor.project.pages.length == 1) delete_item.addClass('disabled');
            else delete_item.removeClass('disabled');
            return true;
        },
        onItem: function(context, e) {
            var page_item = $(context);
            var menu_item = $(e.target).text();

            if(menu_item === 'Delete') Editor.delete_page_list_item(page_item);
        }
    });

    $('#page_list').children('ul').append(page_item);
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

Editor.delete_page_list_item = function(item) {
    if(Editor.project.pages.length == 1) return;

    var page = item.data('page');
    Editor.project.remove_page(page);
    item.remove();

    if(this.curr_page_list_item.is(item)) Editor.select_first_page_list_item();
}

Editor.clone_template = function(id) {
    return $(id).clone().attr('id',null).removeClass('hidden');
}