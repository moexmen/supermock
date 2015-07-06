//= require ./element

Elements.Button = function(properties) {
    Elements.Element.call(this);
    this.type = 'button';

    this.properties = properties;
};

Elements.Button.prototype = Object.create(Elements.Element.prototype);
Elements.Button.prototype.constructor = Elements.Button;

Elements.Button.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    //{ type: Elements.Properties.Size, target: function(html) { return html; } },
    //{ type: Elements.Properties.Text, target: function(html) { return html.children('button'); } },
    //{ type: Elements.Properties.Click, target: function(html) { return html.children('button'); } }
];

Elements.Button.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_button_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));
    }

    this.apply_properties();

    return this.html;
};