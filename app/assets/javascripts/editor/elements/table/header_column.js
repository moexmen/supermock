//= require ./table

Elements.Table.Header.Column = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Table.Header.Column.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Header.Column.prototype.constructor = Elements.Table.Header.Column;

Elements.Table.Header.Column.TYPE = 'column';

Elements.Table.Header.Column.PROPERTIES = [
    { type: Elements.Properties.Table.Column.Merge, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Column.Width, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Column.TextAlign, target: function(element) { return element.html; } },
    { type: Elements.Properties.Text, target: function(element) { return element.html; } },
];

Elements.Table.Header.Column.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Table.Header.Column.TYPE && parent_element.constructor == Elements.Table.Header) {
        return new Elements.Table.Header.Column(properties);
    }
    else {
        return null;
    }
};

Elements.Table.Header.Column.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_header_column_template');

        this.render_child_elements('th');
        this.html = this.html.find('th');

        this.apply_properties();
    }

    return this.html;
};
