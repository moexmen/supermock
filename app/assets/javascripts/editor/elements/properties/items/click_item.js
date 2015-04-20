//= require ./item

Elements.Property.ClickItem = function ClickItem() {
    Elements.Property.Item.call(this);
}

Elements.Property.ClickItem.prototype = Object.create(Elements.Property.Item.prototype);
Elements.Property.ClickItem.prototype.constructor = Elements.Property.ClickItem;

Elements.Property.ClickItem.singleton = function() {
    return this.instance = this.instance || new Elements.Property.ClickItem();
}

Elements.Property.ClickItem.prototype.select_callback = function(page) {
    this.parent_menu.hide();

    $.each(this.elements, function(idx, element) {
        element.properties.click_page_id = page ? page.id : null;
    });
}

Elements.Property.ClickItem.prototype.hide_sub_menus = function() {
    Editor.element_page_menu.hide();
}

Elements.Property.ClickItem.prototype.click = function(e) {
    return false;
}

Elements.Property.ClickItem.prototype.hover = function(e) {
    this.parent_menu.hide_sub_menus();

    // select page only if all elements have the same selected page
    var selected_page_id = null;
    $.each(this.elements, function(idx, element) {
        if(idx === 0) {
            selected_page_id = element.properties.click_page_id;
        }
        else {
            if(selected_page_id != element.properties.click_page_id) {
                selected_page_id = 'no common page';
                return false;
            }
        }
    });

    var callback = this.select_callback.bind(this);
    Editor.element_page_menu.show(this.html, selected_page_id, callback);

    return false;
}

Elements.Property.ClickItem.prototype.render = function(parent_menu, elements) {
    this.parent_menu = parent_menu;
    this.elements = elements;

    if(!this.html) {
        this.html = Util.clone_template('#element_menu_item_expandable_template');
        this.hitarea = this.html.children('a');
        $(this.hitarea.children('span')[0]).text('On click go to');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}
