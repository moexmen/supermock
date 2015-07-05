var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Checked = {};

Elements.Properties.Checked.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'checked' && property.value == 'true') {
            element.prop('checked', true);

            return false;
        }
    });
};