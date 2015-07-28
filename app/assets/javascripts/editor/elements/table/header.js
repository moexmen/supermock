//= require ./table

Elements.Table.Header = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Table.Header.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Header.prototype.constructor = Elements.Table.Header;

Elements.Table.Header.TYPE = 'header';

Elements.Table.Header.PROPERTIES = [
    { type: Elements.Properties.Border, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Column.TextAlign, target: function(element) { return element.html; } },
];

Elements.Table.Header.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Table.Header.TYPE && parent_element.constructor == Elements.Table) {
        return new Elements.Table.Header(properties);
    }
    else {
        return null;
    }
};

Elements.Table.Header.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_header_template');
        this.html = this.html.find('thead');

        this.apply_properties();
        this.render_child_elements();
    }

    return this.html;
};


