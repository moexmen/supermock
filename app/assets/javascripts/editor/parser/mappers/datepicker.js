var Parser = Parser || {};
Parser.Mappers = Parser.Mappers || {};
Parser.Mappers.DatePicker = {};

Parser.Mappers.DatePicker.map = function(parent_element, element_type, properties) {
    if(element_type != 'datepicker') {
        return null;
    }

    return new Elements.DatePicker(properties);
};