var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.RadioGroup = {};

Elements.Properties.RadioGroup.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'group') {
            element.prop('name', property.value);

            return false;
        }
    });
};