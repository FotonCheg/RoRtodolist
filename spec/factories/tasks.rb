FactoryGirl.define do
  factory :task do
    association (:project)
    name "New Task"
    status "0"
    sequence(:position){|i| "#{i}"}
  end
end