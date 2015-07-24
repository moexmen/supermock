//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Tabs = Elements.Properties.Tabs || {};
Elements.Properties.Tabs.Selected = {};

Elements.Properties.Tabs.Selected.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'selected' && property.value == 'true') {
            html.addClass('active');
            return false;
        }
    });
};

Elements.Properties.Tabs.Selected.to_code = function(html) {
    if(html.hasClass('active')) {
        return 'selected=true';
    }
    return '';
};
