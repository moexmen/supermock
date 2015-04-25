//= require ./menu_item

Elements.Property.ClickPage.MenuItem.CreateModal = function CreateModal(parent_menu, elements) {
    Elements.Property.MenuItem.call(this, parent_menu, elements);
}

Elements.Property.ClickPage.MenuItem.CreateModal.prototype = Object.create(Elements.Property.MenuItem.prototype);
Elements.Property.ClickPage.MenuItem.CreateModal.prototype.constructor = Elements.Property.ClickPage.MenuItem.CreateModal;

Elements.Property.ClickPage.MenuItem.CreateModal.prototype.click = function(e) {
    // TODO create modal
    return Elements.Property.MenuItem.prototype.click.call(this, e);
}

Elements.Property.ClickPage.MenuItem.CreateModal.prototype.render = function() {
    if(!this.html) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.hitarea = this.html.children('a').text('Create Modal');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}
