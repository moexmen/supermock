//= require ./modifier

Elements.Modifiers.Position = {};

Elements.Modifiers.Position.modify = function(element, modifiers) {
    $.each(modifiers, function(index, modifier) {
        if (modifier.name == 'x') {
            element.css('left', modifier.value + 'px');
        }

        if (modifier.name == 'y') {
            element.css('top', modifier.value + 'px');
        }
    });
};