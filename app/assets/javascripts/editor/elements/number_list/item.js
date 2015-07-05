//= require ./number_list

Elements.NumberList.Item = function(properties) {
    this.properties = properties;
};

Elements.NumberList.Item.prototype = Object.create(Elements.Element.prototype);
Elements.NumberList.Item.prototype.constructor = Elements.NumberList.Item;

Elements.NumberList.Item.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(html) { return html; } }
];

Elements.NumberList.Item.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_number_list_item_template');

        $.each(Elements.NumberList.Item.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};
