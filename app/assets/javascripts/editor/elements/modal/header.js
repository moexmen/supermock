//= require ./modal

Elements.Modal.Header = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Modal.Header.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Header.prototype.constructor = Elements.Modal.Header;

Elements.Modal.Header.TYPE = 'header';

Elements.Modal.Header.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html; } }
    // { type: Elements.Properties.ModalClose, target: function(element) { return element.html.find('.close'); } },
    // { type: Elements.Properties.Modal.Title, target: function(html) { return html.find('.modal-title'); } }
];

Elements.Modal.Header.map_from_code = function(parent_element, element_type, properties) {
    if(parent_element.constructor == Elements.Modal && element_type == Elements.Modal.Header.TYPE) {
        return new Elements.Modal.Header(properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Header.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_header_template');

        this.apply_properties();

    }

    return this.html;
};
