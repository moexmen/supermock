//= require ../element

Elements.Checkboxes = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Checkboxes.prototype = Object.create(Elements.Element.prototype);
Elements.Checkboxes.prototype.constructor = Elements.Checkboxes;

Elements.Checkboxes.TYPE = 'checkboxes';

Elements.Checkboxes.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.FlexDirection, target: function(element) { return element.html.children('.child-elements'); } }
];

Elements.Checkboxes.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Checkboxes.TYPE) {
        return new Elements.Checkboxes(properties);
    }
    else {
        return null;
    }
};

Elements.Checkboxes.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_checkboxes_template');

       this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();

    }

    return this.html;
};