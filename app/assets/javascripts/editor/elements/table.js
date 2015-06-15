//= require ./element

Elements.Table = function() {
    Elements.Element.call(this);
    this.properties = [];
    this.text = "Table";
}

Elements.Table.prototype = Object.create(Elements.Element.prototype); 
Elements.Table.prototype.constructor = Elements.Table;

Elements.Table.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.properties = [];
}


Elements.Table.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_table_template');
        this.html.data('element', this);
        
        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));
       
    }
    return this.html;
}
