var Editor = {};

Editor.init = function() {
    Editor.load_project();
    Editor.init_buttons();
    Editor.init_page_list();
    Editor.init_type_to_add();
    Editor.handle_key_events();
}

Editor.load_project = function() {
    var project_model = $('#data').data('project');
    this.project = new Elements.Project(project_model);
}

Editor.init_buttons = function() {
}

Editor.init_page_list = function() {
    PageList.init(this.project);
    PageList.select_first_item();
}

Editor.init_type_to_add = function() {
    var element_list = [
        { labels: ['Button', 'Btn'], create_callback: function() { Editor.add_element(Elements.Element.create_default(Elements.Page)) } },
        { labels: ['Text'], create_callback: null },
        { labels: ['Textfield', 'Input'], create_callback: null },
        { labels: ['Textarea'], create_callback: null },
        { labels: ['Checkbox', 'Chk'], create_callback: null },
        { labels: ['Radiobutton', 'Rdo'], create_callback: null },
        { labels: ['Box'], create_callback: null },
        { labels: ['Table', 'Tbl'], create_callback: null },
        { labels: ['Tabs'], create_callback: null },
    ]

    TypeToAdd.init(element_list);
}

Editor.handle_key_events = function() {
    $('body').keyup(function(e) {
        switch(e.which) {
            case 32: // space
                TypeToAdd.show();
                break;
            case 27: // escape
                TypeToAdd.hide();
                break;
        }
    });
}

Editor.add_element = function(element) {
    $('#canvas').append(element.render());
}