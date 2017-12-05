class AddUniqueIndexToWorkedDocuments < ActiveRecord::Migration[5.1]
  def change
    add_index :worked_documents, [:user_id, :doc_id], unique: true
  end
end
