var Selector = Selector || {};
Selector.resize = {};

Selector.resize.init = function() {
    Selector.resize.edge_snap = []

    var handles = [
        Selector.resize.handle_north(),
        Selector.resize.handle_east(),
        Selector.resize.handle_south(),
        Selector.resize.handle_west(),
        Selector.resize.handle_north_east(),
        Selector.resize.handle_south_east(),
        Selector.resize.handle_south_west(),
        Selector.resize.handle_north_west(),
    ];

    $.each(handles, function(idx, handle) {
       handle.mousedown(Selector.resize.mousedown_handle).mouseup(Selector.resize.mouseup_handle);
    });
}

Selector.resize.init_edge_snap = function() {
    Selector.resize.edge_snap = []
    var selector_size = Selector.get_size();
    var selector_position = Selector.get_position();

    $.each(Selector.selected_elements, function(idx, element) {
        var element_position = element.get_position();
        var element_size = element.get_size();

        Selector.resize.edge_snap.push({
            left: element_position.left == selector_position.left,
            top: element_position.top == selector_position.top,
            right: element_position.left + element_size.width == selector_position.left + selector_size.width,
            bottom: element_position.top + element_size.height == selector_position.top + selector_size.height,
        });
    });
}

Selector.resize.update_last_move_position = function(e) {
    Selector.resize.last_move_position = { left: e.pageX, top: e.pageY };
}

Selector.resize.mousedown_handle = function(e) {
    Selector.resize.init_edge_snap();
    Selector.resize.update_last_move_position(e);
    $(window).mousemove($(e.target), Selector.resize.mousemove_handle).mouseup(Selector.resize.mouseup_handle);

    return false;
}

Selector.resize.mousemove_handle = function(e) {
    var delta_left = Math.round(e.pageX - Selector.resize.last_move_position.left);
    var delta_top = Math.round(e.pageY - Selector.resize.last_move_position.top);

    Selector.resize.update_last_move_position(e);
    Selector.resize.resize(e.data, delta_left, delta_top);

    return false;
}

Selector.resize.mouseup_handle = function(e) {
    Selector.stop_mouse_events();
    Selector.show();

    return false;
}

Selector.resize.resize = function(handle, delta_left, delta_top) {
    // resize selector
    var initial_size = Selector.get_size();
    var initial_position = Selector.get_position();
    Selector.resize.resize_selector(handle, delta_left, delta_top);

    // resize elements
    var new_size = Selector.get_size();
    var new_position = Selector.get_position();
    Selector.resize.resize_elements(initial_size, initial_position, new_size, new_position);
}

Selector.resize.resize_selector = function(handle, delta_left, delta_top) {
    if(handle.is(Selector.resize.handle_north())) {
        Selector.delta_size(0, -delta_top);
        Selector.delta_position(0, delta_top);
    }
    else if(handle.is(Selector.resize.handle_east())) {
        Selector.delta_size(delta_left, 0);
        Selector.delta_position(0, 0);
    }
    else if(handle.is(Selector.resize.handle_south())) {
        Selector.delta_size(0, delta_top);
        Selector.delta_position(0, 0);
    }
    else if(handle.is(Selector.resize.handle_west())) {
        Selector.delta_size(-delta_left, 0);
        Selector.delta_position(delta_left, 0);
    }
    else if(handle.is(Selector.resize.handle_north_west())) {
        Selector.delta_size(-delta_left, -delta_top);
        Selector.delta_position(delta_left, delta_top);
    }
    else if(handle.is(Selector.resize.handle_north_east())) {
        Selector.delta_size(delta_left, -delta_top);
        Selector.delta_position(0, delta_top);
    }
    else if(handle.is(Selector.resize.handle_south_west())) {
        Selector.delta_size(-delta_left, delta_top);
        Selector.delta_position(delta_left, 0);
    }
    else if(handle.is(Selector.resize.handle_south_east())) {
        Selector.delta_size(delta_left, delta_top);
        Selector.delta_position(0, 0);
    }
}

Selector.resize.calc_min_delta_width = function(delta_width) {
    var min_width = 20;
    var size = Selector.get_size();

    return (size.width + delta_width < min_width ? min_width - size.width : delta_width);
}

Selector.resize.calc_min_delta_height = function(delta_height) {
    var min_height = 20;
    var size = Selector.get_size();

    return (size.height + delta_height < min_height ? min_height - size.height : delta_height);
}

Selector.resize.resize_elements = function(initial_size, initial_position, new_size, new_position) {
    var scale = { width: new_size.width / initial_size.width, height: new_size.height / initial_size.height };

    $.each(Selector.selected_elements, function(idx, element) {
        var element_position = element.get_position();
        var element_size = element.get_size();

        // scale it
        var left = Math.round(scale.width * (element_position.left - initial_position.left)) + new_position.left;
        var top = Math.round(scale.height * (element_position.top - initial_position.top)) + new_position.top;
        var width = Math.round(scale.width * element_size.width);
        var height = Math.round(scale.height * element_size.height);

        // ensure within selector
        left = Math.max(left, new_position.left);
        top = Math.max(top, new_position.top);
        width = Math.min(left + width, new_position.left + new_size.width) - left;
        height = Math.min(top + height, new_position.top + new_size.height) - top;

        // force edge snap if element was at the edge from the start
        if(Selector.resize.edge_snap[idx].left) left = new_position.left;
        if(Selector.resize.edge_snap[idx].top) top = new_position.top;
        if(Selector.resize.edge_snap[idx].right) width = new_position.left - left + new_size.width;
        if(Selector.resize.edge_snap[idx].bottom) height = new_position.top - top + new_size.height;

        element.set_position(left, top);
        element.set_size(width, height);
    });
}

Selector.resize.handle_north = function() {
    return $('#handle_north');
}

Selector.resize.handle_east = function() {
    return $('#handle_east');
}

Selector.resize.handle_south = function() {
    return $('#handle_south');
}

Selector.resize.handle_west = function() {
    return $('#handle_west');
}

Selector.resize.handle_north_west = function() {
    return $('#handle_north_west');
}

Selector.resize.handle_north_east = function() {
    return $('#handle_north_east');
}

Selector.resize.handle_south_west = function() {
    return $('#handle_south_west');
}

Selector.resize.handle_south_east = function() {
    return $('#handle_south_east');
}