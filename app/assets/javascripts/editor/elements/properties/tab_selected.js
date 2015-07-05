var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Tabs = Elements.Properties.Tabs || {};
Elements.Properties.Tabs.Selected = {};

Elements.Properties.Tabs.Selected.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'selected' && property.value == 'true') {
            element.addClass('active');

            return false;
        }
    });
};