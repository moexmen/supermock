//= require ../shared/menu_item
//= require ./property

Elements.Property.ModalButton.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
    //elements passed in are all instances of Elements.ModalButton;
}

Elements.Property.ModalButton.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ModalButton.MenuItem.prototype.constructor = Elements.Property.ModalButton.MenuItem;

Elements.Property.ModalButton.MenuItem.prototype.mouseenter = function() {
    this.parent_menu.hide_sub_menus();
    Elements.ModalPage.modal_button_menu.show(this.render(), this.show_hide_callback.bind(this), 
        this.edit_text_callback.bind(this), this.elements);

    return false;
}

Elements.Property.ModalButton.MenuItem.prototype.hide_sub_menus = function() {
    Elements.ModalPage.modal_button_menu.hide();
}

Elements.Property.ModalButton.MenuItem.prototype.show_hide_callback = function(show) {
    this.parent_menu.hide();
    this.elements[0].toggle_visibility();
    //don't jump around, go through editor if can. fire event so that the selector ends up getting called?
    Selector.show();
}

Elements.Property.ModalButton.MenuItem.prototype.edit_text_callback = function(show) {
    this.parent_menu.hide();
    

    this.elements[0].text = prompt("Please enter new name for button", this.elements[0].text);
    this.elements[0].set_text();
}

Elements.Property.ModalButton.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_expandable_template');

        this.hitarea = this.html.children('a:eq(0)');
        this.hitarea.children('span:eq(0)').text('Edit ' + this.elements[0].text);
        this.hitarea
        .mouseenter(this.mouseenter.bind(this))
        .click(this.click.bind(this));
    }

    return this.html;
}
