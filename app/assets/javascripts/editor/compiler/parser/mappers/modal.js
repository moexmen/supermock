//= require ./mapper

Parser.Mappers.Modal = {};

Parser.Mappers.Modal.map = function(element_type, properties) {
    if(element_type != 'modal') {
        return null;
    }

    return Elements.Modal.render(properties);
};