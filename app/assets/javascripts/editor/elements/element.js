var Elements = Elements || {};

Elements.Element = function() {
}

Elements.Element.create_default = function(element_type) {
    switch(element_type) {
        case Elements.Page:
            return new Elements.Page('', [], null, []);
        default:
            return null;
    }
}

Elements.Element.parse_json = function(json) {
    var model = $.parseJSON(json);

    switch(model.type) {
        case 'Page':
            return new Elements.Page(model.name, model.elements, null, model.child_pages);
        default:
            return null;
    }
}

Elements.Element.prototype.render = function() {
}

