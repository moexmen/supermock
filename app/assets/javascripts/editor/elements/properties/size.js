//= require ./property
//var Elements = Elements || {};
//Elements.Properties = Elements.Properties || {};
Elements.Properties.Size = {};

Elements.Properties.Size.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'w') {
            html.outerWidth(property.value);
        }

        if (property.name == 'h') {
            html.outerHeight(property.value);
        }
    });
};

Elements.Properties.Size.to_code = function(html) {
    return 'w=' + html.outerWidth() + ' h=' + html.outerHeight();
};

Elements.Properties.Size.to_json = function(html) {
    return JSON.stringify( {w: html.outerWidth(), h: html.outerHeight()} );
};

Elements.Properties.Size.parse_json = function(html, json) {
    var size = $.parseJSON(json);

    return [{name: 'w', value: size.w}, {name: 'h', value: size.h}];
};