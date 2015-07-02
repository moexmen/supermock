var Parser = {};

Parser.init = function() {
    Parser.mappers = [ Parser.Mappers.Button ];
};

Parser.parse = function(line) {
    var args = line.trim().split(' ');
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