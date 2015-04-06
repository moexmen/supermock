require 'elements/element_model'

class Page < ElementModel
  attr_accessor :name, :elements, :subpages

  def initialize(*args)
    super(*args)
    @elements ||= []
    @subpages ||= []
  end

  def as_json(options = {})
    {
        type: 'Page',
        name: @name,
        elements: @elements.map(&:to_json),
        subpages: @subpages.map(&:to_json),
    }
  end

  def add_subpage(page)
    @subpages << page
  end
end