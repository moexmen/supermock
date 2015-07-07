//= require ./element

Elements.Button = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Button.prototype = Object.create(Elements.Element.prototype);
Elements.Button.prototype.constructor = Elements.Button;

Elements.Button.TYPE = 'button';

Elements.Button.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    //{ type: Elements.Properties.Text, target: function(html) { return html.children('button'); } },
    //{ type: Elements.Properties.Click, target: function(html) { return html.children('button'); } }
];

Elements.Button.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Button.TYPE) {
        return new Elements.Button(properties);
    }
    else {
        return null;
    }
};

Elements.Button.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_button_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};