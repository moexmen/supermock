//= require ./element

Elements.TextArea = function() {
    Elements.Element.call(this);
}

Elements.TextArea.prototype = Object.create(Elements.Element.prototype); 
Elements.TextArea.prototype.constructor = Elements.TextArea;

Elements.TextArea.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
}

Elements.TextArea.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_textarea_template');
        this.html.data('element', this);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        this.properties = [ new Elements.Property.Dimensions(this.html.outerWidth(), this.html.outerHeight(), 
                                Object.keys(Elements.Element.resize_directions).map(function(key){ 
                                    return Elements.Element.resize_directions[key]; 
                                })),
                            new Elements.Property.Position(0, 0, true) ];
    }
    return this.html;
}
