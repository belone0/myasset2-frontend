class Balancing < ApplicationRecord
  belongs_to :user
  has_many :balancing_assets, dependent: :destroy
  accepts_nested_attributes_for :balancing_assets
end
