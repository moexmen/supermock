//= require ./element

Elements.Textfield = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Textfield.prototype = Object.create(Elements.Element.prototype);
Elements.Textfield.prototype.constructor = Elements.Textfield;

Elements.Textfield.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.TextPlaceholder, target: function(html) { return html.find('input'); } }
];

Elements.Textfield.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_textfield_template');

        $.each(Elements.Textfield.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};