//= require ./element

Elements.DatePicker = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
};

Elements.DatePicker.prototype = Object.create(Elements.Element.prototype);
Elements.DatePicker.prototype.constructor = Elements.DatePicker;

Elements.DatePicker.TYPE = 'datepicker';

Elements.DatePicker.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('input'); } }
];

Elements.DatePicker.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.DatePicker.TYPE) {
        return new Elements.DatePicker(properties);
    }
    else {
        return null;
    }
};

Elements.DatePicker.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_datepicker_template');
        this.html.find('.input-group').datetimepicker({
            defaultDate: moment('01 Jul 2014', 'DD MMM YYYY'),
            format: 'DD MMM YYYY',
            showTodayButton: true,
        });

        this.hitarea = this.html.children('.hitarea')
                    .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};