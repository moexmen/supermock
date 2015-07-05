//= require ./element

Elements.Hyperlink = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Hyperlink.prototype = Object.create(Elements.Element.prototype);
Elements.Hyperlink.prototype.constructor = Elements.Hyperlink;

Elements.Hyperlink.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.Text, target: function(html) { return html.children('a'); } },
    { type: Elements.Properties.Click, target: function(html) { return html.children('a'); } }
];

Elements.Hyperlink.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_hyperlink_template');

        $.each(Elements.Hyperlink.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};