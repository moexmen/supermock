//= require ./property
//var Elements = Elements || {};
//Elements.Properties = Elements.Properties || {};
Elements.Properties.Size = {};

Elements.Properties.Size.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'w') {
            html.css('width', property.value + 'px');
        }

        if (property.name == 'h') {
            html.css('height', property.value + 'px');
        }
    });
};

Elements.Properties.Size.to_code = function(html) {
    return 'w=' + html.outerWidth() + ' h=' + html.outerHeight();
};
