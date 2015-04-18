var Elements = Elements || {};
Elements.ContextMenu = Elements.ContextMenu || {};

Elements.ContextMenu.Item = function(content, click_callback, sub_menu_callback) {
    this.content = content;
    this.page_callback = click_callback;
    this.sub_menu_callback = sub_menu_callback;
    this.html = null;
}

Elements.ContextMenu.Item.prototype.render = function() {
    if(!this.html) {
        this.html = Util.clone_template('#element_context_menu_item_template');
        this.hitarea = this.html.children('a');
        $(this.hitarea.children('span')[0]).html(this.content);

        this.hitarea.click(this.page_callback || function() { return false; });

        if(this.sub_menu_callback) {
            $(this.hitarea.children('span')[1]).removeClass('hidden');
            this.hitarea.mouseenter(function() { this.sub_menu_callback(this.render()); return false; }.bind(this));
        }
    }

    return this.html;
}