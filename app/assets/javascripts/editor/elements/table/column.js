//= require ./table

Elements.Table.Column = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Table.Column.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Column.prototype.constructor = Elements.Table.Column;

Elements.Table.Column.TYPE = 'column';

Elements.Table.Column.PROPERTIES = [
    { type: Elements.Properties.Table.Column.Merge, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Column.Width, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Column.TextAlign, target: function(element) { return element.html; } },
    { type: Elements.Properties.Text, target: function(element) { return element.html; } },
];

Elements.Table.Column.map_from_code = function(parent_element, element_type, properties) {
    if( element_type == Elements.Table.Column.TYPE && 
        (parent_element.constructor == Elements.Table.Row ||
        parent_element.constructor == Elements.Table.Footer)) {
        return new Elements.Table.Column(properties);
    }
    else {
        return null;
    }
};

Elements.Table.Column.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_column_template');

        this.render_child_elements();
        this.html = this.html.find('td');

        this.apply_properties();

    }

    return this.html;
};

Elements.Table.Column.prototype.render_child_elements = function() {
    var elements_html = this.html.find('td').empty();

    $.each(this.child_elements, function(i, element) {
        elements_html.append(element.render());
    });
};