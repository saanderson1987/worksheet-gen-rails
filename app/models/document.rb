class Document < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: :owner_id
  belongs_to :course
  has_many :worked_documents, dependent: :destroy
end
