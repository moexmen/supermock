//= require ../property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Table = Elements.Properties.Table || {};
Elements.Properties.Table.Column = Elements.Properties.Table.Column || {};
Elements.Properties.Table.Column.TextAlign = {};

Elements.Properties.Table.Column.TextAlign.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'align') {
            html.css('text-align', property.value);
            return false;
        }
    });
};

Elements.Properties.Table.Column.TextAlign.to_code = function(html) {
    var span = html.css('text-align');
    if(span == 'start' || span == '') {
        return '';
    }
    return 'align=' + span;
};