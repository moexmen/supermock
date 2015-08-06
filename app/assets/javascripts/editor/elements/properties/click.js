//= require ./property
// var Elements = Elements || {};
// Elements.Properties = Elements.Properties || {};
Elements.Properties.Click = {};

Elements.Properties.Click.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'click') {
            Elements.Properties.Click.parse_value(html, property.value);
            
            html.data('click', property.value);
            return false;
        }
    });
};

// Elements.Properties.Click.to_code = function(html) {
//     var data = html.data('click');
//     return data ? 'click=' + data : '';
// };


Elements.Properties.Click.parse_value = function(html, value) {
    if(value.indexOf('page(') == 0) {
        Elements.Properties.Click.go_to_page(html, value);
    }
};

Elements.Properties.Click.go_to_page = function(html, value) {
    var temp = value.split("'");
    if(temp.length != 3) {
        return;
    }

    var page_id = temp[1];
    html.unbind('click');
    html.click(function() { Editor.set_curr_page(page_id); });
};
