//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Text = {};

Elements.Properties.Text.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            html.text(property.value);
        }

        if (property.name == 'font-size') {
            html.css('font-size', property.value);
        }
    });
};

Elements.Properties.Text.to_code = function(html) {
    var text = html.text().trim();
    if ($.inArray(text.split(' ')[0], Elements.Text.LOREM_IPSUM) != -1) {
        return '';
    }

    var font_size = html.css('font-size');
    if(parseInt(font_size) == 14) {
        return text;
    }

    return 'font-size=' + font_size + ' ' + text;
};
