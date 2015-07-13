//= require ./modal

Elements.Modal.Body = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Modal.Body.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Body.prototype.constructor = Elements.Modal.Body;

Elements.Modal.Body.TYPE = 'body';

Elements.Modal.Body.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html; } }
];

Elements.Modal.Body.prototype.append = function(element) {
    this.render().append(element.render());
    this.fit_element(element);
};

Elements.Modal.Body.map_from_code = function(parent_element, element_type, properties) {
    if(parent_element.constructor == Elements.Modal && element_type == Elements.Modal.Body.TYPE) {
        return new Elements.Modal.Body(properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Body.prototype.fit_element = function(element) {
    var parent_size = this.get_size();
    var child_size = element.get_size();
    var child_position = element.get_position();

    this.set_size(
        'auto',
        Math.max(parent_size.height, child_size.height + child_position.top));
};

Elements.Modal.Body.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_body_template');

        this.apply_properties();
        this.render_child_elements('*');

    }

    return this.html;
};
