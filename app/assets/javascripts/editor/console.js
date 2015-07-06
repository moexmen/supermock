var Console = Console || {};

Console.init = function() {
    Console.target_element = null;

    Console.render().keydown(Console.keydown).keyup(Console.keyup);
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
};

Console.keyup = function(e) {
    if(Console.target_element.to_code() == Console.render().val()) {
        return;
    }

    Console.compile();
};

Console.read_element = function(element) {
    Console.target_element = element;
    Console.refresh();
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

Console.refresh = function() {
    Console.render().val(Console.target_element.to_code());
};

Console.render = function() {
    return $('#console');
};

Console.render_status = function() {
    return $('#console_status');
};
