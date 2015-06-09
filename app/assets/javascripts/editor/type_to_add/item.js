var TypeToAdd = TypeToAdd || {};

TypeToAdd.Item = function(labels, add_element_callback) {
    this.html = null;
    this.labels = labels;
    this.add_element_callback = add_element_callback;
    console.log(labels, add_element_callback);
}

TypeToAdd.Item.prototype.input_changed = function(input) {
    if(input.length == 0) {
        this.show();
    }
    else {
        this.hide();
        input = input.toLowerCase();

        var matched_label = $.grep(this.labels, function(label) {
           return label.toLowerCase().indexOf(input) != -1;
        });

        if(matched_label[0] != null) {
            this.show();
        }
    }
}

TypeToAdd.Item.prototype.matched = function() {
    return this.visible();
}

TypeToAdd.Item.prototype.call_add_element_callback = function() {
    this.add_element_callback();
}

TypeToAdd.Item.prototype.visible = function() {
    return this.render().is(':visible');
}

TypeToAdd.Item.prototype.show = function() {
    this.render().show();
}

TypeToAdd.Item.prototype.hide = function() {
    this.render().hide();
}

TypeToAdd.Item.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#type_to_add_list_item_template')
            .text(this.labels.join(' / '))
            .click(this.call_add_element_callback.bind(this));
    }

    return this.html;
}