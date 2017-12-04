class CreateWorkedDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :worked_documents do |t|
      t.integer :user_id
      t.integer :doc_id
      t.jsonb :problems
      t.boolean :graded
      t.integer :score
      
      t.timestamps
    end
    add_index :worked_documents, :user_id
    add_index :worked_documents, :doc_id
  end
end
