//= require ./element

Elements.Box = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Box.prototype = Object.create(Elements.Element.prototype);
Elements.Box.prototype.constructor = Elements.Box;

Elements.Box.TYPE = 'box';

Elements.Box.PROPERTIES = [
    // { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    // { type: Elements.Properties.Size, target: function(element) { return element.html; } },
];

Elements.Box.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Box.TYPE) {
        return new Elements.Box(properties);
    }
    else {
        return null;
    }
};

Elements.Box.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_box_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();
    }

    return this.html;
};

Elements.Box.prototype.to_json = function() {
    var json = { type: Elements.Box.TYPE,
                        properties: [],
                    };

    $.each(this.properties, function(idx, property){
        json.properties.push(JSON.stringify(property));
    });

    return JSON.stringify(json);
};

Elements.Box.parse_json = function(model) {
    if(model.type != Elements.Box.TYPE) {
        return null;
    }
    var properties = [];
    $.each(model.properties, function(idx, property){
        properties.push($.parseJSON(property));
    });
    return new Elements.Box(properties);
};
