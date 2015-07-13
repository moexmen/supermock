//= require ./element

Elements.Textfield = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Textfield.prototype = Object.create(Elements.Element.prototype);
Elements.Textfield.prototype.constructor = Elements.Textfield;

Elements.Textfield.TYPE = 'textfield';

Elements.Textfield.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.TextPlaceholder, target: function(element) { return element.html.find('input'); } }
];

Elements.Textfield.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Textfield.TYPE) {
        return new Elements.Textfield(properties);
    }
    else {
        return null;
    }
};

Elements.Textfield.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_textfield_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};