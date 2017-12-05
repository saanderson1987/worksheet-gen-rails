class ChangeWordBankColumnType < ActiveRecord::Migration[5.1]
  def change
    change_column :worked_documents, :word_bank, :text, array: true, default: []
  end
end
