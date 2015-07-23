//= require ./modal

Elements.Modal.Footer = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Modal.Footer.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Footer.prototype.constructor = Elements.Modal.Footer;

Elements.Modal.Footer.TYPE = 'footer';

Elements.Modal.Footer.PROPERTIES = [
];

Elements.Modal.Footer.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.Footer.TYPE && parent_element.constructor == Elements.Modal) {
        return new Elements.Modal.Footer(properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Footer.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_footer_template');

        this.apply_properties();
        this.render_child_elements();
        this.set_child_elements();
    }

    return this.html;
};

Elements.Modal.Footer.prototype.set_child_elements = function() {
    this.html.children('.child-elements').children().css('position', 'initial');

    $.each(this.child_elements, function(idx, element) {
        element.set_unselectable();
    }.bind(this));

};
