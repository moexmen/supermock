//= require ./bullet_list

Elements.BulletList.Item = function(properties) {
    this.properties = properties;
};

Elements.BulletList.Item.prototype = Object.create(Elements.Element.prototype);
Elements.BulletList.Item.prototype.constructor = Elements.BulletList.Item;

Elements.BulletList.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(html) { return html; } }
];

Elements.BulletList.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_bullet_list_item_template');

        $.each(Elements.BulletList.Item.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};
