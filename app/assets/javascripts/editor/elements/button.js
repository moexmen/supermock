var Elements = Elements || {};

Elements.Button = function(text) {
    this.html = null;
    this.text = text;

    Elements.Button.prototype = new Elements.Element();
}

Elements.Button.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_button_template').text(this.text);
    }

    return this.html;
}