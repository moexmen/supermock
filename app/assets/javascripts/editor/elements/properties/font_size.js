//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.FontSize = {};

Elements.Properties.FontSize.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'font-size') {
            html.css('font-size', property.value);
        }
    });
};

// Elements.Properties.FontSize.to_code = function(html) {
//     var font_size = html.css('font-size');
//     if(parseInt(font_size) == 14) {
//         return '';
//     }

//     return 'font-size=' + font_size;
// };
