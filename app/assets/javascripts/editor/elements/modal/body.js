//= require ./modal

Elements.Modal.Body = function(parent_modal, properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.parent_modal = parent_modal;
};

Elements.Modal.Body.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Body.prototype.constructor = Elements.Modal.Body;

Elements.Modal.Body.TYPE = 'body';

Elements.Modal.Body.PROPERTIES = [
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
];

Elements.Modal.Body.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.Body.TYPE && parent_element.constructor == Elements.Modal) {
        return new Elements.Modal.Body(parent_element, properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Body.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_body_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this.parent_modal, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();
    }

    return this.html;
};


Elements.Modal.Body.prototype.fit_child_elements = function() {
    var minimum = this.child_elements_max_offset();
    var height_property = this.get_property('h');
    if(height_property != null && height_property.value > minimum) {
        return;
    }
    this.set_size(null, minimum);
};

Elements.Modal.Body.prototype.set_size = function(width, height) {
    this.render().outerHeight(height);
    // width cannot be modified
    this.set_property('h', height);
};

Elements.Modal.Body.prototype.child_elements_max_offset = function() {
    // to find the minimum depth that the body has to be to accommodate all elements
    var max_offset = 0;
    $.each(this.child_elements, function(i, child_element){
        var offset = child_element.get_position().top + child_element.get_size().height;
        if (offset > max_offset) {
            max_offset = offset;
        }
    });
    return max_offset;
};