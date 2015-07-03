var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Text = {};

Elements.Properties.Text.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'text') {
            element.text(property.value);

            return false;
        }
    });
};