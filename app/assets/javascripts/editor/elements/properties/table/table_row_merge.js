//= require ../property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Table = Elements.Properties.Table || {};
Elements.Properties.Table.Row = Elements.Properties.Table.Row || {};
Elements.Properties.Table.Row.Merge = {};

Elements.Properties.Table.Row.Merge.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'merge') {
            html.attr('rowspan', property.value);

            return false;
        }
    });
};

// Elements.Properties.Table.Row.Merge.to_code = function(html) {
//     var span = html.attr('rowspan');
//     return span ? 'merge=' + span : '';
// };