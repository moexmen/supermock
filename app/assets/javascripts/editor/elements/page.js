//= require ./element

Elements.Page = function(id, name) {
    Elements.Element.call(this);

    this.id = id || Util.uuid();
    this.name = name;

    this.parent_page = null;
    this.child_pages = [];
};

Elements.Page.prototype = Object.create(Elements.Element.prototype);
Elements.Page.prototype.constructor = Elements.Page;

Elements.Page.TYPE = 'page';

Elements.Page.PROPERTIES = [
];

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

Elements.Page.prototype.edit_mode = function() {
    $.each(this.child_elements, function(idx, element) {
        element.edit_mode();
    });

    if(this.parent_page != null) {
        this.parent_page.edit_mode(); //why should the parent page be in edit mode?
    }

    this.hitarea.show();
};

Elements.Page.prototype.view_mode = function() {
    $.each(this.child_elements, function(idx, element) {
        element.view_mode();
    });

    if(this.parent_page != null) {
        this.parent_page.view_mode();
    }

    this.hitarea.hide();
};

Elements.Page.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_page_template');

        this.hitarea = this.html.children('.hitarea')
            .mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this));

        if(this.parent_page != null) {
            this.html.children('.page-parent').append(this.parent_page.render());
        }

        this.apply_properties();
        this.render_child_elements();
    }

    return this.html;
};
