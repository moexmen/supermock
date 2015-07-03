var Parser = {};

Parser.init = function() {
    Parser.mappers = [ Parser.Mappers.Button ];
};

Parser.parse = function(line) {
    var args = Parser.split_line(line);
    var element_type = Parser.parse_element_type(args);
    var properties = Parser.parse_properties(args);
    var element = null;

    $.each(Parser.mappers, function(index, mapper) {
        element = mapper.map(element_type, properties);

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
        if(arg.split("'").length == 2) {
            for(i++; i<temp.length; i++) {
                arg = arg + ' ' + temp[i];

                // Ending quote
                if(temp[i].indexOf("'") != -1) {
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

Parser.parse_properties = function(args) {
    var properties = args.slice(1);

    $.each(properties, function(index, property) {
        Parser.validate_property(property);

        var temp = property.split('=');

        property = {};
        property.name = temp[0];
        property.value = temp[1].replace(/^'/, '').replace(/'$/, '');

        properties[index] = property;
    });

    return properties;
};

Parser.validate_property = function(property) {
    if(property.indexOf('=') == -1) {
        throw new Error('Modifier missing equal sign!');
    }


    var temp = property.split('=');

    if(temp.length != 2) {
        throw new Error('Property must be in key-pair value!');
    }

    if(temp[0].length == 0) {
        throw new Error('Property name missing!');
    }

    if(temp[1].length == 0) {
        throw new Error('Property value missing!');
    }
};