var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Table = Parser.Mappers.Table || {};

Parser.Mappers.Table.map = function(parent_element, element_type, properties) {
    if(element_type != 'table') {
        return null;
    }

    return new Elements.Table(properties);
};