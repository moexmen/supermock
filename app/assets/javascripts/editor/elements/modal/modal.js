//= require ../element

Elements.Modal = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.resizeable_directions = [Elements.Element.RESIZE_DIRECTIONS.SOUTH];
    this.set_unmovable();
};

Elements.Modal.prototype = Object.create(Elements.Element.prototype);
Elements.Modal.prototype.constructor = Elements.Modal;

Elements.Modal.TYPE = 'modal';

Elements.Modal.PROPERTIES = [
];

Elements.Modal.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Modal.TYPE) {
        return new Elements.Modal(properties);
    }
    else {
        return null;
    }
};

Elements.Modal.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_modal_template');

        this.modal_content = this.html.find('.modal-content');

        this.render_child_elements();
        this.hitarea = this.html.children('.modal-dialog').children('.hitarea:eq(0)');

        this.html.find('.modal-backdrop').click(function(e) {
            Selector.unselect_all();
            Console.read_element(PageList.curr_page());
        });
    }

    return this.html;
};

Elements.Modal.prototype.render_child_elements = function() {
    var elements_html = this.html.find('.child-elements').empty();

    $.each(this.child_elements, function(i, element) {
        elements_html.append(element.render());
    });
};

Elements.Modal.prototype.get_position_relative_to_canvas = function() {
    var position = this.modal_content.offset();
    position.left -= Editor.canvas().offset().left;
    return position;
};

Elements.Modal.prototype.get_size = function() {
    return { width: this.modal_content.outerWidth(), height: this.modal_content.outerHeight() };
};

Elements.Modal.prototype.set_width_height = function(width, height) {
    // and the default height of header and footer
    var body_element = null;
    $.each(this.child_elements, function(i, child_element){
        if(child_element.constructor.TYPE == 'body') {
            body_element = child_element;
        }
    });

    if(body_element == null) {
        return;
    }
    var header_height = this.render().find('.modal-header:eq(0)').outerHeight();
    var footer_height = this.render().find('.modal-footer:eq(0)').outerHeight();
    var body_height = height - (header_height + footer_height);

    // height must take into account the elements nested under the body
    var body_minimum = 30;
    var elements_limit = body_element.child_elements_max_offset();

    if(body_height < Math.max(body_minimum, elements_limit)) {
        return;
    }

    body_element.set_width_height(width, body_height);
};