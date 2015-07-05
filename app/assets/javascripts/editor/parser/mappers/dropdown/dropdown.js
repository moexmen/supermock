var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Dropdown = Parser.Mappers.Dropdown || {};

Parser.Mappers.Dropdown.map = function(parent_element, element_type, properties) {
    if(element_type != 'dropdown') {
        return null;
    }

    return new Elements.Dropdown(properties);
};