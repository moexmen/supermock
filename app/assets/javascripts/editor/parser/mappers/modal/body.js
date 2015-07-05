var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Modal = Parser.Mappers.Modal || {};
Parser.Mappers.Modal.Body = {};

Parser.Mappers.Modal.Body.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Modal || element_type != 'body') {
        return null;
    }

    return new Elements.Modal.Body(properties);
};