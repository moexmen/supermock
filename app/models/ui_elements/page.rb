require 'ui_elements/element_model'

class Page < ElementModel
  attr_accessor :name

  def as_json(options={})
    {
        type: 'Page',
        name: name
    }
  end
end