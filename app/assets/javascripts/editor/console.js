var Console = Console || {};

Console.init = function() {
    Console.target_element = null;

    Console.render().keydown(Console.keydown).keyup(Console.keyup).scroll(Console.scroll);
};

Console.scroll = function() {
    // Console.line_count_gutter().style.top = -(Console.render().scrollTop) + "px";
};

Console.update_line_count = function() {
    var line_count = Console.render().val().split("\n").length;

    Console.line_count_gutter().text('');

    for (i=1; i<=line_count; i++) {
        var text_so_far = Console.line_count_gutter().text()
        Console.line_count_gutter().text(text_so_far + i + "." + "\n");
    }

    // Console.line_count_gutter().style.top = -(Console.render().scrollTop) + "px";
};

Console.keydown = function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        var value = Console.render().val();
        Console.render().val(value.substring(0, start)
            + "\t"
            + value.substring(end));

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
    else if(e.keyCode === 13) { // enter was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var value = Console.render().val();
        var first_half = value.substring(0, start);
        var second_half = value.substring(end);

        var indent_level = first_half.split('\n').pop().match(/^\t*/)[0].length;

        first_half += '\n';
        for (i=0; i<indent_level; i++) {
            first_half += '\t';
        }

        Console.render().val(first_half + second_half);
        this.selectionStart = this.selectionEnd = start + indent_level + 1;

        e.preventDefault();
    }
};

Console.keyup = function(e) {
    if(Console.target_element.to_code() == Console.render().val()) {
        return;
    }
    Console.update_line_count();
    Console.compile();
};

Console.compile = function() {
    try {
        Console.target_element.set_code(Console.render().val());
        Console.render_status().text('');
    }
    catch(e) {
        console.log(e);
        Console.render_status().text('Error: ' + e.message);
    }
};

Console.read_element = function(element) {
    Console.target_element = element;
    Console.refresh();
};

Console.refresh = function() {
    if(Console.target_element == null) {
        Console.render().val('').prop('disabled', true);
    }
    else {
        Console.render().val(Console.target_element.to_code()).prop('disabled', false);
    }
};

Console.render = function() {
    return $('#console');
};

Console.render_status = function() {
    return $('#console_status');
};

Console.line_count_gutter = function() {
    return $('#divlines');
};
