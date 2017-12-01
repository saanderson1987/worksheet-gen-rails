class CreateCourseSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :course_subscriptions do |t|
      t.integer :user_id
      t.integer :course_id
      t.timestamps
    end
    add_index :course_subscriptions, :user_id
    add_index :course_subscriptions, :course_id
  end
end
