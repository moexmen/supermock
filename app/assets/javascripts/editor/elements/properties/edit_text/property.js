//= require ../property

Elements.Property.EditText = function EditText(html_to_edit, item) {
    this.value = item;
    this.item = item.toLowerCase();
    this.html_to_edit = html_to_edit;
    this.set_text(this.value);
}

Elements.Property.EditText.prototype = Object.create(Elements.Property.prototype);
Elements.Property.EditText.prototype.constructor = Elements.Property.EditText;

Elements.Property.EditText.menu_items = function(parent_menu, elements) {
    return [ new Elements.Property.EditText.MenuItem(parent_menu, elements)]; 
}

Elements.Property.EditText.prototype.set_text = function(new_text) {
    this.value = new_text;
    this.html_to_edit.text(this.value);
}

Elements.Property.EditText.prototype.get_text = function() {
    return this.html_to_edit.text();
}

Elements.Property.EditText.prototype.edit_text = function() {
    Selector.text_editing = true;
    this.html_to_edit
        .attr('contenteditable', true)
        .focus()
        .dblclick()
        .focusout(function() {
            this.html_to_edit.attr('contenteditable', false);
            this.html_to_edit.off('focusout');
            Selector.text_editing = false;
        }.bind(this))
}