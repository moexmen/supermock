//= require ./dropdown

Elements.Dropdown.Item = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Dropdown.Item.prototype = Object.create(Elements.Element.prototype);
Elements.Dropdown.Item.prototype.constructor = Elements.Dropdown.Item;

Elements.Dropdown.Item.TYPE = 'item';

Elements.Dropdown.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html; } },
    { type: Elements.Properties.Dropdown.Selected, target: function(element) { return element.html; } }
];

Elements.Dropdown.Item.map_from_code = function(parent_element, element_type, properties) {
    if(parent_element.constructor == Elements.Dropdown && element_type == Elements.Dropdown.Item.TYPE) {
        return new Elements.Dropdown.Item(properties);
    }
    else {
        return null;
    }
};

Elements.Dropdown.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_dropdown_item_template');

        this.apply_properties();
    }

    return this.html;
};
