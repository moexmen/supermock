//= require ./table

Elements.Table.Column = function(properties) {
    this.properties = properties;
};

Elements.Table.Column.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Column.prototype.constructor = Elements.Table.Column;

Elements.Table.Column.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.Table.Column.prototype.append = function(element) {
    this.render().append(element.render());
};

Elements.Table.Column.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_column_template');
        this.html = this.html.find('td');

        $.each(Elements.Table.Column.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};
