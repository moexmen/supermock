//= require ./modal

Elements.Modal.Header = function(parent_modal, properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.parent_modal = parent_modal;
};

Elements.Modal.Header.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.Header.prototype.constructor = Elements.Modal.Header;

Elements.Modal.Header.TYPE = 'header';

Elements.Modal.Header.PROPERTIES = [
    { type: Elements.Properties.ModalClose, target: function(element) { return element.html.find('.close'); } },
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('.modal-title'); } }
];

Elements.Modal.Header.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.Header.TYPE && parent_element.constructor == Elements.Modal) {
        return new Elements.Modal.Header(parent_element, properties);
    }
    else {
        return null;
    }
};

Elements.Modal.Header.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_header_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this.parent_modal, e); }.bind(this));

        this.apply_properties();

    }

    return this.html;
};
