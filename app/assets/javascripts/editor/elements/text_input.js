//= require ./element

Elements.Text_Input = function() {
    Elements.Element.call(this);
}

Elements.Text_Input.prototype = Object.create(Elements.Element.prototype); 
Elements.Text_Input.prototype.constructor = Elements.Text_Input;

Elements.Text_Input.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.properties = [];
}

Elements.Text_Input.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_textinput_template');
        this.html.data('element', this);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));
    }
    return this.html;
}
