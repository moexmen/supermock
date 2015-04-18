//= require ./context_menu

Elements.ActionMenu = function() {
    Elements.ContextMenu.call(this);
    this.actions = [];
}

Elements.ActionMenu.prototype = Object.create(Elements.ContextMenu.prototype);
Elements.ActionMenu.prototype.constructor = Elements.ActionMenu;

Elements.ActionMenu.prototype.show = function(target, elements) {
    this.actions = [];
    this.detach_list_items();

    $.each(elements[0].actions, function(idx, action) {
        this.actions.push(action);
        this.list().append(action.render(elements));
    }.bind(this));

    Elements.ContextMenu.prototype.show.call(this, target);
}

Elements.ActionMenu.prototype.render = function() {
    return $('#element_action_menu');
}