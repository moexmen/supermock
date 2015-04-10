var Elements = Elements || {};

Elements.Page = function(name, element_models, parent_model, child_page_models) {
    this.html = null;
    this.name = name;
    this.elements = [];
    this.parent_page = null;
    this.child_pages = [];

    $.each(child_page_models, function(idx, child_page_json) {
        var child_page = Elements.Element.parse_json(child_page_json);
        this.add_child_page(child_page);
    }.bind(this));
}

Elements.Page.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_page_template');
    }

    $.each(this.elements, function(idx, element) {
        this.html.append(element.render());
    }.bind(this));

    return this.html;
}

Elements.Page.prototype.add_element = function(element) {
    this.elements.push(element);
}

Elements.Page.prototype.has_child_page = function(page) {
    return this.child_pages.indexOf(page) != -1;
}

Elements.Page.prototype.add_child_page = function(page) {
    if(this.has_child_page(page) === false) {
        page.parent_page = this;
        this.child_pages.push(page);
    }
}

Elements.Page.prototype.remove_child_page = function(page) {
    page.parent_page = null;
    this.child_pages.remove(page);
}