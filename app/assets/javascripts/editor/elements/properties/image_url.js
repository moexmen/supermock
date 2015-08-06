//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.ImageUrl = {};

Elements.Properties.ImageUrl.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            html.prop('src', property.value);

            return false;
        }
    });
};

// Elements.Properties.ImageUrl.to_code = function(html) {
//     return html.prop('src');
// };
