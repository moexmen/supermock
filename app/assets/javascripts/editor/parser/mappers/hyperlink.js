var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Hyperlink = {};

Parser.Mappers.Hyperlink.map = function(parent_element, element_type, properties) {
    if(element_type != 'link') {
        return null;
    }

    return new Elements.Hyperlink(properties);
};