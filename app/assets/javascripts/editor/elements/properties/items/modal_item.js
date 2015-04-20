//= require ./item

Elements.Property.ModalItem = function ModalItem() {
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
    this.parent_menu = parent_menu;
    this.elements = elements;

    if(!this.html) {
        this.html = Util.clone_template('#element_menu_item_template');
        this.hitarea = this.html.children('a').text('Create Modal');

        this.hitarea.click(this.click.bind(this));
        this.hitarea.mouseenter(this.hover.bind(this));
    }

    return this.html;
}
