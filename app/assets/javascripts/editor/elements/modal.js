//= require ./element

Elements.Modal = function() {
    Elements.Element.call(this);
    this.possible_resize_directions = [Elements.Element.resize_directions.SOUTH];
    this.movable = false;
}

Elements.Modal.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.prototype.constructor = Elements.Modal;

Elements.Modal.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.btn = null;
    this.properties = null;
}

Elements.Modal.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_modal_template');
        this.html.data('element', this);

        this.hitarea = this.html.find('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

    }
    return this.html;
}

Elements.Modal.prototype.get_position = function() {
    var difference = this.html.find('.modal-content:eq(0)').offset();
    difference.left -= Editor.canvas().offset().left;
    return difference;
}

Elements.Modal.prototype.set_position = function(left, top) {
}

Elements.Modal.prototype.get_size = function() {
    return { width: this.html.find('.modal-content:eq(0)').outerWidth(), height: this.html.find('.modal-content:eq(0)').outerHeight() };
}

Elements.Modal.prototype.set_size = function(width, height) {
    if(height < 150) //to guard against too small a modal
        return;
    this.html.find('.modal-content:eq(0)').outerWidth(width).outerHeight(height);
    var excess_height = this.html.find('.modal-header:eq(0)').outerHeight() + this.html.find('.modal-footer:eq(0)').outerHeight();
    this.html.find('.modal-body:eq(0)').outerHeight(height - excess_height);
}