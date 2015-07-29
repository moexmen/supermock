//= require ./element

Elements.Checkbox = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Checkbox.prototype = Object.create(Elements.Element.prototype);
Elements.Checkbox.prototype.constructor = Elements.Checkbox;

Elements.Checkbox.TYPE = 'checkbox';

Elements.Checkbox.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('span'); } },
    { type: Elements.Properties.Checked, target: function(element) { return element.html.find('input'); } },
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
];

Elements.Checkbox.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Checkbox.TYPE) {
        return new Elements.Checkbox(properties);
    }
    else {
        return null;
    }
};

Elements.Checkbox.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_checkbox_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};