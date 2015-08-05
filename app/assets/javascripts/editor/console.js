var Console = Console || {};

Console.init = function() {
    Console.target_element = null;
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
    if(e.keyCode === 71 && e.metaKey) { // command-G pressed
        e.preventDefault();

        Selector.unselect_all();
        Editor.snap_to_grid([Console.target_element]);
        
        Console.refresh();
    }
    else if(e.keyCode === 9) { // tab was pressed
        e.preventDefault();

        if(this.selectionStart == this.selectionEnd){ //no highlighting of text
            Console.tab_one_line(this);
        }
        else { //indent many lines together
            Console.tab_many_lines(this);
        }
    }
    else if(e.keyCode === 13) { // enter pressed
        e.preventDefault();

        Console.shift_to_previous_indent(this);
    }
};

Console.tab_many_lines = function(textarea_console) {
    var start = textarea_console.selectionStart;
    var end = textarea_console.selectionEnd;

    var value = Console.render().val();
    var first_third = value.substring(0, start);
    var second_third = value.substring(start, end);
    var last_third = value.substring(end);
    var final_value = '';
    var counter = 1;

    var first_third_array = first_third.split('\n');
    var current_selected_line = first_third_array.pop();
    first_third_array.push('\t' + current_selected_line);
    final_value = first_third_array.join('\n');

    var second_third_array = second_third.split('\n');
    $.each(second_third_array, function(i, line){
        if(i == 0) {
            final_value += line;
        }
        else {
            final_value += '\n\t' + line;
            counter += 1;
        }
    });

    final_value += last_third;

    Console.render().val(final_value);
    textarea_console.selectionStart = start + 1;
    textarea_console.selectionEnd = end + counter;
};

Console.tab_one_line = function(textarea_console) {
    var start = textarea_console.selectionStart;
    var end = textarea_console.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    var value = Console.render().val();
    Console.render().val(value.substring(0, start)
        + "\t"
        + value.substring(end));

    // put caret at right position again (add one for the tab)
    textarea_console.selectionStart = textarea_console.selectionEnd = start + 1;
};

Console.shift_to_previous_indent = function(textarea_console) {
    var start = textarea_console.selectionStart;
    var value = Console.render().val();

    var first_half = value.substring(0, start);
    var second_half = value.substring(start);

    var indent_level = first_half.split('\n').pop().match(/^\t*/)[0].length;

    first_half += '\n'; 
    for (i=0; i<indent_level; i++) {
        first_half += '\t';
    }

    Console.render().val(first_half + second_half);

    textarea_console.selectionStart = textarea_console.selectionEnd = start + indent_level + 1;
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
