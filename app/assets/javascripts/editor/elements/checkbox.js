//= require ./element

Elements.Checkbox = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Checkbox.prototype = Object.create(Elements.Element.prototype);
Elements.Checkbox.prototype.constructor = Elements.Checkbox;

Elements.Checkbox.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.Text, target: function(html) { return html.find('span'); } },
    { type: Elements.Properties.Checked, target: function(html) { return html.find('input'); } }
];

Elements.Checkbox.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_checkbox_template');

        $.each(Elements.Checkbox.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};