var Selector = Selector || {};

Selector.init = function() {
    Selector.selected_elements = [];

    Selector.move.init();
    Selector.resize.init();

    Selector.position_delta = 25;
    Selector.size_delta = 5;

    Selector.text_editing = false;
    Selector.render().mousedown(Selector.mousedown).mouseup(Selector.mouseup);
    Selector.hide();
}

Selector.is_selected = function(element) {
    return $.inArray(element, Selector.selected_elements) != -1
}

Selector.any_selected = function() {
    return Selector.selected_elements.length > 0;
}

Selector.any_text_editting = function() {
    return Selector.text_editing == true;
}

Selector.select = function(element) {
    element.select();
    Selector.selected_elements.push(element);
    
    Selector.move.update_cursor();
    Selector.resize.update_cursor();

    Selector.show();
}

Selector.unselect = function(element) {
    element.unselect();
    Selector.selected_elements.remove(element);

    Selector.any_selected() ? Selector.show() : Selector.hide();
}

Selector.unselect_all = function() {
    Editor.element_property_menu.hide();

    $.each(Selector.selected_elements || [], function(idx, element) {
        element.unselect();
    });

    Selector.selected_elements = [];
    Selector.hide();
}

Selector.mousedown = function(e) {
    if(e.which == 1) { // left
        if(e.shiftKey == true) { // shift select
            var element_behind = Selector.element_at(e.pageX, e.pageY);
            if(element_behind != null) { // unselect already added element
                Selector.unselect(element_behind);
            }
        }
        else { // non shift
            Selector.move.mousedown(e);
        }
    }
    else if(e.which == 3) { //right
        Editor.element_property_menu.show(Selector.render(), Selector.selected_elements);
    }

    return false;
}
Selector.mouseup = function(e) {
    Selector.stop_mouse_events();
    Selector.position_snap_to_grid();
    Selector.show();

    return false;
}

Selector.mousedown_element = function(element, event) {
    if(event.shiftKey == true) { // shift select
        if(Selector.is_selected(element) == false) { // new element, add to selection
            Selector.select(element);
        }
    }
    else { // non shift
        if(Selector.is_selected(element) == false) { // new element, clear previous selection
            Selector.unselect_all();
            Selector.select(element);
            Selector.move.mousedown(event);
        }
    }
}

Selector.mouseup_element = function(element, event) {
}

Selector.stop_mouse_events = function() {
    $(window).off('mousemove').off('mouseup');
}

Selector.set_position = function(left, top) {
    Selector.render().css({ left: left, top: top });
}

Selector.get_position = function() {
    return Selector.render().position();
}

Selector.set_size = function(width, height) {
    Selector.render().outerWidth(width).outerHeight(height);
}

Selector.get_size = function() {
    return { width: Selector.render().outerWidth(), height: Selector.render().outerHeight() };
}

Selector.delta_position = function(delta_left, delta_top) {
    var position = Selector.get_position();
    position.left += delta_left;
    position.top += delta_top;
    Selector.set_position(position.left, position.top);
}

Selector.delta_size = function(delta_width, delta_height) {
    var size = Selector.get_size();
    size.width += delta_width;
    size.height += delta_height;
    Selector.set_size(size.width, size.height);
}

Selector.element_at = function(left, top) {
    left -= Editor.canvas().offset().left;
    top -= Editor.canvas().offset().top;

    var element_behind = null;
    $.each(Selector.selected_elements, function(idx, element) {
        var position = element.get_position();
        var size = element.get_size();

        if(left >= position.left && left <= position.left + size.width
            && top >= position.top && top <= position.top + size.height) {

            element_behind = element;
            return false;
        }
    });

    return element_behind;
}

Selector.visible = function() {
    return Selector.render().is(':visible');
}

Selector.show = function() {
    var min_x = Number.MAX_VALUE;
    var min_y = Number.MAX_VALUE;
    var max_x = 0;
    var max_y = 0;

    $.each(Selector.selected_elements, function(idx, element) {
        var position = element.get_position();
        var size = element.get_size();

        min_x = Math.min(min_x, position.left);
        min_y = Math.min(min_y, position.top);
        max_x = Math.max(max_x, position.left + size.width);
        max_y = Math.max(max_y, position.top + size.height);
    });

    Selector.set_position(min_x, min_y);
    Selector.set_size(max_x - min_x, max_y - min_y);
    Selector.render().show();
}

Selector.position_snap_to_grid = function() {
    $.each(Selector.selected_elements, function(idx, element) {
        var position = element.get_position();
        var size = element.get_size();

        var left = Math.round(position.left/Selector.position_delta) * Selector.position_delta;
        var top = Math.round(position.top/Selector.position_delta) * Selector.position_delta;
        var width = Math.round(size.width/Selector.size_delta) * Selector.size_delta;
        var height = Math.round(size.height/Selector.size_delta) * Selector.size_delta;
        
        element.set_position(left, top);
        element.set_size(width, height);
    });
}

Selector.hide = function() {
    Selector.stop_mouse_events();
    Selector.render().hide();
}

Selector.render = function() {
    return $('#selector');
}