var TypeToAdd = TypeToAdd || {};

TypeToAdd.Item = function(labels, add_element_callback) {
    this.html = null;
    this.labels = labels;
    this.add_element_callback = add_element_callback;
}

TypeToAdd.Item.prototype.input_changed = function(input) {
    if(input.length == 0) {
        this.html.show();
    }
    else {
        this.html.hide();
        input = input.toLowerCase();

        $.each(this.labels, function(idx, label) {
            if(label.toLowerCase().indexOf(input) != -1) {
                this.html.show();
                return false;
            }
        }.bind(this));
    }
}

TypeToAdd.Item.prototype.matched = function() {
    return this.html.is(':visible');
}

TypeToAdd.Item.prototype.call_add_element_callback = function() {
    this.add_element_callback();
}

TypeToAdd.Item.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#type_to_add_list_item_template')
            .text(this.labels.join(' / '))
            .click(this.call_add_element_callback.bind(this));
    }

    return this.html;
}