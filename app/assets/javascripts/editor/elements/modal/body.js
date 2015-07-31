//= require ./modal

Elements.Modal.Body = function(parent_modal, properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.parent_modal = parent_modal;
};

Elements.Modal.Body.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Body.prototype.constructor = Elements.Modal.Body;

Elements.Modal.Body.TYPE = 'body';

Elements.Modal.Body.PROPERTIES = [
];

Elements.Modal.Body.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.Body.TYPE && parent_element.constructor == Elements.Modal) {
        return new Elements.Modal.Body(parent_element, properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Body.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_body_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { console.log("Kenna body"); return Editor.mousedown_element(this.parent_modal, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements();
        this.set_child_elements();
    }

    return this.html;
};

Elements.Modal.Body.prototype.set_child_elements = function() {
    // this.html.children('.child-elements').children().css('position', 'initial');
};
