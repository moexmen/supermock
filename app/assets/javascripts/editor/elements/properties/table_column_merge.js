// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Table = Elements.Properties.Table || {};
Elements.Properties.Table.Column = Elements.Properties.Table.Column || {};
Elements.Properties.Table.Column.Merge = {};

Elements.Properties.Table.Column.Merge.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'merge') {
            html.attr('colspan', property.value);
            return false;
        }
    });
};

Elements.Properties.Table.Column.Merge.to_code = function(html) {
    var span = html.attr('colspan');
    return span ? 'merge=' + span : '';
};