//= require ./element

Elements.Icon = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Icon.prototype = Object.create(Elements.Element.prototype);
Elements.Icon.prototype.constructor = Elements.Icon;

Elements.Icon.TYPE = 'icon';

Elements.Icon.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Glyphicon, target: function(element) { return element.html.find('span'); } },
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('span'); } }
];

Elements.Icon.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Icon.TYPE) {
        return new Elements.Icon(properties);
    }
    else {
        return null;
    }
};

Elements.Icon.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_icon_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};