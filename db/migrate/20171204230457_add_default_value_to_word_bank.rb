class AddDefaultValueToWordBank < ActiveRecord::Migration[5.1]
  def change
    change_column_default :worked_documents, :word_bank, []
  end
end
