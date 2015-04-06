class ElementModel
  include ActiveModel::Model

  def persisted?
    true
  end
end
