class Course < ApplicationRecord
  belongs_to :admin, class_name: 'User', foreign_key: :admin_id
  has_many :documents
  has_many :course_subscriptions, inverse_of: :course, dependent: :destroy
  has_many :subscribers, through: :course_subscriptions, source: :user

  def doc_list
    documents.select(:id, :title)
  end
end
