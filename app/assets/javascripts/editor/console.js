var Console = Console || {};

Console.init = function() {
    Console.target_element = null;
    Console.auto_save_counter = 0;
    Console.render().keydown(Console.keydown).keyup(Console.keyup);
};

Console.update_line_count = function() {
    var line_count = Console.render().val().split("\n").length;

    Console.line_count_gutter().text('');

    for (i=1; i<=line_count; i++) {
        var text_so_far = Console.line_count_gutter().text()
        Console.line_count_gutter().text(text_so_far + i + "." + "\n");
    }
};

Console.keydown = function(e) {
    if(e.keyCode === 71 && e.metaKey) { // command-A pressed
        Editor.snap_to_grid();
        
        e.preventDefault();
        Console.refresh();
    }
    else if(e.keyCode === 9) { // tab was pressed
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
    else if(e.keyCode === 13) { // enter pressed
        this.selectionStart = Console.shift_to_previous_indent(this.selectionStart);
        this.selectionEnd = this.selectionStart;
        e.preventDefault();
    }
};

Console.shift_to_previous_indent = function(start) {
    var value = Console.render().val();
    var first_half = value.substring(0, start);
    var second_half = value.substring(start);

    var indent_level = first_half.split('\n').pop().match(/^\t*/)[0].length;

    first_half += '\n'; //new line
    for (i=0; i<indent_level; i++) {
        first_half += '\t';
    }

    Console.render().val(first_half + second_half);
    return start + indent_level + 1;
};

Console.keyup = function(e) {
    if(Console.target_element.to_code() == Console.render().val()) {
        return;
    }
    Console.update_line_count();
    Console.compile();
    Console.increment_counter();
};

Console.increment_counter = function() {
    Console.auto_save_counter += 1;
};

Console.clear_counter = function() {
    Console.auto_save_counter = 0;
};

Console.compile = function() {
    try {
        Console.target_element.set_code(Console.render().val());
        Console.render_status().text('');
    }
    catch(e) {
        console.log(e);
        Console.render_status().text('Error: ' + e.message).css('color', 'red');
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
        Console.update_line_count();
        Console.increment_counter();
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
