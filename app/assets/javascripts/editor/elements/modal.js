//= require ./element

Elements.Modal = {};

Elements.Modal.properties = [
    { type: Elements.Properties.ModalClose, target: function(html) { return html.find('.modal-header .close'); } }
];

Elements.Modal.render = function(properties) {
    var html = Util.clone_template('#element_modal_template');

    $.each(Elements.Modal.properties, function(index, property) {
        property.type.apply(property.target(html), properties);
    });

    return html;
};