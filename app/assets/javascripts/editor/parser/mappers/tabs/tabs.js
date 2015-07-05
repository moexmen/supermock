var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Tabs = Parser.Mappers.Tabs || {};

Parser.Mappers.Tabs.map = function(parent_element, element_type, properties) {
    if(element_type != 'tabs') {
        return null;
    }

    return new Elements.Tabs(properties);
};