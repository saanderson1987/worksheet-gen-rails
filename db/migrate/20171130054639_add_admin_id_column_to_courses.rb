class AddAdminIdColumnToCourses < ActiveRecord::Migration[5.1]
  def change
    add_column :courses, :admin_id, :integer
  end
end
