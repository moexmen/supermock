var Elements = Elements || {};

Elements.Page = function(id, name) {
    this.id = id || Util.uuid();
    this.name = name;
    this.parent_page = null;
    this.child_pages = [];
    this.content = 'button text=haha';
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
        html.append(result.elements);
    }

    return html;
};