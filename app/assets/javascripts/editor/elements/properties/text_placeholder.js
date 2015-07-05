var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.TextPlaceholder = {};

Elements.Properties.TextPlaceholder.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            element.prop('placeholder', property.value);

            return false;
        }
    });
};