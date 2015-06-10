//= require ./element

Elements.Text = function(x, y, height, width) {
    Elements.Element.call(this);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    var random_num = Math.floor(Math.random() * lorem_ipsum_array.length);
    this.sentences_array = lorem_ipsum_array.slice(random_num, random_num+3);
}

Elements.Text.prototype = Object.create(Elements.Element.prototype); //to inherit from Button?
Elements.Text.prototype.constructor = Elements.Text;

Elements.Text.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.visible_text = null;
    this.properties = null;
}

Elements.Text.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_text_template');
        this.html.data('element', this);
        var currText = this.sentences_array.join(". ");
        console.log(currText);
        this.visible_text = this.html.children('div:eq(0)').text(currText);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        this.properties = [ new Elements.Property.ClickPage(this.visible_text, null) ];

        this.set_position(this.x, this.y);
        this.set_size(this.height, this.width);
    } else if (this.html.children('div:eq(0)').outerHeight() !== 0) { 
    //to ensure it is initialized
        while (this.html.children('div:eq(0)').outerHeight() < this.height){
            this.sentences_array.push(lorem_ipsum_array[Math.floor(Math.random() * lorem_ipsum_array.length)]);
            this.visible_text = this.html.children('div:eq(0)').text(this.sentences_array.join(". "));
        }
        this.sentences_array.splice(-1,1);
        this.visible_text = this.html.children('div:eq(0)').text(this.sentences_array.join(". "));
    } else {
        pass;
    }

    return this.html;
}