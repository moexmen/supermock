var Elements = Elements || {};

Elements.ContextMenu = function() {
}

Elements.ContextMenu.prototype.show = function(target) {
    var e = this.new_trigger_event(target);
    target.contextmenu({ target: this.render() }).trigger(e);
}

Elements.ContextMenu.prototype.hide = function() {
    this.render().hide();
}

Elements.ContextMenu.prototype.render = function() {
}

Elements.ContextMenu.prototype.list = function() {
    return $(this.render().children('ul')[0]);
}

Elements.ContextMenu.prototype.detach_list_items = function() {
    this.list().children().detach();
}

Elements.ContextMenu.prototype.new_trigger_event = function(target) {
    var target_position = target.offset();
    var e = $.Event('contextmenu');

    e.currentTarget = target;
    e.clientX = target_position.left - $('body').scrollLeft() + target.outerWidth();
    e.clientY = target_position.top - $('body').scrollTop();

    return e;
}