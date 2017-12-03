class CreateWorkedDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :worked_documents do |t|

      t.timestamps
    end
  end
end
