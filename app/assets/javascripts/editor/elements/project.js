var Elements = Elements || {};

Elements.Project = function(project_model) {
    this.pages = [];

    $.each($.parseJSON(project_model.pages), function(idx, page_json) {
        var page = Elements.Element.parse_json(page_json);
        this.add_page(page);
    }.bind(this));
}

Elements.Project.prototype.add_page = function(page) {
    page.parent_page = null;
    this.pages.push(page);
}

Elements.Project.prototype.remove_page = function(page) {
    page.parent_page = null;
    this.pages.remove(page);
}