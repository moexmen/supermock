var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Checkbox = {};

Parser.Mappers.Checkbox.map = function(parent_element, element_type, properties) {
    if(element_type != 'checkbox') {
        return null;
    }

    return new Elements.Checkbox(properties);
};