FactoryGirl.define do
  factory :user do
    id { Faker::Number.number(5) }
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }
    password_confirmation { password }

    factory :user_with_project do
      after(:create) do |user, evaluator|
        FactoryGirl.create(:project, user: user)
      end
    end
  end
end
