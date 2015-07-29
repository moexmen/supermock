var Selector = Selector || {};
Selector.resize = {};

Selector.resize.init = function() {
    Selector.resize.element_dimensions = []
    this.init_cursor_directions();

    Selector.resize.handles = [
        Selector.resize.handle_north(),
        Selector.resize.handle_east(),
        Selector.resize.handle_south(),
        Selector.resize.handle_west(),
        Selector.resize.handle_north_east(),
        Selector.resize.handle_south_east(),
        Selector.resize.handle_south_west(),
        Selector.resize.handle_north_west(),
    ];

    $.each(Selector.resize.handles, function(idx, handle) {
       handle.mousedown(Selector.resize.mousedown_handle).mouseup(Selector.resize.mouseup_handle);
    });
}

Selector.resize.init_cursor_directions = function() {
    Selector.resize.cursor_directions = {};

    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.NORTH] = 'n-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.EAST] = 'e-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.SOUTH] = 's-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.WEST] = 'w-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.NORTHEAST] = 'ne-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.SOUTHEAST] ='se-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.SOUTHWEST] = 'sw-resize';
    Selector.resize.cursor_directions[Elements.Element.RESIZE_DIRECTIONS.NORTHWEST] = 'nw-resize';
}

Selector.resize.save_element_dimensions = function() {
    Selector.resize.element_dimensions = []
    var selector_size = Selector.get_size();
    var selector_position = Selector.get_position();

    $.each(Selector.selected_elements, function(idx, element) {
        var element_position = element.get_position_relative_to_canvas();
        var element_size = element.get_size();

        Selector.resize.element_dimensions.push({
            left: (element_position.left - selector_position.left) / selector_size.width,
            top: (element_position.top - selector_position.top) / selector_size.height,
            width: element_size.width /selector_size.width,
            height: element_size.height /selector_size.height
        });
    });
}

Selector.resize.update_last_move_position = function(e) {
    Selector.resize.last_move_position = { left: e.pageX, top: e.pageY };
}

Selector.resize.mousedown_handle = function(e) {
    if(e.which == 1) { // left
        Selector.resize.save_element_dimensions();
        Selector.resize.update_last_move_position(e);
        $(window).mousemove($(e.target), Selector.resize.mousemove_handle).mouseup(Selector.resize.mouseup_handle);
    }

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
    if(e.which == 1) { // left
        Selector.stop_mouse_events();
        Selector.show();
    }

    return false;
}

Selector.resize.resize = function(handle, delta_left, delta_top) {
    // resize selector
    Selector.resize.resize_selector(handle, delta_left, delta_top);

    // resize elements
    var new_size = Selector.get_size();
    var new_position = Selector.get_position();
    Selector.resize.resize_elements(new_size, new_position);
}

Selector.resize.resize_selector = function(handle, delta_left, delta_top) {
    var delta = { left: 0, top: 0, width: 0, height: 0 };

    if(handle.is(Selector.resize.handle_north())) {
        delta = { left: 0, top: delta_top, width: 0, height: -delta_top };
    }
    else if(handle.is(Selector.resize.handle_east())) {
        delta = { left: 0, top: 0, width: delta_left, height: 0 };
    }
    else if(handle.is(Selector.resize.handle_south())) {
        delta = { left: 0, top: 0, width: 0, height: delta_top };
    }
    else if(handle.is(Selector.resize.handle_west())) {
        delta = { left: delta_left, top: 0, width: -delta_left, height: 0 };
    }
    else if(handle.is(Selector.resize.handle_north_west())) {
        delta = { left: delta_left, top: delta_top, width: -delta_left, height: -delta_top };
    }
    else if(handle.is(Selector.resize.handle_north_east())) {
        delta = { left: 0, top: delta_top, width: delta_left, height: -delta_top };
    }
    else if(handle.is(Selector.resize.handle_south_west())) {
        delta = { left: delta_left, top: 0, width: -delta_left, height: delta_top };
    }
    else if(handle.is(Selector.resize.handle_south_east())) {
        delta = { left: 0, top: 0, width: delta_left, height: delta_top };
    }

    delta = Selector.resize.calc_min_delta(delta);
    Selector.delta_size(delta.width, delta.height);
    Selector.delta_position(delta.left, delta.top);
}

Selector.resize.direction_handle_mapping = function(dir) {
    switch (dir) {
        case Elements.Element.RESIZE_DIRECTIONS.NORTH:
            return Selector.resize.handle_north();
        case Elements.Element.RESIZE_DIRECTIONS.SOUTH:
            return Selector.resize.handle_south();
        case Elements.Element.RESIZE_DIRECTIONS.EAST:
            return Selector.resize.handle_east();
        case Elements.Element.RESIZE_DIRECTIONS.WEST:
            return Selector.resize.handle_west();
        case Elements.Element.RESIZE_DIRECTIONS.NORTHEAST:
            return Selector.resize.handle_north_east();
        case Elements.Element.RESIZE_DIRECTIONS.NORTHWEST:
            return Selector.resize.handle_north_west();
        case Elements.Element.RESIZE_DIRECTIONS.SOUTHEAST:
            return Selector.resize.handle_south_east();
        case Elements.Element.RESIZE_DIRECTIONS.SOUTHWEST:
            return Selector.resize.handle_south_west();
        default:
            return null;
    }
}

Selector.resize.resize_elements = function(new_size, new_position) {
    $.each(Selector.selected_elements, function(idx, element) {
        // console.log("Before", element.get_position());
        var element_ratio = Selector.resize.element_dimensions[idx];

        var left = new_position.left + Math.round(element_ratio.left * new_size.width);
        var top = new_position.top + Math.round(element_ratio.top * new_size.height);
        var width = Math.round(element_ratio.width * new_size.width);
        var height = Math.round(element_ratio.height * new_size.height);

        // console.log("During", left, top);
        element.set_position(left, top);
        element.set_size(width, height);
        // console.log("After", element.get_position());
    });
}

Selector.resize.calc_min_delta = function(delta) {
    var min = 20;
    var size = Selector.get_size();

    if(size.width + delta.width < min) {
        delta.width = min - size.width;
        delta.left = Math.sign(delta.left) * Math.abs(delta.width);
    }
    if(size.height + delta.height < min) {
        delta.height = min - size.height;
        delta.top = Math.sign(delta.top) * Math.abs(delta.height);
    }

    return delta;
}

Selector.resize.update_cursor = function(){
    var directions_possible = Selector.selected_elements[0].resizeable_directions;

    $.each(Selector.selected_elements, function(idx, element) {
        var new_array_of_possible_directions = [];
        $.each(directions_possible, function(idx, direction) {
            if(element.has_direction(direction)) {
                new_array_of_possible_directions.push(direction);
            }
        });
        directions_possible = new_array_of_possible_directions;
    });

    $.each(Object.keys(Elements.Element.RESIZE_DIRECTIONS), function(idx, key) {
        var direction = Elements.Element.RESIZE_DIRECTIONS[key];
        var handle = Selector.resize.direction_handle_mapping(direction);
        handle.css('cursor', 'not-allowed').unbind();
    });

    $.each(directions_possible, function(idx, direction) {
        var handle = Selector.resize.direction_handle_mapping(direction);
        handle.css('cursor', Selector.resize.cursor_directions[direction]);
        handle.mousedown(Selector.resize.mousedown_handle).mouseup(Selector.resize.mouseup_handle);

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