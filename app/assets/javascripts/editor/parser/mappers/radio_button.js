var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.RadioButton = {};

Parser.Mappers.RadioButton.map = function(parent_element, element_type, properties) {
    if(element_type != 'radiobutton') {
        return null;
    }

    return new Elements.RadioButton(properties);
};