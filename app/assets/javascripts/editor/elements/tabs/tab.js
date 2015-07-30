//= require ./tabs

Elements.Tabs.Tab = function(properties, parent_tab) {
    Elements.Element.call(this);

    this.properties = properties;

    this.parent_tab = parent_tab;
    this.tab_html = null;
    this.content_html = null;
};

Elements.Tabs.Tab.prototype = Object.create(Elements.Element.prototype);
Elements.Tabs.Tab.prototype.constructor = Elements.Tabs.Tab;

Elements.Tabs.Tab.TYPE = 'tab';

Elements.Tabs.Tab.PROPERTIES = [
    { type: Elements.Properties.Tabs.Title, target: function(element) { return element.tab_html.find('a'); } },
    { type: Elements.Properties.Tabs.Selected, target: function(element) { return element.tab_html; } },
];

Elements.Tabs.Tab.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Tabs.Tab.TYPE && parent_element.constructor == Elements.Tabs) {
        return new Elements.Tabs.Tab(properties, parent_element);
    }
    else {
        return null;
    }
};

Elements.Tabs.Tab.Content = {};
Elements.Tabs.Tab.Content.PROPERTIES = [
    { type: Elements.Properties.Tabs.Selected, target: function(element) { return element.content_html; } },
];

Elements.Tabs.Tab.prototype.render = function() {
    if(this.tab_html == null) {
        var tab_id = Util.uuid();

        this.tab_html = Util.clone_template('#element_tab_template');
        this.tab_html.find('a').attr('href', '#' + tab_id);

        $.each(Elements.Tabs.Tab.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this), this.properties);
        }.bind(this));

        this.content_html = Util.clone_template('#element_tab_content_template');
        this.content_html.attr('id', tab_id);

        $.each(Elements.Tabs.Tab.Content.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this), this.properties);
        }.bind(this));

        this.render_child_elements(); //appends the child elements, not the content

        this.attach_content(); //appends the content to tab-content kept in parent tabs
    }

    return this.tab_html;
};

Elements.Tabs.Tab.prototype.attach_content = function() {
    this.parent_tab.tab_content_html.append(this.content_html);
};

Elements.Tabs.Tab.prototype.render_child_elements = function() {
    $.each(this.child_elements, function(i, element) {
        this.content_html.append(element.render());
    }.bind(this));
};