var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Dropdown = Elements.Properties.Dropdown || {};
Elements.Properties.Dropdown.Selected = {};

Elements.Properties.Dropdown.Selected.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'selected' && property.value == 'true') {
            element.prop('selected', true);

            return false;
        }
    });
};