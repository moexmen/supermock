//= require ../element

Elements.Table = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Table.prototype = Object.create(Elements.Element.prototype);
Elements.Table.prototype.constructor = Elements.Table;

Elements.Table.TYPE = 'table';

Elements.Table.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Border, target: function(element) { return element.html; } },
    { type: Elements.Properties.Table.Bordered, target: function(element) { return element.html.find('table'); } },
];

Elements.Table.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Table.TYPE) {
        return new Elements.Table(properties);
    }
    else {
        return null;
    }
};

Elements.Table.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();
    }

    return this.html;
};


