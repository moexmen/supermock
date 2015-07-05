var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Box = {};

Parser.Mappers.Box.map = function(parent_element, element_type, properties) {
    if(element_type != 'box') {
        return null;
    }

    return new Elements.Box(properties);
};