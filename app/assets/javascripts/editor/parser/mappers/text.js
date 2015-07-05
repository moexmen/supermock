var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Text = {};

Parser.Mappers.Text.map = function(parent_element, element_type, properties) {
    if(element_type != 'text') {
        return null;
    }

    return new Elements.Text(properties);
};