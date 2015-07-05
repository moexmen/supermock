//= require ./dropdown

Elements.Dropdown.Item = function(properties) {
    this.properties = properties;
};

Elements.Dropdown.Item.prototype = Object.create(Elements.Element.prototype);
Elements.Dropdown.Item.prototype.constructor = Elements.Dropdown.Item;

Elements.Dropdown.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(html) { return html; } },
    { type: Elements.Properties.Dropdown.Selected, target: function(html) { return html; } }
];

Elements.Dropdown.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_dropdown_item_template');

        $.each(Elements.Dropdown.Item.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};
