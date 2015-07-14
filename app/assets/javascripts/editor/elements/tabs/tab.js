//= require ./tabs

Elements.Tabs.Tab = function(properties) {
    this.properties = properties;
    this.tab_html = null;
    this.content_html = null;
};

Elements.Tabs.Tab.prototype = Object.create(Elements.Element.prototype);
Elements.Tabs.Tab.prototype.constructor = Elements.Tabs.Tab;

Elements.Tabs.Tab.PROPERTIES = [
    { type: Elements.Properties.Tabs.Selected, target: function(html) { return html; } },
    { type: Elements.Properties.Tabs.Title, target: function(html) { return html.find('a'); } }
];

Elements.Tabs.Tab.Content = {};
Elements.Tabs.Tab.Content.PROPERTIES = [
    { type: Elements.Properties.Tabs.Selected, target: function(html) { return html; } }
];

Elements.Tabs.Tab.prototype.append = function(element) {
    this.render().append(element.render());
    this.fit_element(element);
};

Elements.Tabs.Tab.prototype.select = function() {
    this.tab_html.addClass('active');
    this.content_html.addClass('active');
};

Elements.Tabs.Tab.prototype.unselect = function() {
    this.tab_html.removeClass('active');
    this.content_html.removeClass('active');
};

Elements.Tabs.Tab.prototype.is_selected = function() {
    return this.tab_html.hasClass('active');
};

Elements.Tabs.Tab.prototype.render = function() {
    if(this.tab_html == null) {
        var tab_id = Util.uuid();

        this.tab_html = Util.clone_template('#element_tab_template');
        this.tab_html.find('a').attr('href', '#' + tab_id);

        this.content_html = Util.clone_template('#element_tab_content_template');
        this.content_html.attr('id', tab_id);

        $.each(Elements.Tabs.Tab.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.tab_html), this.properties);
        }.bind(this));

        $.each(Elements.Tabs.Tab.Content.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.content_html), this.properties);
        }.bind(this));
    }

    return this.content_html;
};

Elements.Tabs.Tab.prototype.render_tab = function() {
    this.render();
    return this.tab_html;
};