require 'elements/element_model'

class Page < ElementModel
  attr_accessor :id, :name, :content, :parent_page, :child_pages, :child_elements

  def initialize(*args)
    super(*args)
    @content ||= ''
    @parent_page = nil
    @child_pages ||= []
    @child_elements ||= []
  end

  def as_json(options = {})
    {
        type: 'Page',
        id: @id,
        name: @name,
        content: @content,
        parent_page: parent_page,
        child_pages: @child_pages.map(&:to_json),
        child_elements: @child_elements,
    }
  end

  def add_child_page(page)
    @child_pages << page
  end
end