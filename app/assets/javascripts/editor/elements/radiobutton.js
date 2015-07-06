//= require ./element

Elements.Radiobutton = function() {
    Elements.Element.call(this);
    this.properties = [];
    this.text = "Radiobutton";
}

Elements.Radiobutton.prototype = Object.create(Elements.Element.prototype); 
Elements.Radiobutton.prototype.constructor = Elements.Radiobutton;

Elements.Radiobutton.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.properties = [];
}

Elements.Radiobutton.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_radiobutton_template');
        this.html.data('element', this);
        
        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        this.properties = [ new Elements.Property.EditText(this.html.find('label:eq(0)'), this.text),
                            new Elements.Property.Check(this.html.children(':radio'), true),
                            new Elements.Property.Dimensions(this.html.outerWidth(), this.html.outerHeight(), null),
                            new Elements.Property.Position(0, 0, true),
                            new Elements.Property.Delete() ];
    }
    return this.html;
}
