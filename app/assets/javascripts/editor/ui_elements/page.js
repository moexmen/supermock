var UiElements = UiElements || {};

UiElements.Page = function(name) {
    this.id = null;
    this.name = name;
}

UiElements.Page.prototype.render = function() {
    $('#canvas').append($('<div> page ' + (new Date()) + '</div>'));
}