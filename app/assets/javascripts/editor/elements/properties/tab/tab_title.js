//= require ../property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Tabs = Elements.Properties.Tabs || {};
Elements.Properties.Tabs.Title = {};

Elements.Properties.Tabs.Title.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            html.text(property.value);

            return false;
        }
    });
};

Elements.Properties.Tabs.Title.to_code = function(html) {
    return html.text().trim();
};
