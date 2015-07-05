var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.ImageUrl = {};

Elements.Properties.ImageUrl.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == '') {
            element.prop('src', property.value);

            return false;
        }
    });
};