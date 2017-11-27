class AddDocTypeToDocuments < ActiveRecord::Migration[5.1]
  def change
    add_column :documents, :doc_type, :string
  end
end
