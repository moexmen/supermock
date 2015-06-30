//= require ../shared/menu_item
//= require ./property

Elements.Property.TextSize.MenuItem = function MenuItem(parent_menu, elements, increase_or_decrease) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
    this.text = increase_or_decrease;
    increase_or_decrease.localeCompare("Increase text size") == 0  ? this.resize_dimension = 1.25 : this.resize_dimension = 0.8;
}
    
Elements.Property.TextSize.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.TextSize.MenuItem.prototype.constructor = Elements.Property.TextSize.MenuItem;

Elements.Property.TextSize.MenuItem.prototype.click = function() {
    $.each(this.elements, function(idx, element) {
        var curr_size = element.find_property(Elements.Property.TextSize).value;
        var new_size = Math.round(curr_size * this.resize_dimension);
        element.find_property(Elements.Property.TextSize).value = new_size;

        element.find_property(Elements.Property.TextSize).readjust_text_size();
        element.on_resize();
    }.bind(this));

    this.parent_menu.hide();
    return false;
}

Elements.Property.TextSize.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.hitarea = this.html.children('a:eq(0)');

        this.hitarea.text(this.text)
            .click(this.click.bind(this))
            .mouseenter(this.mouseenter.bind(this));
    }

    return this.html;
}
