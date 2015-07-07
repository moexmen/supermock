var Editor = {};

Editor.init = function() {
    Editor.load_project();
    Editor.init_mode();
    Editor.init_buttons();
    Editor.init_page_list();
    Selector.init();
    Editor.init_console();

    PageList.select_first_item();

    $('body').keyup(function(e) {
        if (Editor.is_edit_mode()) {
            switch (e.which) {
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
};

Editor.load_project = function() {
    var project_model = $('#editor').data('project');
    this.project = new Project(project_model);
};

Editor.init_mode = function() {
    this.modes = { EDIT: 0, VIEW: 1 };
    this.mode = this.modes.EDIT;
};

Editor.init_buttons = function() {
    Editor.view_btn().click(Editor.view_mode);
};

Editor.init_page_list = function() {
    PageList.init(this.project);
};

Editor.init_console = function() {
    Console.init();
};

Editor.edit_mode = function() {
    $('.editor_row').show();
    Editor.canvas().css('background-image', 'url("/assets/grid.png")');

    Editor.mode = Editor.modes.EDIT;
};

Editor.view_mode = function() {
    $('.editor_row').hide();
    Editor.canvas().css('background-image', '');

    Editor.mode = Editor.modes.VIEW;
};

Editor.is_edit_mode = function() {
    return Editor.mode === Editor.modes.EDIT;
};

Editor.is_view_mode = function() {
    return Editor.mode === Editor.modes.VIEW;
};

Editor.set_curr_page = function(page_id) {
    var page = Editor.project.find_page(page_id);
    if(page == null) {
        return;
    }

    Editor.curr_page = page;
    Editor.canvas().empty().append(page.render());
    Console.read_element(page);
};

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
    if(element instanceof Elements.Page) {
        Selector.unselect_all();
        Console.read_element(Editor.curr_page);
    }

    return false;
}

Editor.canvas = function() {
    return $('#canvas');
};

Editor.sidebar = function() {
    return $('#sidebar');
};

Editor.view_btn = function() {
    return $('#view_btn');
};