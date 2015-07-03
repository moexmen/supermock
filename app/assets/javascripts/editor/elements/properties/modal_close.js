//= require ./property

Elements.Properties.ModalClose = {};

Elements.Properties.ModalClose.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'close') {
            Elements.Properties.Click.parse_value(element, property.value);

            return false;
        }
    });
};