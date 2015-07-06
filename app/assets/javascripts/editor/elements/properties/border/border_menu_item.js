//= require ../shared/menu_item
//= require ./property

Elements.Property.Border.MenuItem = function MenuItem(parent_menu, elements, text, resize_dimension) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
    this.text = text;
    this.resize_dimension = resize_dimension;
}
    
Elements.Property.Border.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.Border.MenuItem.prototype.constructor = Elements.Property.Border.MenuItem;

Elements.Property.Border.MenuItem.prototype.click = function() {
    $.each(this.elements, function(idx, element) {
        var border_property = element.find_property(Elements.Property.Border);
        var curr_width = border_property.value;
        
        var new_width = Math.round(curr_width * this.resize_dimension);
        border_property.value = new_width;
        border_property.target.css('border-width', new_width);

    }.bind(this));

    this.parent_menu.hide();
    return false;
}

Elements.Property.Border.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.hitarea = this.html.children('a:eq(0)');

        this.hitarea.text(this.text).click(this.click.bind(this));
    }

    return this.html;
}
