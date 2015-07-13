//= require ./element

Elements.Hyperlink = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Hyperlink.prototype = Object.create(Elements.Element.prototype);
Elements.Hyperlink.prototype.constructor = Elements.Hyperlink;

Elements.Hyperlink.TYPE = 'link';

Elements.Hyperlink.PROPERTIES = [
    { type: Elements.Properties.Text, target: function(element) { return element.html.children('a'); } },
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Click, target: function(element) { return element.html.children('a'); } }
];

Elements.Hyperlink.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Hyperlink.TYPE) {
        return new Elements.Hyperlink(properties);
    }
    else {
        return null;
    }
};

Elements.Hyperlink.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_hyperlink_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};