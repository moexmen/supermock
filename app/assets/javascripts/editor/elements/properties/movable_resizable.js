//= require ./property
//var Elements = Elements || {};
//Elements.Properties = Elements.Properties || {};
Elements.Properties.MovableResizable = {};

Elements.Properties.MovableResizable.apply = function(html, properties) {
    $.each(properties, function(index, property) {
        if (property.name == 'movable') {
            html.data('movable', property.value);
        }

        if (property.name == 'resizable') {
            html.data('resizable', property.value);
        }
    });
};

Elements.Properties.MovableResizable.to_code = function(html) {
    var code = '';
    var movable = html.data('movable');
    var resizable = html.data('resizable');

    if(movable == 'false') {
        code += 'movable=false';
    }
    if(resizable == 'false') {
        if(code){
            code += ' ';
        }
        code += 'resizable=false';
    }

    return code;
};