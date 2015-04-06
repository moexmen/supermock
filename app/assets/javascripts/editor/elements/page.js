var Elements = Elements || {};

Elements.Page = function(name, element_models, subpage_models) {
    this.id = null;
    this.name = name;
    this.elements = [];
    this.subpages = [];

    $.each(subpage_models, function(idx, subpage_json) {
        var subpage = Elements.Element.parse_json(subpage_json);
        this.add_subpage(subpage);
    }.bind(this));
}

Elements.Page.prototype = new Elements.Element();

Elements.Page.prototype.render = function() {
    $('#canvas').append($('<div> page ' + (new Date()) + '</div>'));
}

Elements.Page.prototype.add_element = function(element) {
    this.elements.push(element);
}

Elements.Page.prototype.add_subpage = function(page) {
    this.subpages.push(page);
}