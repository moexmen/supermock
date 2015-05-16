var PageList = PageList || {};
PageList.Menu = {};

PageList.Menu.enable_menu_for = function(page_item) {
    page_item.render_hitarea().contextmenu({
        target: PageList.Menu.render(),
        before: function(e, context) {
            var page_item = context.parent().data('page_item');
            PageList.Menu.show_delete(page_item.can_delete());

            return true;
        },
        onItem: function(context, e) {
            var menu_item = $(e.target).text();
            var page_item = context.parent().data('page_item');

            if(menu_item === 'New Child Page') PageList.add_item(null, page_item);
            else if(menu_item === 'Delete') PageList.delete_item(page_item);
        }
    })
}

PageList.Menu.show_delete = function(show) {
    if(show) this.delete_menu_item().removeClass('disabled');
    else this.delete_menu_item().addClass('disabled');
}

PageList.Menu.visible = function() {
    return this.render().hasClass('open');
}

PageList.Menu.show = function(page_item) {
    page_item.render_hitarea().contextmenu().trigger('contextmenu');
}

PageList.Menu.render = function() {
    return $('#page_list_item_menu');
}

PageList.Menu.new_child_page_menu_item = function() {
    return this.render().find('li:eq(0)');
}

PageList.Menu.delete_menu_item = function() {
    return this.render().find('li:eq(1)');
}