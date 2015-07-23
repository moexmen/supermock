//= require ./table

Elements.Table.Row = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Table.Row.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Row.prototype.constructor = Elements.Table.Row;

Elements.Table.Row.TYPE = 'row';

Elements.Table.Row.PROPERTIES = [
    { type: Elements.Properties.Table.Row.Merge, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Column.TextAlign, target: function(element) { return element.html; } },
    { type: Elements.Properties.Border, target: function(element) { return element.html; } },
];

Elements.Table.Row.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Table.Row.TYPE && parent_element.constructor == Elements.Table) {
        return new Elements.Table.Row(properties);
    }
    else {
        return null;
    }
};

Elements.Table.Row.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_row_template');

        this.render_child_elements('tr');
        this.html = this.html.find('tr');

        this.apply_properties();
    }

    return this.html;
};
