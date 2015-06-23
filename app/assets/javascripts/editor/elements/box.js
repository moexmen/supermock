//= require ./element

Elements.Box = function() {
    Elements.Element.call(this);
}

Elements.Box.prototype = Object.create(Elements.Element.prototype); 
Elements.Box.prototype.constructor = Elements.Box;

Elements.Box.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
}

Elements.Box.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_box_template');
        this.html.data('element', this);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

    }
    return this.html;
}
