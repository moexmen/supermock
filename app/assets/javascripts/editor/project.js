Project = function(project_model) {
    this.pages = [];

    $.each($.parseJSON(project_model.pages), function(idx, page_json) {
        var page = Elements.Element.parse_json(page_json);
        this.add_page(page);
    }.bind(this));
};

Project.prototype.has_page = function(page) {
    return this.pages.indexOf(page) != -1;
};

Project.prototype.add_page = function(page) {
    if(this.has_page(page) === false) {
        page.parent_page = null;
        this.pages.push(page);
    }
};

Project.prototype.remove_page = function(page) {
    page.parent_page = null;
    this.pages.remove(page);
};

Project.prototype.find_page = function(page_id) {
    var matched_page = null;

    $.each(this.pages, function(idx, page) {
        matched_page = this.recursive_find_page(page, page_id);

        if(matched_page != null) {
            return false
        }
    }.bind(this));

    return matched_page;
};

Project.prototype.recursive_find_page = function(curr_page, page_id) {
    var matched_page = null;

    if(curr_page.id === page_id) {
        matched_page = curr_page;
    }
    else {
        $.each(curr_page.child_pages, function(idx, child_page) {
            matched_page = this.recursive_find_page(child_page, page_id);

            if(matched_page != null) {
                return false
            }
        }.bind(this));
    }

    return matched_page;
};