//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.TextPlaceholder = {};

Elements.Properties.TextPlaceholder.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            html.prop('placeholder', property.value);

            return false;
        }
    });
};

Elements.Properties.TextPlaceholder.to_code = function(html) {
    return html.prop('placeholder');
};
