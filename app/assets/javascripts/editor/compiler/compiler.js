//= require ./parser/parser

var Compiler = {};

Compiler.init = function() {
    Parser.init();
};

Compiler.try_compile = function(code) {
    try {
        Compiler.compile(code);

        return null;
    }
    catch(e) {
        console.log(e);

        return e.message;
    }
};

Compiler.compile = function(code) {
    var lines = code.split('\n');
    var elements = [];

    $.each(lines, function(index, line) {
        var element = Parser.parse(line);

        if (element != null) {
            elements.push(element);
        }

    });

    Editor.canvas().empty();
    $.each(elements, function(index, element) {
        Editor.canvas().append(element);
    });
};

