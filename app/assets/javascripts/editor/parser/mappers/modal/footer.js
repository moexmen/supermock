var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Modal = Parser.Mappers.Modal || {};
Parser.Mappers.Modal.Footer = {};

Parser.Mappers.Modal.Footer.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Modal || element_type != 'footer') {
        return null;
    }

    return new Elements.Modal.Footer(properties);
};