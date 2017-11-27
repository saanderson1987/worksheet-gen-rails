class CreateDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :documents do |t|
      t.string :title
      t.string :type
      t.text :instructions
      t.jsonb :problems

      t.timestamps
    end
    add_index :documents, :title
    add_index :documents, :type
  end
end
