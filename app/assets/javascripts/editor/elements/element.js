//= require_tree ./properties

var Elements = Elements || {};
Elements.Element = function() {
    this.html = null;
    this.properties = [];
    this.child_elements = [];
};

Elements.Element.prototype.add_element = function(element) {
    this.child_elements.push(element);
};

Elements.Element.prototype.get_size = function() {
    //var original_parent = this.render().parent();
    //
    //this.render().detach();
    //$('#invisible_dom').append(this.render());

    var size = { width: this.render().outerWidth(), height: this.render().outerHeight() };

    //this.render().detach();
    //original_parent.append(this.render());

    return size;
};

Elements.Element.prototype.set_size = function(width, height) {
    this.render().outerWidth(width).outerHeight(height);
};

Elements.Element.prototype.get_position = function() {
    //var original_parent = this.render().parent();
    //
    //this.render().detach();
    //$('#invisible_dom').append(this.render());

    var position = this.render().position();

    //this.render().detach();
    //original_parent.append(this.render());

    return position;
};

Elements.Element.prototype.set_position = function(left, top) {
    this.render().css({ left: left, top: top });
    Console.refresh();
};

Elements.Element.prototype.get_position_relative_to_canvas = function() {
    //var original_parent = this.render().parent();
    //
    //this.render().detach();
    //$('#invisible_dom').append(this.render());

    var position = this.render().offset();
    var canvas_position = Editor.canvas().offset();

    position.left -= canvas_position.left;
    position.top -= canvas_position.top;

    //this.render().detach();
    //original_parent.append(this.render());

    return position;
};

Elements.Element.prototype.select = function() {
    if(this.hitarea != null) {
        this.hitarea.css('opacity', 0.2);
    }
};

Elements.Element.prototype.unselect = function() {
    if(this.hitarea != null) {
        this.hitarea.css('opacity', 0.0);
    }
};

Elements.Element.prototype.apply_properties = function() {
    $.each(this.constructor.PROPERTIES, function(i, property) {
        property.type.apply(property.target(this), this.properties);
    }.bind(this));
};

Elements.Element.prototype.render_child_elements = function() {
    var elements_html = this.html.children('.child-elements').empty();

    $.each(this.child_elements, function(i, element) {
        elements_html.append(element.render());
    });
}

Elements.Element.prototype.to_code = function(indent) {
    indent = indent || '';

    var code = indent + this.constructor.TYPE + this.properties_to_code();

    $.each(this.child_elements, function(i, element) {
        code += '\n' + element.to_code(indent + '\t');
    });

    return code;
};

Elements.Element.prototype.properties_to_code = function() {
    var code = '';

    $.each(this.constructor.PROPERTIES, function(i, property) {
        code += ' ' + property.type.to_code(property.target(this));
    }.bind(this));

    return code;
};

Elements.Element.prototype.set_code = function(code) {
    var result = Parser.parse(code);

    this.properties = result.properties;
    this.child_elements = result.child_elements;

    this.apply_properties();
    this.render_child_elements();
};

Elements.Element.parse_json = function(json) {
    var model = $.parseJSON(json);

    switch(model.type) {
        case 'Page':
            return new Elements.Page(model.id, model.name);
        default:
            return null;
    }
};