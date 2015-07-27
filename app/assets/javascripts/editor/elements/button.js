//= require ./element

Elements.Button = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Button.prototype = Object.create(Elements.Element.prototype);
Elements.Button.prototype.constructor = Elements.Button;

Elements.Button.TYPE = 'button';

Elements.Button.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Click, target: function(element) { return element.html.children('button'); } },
    { type: Elements.Properties.Text, target: function(element) { return element.html.children('button'); } },
];

Elements.Button.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Button.TYPE) {
        return new Elements.Button(properties);
    }
    else {
        return null;
    }
};

Elements.Button.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_button_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};

Elements.Button.prototype.to_json = function() {
    var button_json = { type: Elements.Button.TYPE,
                        properties: [],
                    };

    $.each(this.properties, function(idx, property){
        button_json.properties.push(JSON.stringify(property));
    });

    return JSON.stringify(button_json);
};

Elements.Button.parse_json = function(model) {
    if(model.type == Elements.Button.TYPE) {
        return new Elements.Button(model.properties);
    }
    return null;
};