//= require ./selector/resize

var Selector = Selector || {};

Selector.init = function() {
    Selector.selected_elements = [];

    Selector.resize.init();
    Selector.render().mousedown(Selector.mousedown).mouseup(Selector.mouseup);
    Selector.hide();
}

Selector.OnStartResize = function(e,ui) {
    Selector.originalResizes=[];
    $.each(Selector.selected_elements, function(idx, element) {
        var size=element.get_size();
        var pos=element.get_position();
        Selector.originalResizes.push({ width:size.width, height:size.height, left:pos.left, top:pos.top });
    });

    //$(this.resizerId).css({ opacity:0 });
    console.log('resize start');
    return false;
}
Selector.OnResize = function(e,ui) {
    var resizeWidthRatio=ui.size.width/ui.originalSize.width;
    var resizeHeightRatio=ui.size.height/ui.originalSize.height;

    //update ctrls
    $.each(Selector.selected_elements, function(idx, element) {
        var resize=Selector.originalResizes[idx];

        //-1,+1 to compensate for border
        var left=Math.round((resizeWidthRatio*(resize.left-ui.originalPosition.left)) + ui.position.left);
        var top=Math.round((resizeHeightRatio*(resize.top-ui.originalPosition.top)) + ui.position.top);
        element.set_position(left, top);

        var width=Math.round(resize.width*resizeWidthRatio);
        var height=Math.round(resize.height*resizeHeightRatio);
        element.set_size(width, height);
    });
}

Selector.is_selected = function(element) {
    return $.inArray(element, Selector.selected_elements) != -1
}

Selector.any_selected = function() {
    return Selector.selected_elements.length > 0;
}

Selector.select = function(element) {
    element.select();
    Selector.selected_elements.push(element);
    Selector.show();
}

Selector.unselect = function(element) {
    element.unselect();
    Selector.selected_elements.remove(element);

    Selector.any_selected() ? Selector.show() : Selector.hide();
}

Selector.unselect_all = function() {
    $.each(Selector.selected_elements || [], function(idx, element) {
        element.unselect();
    });

    Selector.selected_elements = [];
    Selector.hide();
}

Selector.mousedown = function(e) {
    if(e.shiftKey == true) { // shift select
        var left = e.pageX - Editor.canvas().offset().left;
        var top = e.pageY - Editor.canvas().offset().top;
        var element_behind = Selector.element_behind(left, top);

        if(element_behind != null) { // unselect already added element
            Selector.unselect(element_behind);
        }
    }
    else { // non shift
        Selector.start_drag(event);
    }
}
Selector.mouseup = function(e) {
    Selector.stop_drag();
}

Selector.element_behind = function(left, top) {
    var element_behind = null;
    $.each(Selector.selected_elements, function(idx, element) {
        var position = element.get_position();
        var size = element.get_size();

        if(left >= position.left && left <= position.left + size.width  && top >= position.top && top <= position.top + size.height) {
            element_behind = element;
            return false;
        }
    });

    return element_behind;
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
            Selector.start_drag(event);
        }
    }
}

Selector.mouseup_element = function(element, event) {
}

Selector.update_last_drag_position = function(e) {
    Selector.last_drag_position = { left: e.pageX, top: e.pageY };
}

Selector.start_drag = function(e) {
    Selector.update_last_drag_position(e);
    $(window).mousemove(Selector.drag).mouseup(Selector.stop_drag);
}

Selector.drag = function(e) {
    var delta_left = Math.round(e.pageX - Selector.last_drag_position.left);
    var delta_top = Math.round(e.pageY - Selector.last_drag_position.top);
    Selector.update_last_drag_position(e);

    // update elements
    $.each(Selector.selected_elements, function(idx, element) {
        var position = element.get_position();
        position.left += delta_left;
        position.top += delta_top;
        element.set_position(position.left, position.top);
    });

    // update selector
    var position = Selector.render().position();
    position.left += delta_left;
    position.top += delta_top;
    Selector.render().css({ 'left': position.left, 'top': position.top });

    //Selector.drag_hitarea().show();
    //Selector.hide();
}

Selector.stop_drag = function() {
    console.log('stop drag');
    $(window).off('mousemove').off('mouseup');
    Selector.drag_hitarea().hide();
    Selector.show();
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

    Selector.render().css({ left: min_x, top: min_y, width: max_x - min_x, height: max_y - min_y}).show();
}

Selector.hide = function() {
    Selector.render().hide();
}

Selector.render = function() {
    return $('#selector');
}