var Elements = Elements || {};

Elements.Element = function() {
}

Elements.Element.create_default = function(element_type) {
    switch(element_type) {
        case Elements.Page:
            return new Elements.Page('', [], null, []);
        case Elements.Button:
            return new Elements.Button('Button');
        default:
            return null;
    }
}

Elements.Element.parse_json = function(json) {
    var model = $.parseJSON(json);

    switch(model.type) {
        case 'Page':
            return new Elements.Page(model.name, model.elements, model.parent_page, model.child_pages);
        default:
            return null;
    }
}

Elements.Element.prototype.render = function() {
}

