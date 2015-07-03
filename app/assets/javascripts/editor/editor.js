var Editor = {};

Editor.init = function() {
    Editor.load_project();
    Editor.init_mode();
    Editor.init_buttons();
    Editor.init_page_list();
    Editor.init_console();
    Compiler.init();

    PageList.select_first_item();
};

Editor.load_project = function() {
    var project_model = $('#editor').data('project');
    this.project = new Elements.Project(project_model);
};

Editor.init_mode = function() {
    this.modes = { EDIT: 0, VIEW: 1 }
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
    Editor.sidebar().show();
    PageList.curr_page().edit_mode();

    Editor.mode = Editor.modes.EDIT;
};

Editor.view_mode = function() {
    Editor.escape_all();

    Editor.sidebar().hide();
    PageList.curr_page().view_mode();

    Editor.mode = Editor.modes.VIEW;
};

Editor.is_edit_mode = function() {
    return Editor.mode === Editor.modes.EDIT;
};

Editor.is_view_mode = function() {
    return Editor.mode === Editor.modes.VIEW;
};

Editor.set_curr_page_with_id = function(page_id) {
    PageList.set_curr_page_with_id(page_id);
};

Editor.open_page = function(page) {
    Console.open_page(page);
    Editor.render_page(page);
};

Editor.render_page = function(page) {
    Editor.canvas().empty().append(page.render());
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