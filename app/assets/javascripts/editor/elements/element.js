var Elements = Elements || {};

Elements.Element = function() {
    this.properties = [];
    this.html = null;
}

Elements.Element.prototype.destroy = function() {
    this.unrender();
    this.html = null;
    this.hitarea = null;
}

Elements.Element.prototype.find_property = function(property_constructor) {
    var matched_property = $.grep(this.properties, function(property) { return property.constructor === property_constructor });
    return matched_property[0] || null;
}

Elements.Element.prototype.has_property = function(property_constructor) {
    return this.find_property(property_constructor) != null;
}

Elements.Element.prototype.set_position = function(left, top) {
    console.log(this.render(), "Cool stuffs");
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

Elements.Element.prototype.select = function() {
    if(this.hitarea != null) {
        this.hitarea.css('opacity', 0.2);
    }
}

Elements.Element.prototype.unselect = function() {
    if(this.hitarea != null) {
        this.hitarea.css('opacity', 0.0);
    }
}

Elements.Element.prototype.edit_mode = function() {
    if(this.hitarea != null) {
        this.hitarea.show();
    }
}

Elements.Element.prototype.view_mode = function() {
    if(this.hitarea != null) {
        this.hitarea.hide();
    }
}

Elements.Element.prototype.render = function() {
}

Elements.Element.prototype.unrender = function() {
    if(this.html != null) {
        this.render().remove();
    }
}

Elements.Element.create_default = function(element_type) {
    switch(element_type) {
        case Elements.Page:
            console.log("creating a new page");
            return new Elements.Page(Util.uuid(), '', [], null, []);
        case Elements.Button:
            console.log("creating a button");
            return new Elements.Button('Button', 0, 0);
        case Elements.Text:
            console.log("please be here?");
            return new Elements.Text(50, 50);
        default:
            console.log("FUCK YOU");
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