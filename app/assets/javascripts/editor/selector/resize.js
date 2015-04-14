var Selector = Selector || {};
Selector.resize = {};

Selector.resize.init = function() {
    Selector.resize.handle_north_east().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_south_east().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_south_west().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_north_west().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_north().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_east().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_south().mousedown(Selector.resize.mousedown_handle);
    Selector.resize.handle_west().mousedown(Selector.resize.mousedown_handle);
}

Selector.resize.mousedown_handle = function(e) {
    //Selector.originalResizes=[];
    //$.each(Selector.selected_elements, function(idx, element) {
    //    var size=element.get_size();
    //    var pos=element.get_position();
    //    Selector.originalResizes.push({ width:size.width, height:size.height, left:pos.left, top:pos.top });
    //});

    //$(this.resizerId).css({ opacity:0 });
    console.log('resize start' + e.target);
    return false;
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