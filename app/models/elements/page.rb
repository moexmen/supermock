require 'elements/element_model'

class Page < ElementModel
  attr_accessor :name, :elements, :parent_page, :child_pages

  def initialize(*args)
    super(*args)
    @elements ||= []
    @parent_page = nil
    @child_pages ||= []
  end

  def as_json(options = {})
    {
        type: 'Page',
        name: @name,
        elements: @elements.map(&:to_json),
        parent_page: parent_page,
        child_pages: @child_pages.map(&:to_json),
    }
  end

  def add_child_page(page)
    @child_pages << page
  end
end