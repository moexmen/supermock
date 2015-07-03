//= require ./mapper

Parser.Mappers.Button = {};

Parser.Mappers.Button.map = function(element_type, properties) {
    if(element_type != 'button') {
        return null;
    }

    return Elements.Button.render(properties);
};