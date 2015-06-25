//= require ../shared/menu_item
//= require ./property

Elements.Property.ModalTitle.MenuItem = function MenuItem(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.ModalTitle.MenuItem.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ModalTitle.MenuItem.prototype.constructor = Elements.Property.ModalTitle.MenuItem;

Elements.Property.ModalTitle.MenuItem.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_menu_item_template');

        this.hitarea = this.html.children('a:eq(0)');
        this.hitarea.text('Edit Title');
        this.hitarea
            .mouseenter(this.mouseenter.bind(this))
            .click(this.click.bind(this));
    }

    return this.html;
}

Elements.Property.ModalTitle.MenuItem.prototype.click = function() {
    this.elements[0].set_modal_title(prompt("Enter title for modal", this.elements[0].get_modal_title()));

    this.parent_menu.hide();
    return false;
}
