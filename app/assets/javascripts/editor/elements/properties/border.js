//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Border = {};

Elements.Properties.Border.apply = function(html, properties) {
    // property.name = border`
    // property.value = "5px solid red"
    $.each(properties, function(index, property) {
        if (property.name == 'border') {
            html.css('border', property.value);

            return false;
        }
    });
};

Elements.Properties.Border.to_code = function(html) {
    var border_property = html.css('border');
    if(border_property != '') {
        return 'border=' + "'" + border_property + "'" ;
    }
    else {
        return '';
    }
};
