//=require ./table

Parser.Mappers.Table.Column = Parser.Mappers.Table.Column || {};

Parser.Mappers.Table.Column.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Table.Row || element_type != 'column') {
        return null;
    }

    return new Elements.Table.Column(properties);
};