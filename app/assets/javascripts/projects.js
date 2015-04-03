
var Supermock = Supermock || {};
Supermock.projects = {};
Supermock.projects.index = {};

Supermock.projects.init = function() {
}

Supermock.projects.init_index = function() {
    $('#project_modal').on('show.bs.modal', this.index.show_project_modal).on('shown.bs.modal', this.index.shown_project_modal);
    $('#project_modal .btn-primary').click(function() { $('#project_modal form').submit(); });
}

Supermock.projects.index.show_project_modal = function(e) {
    $("#project_modal input[type='text']").val('');
}

Supermock.projects.index.shown_project_modal = function(e) {
    $("#project_modal input[type='text']").focus();
}