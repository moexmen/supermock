jasmine.getFixtures().fixturesPath="../../spec/javascripts/fixtures"
//jasmine.getStyleFixtures().fixturesPath = '../../spec/javascripts/fixtures';

describe('projects/show.js', function() {
    'use strict';

    beforeEach(function() {
        loadFixtures('generated/projects/show.html');
        // NOTE: Loading style fixtures doesnt seem to have any effect on CSS
        //loadStyleFixtures('generated/css/editor.css');
    });

    describe('page list', function() {
        beforeEach(function() {
        });

        it('should render current selected page', function () {
            expect($(Editor.canvas().children()[0]).is(PageList.curr_page().render())).toBe(true);
        });

        it('should render current selected child page', function () {
            PageList.ContextMenu.show(PageList.root_item.child_items[0]);
            PageList.ContextMenu.new_child_page_menu_item().click();
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
            expect(PageList.ContextMenu.visible()).toBe(false);

            PageList.ContextMenu.show(PageList.root_item.child_items[0]);
            expect(PageList.ContextMenu.visible()).toBe(true);
        });

        it('should add child pages', function () {
            expect(Editor.project.pages[0].child_pages.length).toBe(0);

            PageList.ContextMenu.show(PageList.root_item.child_items[0]);
            PageList.ContextMenu.new_child_page_menu_item().click();
            expect(Editor.project.pages[0].child_pages.length).toBe(1);
            expect(PageList.root_item.child_items[0].child_items[0].render().children('div').text()).toBe('Homepage > 1');

            PageList.ContextMenu.show(PageList.root_item.child_items[0].child_items[0]);
            PageList.ContextMenu.new_child_page_menu_item().click();
            expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
            expect(PageList.root_item.child_items[0].child_items[0].child_items[0].render().children('div').text()).toBe('Homepage > 1 > 1');
        });

        it('should not remove the only top level page', function () {
            PageList.ContextMenu.show(PageList.root_item.child_items[0]);
            expect(PageList.ContextMenu.delete_menu_item().hasClass('disabled')).toBe(true);

            PageList.ContextMenu.delete_menu_item().click();
            expect(Editor.project.pages.length).toBe(1);
            expect(PageList.root_item.render().children('li').size()).toBe(1);
        });

        it('should remove pages', function () {
            PageList.ContextMenu.show(PageList.root_item.child_items[0]);
            PageList.ContextMenu.new_child_page_menu_item().click();

            PageList.ContextMenu.show(PageList.root_item.child_items[0].child_items[0]);
            PageList.ContextMenu.new_child_page_menu_item().click();

            PageList.new_page_btn().click();

            expect(Editor.project.pages.length).toBe(2);
            PageList.ContextMenu.show(PageList.root_item.child_items[1]);
            PageList.ContextMenu.delete_menu_item().click();
            expect(Editor.project.pages.length).toBe(1);

            expect(Editor.project.pages[0].child_pages.length).toBe(1);
            expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
            PageList.ContextMenu.show(PageList.root_item.child_items[0].child_items[0]);
            PageList.ContextMenu.delete_menu_item().click();
            expect(Editor.project.pages[0].child_pages.length).toBe(0);
        });
    });

    describe('selector', function() {
        beforeEach(function () {
            TypeToAdd.show();
            TypeToAdd.input().val('Btn');
            TypeToAdd.parse_input();
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
            PageList.curr_page().elements[0].hitarea.mousedown();
            expect(Selector.visible()).toBe(true);
        });

        describe('shift select', function() {
            beforeEach(function () {
                TypeToAdd.show();
                TypeToAdd.input().val('Btn');
                TypeToAdd.parse_input();
            });

            it('should add selected element by shift', function () {
                PageList.curr_page().render().mouseup();

                PageList.curr_page().elements[0].hitarea.mousedown();
                expect(Selector.selected_elements.length).toBe(1);

                shift_mousedown_on(PageList.curr_page().elements[1].hitarea);
                expect(Selector.selected_elements.length).toBe(2);
            });

            it('should remove selected element by shift', function () {
                css_fix();

                PageList.curr_page().render().mouseup();
                PageList.curr_page().elements[0].hitarea.mousedown();

                shift_mousedown_on(PageList.curr_page().elements[1].hitarea);
                expect(Selector.selected_elements.length).toBe(2);

                shift_mousedown_on(Selector.render());
                expect(Selector.selected_elements.length).toBe(1);
            });

            function shift_mousedown_on(element) {
                var e = $.Event('mousedown');
                e.shiftKey = true;
                e.pageX = element.offset().left;
                e.pageY = element.offset().top;
                element.trigger(e);
            }
        });

        describe('move', function() {
            it('should move', function () {
                css_fix();

                PageList.curr_page().render().mouseup();

                var position = PageList.curr_page().elements[0].get_position();
                expect(position.left).toBe(100);
                expect(position.top).toBe(100);

                mousedown_on(PageList.curr_page().elements[0].hitarea, 100, 100);
                window_mousemove(150, 200);
                window_mouseup();

                position = PageList.curr_page().elements[0].get_position();
                expect(position.left).toBe(150);
                expect(position.top).toBe(200);
            });

            function mousedown_on(element, left, top) {
                var e = $.Event('mousedown');
                e.pageX = left;
                e.pageY = top;
                element.trigger(e);
            }

            function window_mousemove(left, top) {
                var e = $.Event('mousemove');
                e.pageX = left;
                e.pageY = top;
                Selector.move.mousemove(e);
            }

            function window_mouseup() {
                var e = $.Event('mouseup');
                Selector.move.mouseup(e);
            }
        });
    });

    describe('type to add', function() {
        it('should show up on spacebar', function () {
            show_type_to_add();

            expect(TypeToAdd.visible()).toBe(true);
            expect(TypeToAdd.no_such_item_msg().is(':visible')).toBe(false);
            $.each(TypeToAdd.list().children(), function(idx, item) {
                if(idx > 0) expect($(item).is(':visible')).toBe(true);
            });
        });

        it('should close on global escape', function () {
            show_type_to_add();
            hide_type_to_add();

            expect(TypeToAdd.visible()).toBe(false);
        });

        it('should close on input escape', function () {
            show_type_to_add();
            type_to_add_trigger_escape();

            expect(TypeToAdd.visible()).toBe(false);
        });

        it('should add element', function () {
            show_type_to_add();
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