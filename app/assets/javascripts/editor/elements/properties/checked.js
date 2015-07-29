//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Checked = {};

Elements.Properties.Checked.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'checked' && property.value == 'true') {
            html.prop('checked', true);

            return false;
        } else {
            html.prop('checked', false);

            return false;
        }
    });
};

Elements.Properties.Checked.to_code = function(html) {
    checked_property = html.prop('checked');
    
    return checked_property ? 'checked=true' : '';
};

