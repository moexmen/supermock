//= require ../property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Table = Elements.Properties.Table || {};
Elements.Properties.Table.Bordered = Elements.Properties.Table.Bordered || {};

Elements.Properties.Table.Bordered.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'bordered' && property.value == 'true') {
            html.addClass('table-bordered');
            return false;
        }
    });
};

Elements.Properties.Table.Bordered.to_code = function(html) {
    return html.hasClass('table-bordered') ? 'bordered=true' : '';
};