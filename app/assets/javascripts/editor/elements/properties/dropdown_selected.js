//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Dropdown = Elements.Properties.Dropdown || {};
Elements.Properties.Dropdown.Selected = {};

Elements.Properties.Dropdown.Selected.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'selected' && property.value == 'true') {
            html.prop('selected', true);

            return false;
        }
    });
};

Elements.Properties.Dropdown.Selected.to_code = function(html) {
    var data = html.prop('selected');
    return data ? 'selected=' + data : '';
};
