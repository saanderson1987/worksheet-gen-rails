class AddWordBankColumnToWorkedDocuments < ActiveRecord::Migration[5.1]
  def change
    add_column :worked_documents, :word_bank, :string, array: :true
  end
end
