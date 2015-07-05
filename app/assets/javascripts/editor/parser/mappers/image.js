var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Image = {};

Parser.Mappers.Image.map = function(parent_element, element_type, properties) {
    if(element_type != 'image') {
        return null;
    }

    return new Elements.Image(properties);
};