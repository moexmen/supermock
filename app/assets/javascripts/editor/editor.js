var Editor = {};

Editor.init = function() {
    Editor.load_project();
    Editor.init_mode();
    Editor.init_buttons();
    Editor.init_page_list();
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
    this.project = new Elements.Project(project_model);
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
    $('.horizontal_ruler').show();
    $('.editor_row').show();
    Editor.canvas().css('background-image', 'url("/assets/grid.png")');

    Editor.mode = Editor.modes.EDIT;
};

Editor.view_mode = function() {
    $('.horizontal_ruler').hide();
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
    Console.read_page(page);
    Editor.render_curr_page();
};

Editor.render_curr_page = function() {
    Editor.canvas().empty().append(Editor.curr_page.render());
};

Editor.canvas = function() {
    return $('#canvas');
};

Editor.sidebar = function() {
    return $('#sidebar');
};

Editor.view_btn = function() {
    return $('#view_btn');
};