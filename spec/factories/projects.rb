FactoryGirl.define do
  factory :project do
    id { Faker::Number.number(5) }
    name { Faker::Name.name }
    card_colour { Project::CARD_COLOURS.sample }

    trait :platform_desktop do
      platform { Project.platforms[:desktop] }
    end

    trait :platform_mobile do
      platform { Project.platforms[:mobile] }
    end
  end
end
