var Console = Console || {};

Console.init = function() {
    Console.page = null;

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
    if(Console.page.content == Console.render().val()) {
        return;
    }

    Console.page.content = Console.render().val();
    Console.compile();
};

Console.read_page = function(page) {
    Console.page = page;

    Console.render().val(Console.page.content);
};

Console.compile = function() {
    var result = Parser.try_parse(Console.page.content);

    if(result.success) {
        Editor.set_curr_page(Console.page.id);
        Console.render_status().text('');
    }
    else {
        Console.render_status().text('Error: ' + result.error);
    }
};

Console.render = function() {
    return $('#console');
};

Console.render_status = function() {
    return $('#console_status');
};