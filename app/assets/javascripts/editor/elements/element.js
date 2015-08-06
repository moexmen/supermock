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
    var size = { width: this.render().outerWidth(), height: this.render().outerHeight() };

    return size;
};

Elements.Element.prototype.get_property = function(name) {
    var desired_property = null;

    $.each(this.properties, function(idx, property){
        if(property.name == name){
            desired_property = property;
            return false;
        }
    });
    return desired_property;
};

Elements.Element.prototype.set_property = function(name, value) {
    var property = this.get_property(name);
    if(property == null) {
        this.properties.push({name: name, value: value});
    }
    else {
        property.value = value;
    }
};

Elements.Element.prototype.set_width_height = function(width, height) {
    this.render().outerWidth(width).outerHeight(height);

    this.set_property('w', width); 
    this.set_property('h', height);
};

Elements.Element.prototype.set_size = function(width, height) {
    prev_dimensions = this.get_size();

    var prev_area = prev_dimensions.width * prev_dimensions.height;
    var new_area = width * height;
    var difference = new_area - prev_area;

    this.set_width_height(width, height);

    difference > 0 ? this.on_increase_size() : this.on_decrease_size();
};

Elements.Element.prototype.on_increase_size = function() {
};

Elements.Element.prototype.on_decrease_size = function() {
};

Elements.Element.prototype.get_position = function() {
    return this.render().position();
};

Elements.Element.prototype.set_position = function(left, top) {
    this.render().css({ left: left, top: top });

    this.set_property('x', left); 
    this.set_property('y', top);

    Console.refresh();
};

Elements.Element.prototype.set_position_relative_to_canvas = function(left, top) {
    var canvas_position = Editor.canvas().offset();

    this.render().offset({ 
            top: top + canvas_position.top, 
            left: left + canvas_position.left
        });

    this.set_property('x', left); 
    this.set_property('y', top);
    Console.refresh();
};

Elements.Element.prototype.get_position_relative_to_canvas = function() {
    var position = this.render().offset();
    var canvas_position = Editor.canvas().offset();

    position.left -= canvas_position.left;
    position.top -= canvas_position.top;

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

Elements.Element.prototype.render_child_elements = function() {
    var elements_html = this.html.children('.child-elements:eq(0)');

    if(elements_html == null) {
        elements_html = this.html.find('.child-elements:eq(0)');
    }
    elements_html.empty();

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

    $.each(this.properties, function(i, property) {
        code += ' ';
        if(property.name != ''){
            code += property.name + '=';
        }
        code += property.value;
    });
    return code;
};

Elements.Element.prototype.set_code = function(code) {
    Parser.parse(this, code);

    this.apply_properties();
    this.render_child_elements();
};

Elements.Element.parse_json = function(model, parent_element) {
    var element = null;

    $.each(Parser.ELEMENT_FACTORIES, function(index, element_factory) {
        element = element_factory.map_from_code(parent_element, model.type, model.properties);

        if(element != null) {
            return false;
        }
    });

    $.each(model.child_elements, function(idx, child_element){
        element.child_elements.push(Elements.Element.parse_json(child_element, element));
    });

    return element;
};

Elements.Element.prototype.to_json = function() {
    var element_json = {    type: this.constructor.TYPE,
                            properties: this.properties,
                            child_elements: [],
                        };

    $.each(this.child_elements, function(idx, child_element){
        element_json.child_elements.push(child_element.to_json());
    }.bind(this));

    return element_json;
};