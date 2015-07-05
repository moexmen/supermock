var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Textfield = {};

Parser.Mappers.Textfield.map = function(parent_element, element_type, properties) {
    if(element_type != 'textfield') {
        return null;
    }

    return new Elements.Textfield(properties);
};