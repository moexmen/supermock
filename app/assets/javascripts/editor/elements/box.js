//= require ./element

Elements.Box = function() {
    Elements.Element.call(this);
    this.border_width = 5;
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
        
        this.set_position(100, 100);
        this.set_size(100, 100);

        this.resize_width();
        this.properties = [ new Elements.Property.Border(null, this.border_width) ];
    }
    
    return this.html;
}

Elements.Box.prototype.resize_width = function() {
    this.html.find('div:eq(0)').css('border-width', this.border_width);
}