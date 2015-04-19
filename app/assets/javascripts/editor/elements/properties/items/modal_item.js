//= require ./item

Elements.Property.ModalItem = function() {
    Elements.Property.Item.call(this);
}

Elements.Property.ModalItem.prototype = Object.create(Elements.Property.Item.prototype);
Elements.Property.ModalItem.prototype.constructor = Elements.Property.ModalItem;

Elements.Property.ModalItem.singleton = function() {
    return this.instance = this.instance || new Elements.Property.ModalItem();
}

Elements.Property.ModalItem.prototype.click = function(e) {
    // TODO create modal
    return Elements.Property.Item.prototype.click.call(this, e);
}

Elements.Property.ModalItem.prototype.render = function(parent_menu, elements) {
    if(!this.html) {
        Elements.Property.Item.prototype.render.call(this, parent_menu, elements, '#element_menu_item_template');
        this.hitarea.text('Create Modal');
    }

    return this.html;
}
