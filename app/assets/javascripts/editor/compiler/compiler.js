
//
//var Compiler = {};
//
//Compiler.init = function() {
//    Parser.init();
//};
//
//Compiler.try_compile = function(code) {
//    try {
//        return { success: true, elements: Compiler.compile(code) };
//    }
//    catch(e) {
//        console.log(e);
//
//        return { success: false, error: e.message };
//    }
//};
//
//Compiler.compile = function(code) {
//    var lines = code.split('\n');
//    var elements = [];
//
//    $.each(lines, function(index, line) {
//        var element = Parser.parse(line);
//
//        if (element != null) {
//            elements.push(element.render());
//        }
//
//    });
//
//    return elements;
//};
//
