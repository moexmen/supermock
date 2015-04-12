var Selector = Selector || {};

Selector.init = function() {
    this.selected_elements = [];

    Selector.hide();
}

Selector.select = function(element) {
    Selector.selected_elements.push(element);
    Selector.show();
}

Selector.unselect_all = function() {
    Selector.selected_elements = [];
    Selector.hide();
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