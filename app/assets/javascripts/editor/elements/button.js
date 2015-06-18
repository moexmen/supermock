//= require ./element

Elements.Button = function(text, x, y) {
    Elements.Element.call(this);

    this.text = text;
    this.x = x;
    this.y = y;
}

Elements.Button.prototype = Object.create(Elements.Element.prototype);
Elements.Button.prototype.constructor = Elements.Button;

Elements.Button.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.btn = null;
    this.properties = null;
}

Elements.Button.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_button_template');
        this.html.data('element', this);

        this.btn = this.html.children('button:eq(0)').text(this.text);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));
      
        this.properties = [ new Elements.Property.ClickPage(this.btn, null) ];

        this.set_position(this.x, this.y);
    }

    return this.html;
}