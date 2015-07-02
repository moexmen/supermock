var Parser = {};

Parser.init = function() {
    Parser.mappers = [ Parser.Mappers.Button ];
};

Parser.parse = function(line) {
    var args = Parser.split_line(line);
    var element_type = Parser.parse_element_type(args);
    var modifiers = Parser.parse_modifiers(args);
    var element = null;

    $.each(Parser.mappers, function(index, mapper) {
        element = mapper.map(element_type, modifiers);

        if(element != null) {
            return false;
        }
    });

    return element;
};

Parser.split_line = function(line) {
    line = line.trim();

    if(line.length == 0) {
        return [];
    }


    var temp = line.split(' ');
    var args = [];

    for(var i=0; i<temp.length; i++) {
        var arg = temp[i];

        // Starting quote
        if(arg.indexOf("'") != -1) {
            for(i++; i<temp.length; i++) {
                arg = arg + ' ' + temp[i];

                // Ending quote
                if(temp[i].slice(-1) == "'") {
                    break;
                }
            }
        }

        args.push(arg);
    }

    return args;
};

Parser.parse_element_type = function(args) {
    return args[0];
};

Parser.parse_modifiers = function(args) {
    var modifiers = args.slice(1);

    $.each(modifiers, function(index, modifier) {
        Parser.validate_modifier(modifier);

        var temp = modifier.split('=');

        modifier = {};
        modifier.name = temp[0];
        modifier.value = temp[1].replace(/'/g, '');

        modifiers[index] = modifier;
    });

    return modifiers;
};

Parser.validate_modifier = function(modifier) {
    if(modifier.indexOf('=') == -1) {
        throw new Error('Modifier missing equal sign!');
    }


    var temp = modifier.split('=');

    if(temp.length != 2) {
        throw new Error('Modifier must be in key-pair value!');
    }

    if(temp[0].length == 0) {
        throw new Error('Modifier name missing!');
    }

    if(temp[1].length == 0) {
        throw new Error('Modifier value missing!');
    }
};