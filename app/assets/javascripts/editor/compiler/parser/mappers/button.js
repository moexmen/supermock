//= require ./mapper

Parser.Mappers.Button = {};

Parser.Mappers.Button.map = function(element_type, modifiers) {
    if(element_type != 'button') {
        return null;
    }

    return Elements.Button.render(modifiers);
};