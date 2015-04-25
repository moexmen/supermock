//= require ../property

Elements.Property.Menu = function() {
    this.items = [];
    this.hide();
}
Elements.Property.Menu.prototype.find_item = function(item_constructor) {
    var matched_item = null;
    $.each(this.items, function(idx, item) {
        if(item.constructor === item_constructor) {
            matched_item = item;
            return false;
        }
    });

    return matched_item;
}

Elements.Property.Menu.prototype.add_item = function(item) {
    this.items.push(item);
    this.list().append(item.render());
}

Elements.Property.Menu.prototype.add_items = function(items) {
    $.each(items, function(idx, item) {
        this.add_item(item);
    }.bind(this));
}

Elements.Property.Menu.prototype.remove_items = function() {
    this.items = [];
    this.list().empty();
}

Elements.Property.Menu.prototype.hide_sub_menus = function() {
    $.each(this.items, function(idx, item) {
       item.hide_sub_menus();
    });
}

Elements.Property.Menu.prototype.visible = function() {
    return this.render().is(':visible');
}

Elements.Property.Menu.prototype.show = function(target) {
    var e = this.new_trigger_event(target);
    target.contextmenu({ target: this.render() }).trigger(e);
}

Elements.Property.Menu.prototype.hide = function() {
    this.hide_sub_menus();
    this.render().hide();
}

Elements.Property.Menu.prototype.render = function() {
}

Elements.Property.Menu.prototype.list = function() {
    return $(this.render().children('ul')[0]);
}

Elements.Property.Menu.prototype.new_trigger_event = function(target) {
    var target_position = target.offset();
    var e = $.Event('contextmenu');

    e.currentTarget = target;
    e.clientX = target_position.left - $('body').scrollLeft() + target.outerWidth();
    e.clientY = target_position.top - $('body').scrollTop();

    return e;
}