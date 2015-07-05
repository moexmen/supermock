var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Modal = Parser.Mappers.Modal || {};
Parser.Mappers.Modal.Header = {};

Parser.Mappers.Modal.Header.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Modal || element_type != 'header') {
        return null;
    }

    return new Elements.Modal.Header(properties);
};