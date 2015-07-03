var Console = Console || {};

Console.init = function() {
    Console.page = null;

    Console.render().keyup(Console.keyup);
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
    var result = Compiler.try_compile(Console.page.content);

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