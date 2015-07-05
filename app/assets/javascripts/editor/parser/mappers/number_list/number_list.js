var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.NumberList = Parser.Mappers.NumberList || {};

Parser.Mappers.NumberList.map = function(parent_element, element_type, properties) {
    if(element_type != 'number-list') {
        return null;
    }

    return new Elements.NumberList(properties);
};