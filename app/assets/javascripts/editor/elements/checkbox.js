//= require ./element

Elements.Checkbox = function() {
    Elements.Element.call(this);
    this.properties = [];
    this.text = "Checkbox";
}

Elements.Checkbox.prototype = Object.create(Elements.Element.prototype); 
Elements.Checkbox.prototype.constructor = Elements.Checkbox;

Elements.Checkbox.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.properties = [];
}

Elements.Checkbox.prototype.assign_text = function() {
    this.html.find('label:eq(0)').text(this.text);
}

Elements.Checkbox.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_checkbox_template');
        this.html.data('element', this);
        
        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));
        this.assign_text();

        this.properties = [ new Elements.Property.Check(this.html.children(':checkbox'), true) ];

    }
    return this.html;
}
