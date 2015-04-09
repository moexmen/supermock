var TypeToAdd = {};

TypeToAdd.init = function(element_list) {
    this.init_items(element_list);
    this.init_input();
    this.hide();
}

TypeToAdd.init_items = function(element_list) {
    this.item_list = [];

    $.each(element_list, function(idx, element) {
        var item = new TypeToAdd.Item(element.labels, element.create_callback);
        TypeToAdd.item_list.push(item);
        $('#type_to_add_list').append(item.render());
    });

    $('#type_to_add_no_item').hide();
}

TypeToAdd.init_input = function() {
    $('#type_to_add_input').keyup(function(e) {
        switch(e.which) {
            case 13: // enter
                this.parse_input();
                return false;
            case 27: // escape
                this.hide();
                return false;
            default:
                this.update_items();
                return false;
        }
    }.bind(this));
}

TypeToAdd.show = function() {
    $('#type_to_add').show();
    $('#type_to_add_input').val('').focus();
    this.update_items();
}

TypeToAdd.hide = function() {
    $('#type_to_add').hide();
}

TypeToAdd.parse_input = function() {
    var matched_item = null;

    $.each(TypeToAdd.item_list, function(idx, item) {
        if(item.matched()) {
            matched_item = item;
            return false;
        }
    });

    if(matched_item != null) {
        matched_item.call_create_callback();
    }
}

TypeToAdd.update_items = function() {
    var new_input = $('#type_to_add_input').val();
    var matched = false;

    $.each(TypeToAdd.item_list, function(idx, item) {
        item.input_changed(new_input);
        matched = item.matched() || matched;
    });

    $('#type_to_add_no_item').toggle(!matched);
}

/* Item */

TypeToAdd.Item = function(labels, create_callback) {
    this.html = null;
    this.labels = labels;
    this.create_callback = create_callback;
}

TypeToAdd.Item.prototype.input_changed = function(input) {
    if(input.trim().length == 0) {
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

TypeToAdd.Item.prototype.call_create_callback = function() {
    this.create_callback();
    TypeToAdd.hide();
}

TypeToAdd.Item.prototype.render = function() {
    this.html = Util.clone_template('#type_to_add_list_item_template')
        .text(this.labels.join(' / '))
        .click(this.call_create_callback.bind(this));
    return this.html;
}



