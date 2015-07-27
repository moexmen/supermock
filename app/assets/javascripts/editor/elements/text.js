//= require ./element

Elements.Text = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.text_html = null;
};

Elements.Text.prototype = Object.create(Elements.Element.prototype);
Elements.Text.prototype.constructor = Elements.Text;

Elements.Text.TYPE = 'text';

Elements.Text.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Border, target: function(element) { return element.html; } },
    { type: Elements.Properties.Text, target: function(element) { return element.html.find('span'); } },
];

Elements.Text.prototype.generate_text = function() {
    // Hack to calculate height before it is being rendered
    $('body').append(this.html);

    this.on_increase_size();

    this.html.detach();
};

Elements.Text.map_from_code = function(parent_element, element_type, properties) {
    if(element_type == Elements.Text.TYPE) {
        return new Elements.Text(properties);
    }
    else {
        return null;
    }
};

Elements.Text.prototype.render = function() {
    if(this.html == null) {
        this.html = Util.clone_template('#element_text_template');
        this.text_html = this.html.find('span');

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))

        this.apply_properties();

        if(this.text_html.text().length == 0) {
            this.generate_text();
        }
    }

    return this.html;
};

Elements.Text.LOREM_IPSUM = ['', 'lorem','ipsum','dolor','sit','amet,','consectetur','adipisicing','elit,','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua.','enim','ad','minim','veniam,','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat.','duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur.','excepteur','sint','occaecat','cupidatat','non','proident,','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum.','sed','ut','perspiciatis,','unde','omnis','iste','natus','error','sit','voluptatem','accusantium','doloremque','laudantium,','totam','rem','aperiam','eaque','ipsa,','quae','ab','illo','inventore','veritatis','et','quasi','architecto','beatae','vitae','dicta','sunt,','explicabo.','nemo','enim','ipsam','voluptatem,','quia','voluptas','sit,','aspernatur','aut','odit','aut','fugit,','sed','quia','consequuntur','magni','dolores','eos,','qui','ratione','voluptatem','sequi','nesciunt,','neque','porro','quisquam','est,','qui','dolorem','ipsum,','quia','dolor','sit,','amet,','consectetur,','adipisci','velit,','sed','quia','non','numquam','eius','modi','tempora','incidunt,','ut','labore','et','dolore','magnam','aliquam','quaerat','voluptatem.','ut','enim','ad','minima','veniam,','quis','nostrum','exercitationem','ullam','corporis','suscipit','laboriosam,','nisi','ut','aliquid','ex','ea','commodi','consequatur?','quis','autem','vel','eum','iure','reprehenderit,','qui','in','ea','voluptate','velit','esse,','quam','nihil','molestiae','consequatur,','vel','illum,','qui','dolorem','eum','fugiat,','quo','voluptas','nulla','pariatur?','at','vero','eos','et','accusamus','et','iusto','odio','dignissimos','ducimus,','qui','blanditiis','praesentium','voluptatum','deleniti','atque','corrupti,','quos','dolores','et','quas','molestias','excepturi','sint,','obcaecati','cupiditate','non','provident,','similique','sunt','in','culpa,','qui','officia','deserunt','mollitia','animi,','id','est','laborum','et','dolorum','fuga.','harum','quidem','rerum','facilis','est','et','expedita','distinctio.','Nam','libero','tempore,','cum','soluta','nobis','est','eligendi','optio,','cumque','nihil','impedit,','quo','minus','id,','quod','maxime','placeat,','facere','possimus,','omnis','voluptas','assumenda','est,','omnis','dolor','repellendus.','temporibus','autem','quibusdam','aut','officiis','debitis','aut','rerum','necessitatibus','saepe','eveniet,','ut','et','voluptates','repudiandae','sint','molestiae','non','recusandae.','itaque','earum','rerum','hic','tenetur','a','sapiente','delectus,','aut','reiciendis','voluptatibus','maiores','alias','consequatur','aut','perferendis','doloribus','asperiores','repellat'];


Elements.Text.random_word = function() {
    var random_number = Math.floor(Math.random() * (Elements.Text.LOREM_IPSUM.length - 1));
    return Elements.Text.LOREM_IPSUM[random_number];
};

Elements.Text.prototype.on_increase_size = function() {
    if(this.check_edited_text()) {
        return;
    }

    while(this.text_html.outerHeight() < this.html.outerHeight()) {
        this.text_html.text(this.text_html.text() + ' ' + Elements.Text.random_word());

        // In case of infinite loop
        if(this.text_html.outerHeight() == 0) {
            break;
        }
    }

    // Remove last word to prevent clipping
    this.text_html.text(this.text_html.text().split(' ').slice(0, -1).join(' '));
};

Elements.Text.prototype.on_decrease_size = function() {
    if(this.check_edited_text()) {
        return;
    }
    while(this.text_html.outerHeight() > this.html.outerHeight()) {
        this.text_html.text(this.text_html.text().split(' ').slice(0, -1).join(' '));
        
        // In case of infinite loop 
        if(this.text_html.outerHeight() == 0) {
            break;
        }
    }
};

Elements.Text.prototype.check_edited_text = function() {
    target_text = this.text_html.text();
    var first_word = target_text.substr(0, target_text.indexOf(" "));
    
    return $.inArray(first_word, Elements.Text.LOREM_IPSUM) == -1;
};

