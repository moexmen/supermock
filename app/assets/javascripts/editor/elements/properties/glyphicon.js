//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Glyphicon = {};

Elements.Properties.Glyphicon.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'glyphicon') {
            html.addClass(property.value);

            return false;
        }
    });
};

Elements.Properties.Glyphicon.to_code = function(html) {
    return 'glyphicon=' + html.prop('class').split(' ')[1];
};
