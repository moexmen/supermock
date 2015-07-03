var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Position = {};

Elements.Properties.Position.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'x') {
            element.css('left', property.value + 'px');
        }

        if (property.name == 'y') {
            element.css('top', property.value + 'px');
        }
    });
};