var Elements = Elements || {};

Elements.Page = function(id, name, content, child_page_models) {
    this.id = id || Util.uuid();
    this.name = name;
    this.parent_page = null;
    this.child_pages = [];
    this.content = content || '';

    $.each(child_page_models || [], function(idx, child_page_json) {
        var child_page = Elements.Element.parse_json(child_page_json);
        this.add_child_page(child_page);
    }.bind(this));
};

Elements.Page.prototype.has_child_page = function(page) {
    return this.child_pages.indexOf(page) != -1;
};

Elements.Page.prototype.add_child_page = function(page) {
    if(this.has_child_page(page) === false) {
        page.parent_page = this;
        this.child_pages.push(page);
    }
};

Elements.Page.prototype.remove_child_page = function(page) {
    page.parent_page = null;
    this.child_pages.remove(page);
};

Elements.Page.prototype.render = function() {
    var html = Util.clone_template('#element_page_template');

    if(this.parent_page != null) {
        var parent_html = html.children('.element-page-parent:eq(0)');
        parent_html.append(this.parent_page.render());
    }

    var result = Parser.try_parse(this.content);
    if(result.success) {
        html.append(result.elements.render());
    }

    return html;
};