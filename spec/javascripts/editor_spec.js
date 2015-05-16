jasmine.getFixtures().fixturesPath="../../spec/javascripts/fixtures"
//jasmine.getStyleFixtures().fixturesPath = '../../spec/javascripts/fixtures';

describe('projects/show.js', function() {
    'use strict';

    beforeEach(function() {
        loadFixtures('generated/projects/show.html');
        // NOTE: Loading style fixtures doesnt seem to have any effect on CSS
        //loadStyleFixtures('generated/css/editor.css');
        css_fix();
    });

    describe('page list', page_list_spec);
    describe('selector', selector_spec);

    describe('property menus', function() {
        describe('on click go to page', function() {
            beforeEach(function () {
                add_element('Btn');
            });

            describe('single elements', function() {
                it('should show "click item" when right clicking element', function () {
                    expect(Editor.element_property_menu.visible()).toBe(false);
                    mousedown_on(Selector.render(), 3);
                    expect(Editor.element_property_menu.visible()).toBe(true);
                    expect(Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem)).not.toBe(null);
                });

                it('should show "pages" when mouse enter on "click item"', function () {
                    mousedown_on(Selector.render(), 3);

                    expect(Editor.element_page_menu.visible()).toBe(false);
                    Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem).mouseenter();
                    expect(Editor.element_page_menu.visible()).toBe(true);

                    // minus 1 for "< No Where >"
                    expect(Editor.element_page_menu.items.length - 1).toBe(Editor.project.pages.length);
                });

                it('should hide "pages" when mouse enter on other items', function () {
                    mousedown_on(Selector.render(), 3);
                    Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem).mouseenter();

                    expect(Editor.element_page_menu.visible()).toBe(true);
                    Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem.CreateModal).mouseenter();
                    expect(Editor.element_page_menu.visible()).toBe(false);
                });

                it('should hide "pages" when clicked', function () {
                    mousedown_on(Selector.render(), 3);
                    Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem).mouseenter();

                    Editor.element_page_menu.items[0].hitarea.click();
                    expect(Editor.element_page_menu.visible()).toBe(false);
                });

                it('should show "No Where" as selected (single element)', function () {
                    mousedown_on(Selector.render(), 3);

                    var click_page_menu_item = Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem);
                    click_page_menu_item.mouseenter();

                    var click_page_property = PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage);
                    expect(click_page_property.value).toBe(null);
                    expect(Editor.element_page_menu.items[0].selected).toBe(true);
                    Editor.element_page_menu.items[0].hitarea.click();
                    expect(click_page_property.value).toBe(null);

                    click_page_menu_item.mouseenter();
                    expect(Editor.element_page_menu.items[0].selected).toBe(true);
                });

                it('should set click page id (single element)', function () {
                    mousedown_on(Selector.render(), 3);

                    var click_page_menu_item = Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem);
                    click_page_menu_item.mouseenter();

                    var click_page_property = PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage);
                    expect(click_page_property.value).toBe(null);
                    expect(Editor.element_page_menu.items[0].selected).toBe(true);
                    Editor.element_page_menu.items[1].hitarea.click();
                    expect(click_page_property.value).toBe(Editor.project.pages[0].id);

                    click_page_menu_item.mouseenter();
                    expect(Editor.element_page_menu.items[1].selected).toBe(true);
                });
            });

            describe('multiple elements', function() {
                beforeEach(function () {
                    add_element('Btn');
                    Selector.select(PageList.curr_page().elements[0]);
                });

                it('should show "No Where" as selected (multiple elements)', function () {
                    mousedown_on(Selector.render(), 3);
                    Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem).mouseenter();

                    expect(Editor.element_page_menu.items[0].selected).toBe(true);
                });

                it('should show nothing as selected (multiple elements)', function () {
                    PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage).value = 'something else';

                    mousedown_on(Selector.render(), 3);
                    Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem).mouseenter();

                    expect(Editor.element_page_menu.items[0].selected).toBe(false);
                });

                it('should set click page id (multiple element)', function () {
                    mousedown_on(Selector.render(), 3);

                    var click_page_menu_item = Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem);
                    click_page_menu_item.mouseenter();

                    var click_page_property_1 = PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage);
                    var click_page_property_2 = PageList.curr_page().elements[1].find_property(Elements.Property.ClickPage);

                    expect(click_page_property_1.value).toBe(null);
                    expect(click_page_property_2.value).toBe(null);
                    Editor.element_page_menu.items[1].hitarea.click();
                    expect(click_page_property_1.value).toBe(Editor.project.pages[0].id);
                    expect(click_page_property_2.value).toBe(Editor.project.pages[0].id);

                    click_page_menu_item.mouseenter();
                    expect(Editor.element_page_menu.items[1].selected).toBe(true);
                });
            });
        });
    });

    describe('type to add', function() {
        beforeEach(function () {
            show_type_to_add();
        });

        it('should show up on spacebar', function () {
            expect(TypeToAdd.visible()).toBe(true);
            expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);

            $.each(TypeToAdd.list().children(), function(idx, item) {
                if(idx > 0) expect($(item).is(':visible')).toBe(true);
            });
        });

        it('should hide on global escape', function () {
            hide_type_to_add();
            expect(TypeToAdd.visible()).toBe(false);
        });

        it('should hide on input escape', function () {
            type_to_add_trigger_escape();

            expect(TypeToAdd.visible()).toBe(false);
        });

        it('should add element', function () {
            TypeToAdd.input().val('Btn').keyup();

            expect(TypeToAdd.visible()).toBe(true);
            expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
            $.each(TypeToAdd.list().children(), function(idx, item) {
                expect($(item).is(':visible')).toBe(($(item).text() === 'Button / Btn'));
            });

            type_to_add_trigger_enter();
            expect(TypeToAdd.visible()).toBe(false);
            expect($(Editor.canvas().children()[0]).children('.element-button').length).toBe(1);
        });

        function show_type_to_add() {
            var e = $.Event('keyup');
            e.which = 32; // space
            $('body').trigger(e);
        }

        function hide_type_to_add() {
            var e = $.Event('keyup');
            e.which = 27; // escape
            $('body').trigger(e);
        }

        function type_to_add_trigger_enter() {
            var e = $.Event('keyup');
            e.which = 13; // enter
            TypeToAdd.input().trigger(e);
        }

        function type_to_add_trigger_escape() {
            var e = $.Event('keyup');
            e.which = 27; // escape
            TypeToAdd.input().trigger(e);
        }
    });

    describe('view_mode', view_mode_spec);

});

function page_list_spec() {
    it('should render current selected page', function () {
        expect(Editor.canvas().children(':eq(0)').is(PageList.curr_page().render())).toBe(true);
    });

    it('should render current selected child page', function () {
        PageList.Menu.show(PageList.top_level_items()[0]);
        PageList.Menu.new_child_page_menu_item().click();
        PageList.select_item(PageList.top_level_items()[0].child_items[0])

        expect(Editor.canvas().children().length).toBe(1);
        expect(Editor.canvas().children(':eq(0)').is(PageList.curr_page().render())).toBe(true);
        expect(Editor.canvas().children(':eq(0)').children('.element-page-parent:eq(0)').children().is(PageList.top_level_items()[0].page.render())).toBe(true);
    });

    it('should add top level pages', function () {
        expect(Editor.project.pages.length).toBe(1);
        expect(Editor.project.pages[0].name).toBe('Homepage');
        expect(PageList.root_item.render().children('li').size()).toBe(1);
        expect(PageList.top_level_items()[0].render().children('div').text()).toBe('Homepage');

        PageList.new_page_btn().click();
        expect(Editor.project.pages.length).toBe(2);
        expect(Editor.project.pages[1].name).toBe('Page 2');
        expect(PageList.root_item.render().children('li').size()).toBe(2);
        expect(PageList.top_level_items()[1].render().children('div').text()).toBe('Page 2');
    });

    it('should show context menu on right click', function() {
        expect(PageList.Menu.visible()).toBe(false);

        PageList.Menu.show(PageList.top_level_items()[0]);
        expect(PageList.Menu.visible()).toBe(true);
    });

    it('should add child pages', function () {
        expect(Editor.project.pages[0].child_pages.length).toBe(0);

        PageList.Menu.show(PageList.top_level_items()[0]);
        PageList.Menu.new_child_page_menu_item().click();
        expect(Editor.project.pages[0].child_pages.length).toBe(1);
        expect(PageList.top_level_items()[0].child_items[0].render().children('div:eq(0)').text()).toBe('Homepage > 1');

        PageList.Menu.show(PageList.top_level_items()[0].child_items[0]);
        PageList.Menu.new_child_page_menu_item().click();
        expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
        expect(PageList.top_level_items()[0].child_items[0].child_items[0].render().children('div:eq(0)').text()).toBe('Homepage > 1 > 1');
    });

    it('should not remove the only top level page', function () {
        PageList.Menu.show(PageList.top_level_items()[0]);
        expect(PageList.Menu.delete_menu_item().hasClass('disabled')).toBe(true);

        PageList.Menu.delete_menu_item().click();
        expect(Editor.project.pages.length).toBe(1);
        expect(PageList.root_item.render().children('li').size()).toBe(1);
    });

    it('should remove pages', function () {
        PageList.Menu.show(PageList.top_level_items()[0]);
        PageList.Menu.new_child_page_menu_item().click();

        PageList.Menu.show(PageList.top_level_items()[0].child_items[0]);
        PageList.Menu.new_child_page_menu_item().click();

        PageList.new_page_btn().click();

        expect(Editor.project.pages.length).toBe(2);
        PageList.Menu.show(PageList.top_level_items()[1]);
        PageList.Menu.delete_menu_item().click();
        expect(Editor.project.pages.length).toBe(1);

        expect(Editor.project.pages[0].child_pages.length).toBe(1);
        expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
        PageList.Menu.show(PageList.top_level_items()[0].child_items[0]);
        PageList.Menu.delete_menu_item().click();
        expect(Editor.project.pages[0].child_pages.length).toBe(0);
    });
}

function selector_spec() {
    beforeEach(function () {
        add_element('Btn');
    });

    it('should show when adding element', function () {
        expect(Selector.visible()).toBe(true);
    });

    it('should hide when selecting page', function () {
        expect(Selector.visible()).toBe(true);
        PageList.curr_page().render_hitarea().mouseup();
        expect(Selector.visible()).toBe(false);
    });

    it('should show when selecting element', function () {
        PageList.curr_page().render_hitarea().mouseup();
        expect(Selector.visible()).toBe(false);

        mousedown_on(PageList.curr_page().elements[0].hitarea, 1);
        expect(Selector.visible()).toBe(true);
    });

    it('should hide on global escape', function () {
        expect(Selector.visible()).toBe(true);
        trigger_key_event('body', KEY_EVENTS.UP, KEY_CODES.ESCAPE);
        expect(Selector.visible()).toBe(false);
    });

    it('should hide on global delete', function () {
        expect(Selector.visible()).toBe(true);
        expect(Selector.selected_elements.length).toBe(1);
        expect(PageList.curr_page().elements.length).toBe(1);

        trigger_key_event('body', KEY_EVENTS.UP, KEY_CODES.DELETE);

        expect(Selector.visible()).toBe(false);
        expect(Selector.selected_elements.length).toBe(0);
        expect(PageList.curr_page().elements.length).toBe(0);
    });

    describe('shift select', selector_shift_select_spec);
    describe('move', selector_move_spec);
    describe('resize', selector_resize_spec);
}

function selector_shift_select_spec() {
    beforeEach(function () {
        add_element('Btn');
        PageList.curr_page().render_hitarea().mouseup();
        mousedown_on(PageList.curr_page().elements[0].hitarea, 1);
    });

    it('should add selected element by shift', function () {
        expect(Selector.selected_elements.length).toBe(1);

        mousedown_on(PageList.curr_page().elements[1].hitarea, 1, null, null, true);
        expect(Selector.selected_elements.length).toBe(2);
    });

    it('should remove selected element by shift', function () {
        mousedown_on(PageList.curr_page().elements[1].hitarea, 1, null, null, true);
        expect(Selector.selected_elements.length).toBe(2);

        mousedown_on(Selector.render(), 1, null, null, true);
        expect(Selector.selected_elements.length).toBe(1);
    });
}

function selector_move_spec() {
    it('should move', function () {
        PageList.curr_page().render_hitarea().mouseup();

        var position = PageList.curr_page().elements[0].get_position();
        expect(position.left).toBe(100);
        expect(position.top).toBe(100);

        mousedown_on(PageList.curr_page().elements[0].hitarea, 1, 100, 100);
        trigger_mouse_event(window, 'mousemove', null, 150, 200);
        trigger_mouse_event(window, 'mouseup', MOUSE_BTNS.LEFT, 0, 0);

        position = PageList.curr_page().elements[0].get_position();
        expect(position.left).toBe(150);
        expect(position.top).toBe(200);
    });
}

function selector_resize_spec() {
    beforeEach(function () {
        // add 2 more elements
        add_element('Btn');
        PageList.curr_page().elements[1].set_position(200, 200);
        var position = PageList.curr_page().elements[1].get_position();
        expect(position.left).toBe(200);
        expect(position.top).toBe(200);

        add_element('Btn');
        PageList.curr_page().elements[2].set_position(300, 300);
        var position = PageList.curr_page().elements[2].get_position();
        expect(position.left).toBe(300);
        expect(position.top).toBe(300);

        PageList.curr_page().render_hitarea().mouseup();
        $.each(PageList.curr_page().elements, function(idx, element) {
            Selector.select(element);
        });
        Selector.show();
        expect(Selector.selected_elements.length).toBe(3);

        // keep track of initial sizes and positions
        this.selector_size = Selector.get_size();
        this.selector_position = Selector.get_position();

        this.element_sizes = [];
        this.element_positions = [];
        $.each(PageList.curr_page().elements, function(idx, element) {
            this.element_sizes.push(element.get_size());
            this.element_positions.push(element.get_position());
        }.bind(this));
    });

    it('should resize north', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_north(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_north(), this.selector_size.width, -this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left,
            top: this.selector_position.top - this.selector_size.height,
            width: this.selector_size.width,
            height: this.selector_size.height * 2,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: this.element_positions[idx].left,
                top: new_selector_position.top + 2 * (this.element_positions[idx].top - this.selector_position.top),
                width: this.element_sizes[idx].width,
                height: this.element_sizes[idx].height * 2,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize east', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_east(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_east(), this.selector_size.width, this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left,
            top: this.selector_position.top,
            width: this.selector_size.width * 2,
            height: this.selector_size.height,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: new_selector_position.left + 2 * (this.element_positions[idx].left - this.selector_position.left),
                top: this.element_positions[idx].top,
                width: this.element_sizes[idx].width * 2,
                height: this.element_sizes[idx].height,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize south', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_south(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_south(), this.selector_size.width, this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left,
            top: this.selector_position.top,
            width: this.selector_size.width,
            height: this.selector_size.height * 2,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: this.element_positions[idx].left,
                top: new_selector_position.top + 2 * (this.element_positions[idx].top - this.selector_position.top),
                width: this.element_sizes[idx].width,
                height: this.element_sizes[idx].height * 2,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize west', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_west(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_west(), -this.selector_size.width, this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left - this.selector_size.width,
            top: this.selector_position.top,
            width: this.selector_size.width * 2,
            height: this.selector_size.height,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: new_selector_position.left + 2 * (this.element_positions[idx].left - this.selector_position.left),
                top: this.element_positions[idx].top,
                width: this.element_sizes[idx].width * 2,
                height: this.element_sizes[idx].height,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize north west', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_north_west(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_north_west(), -this.selector_size.width, -this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left - this.selector_size.width,
            top: this.selector_position.top - this.selector_size.height,
            width: this.selector_size.width * 2,
            height: this.selector_size.height * 2,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: new_selector_position.left + 2 * (this.element_positions[idx].left - this.selector_position.left),
                top: new_selector_position.top + 2 * (this.element_positions[idx].top - this.selector_position.top),
                width: this.element_sizes[idx].width * 2,
                height: this.element_sizes[idx].height * 2,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize north east', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_north_east(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_north_east(), this.selector_size.width, -this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left,
            top: this.selector_position.top - this.selector_size.height,
            width: this.selector_size.width * 2,
            height: this.selector_size.height * 2,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: new_selector_position.left + 2 * (this.element_positions[idx].left - this.selector_position.left),
                top: new_selector_position.top + 2 * (this.element_positions[idx].top - this.selector_position.top),
                width: this.element_sizes[idx].width * 2,
                height: this.element_sizes[idx].height * 2,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize south east', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_south_east(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_south_east(), this.selector_size.width, this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left,
            top: this.selector_position.top,
            width: this.selector_size.width * 2,
            height: this.selector_size.height * 2,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: new_selector_position.left + 2 * (this.element_positions[idx].left - this.selector_position.left),
                top: new_selector_position.top + 2 * (this.element_positions[idx].top - this.selector_position.top),
                width: this.element_sizes[idx].width * 2,
                height: this.element_sizes[idx].height * 2,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    it('should resize south west', function () {
        // do 2x resize
        mousedown_on(Selector.resize.handle_south_west(), 1, 0, 0);
        mousemove_handle(Selector.resize.handle_south_west(), -this.selector_size.width, this.selector_size.height);

        var selector_resized = {
            left: this.selector_position.left - this.selector_size.width,
            top: this.selector_position.top,
            width: this.selector_size.width * 2,
            height: this.selector_size.height * 2,
        };

        var new_selector_position = Selector.get_position();
        var elements_resized = []
        $.each(PageList.curr_page().elements, function(idx, element) {
            elements_resized.push({
                left: new_selector_position.left + 2 * (this.element_positions[idx].left - this.selector_position.left),
                top: new_selector_position.top + 2 * (this.element_positions[idx].top - this.selector_position.top),
                width: this.element_sizes[idx].width * 2,
                height: this.element_sizes[idx].height * 2,
            });
        }.bind(this));

        test_resize(selector_resized, elements_resized);
    });

    function test_resize(selector_resized, elements_resized) {
        // test selector end result
        var new_selector_size = Selector.get_size();
        var new_selector_position = Selector.get_position();

        expect(new_selector_position.left).toBe(selector_resized.left);
        expect(new_selector_position.top).toBe(selector_resized.top);
        expect(new_selector_size.width).toBe(selector_resized.width);
        expect(new_selector_size.height).toBe(selector_resized.height);


        // test elements end result
        $.each(PageList.curr_page().elements, function(idx, element) {
            var new_element_size = element.get_size();
            var new_element_position = element.get_position();

            expect(new_element_position.left).toBe(elements_resized[idx].left);
            expect(new_element_position.top).toBe(elements_resized[idx].top);
            expect(new_element_size.width).toBe(elements_resized[idx].width);
            expect(new_element_size.height).toBe(elements_resized[idx].height);
        }.bind(this));
    }

    function mousemove_handle(handle, left, top) {
        var e = $.Event('mousemove');
        e.data = handle;
        e.pageX = left;
        e.pageY = top;
        Selector.resize.mousemove_handle(e);
    }
}

function view_mode_spec() {
    beforeEach(function () {
        PageList.new_page_btn().click();
        PageList.select_item(PageList.top_level_items()[1]);
        add_element('Btn');

        PageList.select_item(PageList.top_level_items()[0]);
        add_element('Btn');
        PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage).value = PageList.project.pages[1].id;

        PageList.Menu.show(PageList.top_level_items()[0]);
        PageList.Menu.new_child_page_menu_item().click();
        PageList.select_item(PageList.top_level_items()[0].child_items[0]);
        add_element('Btn');
        PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage).value = PageList.project.pages[0].id;
    });

    it('should enter view mode', function () {
        expect(Editor.sidebar().is(':visible')).toBe(true);
        Editor.view_btn().click();
        expect(Editor.sidebar().is(':visible')).toBe(false);
    });

    it('should enable element behaviours', function () {
        Editor.view_btn().click();

        expect(PageList.curr_page()).toBe(PageList.project.pages[0].child_pages[0]);
        expect(Editor.canvas().children(':eq(0)').is(PageList.curr_page().render())).toBe(true);

        PageList.curr_page().elements[0].btn.click();
        expect(PageList.curr_page()).toBe(PageList.project.pages[0]);
        expect(Editor.canvas().children(':eq(0)').is(PageList.curr_page().render())).toBe(true);

        PageList.curr_page().elements[0].btn.click();
        expect(PageList.curr_page()).toBe(PageList.project.pages[1]);
        expect(Editor.canvas().children(':eq(0)').is(PageList.curr_page().render())).toBe(true);
    });

    it('should return to edit mode', function () {
        Editor.view_btn().click();
        PageList.curr_page().elements[0].btn.click();
        PageList.curr_page().elements[0].btn.click();

        trigger_key_event('body', KEY_EVENTS.UP, KEY_CODES.ESCAPE);
        expect(Editor.sidebar().is(':visible')).toBe(true);

        expect(Selector.visible()).toBe(false);
        mousedown_on(PageList.curr_page().elements[0].hitarea, 1);
        expect(Selector.visible()).toBe(true);

        PageList.select_item(PageList.top_level_items()[0]);
        expect(Selector.visible()).toBe(false);
        mousedown_on(PageList.curr_page().elements[0].hitarea, 1);
        expect(Selector.visible()).toBe(true);

        PageList.select_item(PageList.top_level_items()[0].child_items[0]);
        expect(Selector.visible()).toBe(false);
        mousedown_on(PageList.curr_page().elements[0].hitarea, 1);
        expect(Selector.visible()).toBe(true);
    });
}

function add_element(name) {
    TypeToAdd.show();
    TypeToAdd.input().val(name);
    TypeToAdd.parse_input();
}

var KEY_EVENTS = {
    UP: 'keyup'
}

var KEY_CODES = {
    ESCAPE: 27,
    DELETE: 46
}

function trigger_key_event(target, event, key_code) {
    var e = $.Event(event);
    e.which = key_code;
    $(target).trigger(e);
}

var MOUSE_BTNS = {
    LEFT: 1,
    RIGHT: 2
}

function trigger_mouse_event(target, event, button, left, top, shift) {
    var e = $.Event(event);
    e.pageX = left === null || left === undefined ? target.offset().left : left;
    e.pageY = top === null || top === undefined ? target.offset().top : top;
    e.which = button || MOUSE_BTNS.LEFT;
    e.shiftKey = shift || false;
    $(target).trigger(e);
}

function mousedown_on(element, button, left, top, shift) {
    var e = $.Event('mousedown');
    e.pageX = left === null || left === undefined ? element.offset().left : left;
    e.pageY = top === null || top === undefined ? element.offset().top : top;
    e.which = button || 1;
    e.shiftKey = shift || false;
    element.trigger(e);
}

function css_fix() {
    $('#stage').css('position', 'relative');
    Editor.sidebar().css('position', 'absolute');
    Editor.canvas().css('position', 'absolute');
    Selector.render().css('position', 'absolute');
    $('.handle').css('position', 'absolute');
    $('.element-page').css('position', 'absolute');
    $('.element-page-hitarea').css('position', 'absolute');
    $('.element-page-parent').css('position', 'absolute');
    $('.element-hitarea').css('position', 'absolute');
    $('.element-button').css('position', 'absolute');
}