FactoryGirl.define do
  factory :project do
    id { Faker::Number.number(5) }
    name { Faker::Name.name }
    card_colour { '#000' }
  end
end
