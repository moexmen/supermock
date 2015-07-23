//= require ./modal

Elements.Modal.Body = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Modal.Body.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Body.prototype.constructor = Elements.Modal.Body;

Elements.Modal.Body.TYPE = 'body';

Elements.Modal.Body.PROPERTIES = [
];

Elements.Modal.Body.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.Body.TYPE && parent_element.constructor == Elements.Modal) {
        return new Elements.Modal.Body(properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Body.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_body_template');

        this.apply_properties();
        this.render_child_elements();
        this.set_child_elements();
    }

    return this.html;
};

Elements.Modal.Body.prototype.set_child_elements = function() {
    this.html.children('.child-elements').children().css('position', 'initial');

    $.each(this.child_elements, function(idx, element) {
        element.set_unselectable();
    }.bind(this));

};
