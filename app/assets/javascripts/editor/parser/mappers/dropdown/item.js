//=require ./dropdown

Parser.Mappers.Dropdown.Item = Parser.Mappers.Dropdown.Item || {};

Parser.Mappers.Dropdown.Item.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Dropdown || element_type != 'item') {
        return null;
    }

    return new Elements.Dropdown.Item(properties);
};