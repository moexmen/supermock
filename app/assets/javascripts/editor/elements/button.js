//= require ./element

Elements.Button = function(text, x, y) {
    Elements.Element.call(this);

    this.html = null;
    this.text = text;
    this.x = x;
    this.y = y;

    this.properties = [ new Elements.Property.ClickPage(null) ];
}

Elements.Button.prototype = Object.create(Elements.Element.prototype);
Elements.Button.prototype.constructor = Elements.Button;

Elements.Button.prototype.destroy = function() {
    this.render().remove();
    this.html = null;
    this.btn = null;
    this.hitarea = null;
    this.properties = null;
}

Elements.Button.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_button_template');
        this.html.data('element', this);

        this.btn = $(this.html.children('button')[0]).text(this.text);

        this.hitarea = $(this.html.children('.element-hitarea')[0])
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { Editor.mouseup_element(this, e); return false; }.bind(this));

        this.set_position(this.x, this.y);
    }

    return this.html;
}