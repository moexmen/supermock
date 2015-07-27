require 'elements/page'

class Project < ActiveRecord::Base
  CARD_COLOURS = %W(#F2C249 #E6772E #4DB3B3 #E64A45 #E64A45)
  enum platform: [ :desktop, :mobile ]

  belongs_to :user

  validates :name, uniqueness: { scope: :user_id }, presence: true
  validates :platform, inclusion: { in: Project.platforms.keys }, presence: true
  validates :card_colour, inclusion: { in: Project::CARD_COLOURS }, presence: true
  validates :pages, presence: true

  after_initialize :set_defaults

  def set_defaults
    self.platform ||= Project.platforms[:desktop]
    self.card_colour ||= CARD_COLOURS.sample

    child_elements = []
    content = <<-eos
page

\ttabs x=10 y=90 w=400
\t\ttab Booking a Flight
\t\t\tradiobutton group=1 y=5 checked=true Return
\t\t\tradiobutton group=1 y=5 x=100 One way
\t\t\tradiobutton group=1 y=5 x=220 Multi-city

\t\t\tdropdown y=30 w=290
\t\t\t\titem Singapore
\t\t\t\titem Malaysia

\t\t\tdropdown y=70 w=290
\t\t\t\titem Singapore
\t\t\t\titem Malaysia

\t\t\ttext y=35 x=300 Adults
\t\t\ttext y=75 x=300 Kids
\t\t\ttext y=115 x=300 Infants

\t\t\tdropdown y=30 x=350 w=50
\t\t\t\titem 0
\t\t\t\titem selected=true 1
\t\t\t\titem 2

\t\t\tdropdown y=70 x=350 w=50
\t\t\t\titem 0
\t\t\t\titem selected=true 1
\t\t\t\titem 2

\t\t\tdropdown y=110 x=350 w=50
\t\t\t\titem 0
\t\t\t\titem 1
\t\t\t\titem 2

\t\t\tdatepicker y=110 w=140
\t\t\tdatepicker y=110 w=140 x=150

\t\t\tradiobutton group=2 y=160 checked=true I want to travel on these dates
\t\t\tradiobutton group=2 y=190 I just want the cheapest flight

\t\t\tbutton y=230 w=400 click=page('Homepage > 1') Search for flights

\t\ttab Flight+Hotel
    eos

    child_page = Page.new(id: 'Homepage > 1', content: <<-eos
\tmodal
\t\theader close=page('Homepage') Searching...
\t\tbody Searching for flight...
\t\tfooter
\t\t\tbutton click=page('Homepage') Cancel
eos
)

    self.pages ||= [ Page.new(id: 'Homepage', content: content, child_pages: [child_page]).to_json ]
  end
end
