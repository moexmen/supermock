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

Elements.ModalButton.prototype.toggle_visibility = function() {
    if(this.btn.css('display') == 'none'){
        this.btn.css('display', 'inline');
    }
    else {
        this.btn.css('display', 'none');
    }
}

Elements.ModalButton.prototype.set_text = function() {
    this.btn.text(this.text);
}

Elements.ModalButton.prototype.show_or_hide = function() {
    if(this.btn.css('display') == 'none') {
        return "Show";
    }
    else {
        return "Hide";
    }
}