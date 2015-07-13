//= require ./element

Elements.RadioButton = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.RadioButton.prototype = Object.create(Elements.Element.prototype);
Elements.RadioButton.prototype.constructor = Elements.RadioButton;

Elements.RadioButton.TYPE = 'radiobutton';

Elements.RadioButton.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('span'); } },
    { type: Elements.Properties.Checked, target: function(element) { return element.html.find('input'); } },
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.RadioGroup, target: function(element) { return element.html.find('input'); } }
];

Elements.RadioButton.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.RadioButton.TYPE) {
        return new Elements.RadioButton(properties);
    }
    else {
        return null;
    }
};

Elements.RadioButton.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_radio_button_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};