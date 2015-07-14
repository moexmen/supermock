//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.ModalClose = {};

Elements.Properties.ModalClose.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'close') {
            Elements.Properties.Click.parse_value(html, property.value);

            html.data('close', property.value);
            return false;
        }
    });
};

Elements.Properties.ModalClose.to_code = function(html) {
    var data = html.data('close');
    if(data) {
        return 'close=' + data;
    }
    return '';
};