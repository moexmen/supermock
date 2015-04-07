jasmine.getFixtures().fixturesPath="../../spec/javascripts/fixtures"

describe('Foo', function() {
    it("does something", function() {
        expect(1 + 1).toBe(2);
    });
});

describe('projects/show.js', function() {
    'use strict';
    beforeEach(function() {
        loadFixtures('generated/projects/show.html');
    });
    it('loads generated HTML fixtures', function() {
        $('#new_page_btn').click();
        expect(Editor.project.pages.length).toBe(2);
        expect(Editor.project.pages[1].name).toBe('Page 2');
    });
});