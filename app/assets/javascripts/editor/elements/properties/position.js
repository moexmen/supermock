//= require ./property
//var Elements = Elements || {};
//Elements.Properties = Elements.Properties || {};
Elements.Properties.Position = {};

Elements.Properties.Position.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'x') {
            html.css('left', property.value + 'px');
        }

        if (property.name == 'y') {
            html.css('top', property.value + 'px');
        }
    });
};

// Elements.Properties.Position.to_code = function(html) {
//     var position = html.position();

//     return 'x=' + position.left + ' y=' + position.top;
// };
