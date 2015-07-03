//= require_tree ./properties

var Elements = {};
Elements.Element = {};

Elements.Element.parse_json = function(json) {
    var model = $.parseJSON(json);

    switch(model.type) {
        case 'Page':
            return new Elements.Page(model.id, model.name, model.elements, model.parent_page, model.child_pages);
        default:
            return null;
    }
};