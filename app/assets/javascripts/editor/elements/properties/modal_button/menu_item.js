//= require ../shared/menu_item
//= require ./property

Elements.Property.ModalButtons.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
    //elements passed in are all instances of Elements.Button;
}

Elements.Property.ModalButtons.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ModalButtons.MenuItem.prototype.constructor = Elements.Property.ModalButtons.MenuItem;

Elements.Property.ModalButtons.MenuItem.prototype.mouseenter = function() {
    this.parent_menu.hide_sub_menus();
    
    if(this.elements[0].btn.css('display') == 'none') {
        Editor.modal_button_menu.show(this.render(), this.show_callback.bind(this), null,
            this.edit_text_callback.bind(this), this.elements);
    }
    else {
        Editor.modal_button_menu.show(this.render(), null, this.hide_callback.bind(this),
            this.edit_text_callback.bind(this), this.elements);
    }
    return false;
}

Elements.Property.ModalButtons.MenuItem.prototype.hide_sub_menus = function() {
    Editor.modal_button_menu.hide();
}

Elements.Property.ModalButtons.MenuItem.prototype.show_callback = function() {
    this.parent_menu.hide();
    this.elements[0].btn.css('display', 'inline-block');
}

Elements.Property.ModalButtons.MenuItem.prototype.hide_callback = function() {
    this.parent_menu.hide();
    this.elements[0].btn.css('display', 'none');
}

Elements.Property.ModalButtons.MenuItem.prototype.edit_text_callback = function() {
    this.parent_menu.hide();

    var new_text = prompt("Please enter new name for button", this.elements[0].text)

    this.elements[0].text = new_text;
    this.elements[0].btn.text(new_text);
}

Elements.Property.ModalButtons.MenuItem.prototype.render = function() {
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