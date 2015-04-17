var Elements = Elements || {};
Elements.ContextMenu = Elements.ContextMenu || {};

Elements.ContextMenu.Item = function(content, click_callback, hover_in_callback, hover_out_callback) {
    this.content = content;
    this.click_callback = click_callback;
    this.hover_in_callback = hover_in_callback;
    this.hover_out_callback = hover_out_callback;
    this.html = null;
}

Elements.ContextMenu.Item.prototype.render = function() {
    if(this.html === null) {
        this.html = Util.clone_template('#element_context_menu_item_template');
        this.html.children('a').html(this.content);

        if(this.click_callback != null) this.html.children('a').click(this.click_callback);
        if(this.hover_in_callback != null && this.hover_out_callback) this.html.children('a').hover(this.hover_in_callback, this.hover_out_callback);
    }

    return this.html;
}

Elements.ContextMenu.Item.new_on_click_item = function(element) {
    var content = Util.clone_template('#element_context_menu_item_expandable_content_template');
    $(content.children('span')[0]).text('On click');

    var click_callback = function(e) {
        return false;
    }

    var hover_in_callback = function(e) {
        Elements.ContextMenu.GoToPage.show($(this), element);
        return false;
    };

    var hover_out_callback = function(e) {
        Elements.ContextMenu.GoToPage.hide();
        return false;
    };

    return new Elements.ContextMenu.Item(content, click_callback, hover_in_callback, hover_out_callback);
}