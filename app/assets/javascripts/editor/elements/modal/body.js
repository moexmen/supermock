//= require ../element
//= require ./modal

var Elements = Elements || {};

Elements.Modal.Body = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Modal.Body.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Body.prototype.constructor = Elements.Modal.Body;

Elements.Modal.Body.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(html) { return html; } }
];

Elements.Modal.Body.prototype.append = function(element) {
    this.render().append(element.render());
    this.fit_element(element);
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

        $.each(Elements.Modal.Body.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};