var Elements = Elements || {};

Elements.Element = function() {
    this.properties = [];
}

Elements.Element.prototype.destroy = function() {
}

Elements.Element.prototype.find_property = function(property_constructor) {
    var matched_property = null;

    $.each(this.properties, function(idx, property) {
       if(property.constructor === property_constructor) {
           matched_property = property;
           return false;
       }
    });

    return matched_property;
}

Elements.Element.prototype.select = function() {
    this.hitarea.css('opacity', 0.2);
}

Elements.Element.prototype.unselect = function() {
    this.hitarea.css('opacity', 0.0);
}

Elements.Element.prototype.set_position = function(left, top) {
    this.render().css({ left: left, top: top });
}

Elements.Element.prototype.get_position = function() {
    return this.render().position();
}

Elements.Element.prototype.get_size = function() {
    return { width: this.render().outerWidth(), height: this.render().outerHeight() };
}

Elements.Element.prototype.set_size = function(width, height) {
    this.render().outerWidth(width).outerHeight(height);
}

Elements.Element.prototype.edit_mode = function() {
    this.hitarea.show();
}

Elements.Element.prototype.view_mode = function() {
    this.hitarea.hide();
}

Elements.Element.prototype.render = function() {
}

Elements.Element.create_default = function(element_type) {
    switch(element_type) {
        case Elements.Page:
            return new Elements.Page(Util.uuid(), '', [], null, []);
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
            return new Elements.Page(model.id, model.name, model.elements, model.parent_page, model.child_pages);
        default:
            return null;
    }
}