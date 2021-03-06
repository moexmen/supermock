var Elements = Elements || {};

Elements.Page = function(id, name, element_models, parent_model, child_page_models) {
    this.html = null;
    this.id = id;
    this.name = name;
    this.elements = [];
    this.parent_page = null;
    this.child_pages = [];

    $.each(child_page_models, function(idx, child_page_json) {
        var child_page = Elements.Element.parse_json(child_page_json);
        this.add_child_page(child_page);
    }.bind(this));
}

Elements.Page.prototype.destroy = function() {
    // NOTE: parent_page must be before render()
    this.parent_page = null;
    this.unrender();
    this.html = null;

    $.each(this.elements, function(idx, element) { element.destroy(); });
    this.elements = null;

    $.each(this.child_pages, function(idx, page) { page.destroy(); });
    this.child_pages = null;
}

Elements.Page.prototype.add_element = function(element) {
    this.elements.push(element);
    this.render().append(element.render());
}

Elements.Page.prototype.remove_element = function(element) {
    this.elements.remove(element);
    element.destroy();
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

Elements.Page.prototype.edit_mode = function() {
    $.each(this.elements, function(idx, element) {
        element.edit_mode();
    });

    if(this.parent_page != null) {
        this.parent_page.edit_mode();
    }

    this.hitarea.show();
}

Elements.Page.prototype.view_mode = function() {
    $.each(this.elements, function(idx, element) {
        element.view_mode();
    });

    if(this.parent_page != null) {
        this.parent_page.view_mode();
    }

    this.hitarea.hide();
}

Elements.Page.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_page_template');

        this.hitarea = this.html.children('.element-page-hitarea:eq(0)')
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this))

        this.parent_html = this.html.children('.element-page-parent:eq(0)');

        $.each(this.elements, function(idx, element) {
            this.html.append(element.render());
        }.bind(this));
    }

    if(this.parent_page != null) {
        this.parent_html.append(this.parent_page.render());
    }

    return this.html;
}

Elements.Page.prototype.unrender = function() {
    if(this.html != null) {
        this.render().remove();
    }
}

Elements.Page.prototype.render_hitarea = function() {
    return this.hitarea;
}