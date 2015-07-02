//= require ./modifier

Elements.Modifiers.Text = {};

Elements.Modifiers.Text.modify = function(element, modifiers) {
    $.each(modifiers, function(index, modifier) {
        if (modifier.name == 'text') {
            element.text(modifier.value);

            return false;
        }
    });
};