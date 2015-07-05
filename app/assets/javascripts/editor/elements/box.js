//= require ./element

var Elements = Elements || {};

Elements.Box = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Box.prototype = Object.create(Elements.Element.prototype);
Elements.Box.prototype.constructor = Elements.Box;

Elements.Box.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.Box.prototype.append = function(element) {
    this.render().append(element.render());
    this.fit_element(element);
};

Elements.Box.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_box_template');

        $.each(Elements.Box.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};