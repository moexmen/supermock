class Project < ActiveRecord::Base
  CARD_COLOURS = %W(#F2C249 #E6772E #4DB3B3 #E64A45 #E64A45)
  enum platform: [ :desktop, :mobile ]

  belongs_to :user

  validates :name, uniqueness: { scope: :user_id }, presence: true
  validates :platform, inclusion: { in: Project.platforms.keys }, presence: true
  validates :card_colour, inclusion: { in: Project::CARD_COLOURS }, presence: true

  after_initialize :set_defaults

  def set_defaults
    self.platform ||= Project.platforms[:desktop]
    self.card_colour ||= CARD_COLOURS.sample
  end
end
