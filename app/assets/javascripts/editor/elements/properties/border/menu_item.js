//= require ../shared/menu_item
//= require ./property

Elements.Property.Border.MenuItem = function MenuItem(parent_menu, elements, increase_or_decrease) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
    this.text = increase_or_decrease;
    increase_or_decrease.localeCompare("Increase border size") == 0  ? this.resize_dimension = 1.25 : this.resize_dimension = 0.75;
}
    
Elements.Property.Border.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.Border.MenuItem.prototype.constructor = Elements.Property.Border.MenuItem;

Elements.Property.Border.MenuItem.prototype.click = function() {
    $.each(this.elements, function(idx, element) {
        var curr_width = element.find_property(Elements.Property.Border).value;
        var new_width = Math.round(curr_width * this.resize_dimension);
        element.find_property(Elements.Property.Border).value = new_width;

        element.find_property(Elements.Property.Border).readjust_border();
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
