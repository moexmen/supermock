var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Tabs = Elements.Properties.Tabs || {};
Elements.Properties.Tabs.Title = {};

Elements.Properties.Tabs.Title.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            element.text(property.value);

            return false;
        }
    });
};