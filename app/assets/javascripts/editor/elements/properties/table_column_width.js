// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Table = Elements.Properties.Table || {};
Elements.Properties.Table.Column = Elements.Properties.Table.Column || {};
Elements.Properties.Table.Column.Width = {};

Elements.Properties.Table.Column.Width.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'width') {
            html.css('width', property.value);
            html.data('width', property.value);
            return false;
        }
    });
};

Elements.Properties.Table.Column.Width.to_code = function(html) {
    var width = html.data('width');
    return width ? 'width=' + width : '';
};