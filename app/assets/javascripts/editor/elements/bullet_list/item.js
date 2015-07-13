//= require ./bullet_list

Elements.BulletList.Item = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.BulletList.Item.prototype = Object.create(Elements.Element.prototype);
Elements.BulletList.Item.prototype.constructor = Elements.BulletList.Item;

Elements.BulletList.Item.TYPE = 'item';

Elements.BulletList.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html; } }
];

Elements.BulletList.Item.map_from_code = function(parent_element, element_type, properties) {
    if(parent_element.constructor == Elements.BulletList && element_type == Elements.BulletList.Item.TYPE) {
        return new Elements.BulletList.Item(properties);
    }
    else {
        return null;
    }
};

Elements.BulletList.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_bullet_list_item_template');

        this.apply_properties();
    }

    return this.html;
};
