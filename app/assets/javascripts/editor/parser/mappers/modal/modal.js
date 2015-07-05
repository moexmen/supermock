var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Modal = Parser.Mappers.Modal || {};

Parser.Mappers.Modal.map = function(parent_element, element_type, properties) {
    if(element_type != 'modal') {
        return null;
    }

    return new Elements.Modal(properties);
};