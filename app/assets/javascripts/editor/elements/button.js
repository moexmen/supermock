//= require ./element

Elements.Button = {};

Elements.Button.modifiers = [
    { type: Elements.Modifiers.Text, target: function(html) { return html.children('button'); }  },
    { type: Elements.Modifiers.Position, target: function(html) { return html; } }
];

Elements.Button.render = function(modifiers) {
    var html = Util.clone_template('#element_button_template');

    $.each(Elements.Button.modifiers, function(index, modifier) {
        modifier.type.modify(modifier.target(html), modifiers);
    });

    return html;
};