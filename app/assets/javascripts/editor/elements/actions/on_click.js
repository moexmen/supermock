//= require ./action

Elements.Action.OnClick = function() {
    Elements.Action.call(this);
}

Elements.Action.OnClick.singleton = function() {
    return this.instance = this.instance || new Elements.Action.OnClick();
}

Elements.Action.OnClick.prototype = Object.create(Elements.Action.prototype);
Elements.Action.OnClick.prototype.constructor = Elements.Action.OnClick;

Elements.Action.OnClick.prototype.perform = function(page) {
    console.log(page);
    $.each(this.elements, function(idx, element) {

    });
}

Elements.Action.OnClick.prototype.render = function(elements) {
    this.elements = elements;

    if(!this.html) {
        var sub_menu_callback = function(target) {
            Editor.element_page_menu.show(target, this.perform.bind(this));
        }.bind(this);

        this.html = new Elements.ContextMenu.Item('On click go to', null, sub_menu_callback);
    }

    return this.html.render();
}
