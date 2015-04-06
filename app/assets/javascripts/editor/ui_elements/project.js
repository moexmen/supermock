var UiElements = UiElements || {};

UiElements.Project = function() {
    this.pages = [];
}

UiElements.Project.prototype.add_page = function(page) {
    this.pages.push(page);
}

UiElements.Project.prototype.remove_page = function(page) {
    this.pages.remove(page);
}