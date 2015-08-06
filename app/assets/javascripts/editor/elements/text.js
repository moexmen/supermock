//= require ./element

Elements.Text = function(properties) {
    Elements.Element.call(this);

    this.properties = properties;
    this.text_html = null;
    this.prev_text = '';
};

Elements.Text.prototype = Object.create(Elements.Element.prototype);
Elements.Text.prototype.constructor = Elements.Text;

Elements.Text.TYPE = 'text';

Elements.Text.PROPERTIES = [
    { type: Elements.Properties.Position, target: function(element) { return element.html; } },
    { type: Elements.Properties.Size, target: function(element) { return element.html; } },
    { type: Elements.Properties.Border, target: function(element) { return element.html; } },
    { type: Elements.Properties.FontSize, target: function(element) { return element.html.find('span'); } },
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
        this.text_html.text(this.prev_text);

        this.hitarea = this.html.children('.hitarea')
            .mousedown(function(e) { return Editor.mousedown_element(this, e); }.bind(this))

        this.apply_properties();

        if(this.text_html.text().length == 0) {
            this.generate_text();
        }
    }

    return this.html;
};

Elements.Text.LOREM_IPSUM = ['', 'lorem','ipsum','dolor','sit','amet,','consectetur','adipisicing','elit,','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua.','enim','ad','minim','veniam,','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat.','duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur.','excepteur','sint','occaecat','cupidatat','non','proident,','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum.','sed','ut','perspiciatis,','unde','omnis','iste','natus','error','sit','voluptatem','accusantium','doloremque','laudantium,','totam','rem','aperiam','eaque','ipsa,','quae','ab','illo','inventore','veritatis','et','quasi','architecto','beatae','vitae','dicta','sunt,','explicabo.','nemo','enim','ipsam','voluptatem,','quia','voluptas','sit,','aspernatur','aut','odit','aut','fugit,','sed','quia','consequuntur','magni','dolores','eos,','qui','ratione','voluptatem','sequi','nesciunt,','neque','porro','quisquam','est,','qui','dolorem','ipsum,','quia','dolor','sit,','amet,','consectetur,','adipisci','velit,','sed','quia','non','numquam','eius','modi','tempora','incidunt,','ut','labore','et','dolore','magnam','aliquam','quaerat','voluptatem.','ut','enim','ad','minima','veniam,','quis','nostrum','exercitationem','ullam','corporis','suscipit','laboriosam,','nisi','ut','aliquid','ex','ea','commodi','consequatur?','quis','autem','vel','eum','iure','reprehenderit,','qui','in','ea','voluptate','velit','esse,','quam','nihil','molestiae','consequatur,','vel','illum,','qui','dolorem','eum','fugiat,','quo','voluptas','nulla','pariatur?','at','vero','eos','et','accusamus','et','iusto','odio','dignissimos','ducimus,','qui','blanditiis','praesentium','voluptatum','deleniti','atque','corrupti,','quos','dolores','et','quas','molestias','excepturi','sint,','obcaecati','cupiditate','non','provident,','similique','sunt','in','culpa,','qui','officia','deserunt','mollitia','animi,','id','est','laborum','et','dolorum','fuga.','harum','quidem','rerum','facilis','est','et','expedita','distinctio.','Nam','libero','tempore,','cum','soluta','nobis','est','eligendi','optio,','cumque','nihil','impedit,','quo','minus','id,','quod','maxime','placeat,','facere','possimus,','omnis','voluptas','assumenda','est,','omnis','dolor','repellendus.','temporibus','autem','quibusdam','aut','officiis','debitis','aut','rerum','necessitatibus','saepe','eveniet,','ut','et','voluptates','repudiandae','sint','molestiae','non','recusandae.','itaque','earum','rerum','hic','tenetur','a','sapiente','delectus,','aut','reiciendis','voluptatibus','maiores','alias','consequatur','aut','perferendis','doloribus','asperiores','repellat'].map(function(word) {return word.toLowerCase();});


Elements.Text.random_word = function() {
    var random_number = Math.floor(Math.random() * (Elements.Text.LOREM_IPSUM.length - 1));
    return Elements.Text.LOREM_IPSUM[random_number];
};

Elements.Text.prototype.on_increase_size = function() {
    if(this.text_edited()) {
        return;
    }
    this.remove_last_word();

    while(this.text_html.outerHeight() < this.html.outerHeight()) {
        this.text_html.text(this.text_html.text() + ' ' + Elements.Text.random_word());

        // In case of infinite loop
        if(this.text_html.outerHeight() == 0) {
            break;
        }
    }
    this.remove_last_word();
    this.clean_up_and_capitalize();
};

Elements.Text.prototype.clean_up_and_capitalize = function() {
    var words = this.text_html.text().split(' ');
    var final_text = '';

    if (words.length <= 1) {
        return;
    }
    $.each(words, function(index, word) {
        var last_character = final_text.substring(final_text.length - 1);

        if (last_character == '.' || last_character == '?') {
            if(index == words.length - 1) {
                return false;
            }
            final_text += ' ' + word.charAt(0).toUpperCase() + word.substring(1);
        }
        else {
            if(index == words.length - 1) {
                if (last_character != ',') {
                    final_text += '!'; //ending punctuation 
                }
                else {
                    final_text.split(' ').slice(0, -1).join(' '); // to remove the word with comma
                }
                return false;
            }
            final_text += ' ' + word;
        }
    });

    this.text_html.text(final_text);
};

Elements.Text.prototype.remove_last_word = function() {
    this.text_html.text(this.text_html.text().split(' ').slice(0, -1).join(' '));
};

Elements.Text.prototype.on_decrease_size = function() {
    if(this.text_edited()) {
        return;
    }

    while(this.text_html.outerHeight() > this.html.outerHeight()) {
        this.remove_last_word();
        // In case of infinite loop 
        if(this.text_html.outerHeight() == 0) {
            break;
        }
    }
    this.clean_up_and_capitalize();
};

Elements.Text.prototype.text_edited = function() {
    var edited = false;
    var text = this.text_html.text();
    var text_array = text.split(' ');

    if (text_array.length > 1) {
        text_array.pop(); // to remove the last word which contains punctuation
    }

    $.each(text_array, function(i, word){
        if ($.inArray(word.toLowerCase(), Elements.Text.LOREM_IPSUM) == -1){
            edited = true;
            return false;
        }
    });
    
    return edited;
};

