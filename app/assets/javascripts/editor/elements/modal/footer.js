//= require ./modal

Elements.Modal.Footer = function(parent_modal, properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.parent_modal = parent_modal;
};

Elements.Modal.Footer.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Footer.prototype.constructor = Elements.Modal.Footer;

Elements.Modal.Footer.TYPE = 'footer';

Elements.Modal.Footer.PROPERTIES = [
];

Elements.Modal.Footer.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.Footer.TYPE && parent_element.constructor == Elements.Modal) {
        return new Elements.Modal.Footer(parent_element, properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Footer.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_footer_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { console.log("Kenna footer"); return Editor.mousedown_element(this.parent_modal, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();
        this.set_child_elements();
    }

    return this.html;
};

Elements.Modal.Footer.prototype.set_child_elements = function() {
    // this.html.children('.child-elements').children().css('position', 'initial');
};
