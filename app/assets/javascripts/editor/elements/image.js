//= require ./element

Elements.Image = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Image.prototype = Object.create(Elements.Element.prototype);
Elements.Image.prototype.constructor = Elements.Image;

Elements.Image.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.ImageUrl, target: function(html) { return html.find('img'); } }
];

Elements.Image.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_image_template');

        $.each(Elements.Image.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};