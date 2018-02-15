class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :status, :default => '0'
      t.integer :position
      t.date :deadline

      t.timestamps
    end
  end
end
