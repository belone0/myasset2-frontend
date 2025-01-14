# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_01_14_131009) do
  create_table "balancing_assets", force: :cascade do |t|
    t.integer "balancing_id", null: false
    t.string "asset_type", null: false
    t.decimal "current_value", precision: 15, scale: 2, default: "0.0"
    t.decimal "current_percentage", precision: 5, scale: 2, default: "0.0"
    t.decimal "desired_percentage", precision: 5, scale: 2, default: "0.0"
    t.decimal "updated_value", precision: 15, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["balancing_id"], name: "index_balancing_assets_on_balancing_id"
  end

  create_table "balancings", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "total_value", precision: 15, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_balancings_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "todos", force: :cascade do |t|
    t.string "name"
    t.boolean "done", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_todos_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
  end

  add_foreign_key "balancing_assets", "balancings"
  add_foreign_key "balancings", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "todos", "users"
end
