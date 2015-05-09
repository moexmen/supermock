var Editor = {};

Editor.init = function() {
    this.modes = { EDIT: 0, VIEW: 1 }
    this.mode = this.modes.EDIT;

    Editor.load_project();
    Editor.init_buttons();
    Editor.init_element_menus();
    Editor.init_page_list();
    Editor.init_selector();
    Editor.init_type_to_add();
    Editor.handle_key_events();
}

Editor.load_project = function() {
    var project_model = $('#data').data('project');
    this.project = new Elements.Project(project_model);
}

Editor.init_buttons = function() {
    Editor.view_btn().click(Editor.view_mode);
}

Editor.init_page_list = function() {
    PageList.init(this.project);
    PageList.select_first_item();
}

Editor.init_selector = function() {
    Selector.init();
}

Editor.init_element_menus = function() {
    Editor.element_property_menu = new Elements.Property.PropertyMenu();
    Editor.element_page_menu = new Elements.Property.PageMenu(this.project);
}

Editor.init_type_to_add = function() {
    var element_list = [
        { labels: ['Button', 'Btn'], type: Elements.Button },
        { labels: ['Text'], type: null },
        { labels: ['Textfield', 'Input'], type: null },
        { labels: ['Textarea'], type: null },
        { labels: ['Checkbox', 'Chk'], type: null },
        { labels: ['Radiobutton', 'Rdo'], type: null },
        { labels: ['Box'], type: null },
        { labels: ['Table', 'Tbl'], type: null },
        { labels: ['Tabs'], type: null },
    ]

    TypeToAdd.init(element_list);
}

Editor.edit_mode = function() {
    $('#sidebar').show();
    PageList.curr_page().edit_mode();

    Editor.mode = Editor.modes.EDIT;
}

Editor.view_mode = function() {
    Editor.escape_all();

    $('#sidebar').hide();
    PageList.curr_page().view_mode();

    Editor.mode = Editor.modes.VIEW;
}

Editor.is_edit_mode = function() {
    return Editor.mode === Editor.modes.EDIT;
}

Editor.is_view_mode = function() {
    return Editor.mode === Editor.modes.VIEW;
}

Editor.handle_key_events = function() {
    $('body').keyup(function (e) {

        if (Editor.is_edit_mode()) {
            switch (e.which) {
                case 32: // space
                    Editor.escape_all();
                    TypeToAdd.show();
                    break;
                case 27: // escape
                    Editor.escape_all();
                    break;
                case 46: // delete
                    Editor.remove_selected_elements();
                    break;
            }
        }
        else if (Editor.is_view_mode()) {
            switch (e.which) {
                case 27: // escape
                    Editor.edit_mode();
                    break;
            }
        }

    });
}

Editor.mousedown_element = function(element, event) {
    switch(event.which) {
        case 1: // left
            Selector.mousedown_element(element, event);
            return false;
        case 3: // right
            Selector.unselect_all();
            Selector.select(element);
            Selector.mousedown(event);
            return false;
        default:
            return true;
    }
}

Editor.mouseup_element = function(element, event) {
    if(element instanceof Elements.Page)
        Selector.unselect_all();
    else
        Selector.mouseup_element(element, event);
}

Editor.add_element = function(element) {
    PageList.curr_page().add_element(element);
    element.set_position(100, 100);
    Selector.unselect_all();
    Selector.select(element);
}

Editor.remove_selected_elements = function() {
    var selected_elements = Selector.selected_elements;
    Selector.unselect_all();

    $.each(selected_elements, function(idx, element) {
        PageList.curr_page().remove_element(element);
    });
}

Editor.escape_all = function() {
    TypeToAdd.hide();
    Selector.unselect_all();
    Editor.element_property_menu.hide();
}

Editor.render_page_with_id = function(page_id) {
    PageList.set_curr_page_with_id(page_id);
}

Editor.render_curr_page = function() {
    Editor.canvas().children().detach();
    Editor.canvas().append(PageList.curr_page().render());
    Selector.unselect_all();
}

Editor.canvas = function() {
    return $('#canvas');
}

Editor.view_btn = function() {
    return $('#view_btn');
}