//= require ./element

Elements.ModalButton = function(text, btn, parent_id) {
    Elements.Element.call(this);
    this.text = text;
    this.btn = btn;
    this.properties = [ new Elements.Property.ClickPage(this.btn, parent_id) ];
}

Elements.ModalButton.prototype = Object.create(Elements.Element.prototype);
Elements.ModalButton.prototype.constructor = Elements.ModalButton;

Elements.ModalButton.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.btn = null;
    this.properties = null;
}
