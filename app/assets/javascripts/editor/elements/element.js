//= require_tree ./properties

var Elements = Elements || {};
Elements.Element = function() {
};

Elements.Element.prototype.get_size = function() {
    var original_parent = this.render().parent();

    this.render().detach();
    $('#invisible_dom').append(this.render());

    var size = { width: this.render().outerWidth(), height: this.render().outerHeight() };

    this.render().detach();
    original_parent.append(this.render());

    return size;
};

Elements.Element.prototype.set_size = function(width, height) {
    this.render().outerWidth(width).outerHeight(height);
};

Elements.Element.prototype.get_position = function() {
    var original_parent = this.render().parent();

    this.render().detach();
    $('#invisible_dom').append(this.render());

    var position = this.render().position();

    this.render().detach();
    original_parent.append(this.render());

    return position;
};

Elements.Element.prototype.fit_element = function(element) {
    var parent_size = this.get_size();
    var child_size = element.get_size();
    var child_position = element.get_position();

    this.set_size(
        Math.max(parent_size.width, child_size.width + child_position.left),
        Math.max(parent_size.height, child_size.height + child_position.top));
};

Elements.Element.parse_json = function(json) {
    var model = $.parseJSON(json);

    switch(model.type) {
        case 'Page':
            return new Elements.Page(model.id, model.name, model.content, model.child_pages);
        default:
            return null;
    }
};