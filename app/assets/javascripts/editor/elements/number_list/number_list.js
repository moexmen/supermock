//= require ../element

Elements.NumberList = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.NumberList.prototype = Object.create(Elements.Element.prototype);
Elements.NumberList.prototype.constructor = Elements.NumberList;

Elements.NumberList.TYPE = 'number-list';

Elements.NumberList.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } }
];

Elements.NumberList.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.NumberList.TYPE) {
        return new Elements.NumberList(properties);
    }
    else {
        return null;
    }
};

Elements.NumberList.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_number_list_template');

       this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements('ol');

    }

    return this.html;
};