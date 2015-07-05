//= require ./element

Elements.DatePicker = function(properties) {
    this.properties = properties;
    this.html = null;
};

Elements.DatePicker.prototype = Object.create(Elements.Element.prototype);
Elements.DatePicker.prototype.constructor = Elements.DatePicker;

Elements.DatePicker.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(html) { return html; } },
    { type: Elements.Properties.Size, target: function(html) { return html; } },
    { type: Elements.Properties.Text, target: function(html) { return html.find('input'); } }
];

Elements.DatePicker.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_datepicker_template');
        this.html.find('.input-group').datetimepicker({
            defaultDate: moment(),
            format: 'DD MMM YYYY'
        });

        $.each(Elements.DatePicker.PROPERTIES, function(index, property) {
            property.type.apply(property.target(this.html), this.properties);
        }.bind(this));
    }

    return this.html;
};