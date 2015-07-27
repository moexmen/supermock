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

        this.apply_properties();
        this.render_child_elements();
    }

    if(this.parent_page != null) {
        this.html.children('.parent-page').children().detach();
        this.html.children('.parent-page').append(this.parent_page.render());
    }

    return this.html;
};

Elements.Page.prototype.to_json = function() {
    var page_json = {   child_elements: [],
                        child_pages: [],
                        parent_page: null, //to prevent circular reference
                        type: Elements.Page.TYPE,
                        id: this.id,
                        name: this.name,
                        properties: [],
                    };

    $.each(this.child_elements, function(idx, element){
        page_json.child_elements.push(element.to_json());
    });

    $.each(this.child_pages, function(idx, child_page) {
        page_json.child_pages.push(child_page.to_json());
    });

    return JSON.stringify(page_json);
};

Elements.Page.convert_from_json = function(json, parent_page) {
    var model = $.parseJSON(json);
    if(model.type.toLowerCase() != Elements.Page.TYPE.toLowerCase()) {
        return null;
    }

    var curr_page = new Elements.Page(model.id, model.name);


    $.each(model.child_elements, function(idx, element_json){
        curr_page.child_elements.push(Elements.Element.parse_json(element_json));
    });

    $.each(model.child_pages, function(idx, page_json) {
        curr_page.child_pages.push(Elements.Page.convert_from_json(page_json, curr_page));
    });

    // $.each(model.properties, function(idx, property_json) {
    //     curr_page.properties.push(Elements.Properties.parse_json(property_json));
    // });
    curr_page.parent_page = parent_page;

    return curr_page;
};