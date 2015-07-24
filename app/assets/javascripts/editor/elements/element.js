//= require_tree ./properties

var Elements = Elements || {};

Elements.Element = function() {
    this.html = null;
    this.properties = [];
    this.child_elements = [];
    this.movable = true;
    this.resizeable_directions = Elements.Element.all_directions();
    this.selectable = true;
};

Elements.Element.all_directions = function() {
    return $.map(Elements.Element.RESIZE_DIRECTIONS, function(value, key) { return value; });
};

Elements.Element.RESIZE_DIRECTIONS = {
    NORTH: '0',
    SOUTH: '1',
    EAST: '2',
    WEST: '3',
    NORTHEAST: "4",
    NORTHWEST: '5',
    SOUTHEAST: '6',
    SOUTHWEST: '7'
};

Elements.Element.prototype.has_direction = function(direction){
    return $.inArray(direction, this.resizeable_directions) != -1;
};

Elements.Element.prototype.set_unmovable = function(){
    this.movable = false;
};

Elements.Element.prototype.set_unresizeable = function(){
    this.resizeable_directions = [];
};

Elements.Element.prototype.set_unselectable = function(){
    this.selectable = false;
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

Elements.Element.prototype.set_size_without_resize = function(width, height) {
    this.render().outerWidth(width).outerHeight(height);
};

Elements.Element.prototype.set_size = function(width, height) {
    prev_dimensions = this.get_size();
    var prev_area = prev_dimensions.width * prev_dimensions.height;
    new_area = width * height;

    this.render().outerWidth(width).outerHeight(height);

    delta_area = new_area - prev_area;
    if(delta_area > 0) {
        this.on_increase_size();
    }
    else {
        this.on_decrease_size();
    }
};

Elements.Element.prototype.on_increase_size = function() {
};

Elements.Element.prototype.on_decrease_size = function() {
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

Elements.Element.prototype.edit_mode = function() {
    if(this.hitarea != null) {
        this.hitarea.show();
    }
    $.each(this.child_elements, function(idx, element){
        element.edit_mode();
    });
};

Elements.Element.prototype.apply_properties = function() {
    $.each(this.constructor.PROPERTIES, function(i, property) {
        property.type.apply(property.target(this), this.properties);
    }.bind(this));
};

Elements.Element.prototype.view_mode = function() {
    if(this.hitarea != null) {
        this.hitarea.hide();
    }
    $.each(this.child_elements, function(idx, element){
        element.view_mode();
    });
};

Elements.Element.prototype.render_child_elements = function(html) {
    if(html == null) {
        var elements_html = this.html.children('.child-elements').empty();
    }
    else {
        var elements_html = this.html.find(html).empty();
    }

    $.each(this.child_elements, function(i, element) {
        elements_html.append(element.render());
    });
};

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
        property_code = property.type.to_code(property.target(this));
        if(property_code != '') {
            code += ' ' + property_code;
        }
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
        case 'Button':
            return Elements.Button.parse_json(model.button_json);
        default:
            return null;
    }
};