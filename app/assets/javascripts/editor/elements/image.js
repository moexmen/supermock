//= require ./element

Elements.Image = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.width_to_height_ratio = null;
};

Elements.Image.prototype = Object.create(Elements.Element.prototype);
Elements.Image.prototype.constructor = Elements.Image;

Elements.Image.TYPE = 'image';

Elements.Image.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.ImageUrl, target: function(element) { return element.html.find('img'); } }
];

Elements.Image.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Image.TYPE) {
        return new Elements.Image(properties);
    }
    else {
        return null;
    }
};

Elements.Image.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_image_template');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this));

        this.apply_properties();
    }

    return this.html;
};

Elements.Image.prototype.on_increase_size = function() {
    this.on_resize();
};

Elements.Image.prototype.on_decrease_size = function() {
    this.on_resize();
};

Elements.Image.prototype.on_resize = function() {
    if(this.width_to_height_ratio == null) {
        this.width_to_height_ratio = parseInt(this.get_size().width) / parseInt(this.get_size().height);
    }
    else {
        var curr_dimensions = this.get_size();
        var curr_height = parseInt(curr_dimensions.height);
        var curr_width = parseInt(curr_dimensions.width);

        var height_based_on_width = Math.round(curr_width / this.width_to_height_ratio);
        if (curr_height > height_based_on_width) {
            this.set_size_without_resize(curr_width, height_based_on_width);
        }
        else {
            var width_based_on_height = curr_height * this.width_to_height_ratio;
            this.set_size_without_resize(width_based_on_height, curr_height);
        }
        console.log(this.width_to_height_ratio);
    }
};

