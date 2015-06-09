//= require ./element

Elements.Text = function(x, y) {
    Elements.Element.call(this);

    this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet felis a diam facilisis mattis vitae a metus. Sed a turpis pretium, tincidunt turpis a, posuere sem. Proin consequat vulputate arcu. Ut nisl elit, fermentum gravida nunc eget, porta eleifend risus. Praesent cursus purus sed nunc posuere mollis. Duis ullamcorper, enim in auctor congue, est sem porta nisl, ut blandit nibh velit at quam. Aenean nisl nisl, fermentum ac leo non, laoreet vulputate metus. Suspendisse auctor eget leo vel fringilla. Sed fermentum sapien ut ante pharetra imperdiet. Pellentesque euismod erat urna, ut congue quam euismod non. Donec risus tellus, ullamcorper a tincidunt id, fringilla vitae lorem. Maecenas mi ipsum, vestibulum quis mauris vel, facilisis sodales leo.";
    this.x = x;
    this.y = y;
}

Elements.Text.prototype = Object.create(Elements.Element.prototype); //to inherit from Button?
Elements.Text.prototype.constructor = Elements.Text;

Elements.Text.prototype.destroy = function() {
    Elements.Element.prototype.destroy.call(this);
    this.btn = null;
    this.properties = null;
}

Elements.Text.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_button_template');
        this.html.data('element', this);

        this.btn = this.html.children('button:eq(0)').text(this.text);

        this.hitarea = this.html.children('.element-hitarea:eq(0)')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        this.properties = [ new Elements.Property.ClickPage(this.btn, null) ];

        this.set_position(this.x, this.y);
    }

    return this.html;
}