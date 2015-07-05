//= require ../element

Elements.Table = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.Table.prototype = Object.create(Elements.Element.prototype);
Elements.Table.prototype.constructor = Elements.Table;

Elements.Table.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.Table.prototype.append = function(element) {
    if(element.constructor == Elements.Table.Row) {
        this.render().find('table').append(element.render());
    }
};

Elements.Table.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_template');

        $.each(Elements.Table.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};


