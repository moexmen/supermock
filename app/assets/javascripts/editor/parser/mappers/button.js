var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Button = {};

Parser.Mappers.Button.map = function(parent_element, element_type, properties) {
    if(element_type != 'button') {
        return null;
    }

    return new Elements.Button(properties);
};