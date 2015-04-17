var Elements = Elements || {};
Elements.ContextMenu = Elements.ContextMenu || {};
Elements.ContextMenu.GoToPage = {};

Elements.ContextMenu.GoToPage.show_items = function(pages) {
    $.each(pages, function(idx, page) {
        var item = Util.clone_template('#element_go_to_page_context_menu_item_template');
        item.children('a').text(page.name);

        Elements.ContextMenu.GoToPage.list().append(item);
        Elements.ContextMenu.GoToPage.show_items(page.child_pages);
    });
}

Elements.ContextMenu.GoToPage.show = function(target, element) {
    Elements.ContextMenu.GoToPage.list().children().detach();
    Elements.ContextMenu.GoToPage.show_items(PageList.project.pages);

    var target_position = target.offset();
    var e = $.Event('contextmenu');
    e.currentTarget = target;
    e.clientX = target_position.left - $('body').scrollLeft() + target.outerWidth();
    e.clientY = target_position.top - $('body').scrollTop();

    target.contextmenu({ target: Elements.ContextMenu.GoToPage.render() }).trigger(e);
}

Elements.ContextMenu.GoToPage.hide = function() {
    Elements.ContextMenu.GoToPage.render().hide();
}

Elements.ContextMenu.GoToPage.render = function() {
    return $('#element_go_to_page_context_menu');
}

Elements.ContextMenu.GoToPage.list = function() {
    return $(Elements.ContextMenu.GoToPage.render().children('ul')[0]);
}