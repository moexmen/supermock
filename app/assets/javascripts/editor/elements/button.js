//= require ./element

var Elements = Elements || {};

Elements.Button = function(text, x, y) {
    this.html = null;
    this.text = text;
    this.x = x;
    this.y = y;
}

Elements.Button.prototype = new Elements.Element();

Elements.Button.prototype.destroy = function() {
    this.render().remove();
    this.html = null;
    this.btn = null;
    this.hitarea = null;
}

Elements.Button.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_button_template');

        this.btn = $(this.html.children('button')[0]).text(this.text);

        this.hitarea = $(this.html.children('.element-hitarea')[0])
            .mousedown(function(e) { Editor.mousedown_element(this, e); return false; }.bind(this))
            .mouseup(function(e) { Editor.mouseup_element(this, e); return false; }.bind(this));

        this.set_position(this.x, this.y);
    }

    return this.html;
}