var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.Textarea = {};

Parser.Mappers.Textarea.map = function(parent_element, element_type, properties) {
    if(element_type != 'textarea') {
        return null;
    }

    return new Elements.Textarea(properties);
};