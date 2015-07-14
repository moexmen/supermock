//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Text = {};

Elements.Properties.Text.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            html.text(property.value);

            return false;
        }
    });
};

Elements.Properties.Text.to_code = function(html) {
    var text = html.text().trim();
    if ($.inArray(text.split(' ')[0], Elements.Text.LOREM_IPSUM)) {
        return '';
    }
    return text;
};
