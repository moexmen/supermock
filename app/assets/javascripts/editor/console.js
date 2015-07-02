var Console = Console || {};

Console.init = function() {
    Console.page = null;

    Console.render().keyup(Console.keyup);
};

Console.keyup = function(e) {
    Console.page.content = Console.render().val();

    Console.compile();
}

Console.open_page = function(page) {
    Console.page = page;

    Console.render().val(Console.page.content);
    Console.compile();
};

Console.compile = function() {
    var status = Compiler.try_compile(Console.page.content);

    Console.render_status().text( status ? 'Error: ' + status : '' );
};

Console.render = function() {
    return $('#console');
};

Console.render_status = function() {
    return $('#console_status');
}