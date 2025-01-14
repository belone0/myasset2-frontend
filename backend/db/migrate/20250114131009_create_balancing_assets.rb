class CreateBalancingAssets < ActiveRecord::Migration[8.0]
  def change
    create_table :balancing_assets do |t|
      t.references :balancing, null: false, foreign_key: true
      t.string :asset_type, null: false
      t.decimal :current_value, precision: 15, scale: 2, default: 0
      t.decimal :current_percentage, precision: 5, scale: 2, default: 0
      t.decimal :desired_percentage, precision: 5, scale: 2, default: 0
      t.decimal :updated_value, precision: 15, scale: 2, default: 0

      t.timestamps
    end
  end
end
