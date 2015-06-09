var TypeToAdd = TypeToAdd || {};

TypeToAdd.init = function(element_list) {
    this.init_items(element_list);
    this.init_input();
    this.hide();
}

TypeToAdd.init_items = function(element_list) {
    this.item_list = [];

    $.each(element_list, function(idx, element) {
        var item = new TypeToAdd.Item(element.labels, function() { TypeToAdd.add_element(element.type) });
        TypeToAdd.item_list.push(item);
        TypeToAdd.list().append(item.render());
    });

    TypeToAdd.no_such_item_msg().hide();
}

TypeToAdd.init_input = function() {
    TypeToAdd.input().keyup(function(e) {
        switch(e.which) {
            case 13: // enter
                TypeToAdd.parse_input();
                return false;
            case 27: // escape
                TypeToAdd.hide();
                return false;
            default:
                TypeToAdd.update_items();
                return false;
        }
    }.bind(this));
}

TypeToAdd.parse_input = function() {
    var matched_item = $.grep(TypeToAdd.item_list, function(item) {
        return item.matched();
    });

    if(matched_item[0] != null) {
        matched_item[0].call_add_element_callback();
    }
}

TypeToAdd.add_element = function(element_type) {
    var whatever = Elements.Element.create_default(element_type);
    console.log("This is what I have returned from creating an element: ", whatever);
    TypeToAdd.hide();
    Editor.add_element(whatever);
}

TypeToAdd.update_items = function() {
    var new_input = this.input().val().trim();
    var matched = false;

    $.each(TypeToAdd.item_list, function(idx, item) {
        item.input_changed(new_input);
        matched = item.matched() || matched;
    });

    TypeToAdd.no_such_item_msg().toggle(!matched);
}

TypeToAdd.visible = function() {
    return TypeToAdd.render().is(':visible');
}

TypeToAdd.show = function() {
    TypeToAdd.render().show();
    TypeToAdd.input().val('').focus();
    TypeToAdd.update_items();
}

TypeToAdd.hide = function() {
    TypeToAdd.render().hide();
}

TypeToAdd.render = function() {
    return $('#type_to_add');
}

TypeToAdd.input = function() {
    return $('#type_to_add_input');
}

TypeToAdd.list = function() {
    return $('#type_to_add_list');
}

TypeToAdd.no_such_item_msg = function() {
    return $('#type_to_add_no_item');
}



