//= require ../element

Elements.Dropdown = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Dropdown.prototype = Object.create(Elements.Element.prototype);
Elements.Dropdown.prototype.constructor = Elements.Dropdown;

Elements.Dropdown.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.Dropdown.prototype.append = function(element) {
    if(element.constructor == Elements.Dropdown.Item) {
        this.render().find('select').append(element.render());
    }
};

Elements.Dropdown.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_dropdown_template');

        $.each(Elements.Dropdown.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};


