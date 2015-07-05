//= require ./element

Elements.Textarea = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Textarea.prototype = Object.create(Elements.Element.prototype);
Elements.Textarea.prototype.constructor = Elements.Textarea;

Elements.Textarea.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.TextPlaceholder, target: function(html) { return html.find('textarea'); } }
];

Elements.Textarea.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_textarea_template');

        $.each(Elements.Textarea.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};