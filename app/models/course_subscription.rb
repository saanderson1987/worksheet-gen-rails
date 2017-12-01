class CourseSubscription < ApplicationRecord
  validates :course, :user, presence: true

  belongs_to :user
  belongs_to :course
end
