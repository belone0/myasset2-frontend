class CreateBalancings < ActiveRecord::Migration[8.0]
  def change
    create_table :balancings do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :total_value, precision: 15, scale: 2, null: false, default: 0
      # t.string :name # optionally, if you want a name for each balancing
      # t.date :date   # optionally, if you want to keep track of which date the balancing was made

      t.timestamps
    end
  end
end
