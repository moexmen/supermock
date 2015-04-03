class Project < ActiveRecord::Base
  validates :name, uniqueness: { scope: :user_id }, presence: true

  belongs_to :user
end
