//= require ../element

Elements.Radiobuttons = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Radiobuttons.prototype = Object.create(Elements.Element.prototype);
Elements.Radiobuttons.prototype.constructor = Elements.Radiobuttons;

Elements.Radiobuttons.TYPE = 'radiobuttons';

Elements.Radiobuttons.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.FlexDirection, target: function(element) { return element.html.children('.child-elements'); } }
];

Elements.Radiobuttons.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Radiobuttons.TYPE) {
        return new Elements.Radiobuttons(properties);
    }
    else {
        return null;
    }
};

Elements.Radiobuttons.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_radiobuttons_template');

       this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.render_child_elements();
        this.apply_properties();

    }

    return this.html;
};

Elements.Radiobuttons.prototype.render_child_elements = function() {
    var id = Util.uuid();

    var elements_html = this.html.children('.child-elements:eq(0)').empty();

    $.each(this.child_elements, function(i, element) {
        elements_html.append(element.render());
        element.set_group(id);
    });
};