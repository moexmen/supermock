var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Modal = Elements.Properties.Modal || {};
Elements.Properties.Modal.Title = {};

Elements.Properties.Modal.Title.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            element.text(property.value);

            return false;
        }
    });
};