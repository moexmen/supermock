//= require ../element

Elements.BulletList = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.BulletList.prototype = Object.create(Elements.Element.prototype);
Elements.BulletList.prototype.constructor = Elements.BulletList;

Elements.BulletList.TYPE = 'bullet-list';

Elements.BulletList.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } }
];

Elements.BulletList.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.BulletList.TYPE) {
        return new Elements.BulletList(properties);
    }
    else {
        return null;
    }
};

Elements.BulletList.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_bullet_list_template');

       this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();

    }

    return this.html;
};