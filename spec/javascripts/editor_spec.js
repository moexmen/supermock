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
    describe('property menus', property_menu_spec);
    describe('type to add', type_to_add_spec);
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

        trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT);
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

    describe('shift select', shift_select_spec);
    describe('move', move_spec);
    describe('resize', resize_spec);


    function shift_select_spec() {
        beforeEach(function () {
            add_element('Btn');
            PageList.curr_page().render_hitarea().mouseup();
            trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT);
        });

        it('should add selected element by shift', function () {
            expect(Selector.selected_elements.length).toBe(1);

            trigger_mouse_event(PageList.curr_page().elements[1].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT, true);
            expect(Selector.selected_elements.length).toBe(2);
        });

        it('should remove selected element by shift', function () {
            trigger_mouse_event(PageList.curr_page().elements[1].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT, true);
            expect(Selector.selected_elements.length).toBe(2);

            trigger_mouse_event(Selector.render(), MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT, true);
            expect(Selector.selected_elements.length).toBe(1);
        });
    }

    function move_spec() {
        it('should move', function () {
            PageList.curr_page().render_hitarea().mouseup();

            var position = PageList.curr_page().elements[0].get_position();
            expect(position.left).toBe(100);
            expect(position.top).toBe(100);

            trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, 100, 100, MOUSE_BTNS.LEFT);
            trigger_mouse_event(window, MOUSE_EVENTS.MOVE, 150, 200);
            trigger_mouse_event(window, MOUSE_EVENTS.UP, 0, 0, MOUSE_BTNS.LEFT);

            position = PageList.curr_page().elements[0].get_position();
            expect(position.left).toBe(150);
            expect(position.top).toBe(200);
        });
    }

    function resize_spec() {
        beforeEach(function () {
            // add 2 more elements
            add_element('Btn');
            PageList.curr_page().elements[1].set_position(200, 200);
            var position = PageList.curr_page().elements[1].get_position();
            expect(position.left).toBe(200);
            expect(position.top).toBe(200);

            add_element('Btn');
            PageList.curr_page().elements[2].set_position(300, 300);
            position = PageList.curr_page().elements[2].get_position();
            expect(position.left).toBe(300);
            expect(position.top).toBe(300);

            PageList.curr_page().render_hitarea().mouseup();
            $.each(PageList.curr_page().elements, function(idx, element) {
                Selector.select(element);
            });
            Selector.show();
            expect(Selector.selected_elements.length).toBe(3);

            // keep track of initial sizes and positions
            this.selector_dimension = {
                left: Selector.get_position().left,
                top: Selector.get_position().top,
                width: Selector.get_size().width,
                height: Selector.get_size().height
            }

            this.element_dimensions = [];
            $.each(PageList.curr_page().elements, function(idx, element) {
                this.element_dimensions.push({
                    left: element.get_position().left,
                    top: element.get_position().top,
                    width: element.get_size().width,
                    height: element.get_size().height
                });
            }.bind(this));
        });

        it('should resize north', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_north(), this.selector_dimension.width, -this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left,
                top: this.selector_dimension.top - this.selector_dimension.height,
                width: this.selector_dimension.width,
                height: this.selector_dimension.height * 2
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: this.element_dimensions[idx].left,
                        top: new_selector_position.top + 2 * (this.element_dimensions[idx].top - this.selector_dimension.top),
                        width: this.element_dimensions[idx].width,
                        height: this.element_dimensions[idx].height * 2
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize east', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_east(), this.selector_dimension.width, this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left,
                top: this.selector_dimension.top,
                width: this.selector_dimension.width * 2,
                height: this.selector_dimension.height
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: new_selector_position.left + 2 * (this.element_dimensions[idx].left - this.selector_dimension.left),
                        top: this.element_dimensions[idx].top,
                        width: this.element_dimensions[idx].width * 2,
                        height: this.element_dimensions[idx].height
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize south', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_south(), this.selector_dimension.width, this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left,
                top: this.selector_dimension.top,
                width: this.selector_dimension.width,
                height: this.selector_dimension.height * 2
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: this.element_dimensions[idx].left,
                        top: new_selector_position.top + 2 * (this.element_dimensions[idx].top - this.selector_dimension.top),
                        width: this.element_dimensions[idx].width,
                        height: this.element_dimensions[idx].height * 2
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize west', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_west(), -this.selector_dimension.width, this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left - this.selector_dimension.width,
                top: this.selector_dimension.top,
                width: this.selector_dimension.width * 2,
                height: this.selector_dimension.height
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: new_selector_position.left + 2 * (this.element_dimensions[idx].left - this.selector_dimension.left),
                        top: this.element_dimensions[idx].top,
                        width: this.element_dimensions[idx].width * 2,
                        height: this.element_dimensions[idx].height
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize north west', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_north_west(), -this.selector_dimension.width, -this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left - this.selector_dimension.width,
                top: this.selector_dimension.top - this.selector_dimension.height,
                width: this.selector_dimension.width * 2,
                height: this.selector_dimension.height * 2
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: new_selector_position.left + 2 * (this.element_dimensions[idx].left - this.selector_dimension.left),
                        top: new_selector_position.top + 2 * (this.element_dimensions[idx].top - this.selector_dimension.top),
                        width: this.element_dimensions[idx].width * 2,
                        height: this.element_dimensions[idx].height * 2
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize north east', function () {
            do_resize(Selector.resize.handle_north_east(), this.selector_dimension.width, -this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left,
                top: this.selector_dimension.top - this.selector_dimension.height,
                width: this.selector_dimension.width * 2,
                height: this.selector_dimension.height * 2
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: new_selector_position.left + 2 * (this.element_dimensions[idx].left - this.selector_dimension.left),
                        top: new_selector_position.top + 2 * (this.element_dimensions[idx].top - this.selector_dimension.top),
                        width: this.element_dimensions[idx].width * 2,
                        height: this.element_dimensions[idx].height * 2
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize south east', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_south_east(), this.selector_dimension.width, this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left,
                top: this.selector_dimension.top,
                width: this.selector_dimension.width * 2,
                height: this.selector_dimension.height * 2
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: new_selector_position.left + 2 * (this.element_dimensions[idx].left - this.selector_dimension.left),
                        top: new_selector_position.top + 2 * (this.element_dimensions[idx].top - this.selector_dimension.top),
                        width: this.element_dimensions[idx].width * 2,
                        height: this.element_dimensions[idx].height * 2
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        it('should resize south west', function () {
            // do 2x resize
            do_resize(Selector.resize.handle_south_west(), -this.selector_dimension.width, this.selector_dimension.height);

            var selector_resized = {
                left: this.selector_dimension.left - this.selector_dimension.width,
                top: this.selector_dimension.top,
                width: this.selector_dimension.width * 2,
                height: this.selector_dimension.height * 2
            };

            var elements_resized = calc_elements_resized(
                function(idx, new_selector_position) {
                    return {
                        left: new_selector_position.left + 2 * (this.element_dimensions[idx].left - this.selector_dimension.left),
                        top: new_selector_position.top + 2 * (this.element_dimensions[idx].top - this.selector_dimension.top),
                        width: this.element_dimensions[idx].width * 2,
                        height: this.element_dimensions[idx].height * 2
                    }
                }.bind(this));

            test_resize(selector_resized, elements_resized);
        });

        function do_resize(handle, left, top) {
            trigger_mouse_event(handle, MOUSE_EVENTS.DOWN, 0, 0, MOUSE_BTNS.LEFT);
            trigger_mouse_event(window, MOUSE_EVENTS.MOVE, left, top, MOUSE_BTNS.LEFT, false, handle);
        }

        function calc_elements_resized(formula) {
            var new_selector_position = Selector.get_position();
            var elements_resized = [];

            $.each(PageList.curr_page().elements, function(idx, element) {
                elements_resized.push(formula(idx, new_selector_position));
            });

            return elements_resized;
        }

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
    }
}

function property_menu_spec() {
    describe('click page', click_page_spec);
    describe('check property', check_spec);


    function click_page_spec() {
        beforeEach(function () {
            add_element('Btn');

            expect(Editor.element_property_menu.visible()).toBe(false);
            trigger_mouse_event(Selector.render(), MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.RIGHT);
        });

        describe('single elements', function() {
            it('should show "click item" when right clicking element', function () {
                expect(Editor.element_property_menu.visible()).toBe(true);
                expect(Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem)).not.toBe(null);
            });

            it('should show "pages" when mouse enter on "click item"', function () {
                expect(Editor.element_page_menu.visible()).toBe(false);
                mouseenter_click_page_item();
                expect(Editor.element_page_menu.visible()).toBe(true);

                // minus 1 for "< No Where >"
                expect(Editor.element_page_menu.items.length - 1).toBe(Editor.project.pages.length);
            });

            it('should hide "pages" when mouse enter on other items', function () {
                mouseenter_click_page_item();

                expect(Editor.element_page_menu.visible()).toBe(true);
                Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem.CreateModal).mouseenter();
                expect(Editor.element_page_menu.visible()).toBe(false);
            });

            it('should hide "pages" when clicked', function () {
                mouseenter_click_page_item();

                Editor.element_page_menu.items[0].hitarea.click();
                expect(Editor.element_page_menu.visible()).toBe(false);
            });

            it('should show "No Where" as selected (single element)', function () {
                mouseenter_click_page_item();

                var click_page_property = PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage);
                expect(click_page_property.value).toBe(null);
                expect(Editor.element_page_menu.items[0].selected).toBe(true);

                Editor.element_page_menu.items[0].hitarea.click();
                expect(click_page_property.value).toBe(null);

                mouseenter_click_page_item();
                expect(Editor.element_page_menu.items[0].selected).toBe(true);
            });

            it('should set click page id (single element)', function () {
                mouseenter_click_page_item();

                var click_page_property = PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage);
                expect(click_page_property.value).toBe(null);
                expect(Editor.element_page_menu.items[0].selected).toBe(true);

                Editor.element_page_menu.items[1].hitarea.click();
                expect(click_page_property.value).toBe(Editor.project.pages[0].id);

                mouseenter_click_page_item();
                expect(Editor.element_page_menu.items[1].selected).toBe(true);
            });
        });

        describe('multiple elements', function() {
            beforeEach(function () {
                add_element('Btn');

                Selector.select(PageList.curr_page().elements[0]);
                trigger_mouse_event(Selector.render(), MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.RIGHT);
            });

            it('should show "No Where" as selected (multiple elements)', function () {
                mouseenter_click_page_item();
                expect(Editor.element_page_menu.items[0].selected).toBe(true);
            });

            it('should show nothing as selected (multiple elements)', function () {
                PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage).value = 'something else';

                mouseenter_click_page_item();
                expect(Editor.element_page_menu.items[0].selected).toBe(false);
            });

            it('should set click page id (multiple element)', function () {
                mouseenter_click_page_item();

                var click_page_property_1 = PageList.curr_page().elements[0].find_property(Elements.Property.ClickPage);
                var click_page_property_2 = PageList.curr_page().elements[1].find_property(Elements.Property.ClickPage);

                expect(click_page_property_1.value).toBe(null);
                expect(click_page_property_2.value).toBe(null);
                Editor.element_page_menu.items[1].hitarea.click();
                expect(click_page_property_1.value).toBe(Editor.project.pages[0].id);
                expect(click_page_property_2.value).toBe(Editor.project.pages[0].id);

                mouseenter_click_page_item();
                expect(Editor.element_page_menu.items[1].selected).toBe(true);
            });
        });

        function mouseenter_click_page_item() {
            var click_page_menu_item = Editor.element_property_menu.find_item(Elements.Property.ClickPage.MenuItem);
            trigger_mouse_event(click_page_menu_item.hitarea, MOUSE_EVENTS.ENTER, null, null, MOUSE_BTNS.LEFT);
        }
    }

    function check_spec() {
        beforeEach(function () {
            add_element('Checkbox');

            expect(Editor.element_property_menu.visible()).toBe(false);
            trigger_mouse_event(Selector.render(), MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.RIGHT);
        });

        describe('single elements', function() {
            it('should show "uncheck" when right clicking element', function () {
                expect(Editor.element_property_menu.visible()).toBe(true);
                expect(Editor.element_property_menu.find_item(Elements.Property.Check.MenuItem)).not.toBe(null);
                var checkbox = Selector.selected_elements[0];
                var checked = checkbox.find_property(Elements.Property.Check).value;
                expect(checked).toBe(true);
                expect(checkbox.html.children('input:eq(0)').prop('checked')).toBe(checked);

                var check_property_menu = Editor.element_property_menu.find_item(Elements.Property.Check.MenuItem);
                expect(check_property_menu.render().find('a:eq(0)').text()).toBe("Uncheck");

                mouseclick_check_uncheck_option();
                checked = checkbox.find_property(Elements.Property.Check).value;
                expect(checked).not.toBe(true);
                expect(checkbox.html.children('input:eq(0)').prop('checked')).toBe(checked);

                trigger_mouse_event(Selector.render(), MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.RIGHT);
                expect(check_property_menu.render().find('a:eq(0)').text()).toBe("Check");
            });

            it('should no longer show once check is clicked', function () {
                mouseclick_check_uncheck_option();
                expect(Editor.element_property_menu.visible()).toBe(false);
            });
        });

        describe('multiple elements', function() {
            beforeEach(function () {
                add_element('Checkbox');
                trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT, true);

                trigger_mouse_event(Selector.render(), MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.RIGHT);
            });

            it('should change properties of checkboxes uniformly', function () {
                var checked = PageList.curr_page().elements[0].find_property(Elements.Property.Check).value;

                mouseclick_check_uncheck_option();
                $.each(PageList.curr_page().elements, function(idx, element){
                    expect(element.find_property(Elements.Property.Check).value).not.toBe(checked);
                });
            });
        });

        function mouseclick_check_uncheck_option() {
            var click_page_menu_item = Editor.element_property_menu.find_item(
                Elements.Property.Check.MenuItem);
            trigger_mouse_event(click_page_menu_item.hitarea, MOUSE_EVENTS.CLICK, null, null, MOUSE_BTNS.LEFT);
        }
    }
}

function type_to_add_spec() {
    beforeEach(function () {
        show_type_to_add();
    });

    it('should show up on spacebar', function () {
        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);

        $.each(TypeToAdd.list().children(), function(idx, item) {
            if(idx > 0) {
                expect($(item).is(':visible')).toBe(true);
            }
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

    it('should add button', function () {
        TypeToAdd.input().val('Btn').keyup();

        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
        $.each(TypeToAdd.list().children(), function(idx, item) {
            expect($(item).is(':visible')).toBe(($(item).text() === 'Button / Btn'));
        });

        type_to_add_trigger_enter();
        expect(TypeToAdd.visible()).toBe(false);
        expect($(Editor.canvas().children()[0]).children('.element-button:eq(0)').length).toBe(1);
    });

    it('should add text', function () {
        TypeToAdd.input().val('Text').keyup();

        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
        $.each(TypeToAdd.list().children(), function(idx, item) {
            expect($(item).is(':visible')).toBe(
                ($(item).text() === 'Text') ||
                ($(item).text() === 'Textfield / Input') ||
                ($(item).text() === 'Textarea'));
        });


        type_to_add_trigger_enter();
        expect(TypeToAdd.visible()).toBe(false);
        expect($(Editor.canvas().children()[0]).children('.element-text:eq(0)').length).toBe(1);
    });
    
    it('should add textfield', function () {
        TypeToAdd.input().val('textfield').keyup();

        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
        $.each(TypeToAdd.list().children(), function(idx, item) {
            expect($(item).is(':visible')).toBe(($(item).text() === 'Textfield / Input'));
        });


        type_to_add_trigger_enter();
        expect(TypeToAdd.visible()).toBe(false);
        expect($(Editor.canvas().children()[0]).children('.element-textinput:eq(0)').length).toBe(1);
    });

    it('should add textarea', function () {
        TypeToAdd.input().val('textarea').keyup();

        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
        $.each(TypeToAdd.list().children(), function(idx, item) {
            expect($(item).is(':visible')).toBe(($(item).text() === 'Textarea'));
        });


        type_to_add_trigger_enter();
        expect(TypeToAdd.visible()).toBe(false);
        expect($(Editor.canvas().children()[0]).children('.element-textarea:eq(0)').length).toBe(1);
    });

    it('should add checkbox', function () {
        TypeToAdd.input().val('Checkbox').keyup();

        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
        $.each(TypeToAdd.list().children(), function(idx, item) {
            expect($(item).is(':visible')).toBe(($(item).text() === 'Checkbox / Chk'));
        });


        type_to_add_trigger_enter();
        expect(TypeToAdd.visible()).toBe(false);
        expect($(Editor.canvas().children()[0]).children('.element-checkboxarea:eq(0)').length).toBe(1);
    });

    it('should add radiobutton', function () {
        TypeToAdd.input().val('Radiobutton').keyup();

        expect(TypeToAdd.visible()).toBe(true);
        expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
        $.each(TypeToAdd.list().children(), function(idx, item) {
            expect($(item).is(':visible')).toBe(($(item).text() === 'Radiobutton / Rdo'));
        });


        type_to_add_trigger_enter();
        expect(TypeToAdd.visible()).toBe(false);
        expect($(Editor.canvas().children()[0]).children('.element-radiobutton:eq(0)').length).toBe(1);
    });

    function show_type_to_add() {
        trigger_key_event('body', KEY_EVENTS.UP, KEY_CODES.SPACE);
    }

    function hide_type_to_add() {
        trigger_key_event('body', KEY_EVENTS.UP, KEY_CODES.ESCAPE);
    }

    function type_to_add_trigger_enter() {
        trigger_key_event(TypeToAdd.input(), KEY_EVENTS.UP, KEY_CODES.ENTER);
    }

    function type_to_add_trigger_escape() {
        trigger_key_event(TypeToAdd.input(), KEY_EVENTS.UP, KEY_CODES.ESCAPE);
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
        trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT);
        expect(Selector.visible()).toBe(true);

        PageList.select_item(PageList.top_level_items()[0]);
        expect(Selector.visible()).toBe(false);
        trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT);
        expect(Selector.visible()).toBe(true);

        PageList.select_item(PageList.top_level_items()[0].child_items[0]);
        expect(Selector.visible()).toBe(false);
        trigger_mouse_event(PageList.curr_page().elements[0].hitarea, MOUSE_EVENTS.DOWN, null, null, MOUSE_BTNS.LEFT);
        expect(Selector.visible()).toBe(true);
    });
}

function add_element(name) {
    TypeToAdd.show();
    TypeToAdd.input().val(name);
    TypeToAdd.update_items();
    TypeToAdd.parse_input();
}

var KEY_EVENTS = {
    UP: 'keyup'
}

var KEY_CODES = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    DELETE: 46
}

function trigger_key_event(target, event, key_code) {
    var e = $.Event(event);
    e.which = key_code;
    $(target).trigger(e);
}

var MOUSE_EVENTS = {
    DOWN: 'mousedown',
    UP: 'mouseup',
    MOVE: 'mousemove',
    ENTER: 'mouseenter',
    CLICK: 'click'
}

var MOUSE_BTNS = {
    LEFT: 1,
    RIGHT: 3
}

function trigger_mouse_event(target, event, left, top, button, shift, data) {
    var e = $.Event(event);

    if(left === null || left === undefined) {
        e.pageX = target.offset === undefined ? 0 : target.offset().left;
    }
    else {
        e.pageX = left;
    }

    if(top === null || top === undefined) {
        e.pageY = target.offset === undefined ? 0 : target.offset().top;
    }
    else {
        e.pageY = top;
    }

    if(button != null || button != undefined) e.which = button;
    if(shift != null || shift != undefined) e.shiftKey = shift;
    if(data != null || data != undefined) e.data = data;

    $(target).trigger(e);
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