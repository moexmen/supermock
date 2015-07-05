//= require ../element

Elements.NumberList = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.NumberList.prototype = Object.create(Elements.Element.prototype);
Elements.NumberList.prototype.constructor = Elements.NumberList;

Elements.NumberList.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.NumberList.prototype.append = function(element) {
    if(element.constructor == Elements.NumberList.Item) {
        this.render().find('ol').append(element.render());
        this.fit_element(element);
    }
};

Elements.NumberList.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_number_list_template');

        $.each(Elements.NumberList.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};


