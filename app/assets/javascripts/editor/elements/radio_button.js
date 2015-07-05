//= require ./element

Elements.RadioButton = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.RadioButton.prototype = Object.create(Elements.Element.prototype);
Elements.RadioButton.prototype.constructor = Elements.RadioButton;

Elements.RadioButton.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.Text, target: function(html) { return html.find('div'); } },
    { type: Elements.Properties.Checked, target: function(html) { return html.find('input'); } },
    { type: Elements.Properties.RadioGroup, target: function(html) { return html.find('input'); } }
];

Elements.RadioButton.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_radio_button_template');

        $.each(Elements.RadioButton.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};