//= require ./page

var Elements = Elements || {};

Elements.ModalPage = function() {
	Elements.Page.call(this, Util.uuid(), 'Modal', [], null, []);
	this.elements.push(Elements.Element.create_default(Elements.Modal));
}

Elements.ModalPage.prototype = Object.create(Elements.Page.prototype);
Elements.ModalPage.prototype.constructor = Elements.ModalPage;

Elements.ModalPage.prototype.render = function() {
	if(this.html === null) {
		this.html = Util.clone_template('#element_page_template');

		this.hitarea = this.html.children('.element-page-hitarea:eq(0)')
			.mouseup(function(e) { return Editor.mouseup_element(this, e); }.bind(this))

		this.parent_html = this.html.children('.element-page-parent:eq(0)');

		$.each(this.elements, function(idx, element) {
			this.html.append(element.render());
		}.bind(this));
	}

	if(this.parent_page != null) {
        this.elements[0].render().find('#closebutton:eq(0)').click(function() {
            Editor.set_curr_page_with_id(this.parent_page.id);
        }.bind(this));
        
        this.elements[0].btn_2.find_property(Elements.Property.ClickPage).value = this.parent_page.id;
		
		this.parent_html.append(this.parent_page.render());
	}

	return this.html;
}
