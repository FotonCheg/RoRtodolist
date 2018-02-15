class AddProjectIdToTask < ActiveRecord::Migration[5.1]
  def change
    change_table :tasks do|t|
    t.belongs_to :project
    end
  end
end
