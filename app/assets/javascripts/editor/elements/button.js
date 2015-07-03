//= require ./element

Elements.Button = {};

Elements.Button.properties = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.Text, target: function(html) { return html.children('button'); } },
    { type: Elements.Properties.Click, target: function(html) { return html.children('button'); } }
];

Elements.Button.render = function(properties) {
    var html = Util.clone_template('#element_button_template');

    $.each(Elements.Button.properties, function(index, property) {
        property.type.apply(property.target(html), properties);
    });

    return html;
};