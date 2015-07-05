//= require_tree ./mappers

var Parser = Parser || {};

Parser.MAPPERS = [
    Parser.Mappers.Text,
    Parser.Mappers.Textfield,
    Parser.Mappers.Textarea,
    Parser.Mappers.Hyperlink,
    Parser.Mappers.Button,
    Parser.Mappers.Checkbox,
    Parser.Mappers.RadioButton,
    Parser.Mappers.Dropdown,
    Parser.Mappers.Dropdown.Item,
    Parser.Mappers.DatePicker,
    Parser.Mappers.Image,
    Parser.Mappers.NumberList,
    Parser.Mappers.NumberList.Item,
    Parser.Mappers.BulletList,
    Parser.Mappers.BulletList.Item,
    Parser.Mappers.Box,
    Parser.Mappers.Modal,
    Parser.Mappers.Modal.Header,
    Parser.Mappers.Modal.Body,
    Parser.Mappers.Modal.Footer,
    Parser.Mappers.Tabs,
    Parser.Mappers.Tabs.Tab,
    Parser.Mappers.Table,
    Parser.Mappers.Table.Row,
    Parser.Mappers.Table.Column
];

Parser.try_parse = function(code) {
    try {
        return { success: true, elements: Parser.parse(code) };
    }
    catch(e) {
        console.log(e);

        return { success: false, error: e.message };
    }
};

Parser.parse = function(code) {
    var root_element = new Elements.PageContent();
    var element_tree = [ root_element ];
    var lines = code.split('\n');

    $.each(lines, function(index, line) {
        var indent_level = Parser.parse_indent_level(line);
        var parent_element = element_tree[indent_level - 1];

        var element = Parser.parse_line(parent_element, line);

        if (element != null) {
            element_tree[indent_level] = element;

            parent_element.append(element);
        }
    });

    return root_element;
};

Parser.parse_indent_level = function(line) {
    return line.split('\t').length;
};

Parser.parse_line = function(parent_element, line) {
    var args = Parser.split_line(line);
    var element_type = Parser.parse_element_type(args);
    var properties = Parser.parse_properties(args);
    var element = null;

    $.each(Parser.MAPPERS, function(index, mapper) {
        element = mapper.map(parent_element, element_type, properties);

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
    var parsed_properties = [];

    for(var i=0; i<properties.length; i++) {
        if(properties[i].indexOf('=') != -1) {
            var temp = properties[i].split('=');

            parsed_properties.push({
                name: temp[0],
                value: temp[1].replace(/^'/, '').replace(/'$/, '')
            });
        }
        else {
            var temp = properties[i];

            for(++i; i<properties.length; i++) {
                temp += ' ' + properties[i];
            }

            parsed_properties.push({ name: '', value: temp });
        }
    }

    return parsed_properties;
};
