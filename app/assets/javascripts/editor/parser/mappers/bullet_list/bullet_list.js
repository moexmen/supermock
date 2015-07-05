var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.BulletList = Parser.Mappers.BulletList || {};

Parser.Mappers.BulletList.map = function(parent_element, element_type, properties) {
    if(element_type != 'bullet-list') {
        return null;
    }

    return new Elements.BulletList(properties);
};