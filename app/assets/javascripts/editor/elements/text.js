//= require ./element

Elements.Text = function(x, y, height, width) {
    Elements.Element.call(this);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.sentences_array = ["Lorem ipsum dolor"];
}

Elements.Text.prototype = Object.create(Elements.Element.prototype); 
Elements.Text.prototype.constructor = Elements.Text;

Elements.Text.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.visible_text = null;
    this.properties = null;
}

Elements.Text.prototype.on_resize = function() {
    var textHeight = this.html.children('div:eq(0)').outerHeight();
    var boxHeight = this.html.outerHeight();
    if (textHeight >= boxHeight){
        while(this.html.children('div:eq(0)').outerHeight() + 20 >= boxHeight){
            this.sentences_array.splice(-1,1);
            this.visible_text = this.html.children('div:eq(0)').text(this.sentences_array.join(" "));
        }
    } else {
        this.sentences_array.push(lorem_ipsum_array[Math.floor(Math.random() * lorem_ipsum_array.length)]);
        this.visible_text = this.html.children('div:eq(0)').text(this.sentences_array.join(" "));
    }    
}
    

Elements.Text.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_text_template');
        this.html.data('element', this);
        this.set_position(this.x, this.y);
        this.set_size(this.height, this.width);
        var currText = this.sentences_array.join(". ");
        this.visible_text = this.html.children('div:eq(0)').text(currText);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));
       
        this.properties = [ new Elements.Property.ClickPage(this.visible_text, null) ];
        this.on_resize();

    }
    return this.html;
}