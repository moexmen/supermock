//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Checked = {};

Elements.Properties.Checked.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'checked') {
            html.prop('checked', property.value == 'true');

            return false;
        }
    });
};

Elements.Properties.Checked.to_code = function(html) {
    checked_property = html.prop('checked');
    
    return checked_property ? 'checked=true' : '';
};

