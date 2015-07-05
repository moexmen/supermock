//=require ./table

Parser.Mappers.Table.Row = Parser.Mappers.Table.Row || {};

Parser.Mappers.Table.Row.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Table || element_type != 'row') {
        return null;
    }

    return new Elements.Table.Row(properties);
};