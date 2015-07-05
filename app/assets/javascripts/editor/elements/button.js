//= require ./element

var Elements = Elements || {};

Elements.Button = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Button.prototype = Object.create(Elements.Element.prototype);
Elements.Button.prototype.constructor = Elements.Button;

Elements.Button.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.Text, target: function(html) { return html.children('button'); } },
    { type: Elements.Properties.Click, target: function(html) { return html.children('button'); } }
];

Elements.Button.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_button_template');

        $.each(Elements.Button.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};