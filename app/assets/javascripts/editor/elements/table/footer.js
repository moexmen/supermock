//= require ./table

Elements.Table.Footer = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.Table.Footer.prototype = Object.create(Elements.Element.prototype);
Elements.Table.Footer.prototype.constructor = Elements.Table.Footer;

Elements.Table.Footer.TYPE = 'footer';

Elements.Table.Footer.PROPERTIES = [
];

Elements.Table.Footer.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Table.Footer.TYPE && parent_element.constructor == Elements.Table) {
        return new Elements.Table.Footer(properties);
    }
    else {
        return null;
    }
};

Elements.Table.Footer.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_table_footer_template');
        
        this.render_child_elements();
        this.html = this.html.find('tfoot');

        this.apply_properties();
        this.render_child_elements();

    }

    return this.html;
};


Elements.Table.Footer.prototype.render_child_elements = function() {
    var elements_html = this.html.children('tfoot').empty();

    $.each(this.child_elements, function(i, element) {
        elements_html.append(element.render());
    });
};
