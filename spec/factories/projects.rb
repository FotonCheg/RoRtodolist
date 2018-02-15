FactoryGirl.define do
  factory :project do
    association (:user)
    name "Yaroslav Dyachenko"
  end
end