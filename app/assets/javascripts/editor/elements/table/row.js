//= require ./table

Elements.Table.Row = function(properties) {
    this.properties = properties;
};

Elements.Table.Row.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Row.prototype.constructor = Elements.Table.Row;

Elements.Table.Row.PROPERTIES = [
];

Elements.Table.Row.prototype.append = function(element) {
    if(element.constructor == Elements.Table.Column) {
        this.render().append(element.render());
    }
};

Elements.Table.Row.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_row_template');
        this.html = this.html.find('tr');

        $.each(Elements.Table.Row.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};
