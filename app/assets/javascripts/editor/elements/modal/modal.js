//= require ../element

Elements.Modal = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Modal.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.prototype.constructor = Elements.Modal;

Elements.Modal.TYPE = 'modal';

Elements.Modal.PROPERTIES = [
];

Elements.Modal.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.TYPE) {
        return new Elements.Modal(properties);
    }
    else {
        return null;
    }
};

Elements.Modal.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements('.modal-dialog > .modal-content');
    }

    return this.html;
};