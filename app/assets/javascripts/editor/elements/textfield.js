//= require ./element

Elements.TextField = function() {
    Elements.Element.call(this);
}

Elements.TextField.prototype = Object.create(Elements.Element.prototype); 
Elements.TextField.prototype.constructor = Elements.TextField;

Elements.TextField.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.properties = [];
}

Elements.TextField.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_textinput_template');
        this.html.data('element', this);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        this.properties = [ new Elements.Property.Dimensions(this.html.outerWidth(), this.html.outerHeight(), null),
                            new Elements.Property.Position(0, 0, true),
                            new Elements.Property.Delete() ];
    }
    return this.html;
}
