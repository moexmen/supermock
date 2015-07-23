//= require ./number_list

Elements.NumberList.Item = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.NumberList.Item.prototype = Object.create(Elements.Element.prototype);
Elements.NumberList.Item.prototype.constructor = Elements.NumberList.Item;

Elements.NumberList.Item.TYPE = 'item';

Elements.NumberList.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html; } }
];

Elements.NumberList.Item.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.NumberList.Item.TYPE && parent_element.constructor == Elements.NumberList) {
        return new Elements.NumberList.Item(properties);
    }
    else {
        return null;
    }
};

Elements.NumberList.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_number_list_item_template');

        this.apply_properties();
    }

    return this.html;
};
