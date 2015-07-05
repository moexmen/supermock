//=require ./number_list

Parser.Mappers.NumberList.Item = Parser.Mappers.NumberList.Item || {};

Parser.Mappers.NumberList.Item.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.NumberList || element_type != 'item') {
        return null;
    }

    return new Elements.NumberList.Item(properties);
};