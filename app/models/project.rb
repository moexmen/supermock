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

    content = <<-eos
image x=10 y=10 http://www.jetstar.com/sg/en//~/_media/Global/Images/Main/Logo/logo_header.png?bc

tabs x=10 y=90 w=400
\ttab Flight
\t\tradiobutton group=1 y=5 checked=true Return
\t\tradiobutton group=1 y=5 x=100 One way
\t\tradiobutton group=1 y=5 x=220 Multi-city

\t\tdropdown y=30 w=290
\t\t\titem Singapore
\t\t\titem Malaysia

\t\tdropdown y=70 w=290
\t\t\titem Singapore
\t\t\titem Malaysia

\t\ttext y=35 x=300 Adults
\t\ttext y=75 x=300 Kids
\t\ttext y=115 x=300 Infants

\t\tdropdown y=30 x=350 w=50
\t\t\titem 0
\t\t\titem selected=true 1
\t\t\titem 2

\t\tdropdown y=70 x=350 w=50
\t\t\titem 0
\t\t\titem selected=true 1
\t\t\titem 2

\t\tdropdown y=110 x=350 w=50
\t\t\titem 0
\t\t\titem 1
\t\t\titem 2

\t\tdatepicker y=110 w=140
\t\tdatepicker y=110 w=140 x=150

\t\tradiobutton group=2 y=160 checked=true I want to travel on these dates
\t\tradiobutton group=2 y=190 I just want the cheapest flight

\t\tbutton y=230 w=400 click=page('Homepage > 1') Search for flights

\ttab Flight+Hotel

image x=440 y=130 http://www.jetstar.com/sg/en//~/_media/Jetstar%20Singapore/Images/Homepage/klia2/20150602_KLIA2_SG_EN_v3.jpg?bc
    eos

    child_page = Page.new(id: 'Homepage > 1', content: <<-eos
modal
\theader close=page('Homepage') Searching...
\tbody Searching for flight...
\tfooter
\t\tbutton click=page('Homepage') Cancel
eos
)

    self.pages ||= [ Page.new(id: 'Homepage', content: content, child_pages: [child_page]).to_json ]
  end
end
