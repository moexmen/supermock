//= require ./property

Elements.Properties.Size = {};

Elements.Properties.Size.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'w') {
            element.css('width', property.value + 'px');
        }

        if (property.name == 'h') {
            element.css('height', property.value + 'px');
        }
    });
};