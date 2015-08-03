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
    Editor.prev_save = $('#editor').data('project');
    this.project = new Project(Editor.prev_save);

    Editor.auto_save_timer = setInterval(Editor.save, 10000);

    $(window).bind('beforeunload', function() {
        return "Save your work!";
    });
};

Editor.init_mode = function() {
    this.modes = { EDIT: 0, VIEW: 1 };
    this.mode = this.modes.EDIT;
};

Editor.init_buttons = function() {
    Editor.view_btn().click(Editor.view_mode);
    Editor.save_btn().click(Editor.save);
    Editor.exit_btn().click(Editor.exit);
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

Editor.exit = function() {
    location.href = '/projects';
};

Editor.view_mode = function() {
    $('.editor_row').hide();
    Editor.stage().css('background-image', 'none'); // empty string doesn't work

    PageList.curr_page().view_mode();
    Selector.unselect_all();

    Editor.mode = Editor.modes.VIEW;
};

Editor.save = function() {
    var project_data = Editor.save_pages();

    if(project_data != Editor.prev_save){
        var project_url = location.href.split('/').reverse()[0]; //to obtain the page id

        $.ajax({
            method: "PUT",
            url: project_url,
            data: {'project[pages]': project_data },
            success: Console.render_status().text("Data saved successfully").css('color', 'green'),
        });

        Editor.prev_save = project_data;
    }

};

Editor.save_pages = function() {
    var pages = [];

    $.each(Editor.project.pages, function(idx, page) {
        pages.push(page.to_json());
    }.bind(this));

    return JSON.stringify(pages); //conversion to JSON for saving
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

Editor.snap_to_grid = function() {
    Selector.unselect_all();

    var position_delta = 20;
    var size_delta = 5;

    $.each(PageList.curr_page().child_elements, function(idx, element){
        var position = element.get_position();
        var size = element.get_size();

        var left = Math.round(position.left/position_delta) * position_delta;
        var top = Math.round(position.top/position_delta) * position_delta;
        var width = Math.round(size.width/size_delta) * size_delta;
        var height = Math.round(size.height/size_delta) * size_delta;
        
        element.set_position(left, top);
        element.set_size(width, height);
    });
};

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

Editor.save_btn = function() {
    return $('#save_btn');
};

Editor.exit_btn = function() {
    return $('#exit_btn');
};