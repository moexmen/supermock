FactoryGirl.define do
  factory :user do
    id { Faker::Number.number(5) }
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }
    password_confirmation { password }

    trait :with_projects do
      after(:create) do |user, evaluator|
        FactoryGirl.create(:project, :platform_desktop, user: user)
        FactoryGirl.create(:project, :platform_mobile, user: user)
      end
    end
  end
end
