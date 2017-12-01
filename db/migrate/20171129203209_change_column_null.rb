class ChangeColumnNull < ActiveRecord::Migration[5.1]
  def change
    change_column_null :courses, :name, false
  end
end
