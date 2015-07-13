//= require ./element

Elements.Image = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Image.prototype = Object.create(Elements.Element.prototype);
Elements.Image.prototype.constructor = Elements.Image;

Elements.Image.TYPE = 'image';

Elements.Image.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.ImageUrl, target: function(element) { return element.html.find('img'); } }
];

Elements.Image.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Image.TYPE) {
        return new Elements.Image(properties);
    }
    else {
        return null;
    }
};

Elements.Image.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_image_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};