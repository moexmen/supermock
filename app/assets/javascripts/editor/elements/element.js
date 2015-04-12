var Elements = Elements || {};

Elements.Element = function() {
}

Elements.Element.prototype.destroy = function() {
}

Elements.Element.prototype.set_position = function(left, top) {
    this.render().css({ left: left, top: top });
    return this;
}

Elements.Element.prototype.get_position = function() {
    var position = this.render().position();
    return { left: position.left, top: position.top};
}

Elements.Element.prototype.get_size = function() {
    return { width: this.render().width(), height: this.render().height() };
}

Elements.Element.prototype.render = function() {
}


Elements.Element.create_default = function(element_type) {
    switch(element_type) {
        case Elements.Page:
            return new Elements.Page('', [], null, []);
        case Elements.Button:
            return new Elements.Button('Button', 0, 0);
        default:
            return null;
    }
}

Elements.Element.parse_json = function(json) {
    var model = $.parseJSON(json);

    switch(model.type) {
        case 'Page':
            return new Elements.Page(model.name, model.elements, model.parent_page, model.child_pages);
        default:
            return null;
    }
}