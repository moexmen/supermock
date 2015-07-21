//= require ./modal

Elements.Modal.Footer = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Modal.Footer.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Footer.prototype.constructor = Elements.Modal.Footer;

Elements.Modal.Footer.TYPE = 'footer';

Elements.Modal.Footer.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html; } }
];

// Elements.Modal.Footer.prototype.fit_element = function(element) {
//     var parent_size = this.get_size();
//     var child_size = element.get_size();
//     var child_position = element.get_position();

//     this.set_size(
//         'auto',
//         Math.max(parent_size.height, child_size.height + child_position.top));
// };

Elements.Modal.Footer.map_from_code = function(parent_element, element_type, properties) {
    if(parent_element.constructor == Elements.Modal && element_type == Elements.Modal.Footer.TYPE) {
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
        this.html.children('.child-elements').children()
            .css('position', 'inherit')
            .remove('.hitarea');
    }

    return this.html;
};
