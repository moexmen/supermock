//= require ./element
//= require ./properties/modal_button/property

Elements.Modal = function() {
    Elements.Element.call(this);
    this.possible_resize_directions = [Elements.Element.resize_directions.SOUTH];
    this.movable = false;
}

Elements.Modal.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.prototype.constructor = Elements.Modal;

Elements.Modal.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.properties = null;
}

Elements.Modal.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_modal_template');
        this.html.data('element', this);

        this.hitarea = this.html.find('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        this.btn_1 = new Elements.Button('Okay', 0, 0);
        this.btn_2 = new Elements.Button('Cancel', 0, 0);
        this.btn_3 = new Elements.Button('Button 3', 0, 0);

        this.html.find('.modal-footer').append(this.btn_1.render(), this.btn_2.render(), this.btn_3.render());

        $.each([this.btn_1, this.btn_2, this.btn_3], function(idx, button){
            button.render().css({   'display': 'inline-block',
                                    'position': 'relative',
                                    'margin-left': 10
                            });
            button.hitarea.remove();
        });

        this.properties = [ new Elements.Property.ModalTitle(this.html.find('.modal-title')),
                            new Elements.Property.ModalButtons(this.btn_1, this.btn_2, this.btn_3)
                            ];
    }

    return this.html;
}

Elements.Modal.prototype.get_position = function() {
    var position = this.html.find('.modal-content:eq(0)').offset();
    position.left -= Editor.canvas().offset().left;
    return position;
}

Elements.Modal.prototype.set_position = function(left, top) {
    //moving not allowed for modal.
}

Elements.Modal.prototype.get_size = function() {
    return { width: this.render().find('.modal-content:eq(0)').outerWidth(), height: this.render().find('.modal-content:eq(0)').outerHeight() };
}

Elements.Modal.prototype.set_size = function(width, height) {
    if(height < 150) { //to prevent getting too small a modal
        return;
    }

    this.render().find('.modal-content:eq(0)').outerWidth(width);
    var excess_height = this.render().find('.modal-header:eq(0)').outerHeight() + this.render().find('.modal-footer:eq(0)').outerHeight();
    this.render().find('.modal-body:eq(0)').outerHeight(height - excess_height);
}