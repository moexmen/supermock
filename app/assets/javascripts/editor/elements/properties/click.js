var Elements = Elements || {};
Elements.Properties = Elements.Properties || {};
Elements.Properties.Click = {};

Elements.Properties.Click.apply = function(element, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'click') {
            Elements.Properties.Click.parse_value(element, property.value);

            return false;
        }
    });
};

Elements.Properties.Click.parse_value = function(element, value) {
    if(value.indexOf('page(') == 0) {
        Elements.Properties.Click.go_to_page(element, value);
    }
};

Elements.Properties.Click.go_to_page = function(element, value) {
    var temp = value.split("'");
    if(temp.length != 3) {
        return;
    }

    var page_id = temp[1];
    element.click(function() { Editor.set_curr_page(page_id); });
};