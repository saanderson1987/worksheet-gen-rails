class AddCourseIdColumnToDocuments < ActiveRecord::Migration[5.1]
  def change
    add_column :documents, :course_id, :integer
  end
end
