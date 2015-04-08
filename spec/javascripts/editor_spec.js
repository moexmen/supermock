jasmine.getFixtures().fixturesPath="../../spec/javascripts/fixtures"

describe('projects/show.js', function() {
    'use strict';

    beforeEach(function() {
        loadFixtures('generated/projects/show.html');
    });

    describe('pages', function() {
        beforeEach(function() {
            this.page_list = $('#page_list').children('ul');
        });

        it('should add top level pages', function () {
            expect(Editor.project.pages.length).toBe(1);
            expect(Editor.project.pages[0].name).toBe('Homepage');
            expect(this.page_list.children('li').size()).toBe(1);
            expect($(this.page_list.children('li')[0]).children('div').text()).toBe('Homepage');

            $('#new_page_btn').click();
            expect(Editor.project.pages.length).toBe(2);
            expect(Editor.project.pages[1].name).toBe('Page 2');
            expect(this.page_list.children('li').size()).toBe(2);
            expect($(this.page_list.children('li')[1]).children('div').text()).toBe('Page 2');
        });

        it('should show context menu on right click', function() {
            expect($('#page_list_item_context_menu').hasClass('open')).toBe(false);

            open_context_menu($(this.page_list.children('li')[0]).children('div'));
            expect($('#page_list_item_context_menu').hasClass('open')).toBe(true);
        });

        it('should add child pages', function () {
            expect(Editor.project.pages[0].child_pages.length).toBe(0);
            var first_page_item = $(this.page_list.children('li')[0]).children('ul');

            open_context_menu($(this.page_list.children('li')[0]).children('div'));
            click_context_menu_new_child_page();
            expect(Editor.project.pages[0].child_pages.length).toBe(1);
            expect($(first_page_item.children('li')[0]).children('div').text()).toBe('Homepage > 1');

            var child_page_item = $(first_page_item.children('li')[0]).children('ul');
            open_context_menu($(first_page_item.children('li')[0]).children('div'));
            click_context_menu_new_child_page();
            expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
            expect($(child_page_item.children('li')[0]).children('div').text()).toBe('Homepage > 1 > 1');
        });

        it('should not remove the only top level page', function () {
            open_context_menu($(this.page_list.children('li')[0]).children('div'));
            expect($('#page_list_item_context_menu').find('li').hasClass('disabled')).toBe(true);

            click_context_menu_delete();
            expect(Editor.project.pages.length).toBe(1);
            expect(this.page_list.children('li').size()).toBe(1);
        });

        it('should remove pages', function () {
            var first_page_item = $(this.page_list.children('li')[0]).children('ul');
            open_context_menu($(this.page_list.children('li')[0]).children('div'));
            click_context_menu_new_child_page();

            var child_page_item = $(first_page_item.children('li')[0]).children('ul');
            open_context_menu($(first_page_item.children('li')[0]).children('div'));
            click_context_menu_new_child_page();

            $('#new_page_btn').click();

            expect(Editor.project.pages.length).toBe(2);
            open_context_menu($(this.page_list.children('li')[1]).children('div'));
            click_context_menu_delete();
            expect(Editor.project.pages.length).toBe(1);

            expect(Editor.project.pages[0].child_pages.length).toBe(1);
            expect(Editor.project.pages[0].child_pages[0].child_pages.length).toBe(1);
            var first_page_item = $(this.page_list.children('li')[0]).children('ul');
            open_context_menu($(first_page_item.children('li')[0]).children('div'));
            click_context_menu_delete();
            expect(Editor.project.pages[0].child_pages.length).toBe(0);
        });

        function open_context_menu(target) {
            target.contextmenu().trigger('contextmenu');
        }

        function click_context_menu_new_child_page() {
            $($('#page_list_item_context_menu').find('li')[0]).trigger('click');
        }

        function click_context_menu_delete() {
            $($('#page_list_item_context_menu').find('li')[1]).trigger('click');
        }
    });
});