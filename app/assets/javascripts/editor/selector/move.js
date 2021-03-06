var Selector = Selector || {};
Selector.move = {};

Selector.move.init = function() {
}

Selector.move.update_last_move_position = function(e) {
    Selector.move.last_move_position = { left: e.pageX, top: e.pageY };
}

Selector.move.mousedown = function(e) {
    if(e.which == 1) { // left
        Selector.move.update_last_move_position(e);
        $(window).mousemove(Selector.move.mousemove).mouseup(Selector.move.mouseup);
    }

    return false;
}

Selector.move.mousemove = function(e) {
    var delta_left = Math.round(e.pageX - Selector.move.last_move_position.left);
    var delta_top = Math.round(e.pageY - Selector.move.last_move_position.top);

    Selector.move.update_last_move_position(e);
    Selector.move.move(delta_left, delta_top);

    return false;
}

Selector.move.move = function(delta_left, delta_top) {
    // update elements
    $.each(Selector.selected_elements, function(idx, element) {
        var position = element.get_position();
        position.left += delta_left;
        position.top += delta_top;
        element.set_position(position.left, position.top);
    });

    // update selector
    Selector.delta_position(delta_left, delta_top);
}

Selector.move.mouseup = function(e) {
    if(e.which == 1) { // left
        Selector.stop_mouse_events();
        Selector.show();
    }

    return false;
}