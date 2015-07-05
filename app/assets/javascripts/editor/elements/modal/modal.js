//= require ../element

var Elements = Elements || {};

Elements.Modal = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Modal.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.prototype.constructor = Elements.Modal;

Elements.Modal.PROPERTIES = [
];

Elements.Modal.prototype.append = function(element) {
    this.render().find('.modal-content').append(element.render());
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