var Selector = Selector || {};
Selector.resize = {};

Selector.resize.init = function() {
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

Selector.resize.update_last_move_position = function(e) {
    Selector.resize.last_move_position = { left: e.pageX, top: e.pageY };
}

Selector.resize.mousedown_handle = function(e) {
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
    console.log('stop resize');
    $(window).off('mousemove').off('mouseup');

    return false;
}

Selector.resize.resize = function(handle, delta_left, delta_top) {
    var initial_size = Selector.get_size();
    var initial_position = Selector.get_position();

    // resize selector
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


    // resize elements
    var scale = Selector.resize.calc_scale(initial_size);
    Selector.resize.resize_elements(initial_position, scale);
}

Selector.resize.resize_selector = function(delta_left, delta_top) {

}

Selector.resize.resize_elements = function(initial_position, scale) {
    var new_position = Selector.get_position();
    var new_size = Selector.get_size();

    $.each(Selector.selected_elements, function(idx, element) {
        var element_position = element.get_position();
        var element_size = element.get_size();

        var left = scale.width * (element_position.left - initial_position.left) + new_position.left;
        var top = scale.height * (element_position.top - initial_position.top) + new_position.top;
        var width = scale.width * element_size.width;
        var height = scale.height * element_size.height;

        left = Math.max(left, new_position.left);
        top = Math.max(top, new_position.top);
        width = Math.min(width, new_size.width);
        height = Math.min(height, new_size.height);

        element.set_position(left, top);
        element.set_size(width, height);
    });
}

Selector.resize.calc_scale = function(initial_size) {
    var size = Selector.get_size();
    return { width: size.width / initial_size.width, height: size.height / initial_size.height };
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