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

    describe('page list', function() {
        beforeEach(function() {
        });

        it('should render current selected page', function () {
            expect($(Editor.canvas().children()[0]).is(PageList.curr_page().render())).toBe(true);
        });

        it('should render current selected child page', function () {
            PageList.Menu.show(PageList.root_item.child_items[0]);
            PageList.Menu.new_child_page_menu_item().click();
            PageList.select_item(PageList.root_item.child_items[0].child_items[0])

            expect(Editor.canvas().children().length).toBe(2);
            expect($(Editor.canvas().children()[0]).is(PageList.root_item.child_items[0].page.render())).toBe(true);
            expect($(Editor.canvas().children()[1]).is(PageList.curr_page().render())).toBe(true);
        });

        it('should add top level pages', function () {
            expect(Editor.project.pages.length).toBe(1);
            expect(Editor.project.pages[0].name).toBe('Homepage');
            expect(PageList.root_item.render().children('li').size()).toBe(1);
            expect(PageList.root_item.child_items[0].render().children('div').text()).toBe('Homepage');

            PageList.new_page_btn().click();
            expect(Editor.project.pages.length).toBe(2);
            expect(Editor.project.pages[1].name).toBe('Page 2');
            expect(PageList.root_item.render().children('li').size()).toBe(2);
            expect(PageList.root_item.child_items[1].render().children('div').text()).toBe('Page 2');
        });

        it('should show context menu on right click', function() {
            expect(PageList.Menu.visible()).toBe(false);

            PageList.Menu.show(PageList.root_item.child_items[0]);
            expect(PageList.Menu.visible()).toBe(true);
        });

        it('should add child pages', function () {
            expect(Editor.project.pages[0].child_pages.length).toBe(0);

            PageList.Menu.show(PageList.root_item.child_items[0]);
            PageList.Menu.new_child_page_menu_item().click();
            expect(Editor.project.pages[0].child_pages.length).toBe(1);
            expect(PageList.root_item.child_items[0].child_items[0].render().children('div').text()).toBe('Homepage > 1');

            PageList.Menu.show(PageList.root_item.child_items[0].child_items[0]);
            PageList.Menu.new_child_page_menu_item().click();
            expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
            expect(PageList.root_item.child_items[0].child_items[0].child_items[0].render().children('div').text()).toBe('Homepage > 1 > 1');
        });

        it('should not remove the only top level page', function () {
            PageList.Menu.show(PageList.root_item.child_items[0]);
            expect(PageList.Menu.delete_menu_item().hasClass('disabled')).toBe(true);

            PageList.Menu.delete_menu_item().click();
            expect(Editor.project.pages.length).toBe(1);
            expect(PageList.root_item.render().children('li').size()).toBe(1);
        });

        it('should remove pages', function () {
            PageList.Menu.show(PageList.root_item.child_items[0]);
            PageList.Menu.new_child_page_menu_item().click();

            PageList.Menu.show(PageList.root_item.child_items[0].child_items[0]);
            PageList.Menu.new_child_page_menu_item().click();

            PageList.new_page_btn().click();

            expect(Editor.project.pages.length).toBe(2);
            PageList.Menu.show(PageList.root_item.child_items[1]);
            PageList.Menu.delete_menu_item().click();
            expect(Editor.project.pages.length).toBe(1);

            expect(Editor.project.pages[0].child_pages.length).toBe(1);
            expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
            PageList.Menu.show(PageList.root_item.child_items[0].child_items[0]);
            PageList.Menu.delete_menu_item().click();
            expect(Editor.project.pages[0].child_pages.length).toBe(0);
        });
    });

    describe('selector', function() {
        beforeEach(function () {
            add_element('Btn');
        });

        it('should show when adding element', function () {
            expect(Selector.visible()).toBe(true);
        });

        it('should hide when selecting page', function () {
            expect(Selector.visible()).toBe(true);
            PageList.curr_page().render().mouseup();
            expect(Selector.visible()).toBe(false);
        });

        it('should show when selecting element', function () {
            PageList.curr_page().render().mouseup();
            expect(Selector.visible()).toBe(false);

            mousedown_on(PageList.curr_page().elements[0].hitarea, 1);
            expect(Selector.visible()).toBe(true);
        });

        it('should hide on global escape', function () {
            expect(Selector.visible()).toBe(true);

            var e = $.Event('keyup');
            e.which = 27; // escape
            $('body').trigger(e);

            expect(Selector.visible()).toBe(false);
        });

        it('should hide on global delete', function () {
            expect(Selector.visible()).toBe(true);
            expect(Selector.selected_elements.length).toBe(1);
            expect(PageList.curr_page().elements.length).toBe(1);

            var e = $.Event('keyup');
            e.which = 46; // delete
            $('body').trigger(e);

            expect(Selector.visible()).toBe(false);
            expect(Selector.selected_elements.length).toBe(0);
            expect(PageList.curr_page().elements.length).toBe(0);
        });

        describe('shift select', function() {
            beforeEach(function () {
                add_element('Btn');
                PageList.curr_page().render().mouseup();
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
        });

        describe('move', function() {
            it('should move', function () {
                PageList.curr_page().render().mouseup();

                var position = PageList.curr_page().elements[0].get_position();
                expect(position.left).toBe(100);
                expect(position.top).toBe(100);

                //mousedown_on(PageList.curr_page().elements[0].hitarea, 100, 100);
                mousedown_on(PageList.curr_page().elements[0].hitarea, 1, 100, 100);
                mousemove_selector(150, 200);
                mouseup_selector();

                position = PageList.curr_page().elements[0].get_position();
                expect(position.left).toBe(150);
                expect(position.top).toBe(200);
            });

            function mousemove_selector(left, top) {
                var e = $.Event('mousemove');
                e.pageX = left;
                e.pageY = top;
                Selector.move.mousemove(e);
            }

            function mouseup_selector() {
                var e = $.Event('mouseup');
                Selector.move.mouseup(e);
            }
        });

        describe('resize', function() {
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

                PageList.curr_page().render().mouseup();
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
        });

        function mousedown_on(element, button, left, top, shift) {
            var e = $.Event('mousedown');
            e.pageX = left === null || left === undefined ? element.offset().left : left;
            e.pageY = top === null || top === undefined ? element.offset().top : top;
            e.which = button || 1;
            e.shiftKey = shift || false;
            element.trigger(e);
        }
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

    function add_element(name) {
        TypeToAdd.show();
        TypeToAdd.input().val(name);
        TypeToAdd.parse_input();
    }

    function css_fix() {
        $('#stage').css('position', 'relative');
        $('#sidebar').css('position', 'absolute');
        Editor.canvas().css('position', 'absolute');
        Selector.render().css('position', 'absolute');
        $('.handle').css('position', 'absolute');
        $('.element-page').css('position', 'absolute');
        $('.element-hitarea').css('position', 'absolute');
        $('.element-button').css('position', 'absolute');
    }
});