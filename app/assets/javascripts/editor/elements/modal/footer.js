//= require ../element
//= require ./modal

var Elements = Elements || {};

Elements.Modal.Footer = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Modal.Footer.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Footer.prototype.constructor = Elements.Modal.Footer;

Elements.Modal.Footer.PROPERTIES = [
];

Elements.Modal.Footer.prototype.append = function(element) {
    this.render().append(element.render());
    this.fit_element(element);
};

Elements.Modal.Footer.prototype.fit_element = function(element) {
    var parent_size = this.get_size();
    var child_size = element.get_size();
    var child_position = element.get_position();

    this.set_size(
        'auto',
        Math.max(parent_size.height, child_size.height + child_position.top));
};

Elements.Modal.Footer.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_footer_template');

        $.each(Elements.Modal.Footer.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};