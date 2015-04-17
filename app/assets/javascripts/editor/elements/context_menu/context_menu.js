var Elements = Elements || {};
Elements.ContextMenu = {};

Elements.ContextMenu.show_items = function(element) {
    Elements.ContextMenu.list().children().detach();
    $.each(element.context_menu_items, function(idx, item) {
        Elements.ContextMenu.list().append(item.render());
    });
}

Elements.ContextMenu.show = function(target, elements) {
    Elements.ContextMenu.show_items(elements[0]);

    var target_position = target.offset();
    var e = $.Event('contextmenu');
    e.currentTarget = target;
    e.clientX = target_position.left - $('body').scrollLeft() + target.outerWidth();
    e.clientY = target_position.top - $('body').scrollTop();

    target.contextmenu({ target: Elements.ContextMenu.render() }).trigger(e);
}

Elements.ContextMenu.hide = function() {
    Elements.ContextMenu.render().hide();
}

Elements.ContextMenu.render = function() {
    return $('#element_context_menu');
}

Elements.ContextMenu.list = function() {
    return $(Elements.ContextMenu.render().children('ul')[0]);
}