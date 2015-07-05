//= require ../element
//= require ./modal

var Elements = Elements || {};

Elements.Modal.Header = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Modal.Header.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Header.prototype.constructor = Elements.Modal.Header;

Elements.Modal.Header.PROPERTIES = [
    { type: Elements.Properties.ModalClose, target: function(html) { return html.find('.close'); } },
    { type: Elements.Properties.Modal.Title, target: function(html) { return html.find('.modal-title'); } }
];

Elements.Modal.Header.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_header_template');

        $.each(Elements.Modal.Header.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};