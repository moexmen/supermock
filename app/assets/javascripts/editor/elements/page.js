var Elements = Elements || {};

Elements.Page = function(name, element_models, parent_model, child_page_models) {
    this.id = null;
    this.name = name;
    this.elements = [];
    this.parent_page = null;
    this.child_pages = [];

    $.each(child_page_models, function(idx, child_page_json) {
        var child_page = Elements.Element.parse_json(child_page_json);
        this.add_child_page(child_page);
    }.bind(this));
}

Elements.Page.prototype = new Elements.Element();

Elements.Page.prototype.render = function() {
    $('#canvas').append($('<div> ' + this.name + '</div>'));
}

Elements.Page.prototype.is_top_level_page = function() {
    return this.parent_page === null;
}

Elements.Page.prototype.add_element = function(element) {
    this.elements.push(element);
}

Elements.Page.prototype.add_child_page = function(page) {
    page.parent_page = this;
    this.child_pages.push(page);
}

Elements.Page.prototype.remove_child_page = function(page) {
    page.parent_page = null;
    this.child_pages.remove(page);
}