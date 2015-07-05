//= require ./element

var Elements = Elements || {};

Elements.PageContent = function() {
    this.html = null;
};

Elements.PageContent.PROPERTIES = [
];

Elements.PageContent.prototype.append = function(element) {
    this.render().append(element.render());
};

Elements.PageContent.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_page_content_template');
    }

    return this.html;
};