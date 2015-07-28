//= require ../element

Elements.Dropdown = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Dropdown.prototype = Object.create(Elements.Element.prototype);
Elements.Dropdown.prototype.constructor = Elements.Dropdown;

Elements.Dropdown.TYPE = 'dropdown';

Elements.Dropdown.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } }
];

Elements.Dropdown.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Dropdown.TYPE) {
        return new Elements.Dropdown(properties);
    }
    else {
        return null;
    }
};

Elements.Dropdown.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_dropdown_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();

    }

    return this.html;
};