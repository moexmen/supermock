//= require ./element

Elements.Textarea = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Textarea.prototype = Object.create(Elements.Element.prototype);
Elements.Textarea.prototype.constructor = Elements.Textarea;

Elements.Textarea.TYPE = 'textarea';

Elements.Textarea.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.TextPlaceholder, target: function(element) { return element.html.find('textarea'); } }
];

Elements.Textarea.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Textarea.TYPE) {
        return new Elements.Textarea(properties);
    }
    else {
        return null;
    }
};

Elements.Textarea.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_textarea_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};