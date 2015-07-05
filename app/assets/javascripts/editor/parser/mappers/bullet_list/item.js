//=require ./bullet_list

Parser.Mappers.BulletList.Item = Parser.Mappers.BulletList.Item || {};

Parser.Mappers.BulletList.Item.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.BulletList || element_type != 'item') {
        return null;
    }

    return new Elements.BulletList.Item(properties);
};