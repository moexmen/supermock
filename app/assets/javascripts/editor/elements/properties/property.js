//= require ../element
//var Elements = Elements || {};
//Elements.Properties = Elements.Properties || {};
Elements.Properties = {};

Elements.Properties.parse_json = function(json) {
    var property = $.parseJSON(json);

    switch(property.type) {
        case 'Position':
            return Elements.Properties.Position.parse_json(property.details);
        case 'Size':
            return Elements.Properties.Size.parse_json(property.details);
        case 'Click':
            return Elements.Properties.Click.parse_json(property.details);
        case 'Text':
            return Elements.Properties.Text.parse_json(property.details);
        default:
            return null;
    }
};

Elements.Properties.to_json = function() {
    var property = $.parseJSON(json);

    switch(property.type) {
        case 'Position':
            return Elements.Properties.Position.parse_json(property.details);
        case 'Size':
            return Elements.Properties.Size.parse_json(property.details);
        case 'Click':
            return Elements.Properties.Click.parse_json(property.details);
        case 'Text':
            return Elements.Properties.Text.parse_json(property.details);
        default:
            return null;
    }
};