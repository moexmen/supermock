
var Supermock = Supermock || {};
Supermock.projects = {};
Supermock.projects.index = {};

Supermock.projects.init = function() {
}

Supermock.projects.init_index = function() {
    this.index.init_new_project();
    this.index.init_context_menus();
    this.index.init_project_modal();
    this.index.init_delete_modal();
}

Supermock.projects.index.init_new_project = function() {
    $('.project-card:eq(0)').click(function(e) {
        var project = $('.project-card:eq(0) a').data('project');
        this.show_project_modal(project);
    }.bind(this));
}

Supermock.projects.index.init_context_menus = function() {
    $.each($(".project-card a[data-toggle='dropdown']"), function(idx, value) {
        $(value).on('contextmenu', function(e) {
            var project = $(this).data('project');
            $('#project_dropdown_menu').data('project', project)
                .css({ 'left': e.clientX +  + $(window).scrollLeft(), 'top': e.clientY +  + $(window).scrollTop() })
                .dropdown('toggle').show();
            return false;
        }.bind(value));
    });

    // Edit Details
    $('#project_dropdown_menu a:eq(0)').click(function(e) {
        var project = $(e.target).closest('ul').data('project');
        this.close_context_menu();
        this.show_project_modal(project);
    }.bind(this));

    // Delete
    $('#project_dropdown_menu a:eq(1)').click(function(e) {
        var project = $(e.target).closest('ul').data('project');
        this.close_context_menu();
        this.show_delete_modal(project);
    }.bind(this));

    // Close when clicked anywhere else
    $(document).click(function () { this.close_context_menu(); }.bind(this));
}

Supermock.projects.index.close_context_menu = function() {
    $('#project_dropdown_menu').hide();
}

Supermock.projects.index.init_project_modal = function() {
    $('#project_modal').on('shown.bs.modal', function() { $("#project_modal input[type='text']").focus(); });
    $('#project_modal .btn-primary').click(function() { $('#project_modal form').submit(); });
}

Supermock.projects.index.show_project_modal = function(project) {
    if(project.id == null) {
        $('#project_modal form').attr('action', '/projects');
        $("#project_modal form input[name='_method']").val('post');
        $('#project_modal .btn-primary').text('Create');
    }
    else {
        $('#project_modal form').attr('action', '/projects/' + project.id);
        $("#project_modal form input[name='_method']").val('put');
        $('#project_modal .btn-primary').text('Save');
    }

    $('#project_name').val(project.name);
    $("#project_platform_" + project.platform).prop("checked", true);

    $('#project_modal').modal('toggle');
}

Supermock.projects.index.init_delete_modal = function() {
    $('#delete_modal .btn-danger').click(function() { $('#delete_modal form').submit(); });
}

Supermock.projects.index.show_delete_modal = function(project) {
    $('#delete_modal form').attr('action', '/projects/' + project.id);
    $('#delete_modal form p span').text(project.name);
    $('#delete_modal').modal('toggle');
}