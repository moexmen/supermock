var Elements = Elements || {};

Elements.Element = function() {
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

