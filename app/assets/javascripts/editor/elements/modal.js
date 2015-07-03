//= require ./element

var Elements = Elements || {};

Elements.Modal = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Modal.PROPERTIES = [
    { type: Elements.Properties.ModalClose, target: function(html) { return html.find('.modal-header .close'); } }
];

Elements.Modal.prototype.append = function(child) {
    this.render().find('.modal-body').append(child);
};

Elements.Modal.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_template');

        $.each(Elements.Modal.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};