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
                case 27: // escape
                    Editor.view_mode();
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
    Editor.stage().css('background-image', 'url(/assets/grid.png)');
    PageList.curr_page().edit_mode();
    Console.read_element(Editor.curr_page);
    
    Editor.mode = Editor.modes.EDIT;
};

Editor.view_mode = function() {
    $('.editor_row').hide();
    Editor.stage().css('background-image', 'none'); // empty string not working

    PageList.curr_page().view_mode();
    Selector.unselect_all();

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

    Selector.unselect_all();

    Editor.curr_page = page;
    PageList.set_curr_item(page_id);

    Editor.canvas().children().detach();
    Editor.canvas().append(page.render());

    Console.read_element(page);

    if(Editor.is_edit_mode()) {
        PageList.curr_page().edit_mode();
    }
    else if(Editor.is_view_mode()) {
        PageList.curr_page().view_mode();
    }
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

Editor.stage = function() {
    return $('.stage');
};

Editor.sidebar = function() {
    return $('#sidebar');
};

Editor.view_btn = function() {
    return $('#view_btn');
};