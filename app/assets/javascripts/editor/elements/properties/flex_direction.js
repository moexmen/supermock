//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.FlexDirection = {};

Elements.Properties.FlexDirection.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'direction') {
            if (property.value == 'vertical') {
                html.css('flex-direction', 'column');
            }
            if (property.value == 'horizontal') {
                html.css('flex-direction', 'row');
            }

            return false;
        }
    });
};

// Elements.Properties.FlexDirection.to_code = function(html) {
//     group = html.css('flex-direction');
//     if(group == 'row'){
//         return 'direction=horizontal';
//     }
//     else if(group == 'column'){
//         return 'direction=vertical';
//     }
//     return '';
// };
