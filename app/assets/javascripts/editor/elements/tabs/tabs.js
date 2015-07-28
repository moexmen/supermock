//= require ../element

Elements.Tabs = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.tab_list_html = null;
    this.tab_content_html = null;
    this.selected_tab_id = null;
};

Elements.Tabs.prototype = Object.create(Elements.Element.prototype);
Elements.Tabs.prototype.constructor = Elements.Tabs;

Elements.Tabs.TYPE = 'tabs';

Elements.Tabs.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
];

Elements.Tabs.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Tabs.TYPE) {
        return new Elements.Tabs(properties);
    }
    else {
        return null;
    }
};

// Elements.Tabs.prototype.append = function(element) {
//     if(element.constructor == Elements.Tabs.Tab) {
//         this.render_tab_list().append(element.render_tab());
//         this.render_tab_content().append(element.render());

//         this.tabs.push(element);
//         this.update_selected_tab();
//     }
// };
// 
// Elements.Tabs.prototype.update_selected_tab = function() {
//     // Always select the first
//     this.tabs[0].select();

//     // If there are more than one selected tabs, use the last one
//     var unselect = false;
//     $.each(this.tabs.reverse(), function(index, tab) {
//         if(unselect) {
//             tab.unselect();
//         }

//         if(tab.is_selected() == true) {
//             unselect = true;
//         }
//     });
// };

Elements.Tabs.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_tabs_template');
        this.tab_list_html = this.html.find('ul');
        this.tab_content_html = this.html.find('.tab-content');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
        this.render_child_elements(); //appends the tab, not the content

    }

    return this.html;
};