//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Glyphicon = {};

Elements.Properties.Glyphicon.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            html.addClass('glyphicon glyphicon-' + property.value);

            return false;
        }
    });
};

Elements.Properties.Glyphicon.to_code = function(html) {
    var glyphicon = html.prop('class').split(' ')[1];
    return glyphicon != null ? glyphicon.slice('glyphicon-'.length) : '';
};
