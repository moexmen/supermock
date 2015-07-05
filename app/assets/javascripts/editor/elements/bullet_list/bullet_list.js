//= require ../element

Elements.BulletList = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.BulletList.prototype = Object.create(Elements.Element.prototype);
Elements.BulletList.prototype.constructor = Elements.BulletList.Item;

Elements.BulletList.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.BulletList.prototype.append = function(element) {
    if(element.constructor == Elements.BulletList.Item) {
        this.render().find('ul').append(element.render());
        this.fit_element(element);
    }
};

Elements.BulletList.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_bullet_list_template');

        $.each(Elements.BulletList.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};


