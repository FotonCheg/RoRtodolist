class AddUserIdToProject < ActiveRecord::Migration[5.1]
  def change
    change_table :projects do|t|
      t.belongs_to :user
    end
  end
end
