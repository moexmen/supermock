//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.RadioGroup = {};

Elements.Properties.RadioGroup.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'group') {
            html.prop('name', property.value);

            return false;
        }
    });
};

// Elements.Properties.RadioGroup.to_code = function(html) {
//     group = html.prop('name');
//     if(group){
//         return 'group=' + group;
//     }
//     return '';
// };
