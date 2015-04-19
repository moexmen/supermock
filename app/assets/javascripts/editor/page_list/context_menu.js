var PageList = PageList || {};
PageList.Menu = {};

PageList.Menu.add_to = function(page_item) {
    page_item.context_menu_trigger_area().contextmenu({
        target: '#page_list_item_context_menu',
        before: function(e, context) {
            var page_item = context.parent().data('page_item');
            PageList.Menu.allow_delete(page_item.can_delete());

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

PageList.Menu.render = function() {
    return $('#page_list_item_context_menu');
}

PageList.Menu.allow_delete = function(allow) {
    if(allow) this.delete_menu_item().removeClass('disabled');
    else this.delete_menu_item().addClass('disabled');
}

PageList.Menu.visible = function() {
    return this.render().hasClass('open');
}

PageList.Menu.show = function(page_item) {
    page_item.context_menu_trigger_area().contextmenu().trigger('contextmenu');
}

PageList.Menu.new_child_page_menu_item = function() {
    return $(this.render().find('li')[0]);
}

PageList.Menu.delete_menu_item = function() {
    return $(this.render().find('li')[1]);
}