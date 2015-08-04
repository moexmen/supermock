//= require ./checkboxes

Elements.Checkboxes.Item = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Checkboxes.Item.prototype = Object.create(Elements.Element.prototype);
Elements.Checkboxes.Item.prototype.constructor = Elements.Checkboxes.Item;

Elements.Checkboxes.Item.TYPE = 'item';

Elements.Checkboxes.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('span'); } },
    { type: Elements.Properties.Checked, target: function(element) { return element.html.find('input'); } },
];

Elements.Checkboxes.Item.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Checkboxes.Item.TYPE && parent_element.constructor == Elements.Checkboxes) {
        return new Elements.Checkboxes.Item(properties);
    }
    else {
        return null;
    }
};

Elements.Checkboxes.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_checkbox_item_template');

        this.apply_properties();
    }

    return this.html;
};

