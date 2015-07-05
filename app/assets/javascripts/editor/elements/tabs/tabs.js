//= require ../element

Elements.Tabs = function(properties) {
    this.properties = properties;
    this.html = null;
    this.tab_list_html = null;
    this.tab_content_html = null;
    this.tabs = [];
};

Elements.Tabs.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } }
];

Elements.Tabs.prototype.append = function(element) {
    if(element.constructor == Elements.Tabs.Tab) {
        this.render_tab_list().append(element.render_tab());
        this.render_tab_content().append(element.render());

        this.tabs.push(element);
        this.update_selected_tab();
    }
};

Elements.Tabs.prototype.update_selected_tab = function() {
    // Always select the first
    this.tabs[0].select();

    // If there are more than one selected tabs, use the last one
    var unselect = false;
    $.each(this.tabs.reverse(), function(index, tab) {
        if(unselect) {
            tab.unselect();
        }

        if(tab.is_selected() == true) {
            unselect = true;
        }
    });
};

Elements.Tabs.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_tabs_template');
        this.tab_list_html = this.html.find('ul');
        this.tab_content_html = this.html.find('.tab-content');

        $.each(Elements.Tabs.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};

Elements.Tabs.prototype.render_tab_list = function() {
    this.render();
    return this.tab_list_html;
};

Elements.Tabs.prototype.render_tab_content = function() {
    this.render();
    return this.tab_content_html;
};
